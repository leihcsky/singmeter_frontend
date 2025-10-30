/**
 * Vocal Range Test Main Component
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AudioPitchDetector, frequencyToNote, getVoiceType } from '../utils/pitchDetector';
import PitchVisualizer from './PitchVisualizer';
import TestResult from './TestResult';

const VocalTest = () => {
  const [testState, setTestState] = useState('idle'); // idle, preparing, testing, completed
  const [currentStep, setCurrentStep] = useState(0); // 0: mid, 1: low, 2: high
  const [currentPitch, setCurrentPitch] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [lowestPitch, setLowestPitch] = useState(null);
  const [highestPitch, setHighestPitch] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  const detectorRef = useRef(null);
  const pitchHistoryRef = useRef([]);
  const lowestPitchRef = useRef(null);
  const highestPitchRef = useRef(null);
  const animationFrameRef = useRef(null);

  const stepInstructions = [
    { title: 'Step 1', instruction: 'Sing "Ahh" in your natural voice', description: 'Hold for 3 seconds' },
    { title: 'Step 2', instruction: 'Now try going lower', description: 'Reach your lowest comfortable note' },
    { title: 'Step 3', instruction: 'Finally, reach for your highest note', description: 'Don\'t strain - protect your voice' },
  ];

  // Initialize audio detector
  const initializeDetector = async () => {
    try {
      setTestState('preparing');
      setError(null);

      const detector = new AudioPitchDetector();
      const result = await detector.initialize();

      if (result.success) {
        detectorRef.current = detector;
        setTestState('testing');
        startDetection();
      } else {
        setError(result.error || 'Unable to access microphone. Please check your permissions.');
        setTestState('idle');
      }
    } catch (err) {
      setError('Initialization failed: ' + err.message);
      setTestState('idle');
    }
  };

  // Start detection with throttled updates
  const startDetection = useCallback(() => {
    if (!detectorRef.current) return;

    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 150; // Update UI every 150ms to reduce re-renders (was 100ms)

    detectorRef.current.startDetection((pitch, clarity) => {
      if (pitch) {
        const note = frequencyToNote(pitch);

        // Record pitch history
        pitchHistoryRef.current.push({ pitch, note, timestamp: Date.now() });

        // Update lowest and highest pitch using refs (no re-render)
        if (!lowestPitchRef.current || pitch < lowestPitchRef.current) {
          lowestPitchRef.current = pitch;
        }
        if (!highestPitchRef.current || pitch > highestPitchRef.current) {
          highestPitchRef.current = pitch;
        }

        // Throttle UI updates to reduce re-renders
        const now = Date.now();
        if (now - lastUpdateTime >= UPDATE_INTERVAL) {
          lastUpdateTime = now;

          // Cancel previous animation frame if exists
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          // Use requestAnimationFrame for smooth updates
          animationFrameRef.current = requestAnimationFrame(() => {
            // Batch all state updates together
            setCurrentPitch(pitch);
            setCurrentNote(note);
            setLowestPitch(lowestPitchRef.current);
            setHighestPitch(highestPitchRef.current);
          });
        }
      } else {
        // Only update if currently showing a pitch
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setCurrentPitch(null);
        });
      }
    });
  }, []);

  // Next step
  const nextStep = () => {
    if (currentStep < stepInstructions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTest();
    }
  };

  // Complete test
  const completeTest = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }

    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Use the ref values for final calculation
    const finalLowest = lowestPitchRef.current || lowestPitch;
    const finalHighest = highestPitchRef.current || highestPitch;

    // Calculate results
    const lowestNote = frequencyToNote(finalLowest);
    const highestNote = frequencyToNote(finalHighest);
    const voiceType = getVoiceType(lowestNote.fullNote, highestNote.fullNote);

    // Calculate vocal range width (in semitones)
    const semitones = Math.round(12 * Math.log2(finalHighest / finalLowest));

    const result = {
      lowestNote: lowestNote.fullNote,
      highestNote: highestNote.fullNote,
      lowestFrequency: finalLowest,
      highestFrequency: finalHighest,
      voiceType,
      semitones,
      timestamp: new Date().toISOString(),
    };

    setTestResult(result);
    setTestState('completed');
  };

  // Reset test
  const resetTest = () => {
    if (detectorRef.current) {
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setTestState('idle');
    setCurrentStep(0);
    setCurrentPitch(null);
    setCurrentNote(null);
    setLowestPitch(null);
    setHighestPitch(null);
    setTestResult(null);
    setError(null);
    pitchHistoryRef.current = [];
    lowestPitchRef.current = null;
    highestPitchRef.current = null;
  };

  // Cleanup resources
  useEffect(() => {
    return () => {
      if (detectorRef.current) {
        detectorRef.current.cleanup();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoize button text to prevent unnecessary re-renders
  const nextButtonText = useMemo(() => {
    return currentStep < stepInstructions.length - 1 ? 'Next Step' : 'Complete Test';
  }, [currentStep]);

  // Memoize current step info to prevent unnecessary re-renders
  const currentStepInfo = useMemo(() => {
    return stepInstructions[currentStep];
  }, [currentStep]);

  // Render different states
  if (testState === 'idle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-slow">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎤 SingMeter</h1>
            <p className="text-xl text-gray-600 mb-2">Discover Your Vocal Identity</p>
            <p className="text-sm text-gray-500">Professional Online Vocal Range Test</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="mb-8 text-left bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Before You Start:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Find a quiet environment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Allow microphone access when prompted</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Test takes approximately 1-2 minutes</span>
              </li>
            </ul>
          </div>

          <button
            onClick={initializeDetector}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (testState === 'preparing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700">Initializing microphone...</p>
        </div>
      </div>
    );
  }

  if (testState === 'testing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8">
          {/* Step indicator */}
          <div className="flex justify-center mb-8">
            {stepInstructions.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index === currentStep ? 'bg-blue-500 text-white' :
                  index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < stepInstructions.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Current step instructions */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStepInfo.title}
            </h2>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {currentStepInfo.instruction}
            </p>
            <p className="text-gray-600">{currentStepInfo.description}</p>
          </div>

          {/* Pitch visualizer */}
          <PitchVisualizer
            currentPitch={currentPitch}
            currentNote={currentNote}
            lowestPitch={lowestPitch}
            highestPitch={highestPitch}
          />

          {/* Control buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel Test
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              {nextButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'completed') {
    return <TestResult result={testResult} onReset={resetTest} />;
  }

  return null;
};

export default VocalTest;


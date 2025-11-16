/**
 * Modern Single-Page Vocal Range Test
 * User-friendly, SEO-optimized, modern design
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AudioPitchDetector, frequencyToNote, getVoiceType } from '../utils/pitchDetector';
import WelcomeScreen from './WelcomeScreen';
import TestingScreen from './TestingScreen';
import ResultScreen from './ResultScreen';
import { Link } from 'react-router-dom';

const ModernVocalTest = () => {
  // Test states
  const [testPhase, setTestPhase] = useState('welcome'); // welcome, testing, result
  const [currentStep, setCurrentStep] = useState(0); // 0: mid, 1: low, 2: high
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // Pitch data
  const [currentPitch, setCurrentPitch] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [lowestPitch, setLowestPitch] = useState(null);
  const [highestPitch, setHighestPitch] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Refs
  const detectorRef = useRef(null);
  const pitchHistoryRef = useRef([]);
  const lowestPitchRef = useRef(null);
  const highestPitchRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Input mode: 'sing' or 'manual'
  const [inputMode, setInputMode] = useState('sing');
  const [manualLowestPitch, setManualLowestPitch] = useState(null);
  const [manualHighestPitch, setManualHighestPitch] = useState(null);

  // Step-specific pitch tracking (to lock values after each step)
  const [step0LowestPitch, setStep0LowestPitch] = useState(null);
  const [step1HighestPitch, setStep1HighestPitch] = useState(null);

  const stepInstructions = useMemo(() => [
    {
      title: 'Find Your Lowest Note',
      instruction: 'Sing or select your lowest comfortable note',
      tip: 'You can sing it or click on the piano keyboard below',
      icon: '🔽'
    },
    {
      title: 'Find Your Highest Note',
      instruction: 'Sing or select your highest comfortable note',
      tip: 'You can sing it or click on the piano keyboard below',
      icon: '🔼'
    },
  ], []);

  // Ref to track current step (to avoid closure issues)
  const currentStepRef = useRef(0);

  // Update currentStepRef when currentStep changes
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Start detection with throttled updates
  const startDetection = useCallback(() => {
    if (!detectorRef.current) return;

    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 100; // Reduced from 150ms to 100ms for better responsiveness

    detectorRef.current.startDetection((pitch, clarity) => {
      if (pitch) {
        const note = frequencyToNote(pitch);
        pitchHistoryRef.current.push({ pitch, note, timestamp: Date.now() });

        // Update pitch based on current step (use ref to avoid closure issues)
        const step = currentStepRef.current;
        if (step === 0) {
          // Step 0: Find Lowest Note - only update lowest
          const isNewLowest = !lowestPitchRef.current || pitch < lowestPitchRef.current;
          if (isNewLowest) {
            lowestPitchRef.current = pitch;
            console.log(`🔽 Step 0 - New Lowest: ${note.fullNote} (${pitch.toFixed(1)} Hz)`);
          }
        } else if (step === 1) {
          // Step 1: Find Highest Note - only update highest
          const isNewHighest = !highestPitchRef.current || pitch > highestPitchRef.current;
          if (isNewHighest) {
            highestPitchRef.current = pitch;
            console.log(`🔼 Step 1 - New Highest: ${note.fullNote} (${pitch.toFixed(1)} Hz)`);
          }
        }

        // Throttled UI updates
        const now = Date.now();
        if (now - lastUpdateTime >= UPDATE_INTERVAL) {
          lastUpdateTime = now;

          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          animationFrameRef.current = requestAnimationFrame(() => {
            console.log(`🎵 UI Update - Step ${currentStepRef.current}:`, {
              pitch: pitch.toFixed(1),
              note: note.fullNote,
              lowestPitchRef: lowestPitchRef.current?.toFixed(1),
              highestPitchRef: highestPitchRef.current?.toFixed(1)
            });
            setCurrentPitch(pitch);
            setCurrentNote(note);
            // Always update both lowest and highest for UI display
            setLowestPitch(lowestPitchRef.current);
            setHighestPitch(highestPitchRef.current);
          });
        }
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setCurrentPitch(null);
          setCurrentNote(null);
        });
      }
    });
  }, []); // Remove currentStep from dependencies

  // Return to home page
  const handleReturnHome = () => {
    // Stop any ongoing detection
    if (detectorRef.current) {
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    // Reset all states
    setTestPhase('welcome');
    setCurrentStep(0);
    setIsRecording(false);
    setCountdown(3);
    setCurrentPitch(null);
    setCurrentNote(null);
    setLowestPitch(null);
    setHighestPitch(null);
    setTestResult(null);
    setError(null);
    setInputMode('sing');
    setManualLowestPitch(null);
    setManualHighestPitch(null);
    setStep0LowestPitch(null);
    setStep1HighestPitch(null);

    // Reset refs
    pitchHistoryRef.current = [];
    lowestPitchRef.current = null;
    highestPitchRef.current = null;

    // Close mobile menu if open
    setShowMobileMenu(false);
  };

  // Initialize and start test
  const handleStartTest = async () => {
    console.log('🚀 handleStartTest called');
    console.log('📱 User agent:', navigator.userAgent);
    console.log('🔒 Protocol:', window.location.protocol);
    console.log('🌐 Host:', window.location.host);
    console.log('🔐 Is secure context:', window.isSecureContext);
    console.log('🎤 Input mode:', inputMode);

    setError(null);

    // If in manual mode, skip microphone initialization
    if (inputMode === 'manual') {
      console.log('✅ Manual mode, skipping microphone initialization');
      setTestPhase('testing');
      return;
    }

    console.log('🎤 Sing mode, initializing microphone...');

    // Clean up existing detector if it exists
    if (detectorRef.current) {
      console.log('🧹 Cleaning up existing detector');
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    // Create new detector and request permission
    console.log('🎵 Creating new AudioPitchDetector...');
    detectorRef.current = new AudioPitchDetector();

    console.log('🎤 Calling initialize()...');
    const result = await detectorRef.current.initialize();
    console.log('📊 Initialize result:', result);

    if (!result.success) {
      console.log('🔴 Microphone initialization failed:', result);
      console.log('❌ Error type:', result.errorType);
      console.log('❌ Error name:', result.errorName);
      console.log('❌ Error message:', result.error);

      // Show modal with error type
      setShowMicPermission(true);
      setMicPermissionError(result.errorType || 'permission_denied');

      // Set appropriate error message
      if (result.errorType === 'no_device') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else if (result.errorType === 'device_in_use') {
        setError('Microphone is being used by another application. Please close other apps and try again.');
      } else if (result.errorType === 'security_error') {
        setError('Microphone access requires a secure connection (HTTPS).');
      } else {
        setError('Microphone access is required to test your vocal range.');
      }

      detectorRef.current = null;
      return;
    }

    console.log('✅ Microphone initialized successfully');

    // Start countdown
    setTestPhase('testing');
    setIsRecording(false);
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsRecording(true);
          startDetection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Next step
  const handleNextStep = () => {
    if (currentStep < stepInstructions.length - 1) {
      // Lock the result from step 0 before moving to step 1
      if (currentStep === 0) {
        const lockedLowest = manualLowestPitch || lowestPitchRef.current;
        if (lockedLowest) {
          setStep0LowestPitch(lockedLowest);
          console.log(`🔒 Locked Step 0 Lowest: ${lockedLowest.toFixed(1)} Hz`);
        }

        // Initialize highestPitchRef for step 1 (set to a very low value to ensure any sung note will be higher)
        if (inputMode === 'sing') {
          highestPitchRef.current = 0;
          setHighestPitch(null); // Clear UI display
          console.log(`🔄 Initialized highestPitchRef for step 1`);
        }
      }

      // If in manual mode, just move to next step
      if (inputMode === 'manual') {
        setCurrentStep(prev => prev + 1);
        return;
      }

      // Stop detection during countdown to avoid interference
      if (detectorRef.current) {
        detectorRef.current.stopDetection();
        console.log(`⏸️ Stopped detection for step ${currentStep} → ${currentStep + 1}`);
      }

      setCurrentStep(prev => prev + 1);
      setIsRecording(false);
      setCountdown(3);

      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsRecording(true);
            // Restart detection after countdown
            console.log(`▶️ Restarted detection for step ${currentStep + 1}`);
            startDetection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      completeTest();
    }
  };

  // Handle input mode change
  const handleInputModeChange = (mode) => {
    setInputMode(mode);

    if (mode === 'manual') {
      // Stop recording when switching to manual mode
      if (detectorRef.current) {
        detectorRef.current.stopDetection();
      }
      setIsRecording(false);
    } else if (mode === 'sing') {
      // Start recording when switching to sing mode
      setIsRecording(true);
      startDetection();
    }
  };

  // Handle manual pitch selection
  const handleManualPitchSelect = (frequency, note) => {
    if (currentStep === 0) {
      // Lowest note
      setManualLowestPitch(frequency);
      console.log(`🎹 Manual Lowest: ${note} (${frequency.toFixed(1)} Hz)`);
    } else {
      // Highest note
      setManualHighestPitch(frequency);
      console.log(`🎹 Manual Highest: ${note} (${frequency.toFixed(1)} Hz)`);
    }
  };

  // Complete test
  const completeTest = () => {
    console.log('🎯 completeTest called');

    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }

    // Lock step 1 result
    const lockedHighest = manualHighestPitch || (highestPitchRef.current > 0 ? highestPitchRef.current : null);
    if (lockedHighest) {
      setStep1HighestPitch(lockedHighest);
      console.log(`🔒 Locked Step 1 Highest: ${lockedHighest.toFixed(1)} Hz`);
    }

    // Use locked values from each step
    // Priority: manual selection > locked step value > ref value (fallback)
    const finalLowest = manualLowestPitch || step0LowestPitch || lowestPitchRef.current;
    const finalHighest = manualHighestPitch || lockedHighest || (highestPitchRef.current > 0 ? highestPitchRef.current : null);

    console.log('📊 Final values:', {
      manualLowestPitch,
      step0LowestPitch,
      lowestPitchRef: lowestPitchRef.current,
      finalLowest,
      manualHighestPitch,
      lockedHighest,
      highestPitchRef: highestPitchRef.current,
      finalHighest
    });

    if (!finalLowest || !finalHighest) {
      console.error('❌ Missing pitch values');
      setError('Please select or sing both your lowest and highest notes.');
      return;
    }

    // Validation: Ensure lowest is actually lower than highest
    if (finalLowest >= finalHighest) {
      console.error(`❌ Invalid range: Lowest (${finalLowest.toFixed(1)} Hz) >= Highest (${finalHighest.toFixed(1)} Hz)`);
      setError('Invalid range detected. Please ensure your lowest note is lower than your highest note. Try again.');
      return;
    }

    const lowestNote = frequencyToNote(finalLowest);
    const highestNote = frequencyToNote(finalHighest);
    const voiceType = getVoiceType(lowestNote.fullNote, highestNote.fullNote);
    const semitones = Math.round(12 * Math.log2(finalHighest / finalLowest));

    const result = {
      lowestNote: lowestNote.fullNote,
      highestNote: highestNote.fullNote,
      lowestFrequency: finalLowest,
      highestFrequency: finalHighest,
      voiceType,
      semitones,
      octaves: (semitones / 12).toFixed(1),
      timestamp: new Date().toISOString(),
    };

    setTestResult(result);
    setTestPhase('result');
  };

  // Previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      // Stop detection during countdown to avoid interference
      if (detectorRef.current) {
        detectorRef.current.stopDetection();
      }

      setCurrentStep(prev => prev - 1);
      setIsRecording(false);
      setCountdown(3);

      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsRecording(true);
            // Restart detection after countdown
            startDetection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Cancel test
  const handleCancelTest = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    setTestPhase('welcome');
    setCurrentStep(0);
    setIsRecording(false);
    setCountdown(3);
    setCurrentPitch(null);
    setCurrentNote(null);
    setLowestPitch(null);
    setHighestPitch(null);
    setTestResult(null);
    setError(null);
    setInputMode('sing');
    setManualLowestPitch(null);
    setManualHighestPitch(null);
    setStep0LowestPitch(null);
    setStep1HighestPitch(null);

    pitchHistoryRef.current = [];
    lowestPitchRef.current = null;
    highestPitchRef.current = null;
  };

  // Reset test (from result screen)
  const handleReset = () => {
    if (detectorRef.current) {
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    setTestPhase('welcome');
    setCurrentStep(0);
    setIsRecording(false);
    setCountdown(3);
    setCurrentPitch(null);
    setCurrentNote(null);
    setLowestPitch(null);
    setHighestPitch(null);
    setTestResult(null);
    setError(null);
    setInputMode('sing');
    setManualLowestPitch(null);
    setManualHighestPitch(null);
    setStep0LowestPitch(null);
    setStep1HighestPitch(null);

    pitchHistoryRef.current = [];
    lowestPitchRef.current = null;
    highestPitchRef.current = null;
  };

  // Cleanup
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

  // Memoized values
  const currentStepInfo = useMemo(() => stepInstructions[currentStep], [currentStep, stepInstructions]);
  const nextButtonText = useMemo(() =>
    currentStep < stepInstructions.length - 1 ? 'Next Step →' : 'See My Results 🎉',
    [currentStep, stepInstructions.length]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* 横版 Logo（包含品牌名） */}
            <button
              onClick={handleReturnHome}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg -m-2 p-2"
              aria-label="Return to home"
            >
              <img
                src="/logo-horizontal.svg"
                alt="SingMeter"
                className="h-16 sm:h-20 w-auto hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">
                Home
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition">
                Blog
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition">
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/blog"
                  className="text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  className="text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/privacy"
                  className="text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Terms
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {testPhase === 'welcome' && (
          <WelcomeScreen onStart={handleStartTest} error={error} />
        )}
        
        {testPhase === 'testing' && (
          <TestingScreen
            currentStep={currentStep}
            stepInfo={currentStepInfo}
            isRecording={isRecording}
            countdown={countdown}
            currentPitch={currentPitch}
            currentNote={currentNote}
            lowestPitch={lowestPitch}
            highestPitch={highestPitch}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            onCancel={handleCancelTest}
            nextButtonText={nextButtonText}
            inputMode={inputMode}
            onInputModeChange={handleInputModeChange}
            manualPitch={currentStep === 0 ? manualLowestPitch : manualHighestPitch}
            onManualPitchSelect={handleManualPitchSelect}
          />
        )}
        
        {testPhase === 'result' && testResult && (
          <ResultScreen result={testResult} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1">
              <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showMicPermission && (
        <MicrophonePermissionModal
          onClose={() => setShowMicPermission(false)}
          onRetry={handleStartTest}
          errorType={micPermissionError}
        />
      )}
    </div>
  );
};

// Microphone Permission Modal
const MicrophonePermissionModal = ({ onClose, onRetry, errorType = 'permission_denied' }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleRetry = () => {
    onClose();
    onRetry();
  };

  // Check if this is a permission error (can retry) or other error (need manual fix)
  const canRetry = errorType === 'permission_denied' || errorType === 'unknown_error';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-xl sm:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2 sm:mx-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">🎤</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white">Microphone Access Required</h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                {errorType === 'no_device' ? (
                  <>
                    <strong>No microphone detected.</strong> Please connect a microphone to your device and try again.
                  </>
                ) : errorType === 'device_in_use' ? (
                  <>
                    <strong>Microphone is in use.</strong> Please close other applications that might be using your microphone and try again.
                  </>
                ) : (
                  <>
                    SingMeter needs access to your microphone to analyze your vocal range.
                    Your voice is <strong>never recorded or stored</strong> - all analysis happens locally in your browser.
                  </>
                )}
              </p>

              {errorType === 'permission_denied' && (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 rounded-r-lg mb-3 sm:mb-4">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h5 className="text-sm sm:text-base font-semibold text-green-800 mb-1">100% Private & Safe</h5>
                      <p className="text-xs sm:text-sm text-green-700">
                        No recording, no storage, no transmission. Your privacy is fully protected.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errorType === 'permission_denied' && (
                <>
                  {!showInstructions ? (
                    <button
                      onClick={() => setShowInstructions(true)}
                      className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium flex items-center"
                    >
                      <span>How do I enable microphone access?</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-900 mb-2">Enable Microphone Access:</h4>

                  {/* Desktop Browsers */}
                  <div className="hidden sm:block space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-800">
                    <div className="flex items-start space-x-1.5 sm:space-x-2">
                      <span className="font-bold flex-shrink-0">Chrome:</span>
                      <span>Click the 🔒 icon in the address bar → Site settings → Microphone → Allow</span>
                    </div>
                    <div className="flex items-start space-x-1.5 sm:space-x-2">
                      <span className="font-bold flex-shrink-0">Firefox:</span>
                      <span>Click the 🔒 icon → Permissions → Microphone → Allow</span>
                    </div>
                    <div className="flex items-start space-x-1.5 sm:space-x-2">
                      <span className="font-bold flex-shrink-0">Safari:</span>
                      <span>Safari menu → Settings for This Website → Microphone → Allow</span>
                    </div>
                    <div className="flex items-start space-x-1.5 sm:space-x-2">
                      <span className="font-bold flex-shrink-0">Edge:</span>
                      <span>Click the 🔒 icon → Permissions for this site → Microphone → Allow</span>
                    </div>
                  </div>

                  {/* Mobile Browsers */}
                  <div className="sm:hidden space-y-2 text-xs text-blue-800">
                    <div className="bg-white/50 rounded p-2">
                      <div className="font-bold text-blue-900 mb-1">📱 iPhone/iPad (Safari):</div>
                      <div className="pl-2">
                        1. Tap the <strong>aA</strong> icon in the address bar<br/>
                        2. Tap <strong>Website Settings</strong><br/>
                        3. Set <strong>Microphone</strong> to <strong>Allow</strong>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <div className="font-bold text-blue-900 mb-1">🤖 Android (Chrome):</div>
                      <div className="pl-2">
                        1. Tap the <strong>🔒</strong> icon in the address bar<br/>
                        2. Tap <strong>Permissions</strong><br/>
                        3. Set <strong>Microphone</strong> to <strong>Allow</strong>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <div className="font-bold text-blue-900 mb-1">💬 WeChat Browser:</div>
                      <div className="pl-2">
                        Tap <strong>⋯</strong> menu → <strong>Open in Browser</strong><br/>
                        (Use Safari or Chrome for best experience)
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-xs text-blue-700 mt-2 sm:mt-3">
                    After enabling, click "Try Again" below to restart the test.
                  </p>
                </div>
              )}
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3">
            {canRetry ? (
              <>
                <button
                  onClick={handleRetry}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-lg hover:shadow-lg transition"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-lg hover:shadow-lg transition"
              >
                Got It
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernVocalTest;


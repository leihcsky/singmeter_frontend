/**
 * Vocal Range Test Page - Wrapper for ModernVocalTest component
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ContentSection from '../components/ContentSection';
import { AudioPitchDetector, frequencyToNote, getVoiceType } from '../utils/pitchDetector';
import UnifiedTestScreen from '../components/UnifiedTestScreen';
import ResultScreen from '../components/ResultScreen';
import { getGlobalPianoAudio } from '../utils/pianoAudio';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from '../utils/analytics';

const VocalRangeTestPage = () => {
  // Test phase: 'testing' or 'result'
  const [testPhase, setTestPhase] = useState('testing');
  const [testResult, setTestResult] = useState(null);
  const [resultWarnings, setResultWarnings] = useState([]); // Store validation warnings to display on result page

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Free Vocal Range Test – Find Your Highest & Lowest Notes Online';

    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMetaTag('description', 'Test your vocal range using your microphone. Find your lowest and highest notes instantly. Discover your voice type. Free, online, no signup.');
    setMetaTag('keywords', 'vocal range test, voice type test, singing range test, vocal range finder, voice classification, soprano alto tenor bass, vocal assessment, singing test');
    setLinkTag('canonical', 'https://www.singmeter.com/vocal-range-test');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  // Modal states
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');

  // Detector ref (shared for both tests)
  const detectorRef = useRef(null);

  // === LOWEST NOTE STATES ===
  const [lowestInputMode, setLowestInputMode] = useState('sing');
  const [lowestCountdown, setLowestCountdown] = useState(0);
  const [lowestIsRecording, setLowestIsRecording] = useState(false);
  const [lowestCurrentPitch, setLowestCurrentPitch] = useState(null);
  const [lowestCurrentNote, setLowestCurrentNote] = useState(null);
  const [lowestManualPitch, setLowestManualPitch] = useState(null);
  const [lowestCaptured, setLowestCaptured] = useState(null); // { note, frequency }
  const [lowestDetectionTimeLeft, setLowestDetectionTimeLeft] = useState(null); // Time left in seconds
  const [lowestDetectionError, setLowestDetectionError] = useState(null); // Error message

  // Lowest gating
  const lowestHasMinHoldRef = useRef(false);
  const lowestValidStartTimeRef = useRef(null);
  const lowestPitchHistoryRef = useRef([]);
  const lowestFinalPitchRef = useRef(null);
  const lowestCapturedRef = useRef(null); // Store captured value for validation in callbacks

  // === HIGHEST NOTE STATES ===
  const [highestInputMode, setHighestInputMode] = useState('sing');
  const [highestCountdown, setHighestCountdown] = useState(0);
  const [highestIsRecording, setHighestIsRecording] = useState(false);
  const [highestCurrentPitch, setHighestCurrentPitch] = useState(null);
  const [highestCurrentNote, setHighestCurrentNote] = useState(null);
  const [highestManualPitch, setHighestManualPitch] = useState(null);
  const [highestCaptured, setHighestCaptured] = useState(null); // { note, frequency }
  const [highestDetectionTimeLeft, setHighestDetectionTimeLeft] = useState(null); // Time left in seconds
  const [highestDetectionError, setHighestDetectionError] = useState(null); // Error message

  // Highest gating
  const highestHasMinHoldRef = useRef(false);
  const highestValidStartTimeRef = useRef(null);
  const highestPitchHistoryRef = useRef([]);
  const highestFinalPitchRef = useRef(null);
  const highestCapturedRef = useRef(null); // Store captured value for validation in callbacks

  const MIN_HOLD_MS = 3000; // minimal hold duration in ms (3 seconds)
  const MAX_DETECTION_TIME_MS = 15000; // maximum detection time in ms (15 seconds)

  // === LOWEST NOTE DETECTION ===
  const startLowestDetection = useCallback(() => {
    if (!detectorRef.current) {
      console.error('No detector available for lowest note');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 100;
    let firstValidTime = null; // First time we detect valid pitch
    let lastValidTime = null; // Last time we detected valid pitch
    const detectionStartTime = Date.now();
    let timeoutId = null;
    let timeLeftIntervalId = null;

    // Reset hold gating and error
    lowestValidStartTimeRef.current = null;
    lowestHasMinHoldRef.current = false;
    lowestPitchHistoryRef.current = [];
    lowestFinalPitchRef.current = null;
    setLowestDetectionError(null);
    setLowestDetectionTimeLeft(Math.ceil(MAX_DETECTION_TIME_MS / 1000));

    // Update time left every second
    timeLeftIntervalId = setInterval(() => {
      const elapsed = Date.now() - detectionStartTime;
      const timeLeft = Math.max(0, Math.ceil((MAX_DETECTION_TIME_MS - elapsed) / 1000));
      setLowestDetectionTimeLeft(timeLeft);
    }, 1000);

    // Set maximum detection timeout
    timeoutId = setTimeout(() => {
      if (!lowestHasMinHoldRef.current) {
        // Timeout - no valid detection
        detectorRef.current.stopDetection();
        setLowestIsRecording(false);
        setLowestDetectionTimeLeft(null);
        setLowestDetectionError('No clear pitch detected. Please try again in a quieter environment and sing clearly.');
        if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
        console.log('⏱️ Lowest note detection timeout');
      }
    }, MAX_DETECTION_TIME_MS);

    detectorRef.current.startDetection((pitch, clarity) => {
      const now = Date.now();

      if (pitch && pitch > 0) {
        const noteInfo = frequencyToNote(pitch);

        // Track first valid detection time
        if (firstValidTime === null) {
          firstValidTime = now;
          console.log('🎵 First valid pitch detected at:', now);
        }

        // Calculate accumulated valid time from first detection
        let accumulatedValidMs = 0;
        if (firstValidTime !== null) {
          // Check if there's a gap (more than 500ms since last valid detection)
          if (lastValidTime !== null && (now - lastValidTime) > 500) {
            // Gap detected - reset firstValidTime to now
            firstValidTime = now;
            console.log('⚠️ Gap detected, resetting timer');
          } else {
            // Continuous detection - accumulate from firstValidTime
            accumulatedValidMs = now - firstValidTime;
          }
        }
        lastValidTime = now;

        // Store pitch history (keep last 50 samples for stability analysis)
        lowestPitchHistoryRef.current.push({ pitch, clarity, timestamp: now });
        if (lowestPitchHistoryRef.current.length > 50) {
          lowestPitchHistoryRef.current.shift();
        }

        // Track lowest pitch (but we'll use stability analysis for final value)
        if (lowestFinalPitchRef.current === null || pitch < lowestFinalPitchRef.current) {
          lowestFinalPitchRef.current = pitch;
        }

        // Update UI
        if (now - lastUpdateTime >= updateInterval) {
          setLowestCurrentPitch(pitch);
          setLowestCurrentNote(noteInfo);
          lastUpdateTime = now;
        }

        // Auto-capture when accumulated time threshold met
        if (!lowestHasMinHoldRef.current && accumulatedValidMs >= MIN_HOLD_MS) {
          // Analyze pitch history for stability and accuracy
          const recentHistory = lowestPitchHistoryRef.current.filter(
            p => (now - p.timestamp) <= MIN_HOLD_MS
          );
          
          if (recentHistory.length > 0) {
            // Find the actual lowest stable pitch
            // Sort by pitch (lowest first) and take the median of the lowest 30% to avoid outliers
            const sortedPitches = recentHistory
              .map(p => p.pitch)
              .sort((a, b) => a - b);
            
            // Take the lowest 30% of pitches and calculate median
            const lowest30Percent = sortedPitches.slice(0, Math.max(1, Math.floor(sortedPitches.length * 0.3)));
            const medianLowest = lowest30Percent[Math.floor(lowest30Percent.length / 2)];
            
            // Verify stability: check if most pitches are within 1.5 semitones of the median
            // Reduced tolerance for better accuracy (was 2 semitones)
            const semitoneTolerance = 1.5;
            const medianFreq = medianLowest;
            const stablePitches = recentHistory.filter(p => {
              const semitoneDiff = Math.abs(12 * Math.log2(p.pitch / medianFreq));
              return semitoneDiff <= semitoneTolerance;
            });
            
            // Use the most stable lowest pitch
            const finalPitch = stablePitches.length >= recentHistory.length * 0.7 
              ? Math.min(...stablePitches.map(p => p.pitch))
              : medianLowest;
            
            const finalNote = frequencyToNote(finalPitch);
            
            // Validate: Ensure the captured lowest pitch is actually lower than any existing highest pitch
            // Use ref to get the latest captured value (avoids closure issues)
            const existingHighest = highestCapturedRef.current?.frequency || highestManualPitch;
            if (existingHighest && finalPitch >= existingHighest) {
              const existingHighestNote = frequencyToNote(existingHighest);
              console.warn('⚠️ Captured lowest pitch is not lower than highest pitch:', {
                lowest: `${finalNote.fullNote} (${finalPitch.toFixed(1)} Hz)`,
                highest: `${existingHighestNote.fullNote} (${existingHighest.toFixed(1)} Hz)`
              });
              setLowestDetectionError(`The detected note (${finalNote.fullNote}, ${finalPitch.toFixed(1)} Hz) is not lower than your highest note (${existingHighestNote.fullNote}, ${existingHighest.toFixed(1)} Hz). Please try singing a lower note.`);
              // Don't capture, let user retry
              return;
            }
            
            lowestHasMinHoldRef.current = true;
            const capturedData = {
              note: finalNote.fullNote,
              frequency: finalPitch
            };
            lowestCapturedRef.current = capturedData; // Update ref immediately
            setLowestCaptured(capturedData);
            detectorRef.current.stopDetection();
            setLowestIsRecording(false);
            setLowestDetectionTimeLeft(null);
            setLowestDetectionError(null);
            
            // Clear timeout and interval
            if (timeoutId) clearTimeout(timeoutId);
            if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
            
            console.log('✅ Lowest note captured:', finalNote.fullNote, `(${finalPitch.toFixed(1)} Hz) after ${accumulatedValidMs}ms`);
            console.log('📊 Stability analysis:', {
              totalSamples: recentHistory.length,
              stableSamples: stablePitches.length,
              medianLowest: medianLowest.toFixed(1),
              finalPitch: finalPitch.toFixed(1)
            });
          }
        }
      } else {
        // Lost signal - reset lastValidTime but keep accumulated time
        lastValidTime = null;
      }
    });
  }, []);

  // === HIGHEST NOTE DETECTION ===
  const startHighestDetection = useCallback(() => {
    if (!detectorRef.current) {
      console.error('No detector available for highest note');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 100;
    let firstValidTime = null; // First time we detect valid pitch
    let lastValidTime = null; // Last time we detected valid pitch
    const detectionStartTime = Date.now();
    let timeoutId = null;
    let timeLeftIntervalId = null;

    // Reset hold gating and error
    highestValidStartTimeRef.current = null;
    highestHasMinHoldRef.current = false;
    highestPitchHistoryRef.current = [];
    highestFinalPitchRef.current = null;
    setHighestDetectionError(null);
    setHighestDetectionTimeLeft(Math.ceil(MAX_DETECTION_TIME_MS / 1000));

    // Update time left every second
    timeLeftIntervalId = setInterval(() => {
      const elapsed = Date.now() - detectionStartTime;
      const timeLeft = Math.max(0, Math.ceil((MAX_DETECTION_TIME_MS - elapsed) / 1000));
      setHighestDetectionTimeLeft(timeLeft);
    }, 1000);

    // Set maximum detection timeout
    timeoutId = setTimeout(() => {
      if (!highestHasMinHoldRef.current) {
        // Timeout - no valid detection
        detectorRef.current.stopDetection();
        setHighestIsRecording(false);
        setHighestDetectionTimeLeft(null);
        setHighestDetectionError('No clear pitch detected. Please try again in a quieter environment and sing clearly.');
        if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
        console.log('⏱️ Highest note detection timeout');
      }
    }, MAX_DETECTION_TIME_MS);

    detectorRef.current.startDetection((pitch, clarity) => {
      const now = Date.now();

      if (pitch && pitch > 0) {
        const noteInfo = frequencyToNote(pitch);

        // Track first valid detection time
        if (firstValidTime === null) {
          firstValidTime = now;
          console.log('🎵 First valid pitch detected at:', now);
        }

        // Calculate accumulated valid time from first detection
        let accumulatedValidMs = 0;
        if (firstValidTime !== null) {
          // Check if there's a gap (more than 500ms since last valid detection)
          if (lastValidTime !== null && (now - lastValidTime) > 500) {
            // Gap detected - reset firstValidTime to now
            firstValidTime = now;
            console.log('⚠️ Gap detected, resetting timer');
          } else {
            // Continuous detection - accumulate from firstValidTime
            accumulatedValidMs = now - firstValidTime;
          }
        }
        lastValidTime = now;

        // Store pitch history (keep last 50 samples for stability analysis)
        highestPitchHistoryRef.current.push({ pitch, clarity, timestamp: now });
        if (highestPitchHistoryRef.current.length > 50) {
          highestPitchHistoryRef.current.shift();
        }

        // Track highest pitch (but we'll use stability analysis for final value)
        if (highestFinalPitchRef.current === null || pitch > highestFinalPitchRef.current) {
          highestFinalPitchRef.current = pitch;
        }

        // Update UI
        if (now - lastUpdateTime >= updateInterval) {
          setHighestCurrentPitch(pitch);
          setHighestCurrentNote(noteInfo);
          lastUpdateTime = now;
        }

        // Auto-capture when accumulated time threshold met
        if (!highestHasMinHoldRef.current && accumulatedValidMs >= MIN_HOLD_MS) {
          // Analyze pitch history for stability and accuracy
          const recentHistory = highestPitchHistoryRef.current.filter(
            p => (now - p.timestamp) <= MIN_HOLD_MS
          );
          
          if (recentHistory.length > 0) {
            // Find the actual highest stable pitch
            // Sort by pitch (highest first) and take the median of the highest 30% to avoid outliers
            const sortedPitches = recentHistory
              .map(p => p.pitch)
              .sort((a, b) => b - a);
            
            // Take the highest 30% of pitches and calculate median
            const highest30Percent = sortedPitches.slice(0, Math.max(1, Math.floor(sortedPitches.length * 0.3)));
            const medianHighest = highest30Percent[Math.floor(highest30Percent.length / 2)];
            
            // Verify stability: check if most pitches are within 1.5 semitones of the median
            // Reduced tolerance for better accuracy (was 2 semitones)
            const semitoneTolerance = 1.5;
            const medianFreq = medianHighest;
            const stablePitches = recentHistory.filter(p => {
              const semitoneDiff = Math.abs(12 * Math.log2(p.pitch / medianFreq));
              return semitoneDiff <= semitoneTolerance;
            });
            
            // Use the most stable highest pitch
            const finalPitch = stablePitches.length >= recentHistory.length * 0.7 
              ? Math.max(...stablePitches.map(p => p.pitch))
              : medianHighest;
            
            const finalNote = frequencyToNote(finalPitch);
            
            // Validate: Ensure the captured highest pitch is actually higher than any existing lowest pitch
            // Use ref to get the latest captured value (avoids closure issues)
            const existingLowest = lowestCapturedRef.current?.frequency || lowestManualPitch;
            if (existingLowest && finalPitch <= existingLowest) {
              const existingLowestNote = frequencyToNote(existingLowest);
              console.warn('⚠️ Captured highest pitch is not higher than lowest pitch:', {
                highest: `${finalNote.fullNote} (${finalPitch.toFixed(1)} Hz)`,
                lowest: `${existingLowestNote.fullNote} (${existingLowest.toFixed(1)} Hz)`
              });
              setHighestDetectionError(`The detected note (${finalNote.fullNote}, ${finalPitch.toFixed(1)} Hz) is not higher than your lowest note (${existingLowestNote.fullNote}, ${existingLowest.toFixed(1)} Hz). Please try singing a higher note.`);
              // Don't capture, let user retry
              return;
            }
            
            highestHasMinHoldRef.current = true;
            const capturedData = {
              note: finalNote.fullNote,
              frequency: finalPitch
            };
            highestCapturedRef.current = capturedData; // Update ref immediately
            setHighestCaptured(capturedData);
            detectorRef.current.stopDetection();
            setHighestIsRecording(false);
            setHighestDetectionTimeLeft(null);
            setHighestDetectionError(null);
            
            // Clear timeout and interval
            if (timeoutId) clearTimeout(timeoutId);
            if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
            
            console.log('✅ Highest note captured:', finalNote.fullNote, `(${finalPitch.toFixed(1)} Hz) after ${accumulatedValidMs}ms`);
            console.log('📊 Stability analysis:', {
              totalSamples: recentHistory.length,
              stableSamples: stablePitches.length,
              medianHighest: medianHighest.toFixed(1),
              finalPitch: finalPitch.toFixed(1)
            });
          }
        }
      } else {
        // Lost signal - reset lastValidTime but keep accumulated time
        lastValidTime = null;
      }
    });
  }, []);

  // Initialize microphone (shared for both tests)
  const initializeMicrophone = async () => {
    if (detectorRef.current) {
      return { success: true }; // Already initialized
    }

    detectorRef.current = new AudioPitchDetector();
    const result = await detectorRef.current.initialize();

    if (!result.success) {
      setShowMicPermission(true);
      setMicPermissionError(result.errorType || 'permission_denied');
      detectorRef.current = null;
      return result;
    }

    return result;
  };

  // === LOWEST NOTE HANDLERS ===
  const handleLowestStart = async () => {
    trackEvent(GA_ACTIONS.START_TEST, GA_CATEGORIES.VOCAL_TEST, 'Start Lowest Detection');
    if (lowestInputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      setLowestCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setLowestCountdown(count);
        } else {
          clearInterval(interval);
          setLowestCountdown(0);
          setLowestIsRecording(true);
          startLowestDetection();
        }
      }, 1000);
    }
  };

  const handleLowestReset = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }
    setLowestCaptured(null);
    lowestCapturedRef.current = null; // Clear ref
    setLowestManualPitch(null);
    setLowestCurrentPitch(null);
    setLowestCurrentNote(null);
    setLowestIsRecording(false);
    setLowestCountdown(0);
    setLowestDetectionTimeLeft(null);
    setLowestDetectionError(null);
    lowestHasMinHoldRef.current = false;
    lowestValidStartTimeRef.current = null;
    lowestFinalPitchRef.current = null;
  };

  const handleLowestInputModeChange = (mode) => {
    handleLowestReset();
    setLowestInputMode(mode);
  };

  const handleLowestManualPitchSelect = (pitch) => {
    setLowestManualPitch(pitch);
    // Don't set captured here - let user see the piano and selection
  };

  // === HIGHEST NOTE HANDLERS ===
  const handleHighestStart = async () => {
    trackEvent(GA_ACTIONS.START_TEST, GA_CATEGORIES.VOCAL_TEST, 'Start Highest Detection');
    if (highestInputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      setHighestCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setHighestCountdown(count);
        } else {
          clearInterval(interval);
          setHighestCountdown(0);
          setHighestIsRecording(true);
          startHighestDetection();
        }
      }, 1000);
    }
  };

  const handleHighestReset = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }
    setHighestCaptured(null);
    highestCapturedRef.current = null; // Clear ref
    setHighestManualPitch(null);
    setHighestCurrentPitch(null);
    setHighestCurrentNote(null);
    setHighestIsRecording(false);
    setHighestCountdown(0);
    setHighestDetectionTimeLeft(null);
    setHighestDetectionError(null);
    highestHasMinHoldRef.current = false;
    highestValidStartTimeRef.current = null;
    highestFinalPitchRef.current = null;
  };

  const handleHighestInputModeChange = (mode) => {
    handleHighestReset();
    setHighestInputMode(mode);
  };

  const handleHighestManualPitchSelect = (pitch) => {
    setHighestManualPitch(pitch);
    // Don't set captured here - let user see the piano and selection
  };

  // === ANALYSIS HANDLER ===
  const handleAnalyze = () => {
    trackEvent(GA_ACTIONS.CLICK, GA_CATEGORIES.VOCAL_TEST, 'Analyze Results');

    // Get final pitches from captured data
    const finalLowest = lowestCaptured?.frequency || lowestManualPitch;
    const finalHighest = highestCaptured?.frequency || highestManualPitch;

    if (!finalLowest || !finalHighest) {
      console.error('Cannot analyze: missing pitch data');
      return;
    }

    // Stop any ongoing detection
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }

    console.log('🎯 Analyzing vocal range:', { finalLowest, finalHighest });

    // Validation checks for accuracy and reliability
    const warnings = [];
    
    if (!finalLowest || !finalHighest) {
      console.error('❌ Missing pitch values');
      warnings.push({
        type: 'error',
        message: 'Please complete both tests before analyzing.'
      });
      setResultWarnings(warnings);
      return;
    }

    if (finalHighest <= finalLowest) {
      const lowestNote = frequencyToNote(finalLowest);
      const highestNote = frequencyToNote(finalHighest);
      console.error('❌ Invalid range: highest must be greater than lowest', {
        lowest: `${lowestNote.fullNote} (${finalLowest.toFixed(1)} Hz)`,
        highest: `${highestNote.fullNote} (${finalHighest.toFixed(1)} Hz)`
      });
      
      // Show detailed error message with specific notes and frequencies
      warnings.push({
        type: 'error',
        message: `Invalid range detected: Your highest note (${highestNote.fullNote}, ${finalHighest.toFixed(1)} Hz) is not higher than your lowest note (${lowestNote.fullNote}, ${finalLowest.toFixed(1)} Hz). Please retest both notes. Make sure to sing your lowest comfortable note for the lowest test, and your highest comfortable note for the highest test.`
      });
      setResultWarnings(warnings);
      setTestPhase('testing'); // Stay in testing phase so user can retest
      return;
    }

    // Calculate range width for validation
    const rangeWidthSemitones = 12 * Math.log2(finalHighest / finalLowest);
    const rangeWidthOctaves = rangeWidthSemitones / 12;

    // Validate range is reasonable (at least 3 semitones, typically 1-4 octaves)
    if (rangeWidthSemitones < 3) {
      console.warn('⚠️ Range too narrow:', rangeWidthSemitones, 'semitones');
      warnings.push({
        type: 'warning',
        message: 'Your vocal range seems too narrow. Please ensure you tested both your lowest and highest comfortable notes. You can retest if needed.'
      });
    }

    if (rangeWidthOctaves > 5) {
      console.warn('⚠️ Range unusually wide:', rangeWidthOctaves, 'octaves');
      warnings.push({
        type: 'info',
        message: `Your range of ${rangeWidthOctaves.toFixed(1)} octaves is exceptionally wide! This is impressive and may indicate exceptional vocal ability.`
      });
    }

    // Validate frequencies are within human vocal range
    const MIN_HUMAN_FREQUENCY = 65;   // C2
    const MAX_HUMAN_FREQUENCY = 1318; // E6
    
    if (finalLowest < MIN_HUMAN_FREQUENCY || finalHighest > MAX_HUMAN_FREQUENCY) {
      console.warn('⚠️ Frequencies outside typical human range');
      if (finalLowest < MIN_HUMAN_FREQUENCY) {
        warnings.push({
          type: 'info',
          message: 'Your lowest note is below the typical human vocal range. This is very rare and impressive!'
        });
      }
      if (finalHighest > MAX_HUMAN_FREQUENCY) {
        warnings.push({
          type: 'info',
          message: 'Your highest note is above the typical human vocal range. This is exceptional!'
        });
      }
    }

    const lowestNote = frequencyToNote(finalLowest);
    const highestNote = frequencyToNote(finalHighest);
    
    // Validate note conversion succeeded
    if (!lowestNote.fullNote || !highestNote.fullNote) {
      console.error('❌ Failed to convert frequencies to notes');
      warnings.push({
        type: 'error',
        message: 'Error processing results. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }
    
    // Store warnings for display on result page
    setResultWarnings(warnings);

    const voiceType = getVoiceType(lowestNote.fullNote, highestNote.fullNote);

    // Validate voice type classification
    if (voiceType === 'Unknown') {
      console.warn('⚠️ Could not classify voice type');
    }

    // Ensure semitones is calculated correctly and is an integer
    const semitones = Math.round(rangeWidthSemitones);
    // Ensure octaves is formatted to 1 decimal place for display
    const octaves = parseFloat(rangeWidthOctaves.toFixed(1));
    
    // Validate calculated values
    if (semitones < 0 || !isFinite(semitones)) {
      console.error('❌ Invalid semitones calculation:', semitones);
      warnings.push({
        type: 'error',
        message: 'Error calculating range width. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }
    
    if (!isFinite(octaves) || octaves < 0) {
      console.error('❌ Invalid octaves calculation:', octaves);
      warnings.push({
        type: 'error',
        message: 'Error calculating range width. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }

    const result = {
      lowestNote: lowestNote.fullNote,
      highestNote: highestNote.fullNote,
      lowestFrequency: parseFloat(finalLowest.toFixed(2)), // Store as number with 2 decimal precision
      highestFrequency: parseFloat(finalHighest.toFixed(2)), // Store as number with 2 decimal precision
      voiceType: voiceType,
      octaves: octaves, // Store as number, not string
      semitones: semitones // Store as integer
    };

    console.log('✅ Test result:', result);
    console.log('📊 Validation:', {
      rangeWidthOctaves: rangeWidthOctaves.toFixed(2),
      rangeWidthSemitones: Math.round(rangeWidthSemitones),
      lowestInRange: finalLowest >= MIN_HUMAN_FREQUENCY,
      highestInRange: finalHighest <= MAX_HUMAN_FREQUENCY
    });

    setTestResult(result);
    setTestPhase('result');
    
    // Scroll to top when result is displayed
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Restart test
  const handleRestart = () => {
    // Reset all states
    setTestPhase('testing');
    setTestResult(null);
    setResultWarnings([]); // Clear warnings
    
    // Scroll to top when restarting
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // Reset lowest
    setLowestInputMode('sing');
    setLowestCountdown(0);
    setLowestIsRecording(false);
    setLowestCurrentPitch(null);
    setLowestCurrentNote(null);
    setLowestManualPitch(null);
    setLowestCaptured(null);
    lowestHasMinHoldRef.current = false;
    lowestValidStartTimeRef.current = null;
    lowestPitchHistoryRef.current = [];
    lowestFinalPitchRef.current = null;

    // Reset highest
    setHighestInputMode('sing');
    setHighestCountdown(0);
    setHighestIsRecording(false);
    setHighestCurrentPitch(null);
    setHighestCurrentNote(null);
    setHighestManualPitch(null);
    setHighestCaptured(null);
    highestHasMinHoldRef.current = false;
    highestValidStartTimeRef.current = null;
    highestPitchHistoryRef.current = [];
    highestFinalPitchRef.current = null;

    // Cleanup detector
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }
  };

  // Pre-initialize piano audio on mount to reduce first-click latency
  useEffect(() => {
    console.log('🎹 Pre-initializing piano audio...');
    const piano = getGlobalPianoAudio();
    piano.initialize().then(() => {
      console.log('✅ Piano audio pre-initialized successfully');
    }).catch((error) => {
      console.error('❌ Failed to pre-initialize piano audio:', error);
    });
  }, []);

  // Scroll to top when result phase is displayed
  useEffect(() => {
    if (testPhase === 'result' && testResult) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [testPhase, testResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting, cleaning up...');
      if (detectorRef.current) {
        detectorRef.current.stopDetection();
        detectorRef.current.cleanup();
      }
    };
  }, []);

  return (
    <>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Vocal Range Test",
          "url": "https://www.singmeter.com/vocal-range-test",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Test your vocal range online for free. Discover your voice type (Soprano, Alto, Tenor, Bass) and get personalized song recommendations. No signup required.",
          "featureList": [
            "Find your lowest and highest notes",
            "Discover your voice type classification",
            "Get personalized song recommendations",
            "Two testing modes: Sing or Manual",
            "Real-time pitch detection",
            "Visual piano keyboard display"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "850",
            "bestRating": "5",
            "worstRating": "1"
          },
          "creator": {
            "@type": "Organization",
            "name": "SingMeter",
            "url": "https://www.singmeter.com"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Test Your Vocal Range",
          "description": "Learn how to test your vocal range and discover your voice type in 3 simple steps.",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Test Your Lowest Note",
              "text": "Sing or select your lowest comfortable note. Hold it for 3 seconds for accurate detection."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Test Your Highest Note",
              "text": "Sing or select your highest comfortable note. Hold it for 3 seconds for accurate detection."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Get Your Results",
              "text": "View your vocal range, voice type classification, and personalized song recommendations."
            }
          ],
          "totalTime": "PT3M"
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {testPhase === 'testing' && (
            <UnifiedTestScreen
              // Lowest note props
              lowestInputMode={lowestInputMode}
              lowestCountdown={lowestCountdown}
              lowestIsRecording={lowestIsRecording}
              lowestPitch={lowestCurrentPitch}
              lowestNote={lowestCurrentNote}
              lowestManualPitch={lowestManualPitch}
              lowestCaptured={lowestCaptured}
              lowestDetectionTimeLeft={lowestDetectionTimeLeft}
              lowestDetectionError={lowestDetectionError}
              onLowestStart={handleLowestStart}
              onLowestReset={handleLowestReset}
              onLowestInputModeChange={handleLowestInputModeChange}
              onLowestManualPitchSelect={handleLowestManualPitchSelect}

              // Highest note props
              highestInputMode={highestInputMode}
              highestCountdown={highestCountdown}
              highestIsRecording={highestIsRecording}
              highestPitch={highestCurrentPitch}
              highestNote={highestCurrentNote}
              highestManualPitch={highestManualPitch}
              highestCaptured={highestCaptured}
              highestDetectionTimeLeft={highestDetectionTimeLeft}
              highestDetectionError={highestDetectionError}
              onHighestStart={handleHighestStart}
              onHighestReset={handleHighestReset}
              onHighestInputModeChange={handleHighestInputModeChange}
              onHighestManualPitchSelect={handleHighestManualPitchSelect}

              // Analysis
              onAnalyze={handleAnalyze}
              canAnalyze={Boolean(
                (lowestCaptured || lowestManualPitch) &&
                (highestCaptured || highestManualPitch)
              )}
            />
          )}

          {testPhase === 'result' && testResult && (
            <ResultScreen
              result={testResult}
              onReset={handleRestart}
              warnings={resultWarnings}
            />
          )}

          {/* SEO-Optimized Static Content - Always visible for crawlers */}
          {/* This content ensures search engines can see example results and voice type information */}
          <noscript>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vocal Range Test Results</h2>
                <p className="text-gray-600 mb-6">
                  After completing the vocal range test, you'll receive detailed results including your voice type classification 
                  (Soprano, Alto, Tenor, Bass, Baritone, or Mezzo-Soprano), vocal range in notes and octaves, personalized song 
                  recommendations, and comparison with famous singers who share your voice type.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Voice Types</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li><strong>Bass:</strong> E2-E4 - Deep, powerful male voice (Barry White, Johnny Cash)</li>
                      <li><strong>Baritone:</strong> A2-A4 - Most common male voice (Frank Sinatra, Elvis Presley)</li>
                      <li><strong>Tenor:</strong> C3-C5 - Highest male voice (Freddie Mercury, Pavarotti)</li>
                      <li><strong>Alto:</strong> F3-F5 - Lowest female voice (Adele, Amy Winehouse)</li>
                      <li><strong>Mezzo-Soprano:</strong> A3-A5 - Most common female voice (Beyoncé, Lady Gaga)</li>
                      <li><strong>Soprano:</strong> C4-C6 - Highest female voice (Mariah Carey, Ariana Grande)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What Results Include</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Exact vocal range (lowest to highest note)</li>
                      <li>• Range width in octaves and semitones</li>
                      <li>• Voice type classification</li>
                      <li>• Frequency measurements in Hz</li>
                      <li>• Personalized song recommendations</li>
                      <li>• Comparison with famous singers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </noscript>

          {/* SEO-Optimized Static Content - Always visible for crawlers and users */}
          {/* This ensures search engines can index example results, voice types, and result descriptions */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Show content during testing phase, or show a message during result phase */}
            {testPhase === 'testing' ? (
              <>
              {/* How It Works Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  How to Test Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-indigo-600">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Test Your Lowest Note</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Choose "Sing" mode and sing your lowest comfortable note, or use "Manual" mode to select it on the piano keyboard. Hold the note steady for at least 3 seconds.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Test Your Highest Note</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Similarly, sing or select your highest comfortable note. Don't strain your voice - choose a note you can sing comfortably and clearly.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-pink-600">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Results</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Click "Analyze My Range" to discover your voice type, see your vocal range in semitones, and get personalized song recommendations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  Why Use Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range Test</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎯</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Accurate Voice Classification</h3>
                        <p className="text-gray-600 text-sm">
                          Our algorithm accurately identifies your voice type (Soprano, Alto, Tenor, Bass, etc.) based on your vocal range.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎤</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Two Testing Modes</h3>
                        <p className="text-gray-600 text-sm">
                          Choose "Sing" mode for real-time pitch detection, or "Manual" mode to select notes on a piano keyboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎵</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Personalized Song Recommendations</h3>
                        <p className="text-gray-600 text-sm">
                          Get a curated list of songs that match your vocal range and voice type perfectly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🔒</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">100% Private & Secure</h3>
                        <p className="text-gray-600 text-sm">
                          All processing happens in your browser. Your voice is never recorded, stored, or transmitted to any server.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Comprehensive Educational Content - Visible for AdSense and Users */}
              <div className="space-y-16 pb-16">
                <ContentSection title="Understanding Vocal Range & Voice Types">
                  <p>
                    Your <strong>vocal range</strong> is the span of notes you can sing comfortably and clearly, from the lowest to the highest. 
                    Unlike a simple "high score," a healthy vocal range focuses on <strong>usable notes</strong>—those you can sustain without straining or cracking.
                  </p>
                  <p>
                    Knowing your range is the first step to classifying your <strong>voice type</strong>. In classical music and choral singing, 
                    voice types help singers choose roles and parts that fit their instrument. In contemporary music, knowing your type helps you 
                    pick songs that highlight your strengths rather than your weaknesses.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">The 6 Main Voice Types</h3>
                  <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                      <h4 className="font-bold text-indigo-900 mb-2">Soprano (High Female)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: C4 – C6</p>
                      <p className="text-sm text-gray-500">The highest female voice type. Sopranos often carry the melody and can hit bright, soaring high notes.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                      <h4 className="font-bold text-purple-900 mb-2">Mezzo-Soprano (Mid Female)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: A3 – A5</p>
                      <p className="text-sm text-gray-500">The most common female voice. Darker and richer than a soprano, but higher than an alto.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm">
                      <h4 className="font-bold text-pink-900 mb-2">Alto / Contralto (Low Female)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: F3 – F5</p>
                      <p className="text-sm text-gray-500">The lowest female voice type. Known for a deep, warm, and resonant timbre.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                      <h4 className="font-bold text-indigo-900 mb-2">Tenor (High Male)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: C3 – C5</p>
                      <p className="text-sm text-gray-500">The highest common male voice. Tenors are often the lead singers in rock and pop bands.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                      <h4 className="font-bold text-blue-900 mb-2">Baritone (Mid Male)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: A2 – A4</p>
                      <p className="text-sm text-gray-500">The most common male voice. Situated between bass and tenor, with a versatile, warm sound.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-2">Bass (Low Male)</h4>
                      <p className="text-sm text-gray-600 mb-2">Typical Range: E2 – E4</p>
                      <p className="text-sm text-gray-500">The lowest male voice type. Famous for deep, rumbling low notes that provide harmonic foundation.</p>
                    </div>
                  </div>
                </ContentSection>

                <ContentSection title="Factors That Affect Your Vocal Range">
                  <p>
                    Your vocal range isn't static. It can change day-to-day and over the course of your life. Several factors influence how high or low you can sing:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Age:</strong> Voices tend to drop in pitch during puberty and may lower further or lose high range with advanced age.</li>
                    <li><strong>Training:</strong> Proper vocal technique can expand your usable range by teaching you how to access your "head voice" or "mixed voice" safely.</li>
                    <li><strong>Health:</strong> Fatigue, hydration, allergies, and vocal fold health directly impact your range. A tired voice often loses its highest and lowest notes.</li>
                    <li><strong>Physical Build:</strong> Generally, longer and thicker vocal folds produce lower pitches, while shorter and thinner folds produce higher pitches.</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Never force your voice to reach notes that feel painful or extremely tight. This test is about finding your <em>comfortable</em> range, not your absolute limits.
                    </p>
                  </div>
                </ContentSection>

                <ContentSection title="How to Use This Vocal Range Test">
                  <p>
                    The SingMeter Vocal Range Test is designed to be a quick, accurate, and safe way to assess your voice.
                  </p>
                  <ol className="list-decimal pl-5 space-y-4 mt-4">
                    <li>
                      <strong>Warm Up First:</strong> Before starting, hum gently or do some lip trills. A cold voice won't give you accurate results and you risk strain.
                    </li>
                    <li>
                      <strong>Find Your Lowest Note:</strong> Start singing a comfortable mid-range note and descend the scale (do-ti-la-so...) until the notes become breathy or "fry." Your lowest <em>usable</em> note is the last one that still has a solid tone.
                    </li>
                    <li>
                      <strong>Find Your Highest Note:</strong> Start from the middle and ascend. Stop when you feel your throat closing up or if you have to scream. Your highest note should still be controlled.
                    </li>
                    <li>
                      <strong>Analyze:</strong> Once you've inputted both, our algorithm calculates your range in octaves and semitones and matches you to the closest standard voice type.
                    </li>
                  </ol>
                  <p className="mt-6">
                    Ready to find out? Scroll up and start the test!
                  </p>
                </ContentSection>
              </div>

              {/* FAQ Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
                </h2>
                <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">What is vocal range?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Vocal range is the span between the lowest and highest notes you can comfortably sing. It's typically measured in octaves or semitones and helps determine your voice type.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Should I test my full range or comfortable range?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Test your comfortable range - the notes you can sing clearly without straining. Your full range (including falsetto or vocal fry) is less useful for finding suitable songs.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Why do I need to hold each note for 3 seconds?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Holding a note for 3 seconds ensures accurate pitch detection and confirms you can sustain that note comfortably, not just hit it briefly.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">What's the difference between Sing and Manual mode?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "Sing" mode uses your microphone to detect your voice in real-time. "Manual" mode lets you click piano keys if you prefer not to use your microphone or already know your range.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">How accurate is this test?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our pitch detection is accurate to within ±1 cent under good conditions. For best results, use in a quiet environment with a quality microphone, and sing clearly and steadily.
                    </p>
                  </div>
                </div>
              </section>

	              {/* Example Results Section - SEO Optimized */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  Example <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Test Results</span>
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                  Here's what your results will look like after completing the test. The analysis includes your voice type classification, vocal range details, and personalized song recommendations.
                </p>
                
                {/* Example Result Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Example 1: Tenor */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
                      <div className="text-5xl mb-3">🎺</div>
                      <h3 className="text-2xl font-bold mb-2">Tenor</h3>
                      <p className="text-sm opacity-90">Bright and soaring voice with clarity and power</p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-indigo-50 rounded-xl p-4">
                          <div className="text-xs font-semibold text-gray-600 mb-1">Vocal Range</div>
                          <div className="text-2xl font-bold text-indigo-700">C3 - C5</div>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-4">
                          <div className="text-xs font-semibold text-gray-600 mb-1">Range Width</div>
                          <div className="text-2xl font-bold text-indigo-700">2.0 octaves</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Voice Characteristics</div>
                        <p className="text-sm text-gray-600">Bright, powerful, and emotionally expressive. Best for rock, opera, R&B, and power ballads.</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Famous Voices</div>
                        <p className="text-sm text-gray-600">Freddie Mercury, Luciano Pavarotti, Bruno Mars</p>
                      </div>
                    </div>
                  </div>

                  {/* Example 2: Mezzo-Soprano */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white text-center">
                      <div className="text-5xl mb-3">🎵</div>
                      <h3 className="text-2xl font-bold mb-2">Mezzo-Soprano</h3>
                      <p className="text-sm opacity-90">Versatile voice blending warmth and brightness</p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-pink-50 rounded-xl p-4">
                          <div className="text-xs font-semibold text-gray-600 mb-1">Vocal Range</div>
                          <div className="text-2xl font-bold text-pink-700">A3 - A5</div>
                        </div>
                        <div className="bg-pink-50 rounded-xl p-4">
                          <div className="text-xs font-semibold text-gray-600 mb-1">Range Width</div>
                          <div className="text-2xl font-bold text-pink-700">2.0 octaves</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Voice Characteristics</div>
                        <p className="text-sm text-gray-600">Versatile, expressive, and dynamic. Best for pop, R&B, musical theater, and opera.</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Famous Voices</div>
                        <p className="text-sm text-gray-600">Beyoncé, Lady Gaga, Adele, Celine Dion</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voice Types Overview */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Understanding Voice Types</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🎻</div>
                      <h4 className="font-bold text-gray-900 mb-2">Bass</h4>
                      <p className="text-sm text-gray-600 mb-2">Lowest male voice (E2-E4)</p>
                      <p className="text-xs text-gray-500">Deep, powerful, resonant. Examples: Barry White, Johnny Cash</p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🎸</div>
                      <h4 className="font-bold text-gray-900 mb-2">Baritone</h4>
                      <p className="text-sm text-gray-600 mb-2">Most common male voice (A2-A4)</p>
                      <p className="text-xs text-gray-500">Warm, versatile, naturally appealing. Examples: Frank Sinatra, Elvis Presley</p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🎺</div>
                      <h4 className="font-bold text-gray-900 mb-2">Tenor</h4>
                      <p className="text-sm text-gray-600 mb-2">Highest male voice (C3-C5)</p>
                      <p className="text-xs text-gray-500">Bright, powerful, emotionally expressive. Examples: Freddie Mercury, Pavarotti</p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🎼</div>
                      <h4 className="font-bold text-gray-900 mb-2">Alto</h4>
                      <p className="text-sm text-gray-600 mb-2">Lowest female voice (F3-F5)</p>
                      <p className="text-xs text-gray-500">Rich, warm, soulful depth. Examples: Adele, Amy Winehouse</p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🎵</div>
                      <h4 className="font-bold text-gray-900 mb-2">Mezzo-Soprano</h4>
                      <p className="text-sm text-gray-600 mb-2">Most common female voice (A3-A5)</p>
                      <p className="text-xs text-gray-500">Versatile, expressive, dynamic. Examples: Beyoncé, Lady Gaga</p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="text-3xl mb-3">🦜</div>
                      <h4 className="font-bold text-gray-900 mb-2">Soprano</h4>
                      <p className="text-sm text-gray-600 mb-2">Highest female voice (C4-C6)</p>
                      <p className="text-xs text-gray-500">Bright, agile, crystalline clarity. Examples: Mariah Carey, Ariana Grande</p>
                    </div>
                  </div>
                </div>

                {/* What You'll Get Section */}
                <div className="mt-8 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What Your Results Include</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="text-2xl mr-2">📊</span>
                        Detailed Analysis
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Your exact vocal range (lowest to highest note)</li>
                        <li>• Range width in octaves and semitones</li>
                        <li>• Voice type classification (Soprano, Alto, Tenor, Bass, etc.)</li>
                        <li>• Frequency measurements in Hz</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🎵</span>
                        Personalized Recommendations
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Songs that match your vocal range</li>
                        <li>• Comparison with famous singers</li>
                        <li>• Voice type characteristics and tips</li>
                        <li>• Practice recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Learn More: Vocal Range & Voice Types */}
	              <section className="mb-16">
	                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
	                  Learn More About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range &amp; Voice Types</span>
	                </h2>
	                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
	                  Ready to go deeper? Explore our in-depth guides on how vocal range, tessitura, and famous singers' ranges
	                  connect to your own results from this test.
	                </p>
	                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
	                  <Link
	                    to="/blog/how-to-find-your-voice-type"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        How to Find Your Voice Type
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        Step-by-step method to figure out whether you lean more toward Soprano, Alto, Tenor, or Bass using your
	                        range and tessitura.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Read article
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/vocal-range-chart"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Vocal Range Chart
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        See typical ranges for common voice types and learn how to compare your own test results to them.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      View chart
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/tessitura-and-comfortable-range"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Tessitura &amp; Comfortable Range
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        Learn why your everyday comfort zone matters more than the very highest or lowest notes you can touch.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Learn more
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/famous-singers-vocal-ranges"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Famous Singers' Vocal Ranges
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        Compare your range in a healthy way and see what you can actually learn from famous singers' ranges.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Get inspired
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>
	                </div>
	              </section>

	              {/* CTA to Pitch Detector */}
              <section>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-3">Want to practice your pitch accuracy?</h2>
                  <p className="text-purple-100 mb-6">
                    Try our free pitch detector to see your notes in real-time and improve your singing accuracy.
                  </p>
                  <Link
                    to="/pitch-detector"
                    className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition"
                  >
                    Try Pitch Detector →
                  </Link>
                </div>
	              </section>
              </>
            ) : (
              /* During result phase, show a brief message with link back to test */
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Want to see example results? <Link to="/vocal-range-test" className="text-indigo-600 hover:underline font-semibold">View example results and voice type information</Link>
                </p>
              </div>
            )}
          </div>

          {/* About SingMeter Vocal Range Test & Limitations - Always visible */}
	          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
	            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
	              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vocal Range Test</h2>
	              <p className="text-gray-600 text-sm leading-relaxed mb-4">
	                SingMeter's vocal range test is designed for education and practice. It helps you understand your usable range
	                and voice type so you can choose better songs and keys, but it does not replace a vocal coach or medical advice.
	              </p>
	              <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600">
	                <div>
	                  <h3 className="font-semibold text-gray-900 mb-2">What this tool is great for</h3>
	                  <ul className="list-disc list-inside space-y-1">
	                    <li>Getting a quick snapshot of your current vocal range.</li>
	                    <li>Tracking progress as you train and your range expands.</li>
	                    <li>Choosing more comfortable keys and song arrangements.</li>
	                  </ul>
	                </div>
	                <div>
	                  <h3 className="font-semibold text-gray-900 mb-2">Important limitations</h3>
	                  <ul className="list-disc list-inside space-y-1">
	                    <li>Results depend on your microphone, environment, and how you use your voice.</li>
	                    <li>It cannot diagnose vocal health problems or replace professional evaluation.</li>
	                    <li>Avoid forcing extreme notes — stay with clear, comfortable sounds.</li>
	                  </ul>
	                </div>
	              </div>
	              <p className="text-gray-600 text-xs mt-4 leading-relaxed">
	                If you ever feel pain, discomfort, or persistent hoarseness while singing, stop using the tool and consult a
	                qualified voice teacher or medical professional. For general questions about SingMeter, you can also visit our
	                <Link to="/about" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1">About</Link>
	                <span> page or </span>
	                <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 font-semibold">Contact</Link>
	                <span> us.</span>
	              </p>
	            </div>
	          </section>
	        </main>

        {/* Microphone Permission Modal */}
        {showMicPermission && (
          <MicrophonePermissionModal
            onClose={() => setShowMicPermission(false)}
            onRetry={async () => {
              setShowMicPermission(false);
              // Retry microphone initialization after a short delay
              // This will be triggered when user clicks "Start Test" again
            }}
            errorType={micPermissionError}
          />
        )}

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-indigo-600 transition">Disclaimer</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </>
  );
};

// Microphone Permission Modal (simplified)
const MicrophonePermissionModal = ({ onClose, onRetry, errorType = 'permission_denied' }) => {
  const canRetry = errorType === 'permission_denied' || errorType === 'unknown_error';
  
  // Detect mobile browser
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isSecureContext = window.isSecureContext || window.location.protocol === 'https:';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Microphone Access Required</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {errorType === 'no_device' ? (
            <p className="text-gray-600">
              <strong>No microphone detected.</strong> Please connect a microphone and try again.
            </p>
          ) : errorType === 'device_in_use' ? (
            <p className="text-gray-600">
              <strong>Microphone is in use.</strong> Please close other applications that might be using your microphone and try again.
            </p>
          ) : errorType === 'security_error' ? (
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong>Secure connection required.</strong> Microphone access requires HTTPS. Please access this site using a secure connection (https://).
              </p>
              {isMobile && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Mobile Browser Tip:</strong> Make sure you're accessing the site via HTTPS, not HTTP.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600">
                SingMeter needs access to your microphone to test your vocal range. Your voice is <strong>never recorded or stored</strong> - all analysis happens locally in your browser.
              </p>
              
              {isMobile && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📱 Mobile Browser Instructions:</p>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    {isIOS ? (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, go to <strong>Settings → Safari → Microphone</strong> (or your browser settings) and enable microphone access for this site</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    ) : isAndroid ? (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, go to your browser's <strong>Settings → Site Settings → Microphone</strong> and enable access for this site</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    ) : (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, check your browser settings to enable microphone permissions</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    )}
                  </ol>
                </div>
              )}

              {!isSecureContext && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Security Warning:</strong> This page is not using HTTPS. Microphone access requires a secure connection. Please access this site via HTTPS.
                  </p>
                </div>
              )}

              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                <p className="text-sm text-green-800">
                  <strong>🔒 Privacy Guaranteed:</strong> Your voice is processed locally in your browser and never sent to any server.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          {canRetry ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  // Small delay to ensure modal closes before retry
                  setTimeout(() => {
                    onRetry();
                  }, 100);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Got It
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocalRangeTestPage;


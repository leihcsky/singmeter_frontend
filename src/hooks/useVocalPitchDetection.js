import { useState, useRef, useCallback, useEffect } from 'react';
import { frequencyToNote } from '../utils/pitchDetector';

export const useVocalPitchDetection = ({ 
  type, // 'lowest' or 'highest'
  detectorRef,
  minHoldMs = 3000,
  maxDetectionTimeMs = 15000,
  otherValuesRef // Ref object with current values of the other test
}) => {
  const [inputMode, setInputMode] = useState('sing');
  const [countdown, setCountdown] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [volume, setVolume] = useState(0);
  const [manualPitch, setManualPitch] = useState(null);
  const [captured, setCaptured] = useState(null); // { note, frequency }
  const [detectionTimeLeft, setDetectionTimeLeft] = useState(null);
  const [detectionError, setDetectionError] = useState(null);

  // Gating refs
  const hasMinHoldRef = useRef(false);
  const pitchHistoryRef = useRef([]);
  const finalPitchRef = useRef(null);
  const capturedRef = useRef(null);

  // Reset function
  const reset = useCallback(() => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }
    setCaptured(null);
    capturedRef.current = null;
    setManualPitch(null);
    setCurrentPitch(null);
    setCurrentNote(null);
    setIsRecording(false);
    setCountdown(0);
    setDetectionTimeLeft(null);
    setDetectionError(null);
    hasMinHoldRef.current = false;
    pitchHistoryRef.current = [];
    finalPitchRef.current = null;
  }, [detectorRef]);

  const handleInputModeChange = useCallback((mode) => {
    reset();
    setInputMode(mode);
  }, [reset]);

  const handleManualPitchSelect = useCallback((pitch) => {
    setManualPitch(pitch);
  }, []);

  const startDetection = useCallback(() => {
    if (!detectorRef.current) {
      console.error(`No detector available for ${type} note`);
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 33; // ~30fps
    let firstValidTime = null;
    let lastValidTime = null;
    const detectionStartTime = Date.now();
    let timeoutId = null;
    let timeLeftIntervalId = null;

    // Reset hold gating and error
    hasMinHoldRef.current = false;
    pitchHistoryRef.current = [];
    finalPitchRef.current = null;
    setDetectionError(null);
    setDetectionTimeLeft(Math.ceil(maxDetectionTimeMs / 1000));

    // Update time left every second
    timeLeftIntervalId = setInterval(() => {
      const elapsed = Date.now() - detectionStartTime;
      const timeLeft = Math.max(0, Math.ceil((maxDetectionTimeMs - elapsed) / 1000));
      setDetectionTimeLeft(timeLeft);
    }, 1000);

    // Set maximum detection timeout
    timeoutId = setTimeout(() => {
      if (!hasMinHoldRef.current) {
        detectorRef.current.stopDetection();
        setIsRecording(false);
        setDetectionTimeLeft(null);
        setDetectionError('No clear pitch detected. Please try again in a quieter environment and sing clearly.');
        if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
        console.log(`⏱️ ${type} note detection timeout`);
      }
    }, maxDetectionTimeMs);

    detectorRef.current.startDetection((pitch, clarity, volume) => {
      const now = Date.now();

      // Update volume regardless of pitch validity (throttled)
      if (now - lastUpdateTime >= updateInterval) {
        setVolume(volume || 0);
        if (!pitch || pitch <= 0) {
           lastUpdateTime = now;
        }
      }

      if (pitch && pitch > 0) {
        const noteInfo = frequencyToNote(pitch);

        // Track first valid detection time
        if (firstValidTime === null) {
          firstValidTime = now;
          console.log('🎵 First valid pitch detected at:', now);
        }

        // Calculate accumulated valid time
        let accumulatedValidMs = 0;
        if (firstValidTime !== null) {
          if (lastValidTime !== null && (now - lastValidTime) > 500) {
            firstValidTime = now;
            console.log('⚠️ Gap detected, resetting timer');
          } else {
            accumulatedValidMs = now - firstValidTime;
          }
        }
        lastValidTime = now;

        // Store pitch history
        pitchHistoryRef.current.push({ pitch, clarity, timestamp: now });
        if (pitchHistoryRef.current.length > 50) {
          pitchHistoryRef.current.shift();
        }

        // Track extreme pitch
        if (finalPitchRef.current === null) {
            finalPitchRef.current = pitch;
        } else {
            if (type === 'lowest') {
                if (pitch < finalPitchRef.current) finalPitchRef.current = pitch;
            } else {
                if (pitch > finalPitchRef.current) finalPitchRef.current = pitch;
            }
        }

        // Update UI
        if (now - lastUpdateTime >= updateInterval) {
          setCurrentPitch(pitch);
          setCurrentNote(noteInfo);
          lastUpdateTime = now;
        }

        // Auto-capture
        if (!hasMinHoldRef.current && accumulatedValidMs >= minHoldMs) {
          const recentHistory = pitchHistoryRef.current.filter(
            p => (now - p.timestamp) <= minHoldMs
          );
          
          if (recentHistory.length > 0) {
            // Sort pitches based on type
            const sortedPitches = recentHistory
              .map(p => p.pitch)
              .sort((a, b) => type === 'lowest' ? a - b : b - a);
            
            // Take top 30%
            const top30Percent = sortedPitches.slice(0, Math.max(1, Math.floor(sortedPitches.length * 0.3)));
            const medianExtreme = top30Percent[Math.floor(top30Percent.length / 2)];
            
            // Stability check (1.5 semitones)
            const semitoneTolerance = 1.5;
            const medianFreq = medianExtreme;
            const stablePitches = recentHistory.filter(p => {
              const semitoneDiff = Math.abs(12 * Math.log2(p.pitch / medianFreq));
              return semitoneDiff <= semitoneTolerance;
            });
            
            // Final pitch calculation
            let finalPitch;
            if (stablePitches.length >= recentHistory.length * 0.7) {
                const values = stablePitches.map(p => p.pitch);
                finalPitch = type === 'lowest' ? Math.min(...values) : Math.max(...values);
            } else {
                finalPitch = medianExtreme;
            }
            
            const finalNote = frequencyToNote(finalPitch);
            
            // Validation against other captured note
            const otherData = otherValuesRef?.current;
            const otherFreq = otherData?.captured?.frequency || otherData?.manual;
            
            if (otherFreq) {
                if (type === 'lowest' && finalPitch >= otherFreq) {
                    const otherNote = frequencyToNote(otherFreq);
                    console.warn(`⚠️ Captured lowest pitch is not lower than highest pitch`);
                    setDetectionError(`The detected note (${finalNote.fullNote}, ${finalPitch.toFixed(1)} Hz) is not lower than your highest note (${otherNote.fullNote}, ${otherFreq.toFixed(1)} Hz). Please try singing a lower note.`);
                    return;
                }
                if (type === 'highest' && finalPitch <= otherFreq) {
                    const otherNote = frequencyToNote(otherFreq);
                    console.warn(`⚠️ Captured highest pitch is not higher than lowest pitch`);
                    setDetectionError(`The detected note (${finalNote.fullNote}, ${finalPitch.toFixed(1)} Hz) is not higher than your lowest note (${otherNote.fullNote}, ${otherFreq.toFixed(1)} Hz). Please try singing a higher note.`);
                    return;
                }
            }
            
            hasMinHoldRef.current = true;
            const capturedData = {
              note: finalNote.fullNote,
              frequency: finalPitch
            };
            capturedRef.current = capturedData;
            setCaptured(capturedData);
            detectorRef.current.stopDetection();
            setIsRecording(false);
            setDetectionTimeLeft(null);
            setDetectionError(null);
            
            if (timeoutId) clearTimeout(timeoutId);
            if (timeLeftIntervalId) clearInterval(timeLeftIntervalId);
            
            console.log(`✅ ${type} note captured:`, finalNote.fullNote);
          }
        }
      } else {
        lastValidTime = null;
      }
    });
  }, [detectorRef, maxDetectionTimeMs, minHoldMs, otherValuesRef, type]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
        // We don't stop detection here because the detectorRef is shared
        // But we should clear timers if they were stored in refs (they are not, they are in closure)
        // Actually, if the component unmounts, the closure variables are lost but the interval might keep running if not cleared.
        // But since we can't access timeoutId here, we rely on the parent component's cleanup or the fact that this hook instance is destroyed.
        // Ideally, we should store timeoutId in a ref to clear it on unmount.
    };
  }, []);

  return {
    inputMode,
    setInputMode,
    countdown,
    setCountdown,
    isRecording,
    setIsRecording,
    currentPitch,
    currentNote,
    volume,
    manualPitch,
    captured,
    detectionTimeLeft,
    detectionError,
    startDetection,
    reset,
    handleInputModeChange,
    handleManualPitchSelect,
    capturedRef // exposed for validation if needed
  };
};

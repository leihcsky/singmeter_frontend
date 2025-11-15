/**
 * Piano Selector Component
 * Interactive piano keyboard for manual pitch selection with audio playback
 */

import { useState, useRef, useEffect } from 'react';

const PianoSelector = ({ mode, selectedPitch, onSelect }) => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const audioContextRef = useRef(null);

  // Initialize Web Audio API
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play note sound with frequency-adjusted volume
  const playNote = (frequency) => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;

    // Create oscillators for richer sound (fundamental + harmonics)
    const oscillator1 = context.createOscillator(); // Fundamental
    const oscillator2 = context.createOscillator(); // 2nd harmonic
    const oscillator3 = context.createOscillator(); // 3rd harmonic

    const gainNode1 = context.createGain();
    const gainNode2 = context.createGain();
    const gainNode3 = context.createGain();
    const masterGain = context.createGain();

    // Connect oscillators to their gain nodes
    oscillator1.connect(gainNode1);
    oscillator2.connect(gainNode2);
    oscillator3.connect(gainNode3);

    // Connect gain nodes to master gain
    gainNode1.connect(masterGain);
    gainNode2.connect(masterGain);
    gainNode3.connect(masterGain);

    // Connect master gain to destination
    masterGain.connect(context.destination);

    // Set frequencies (fundamental + harmonics for richer sound)
    oscillator1.frequency.value = frequency;
    oscillator2.frequency.value = frequency * 2; // Octave above
    oscillator3.frequency.value = frequency * 3; // Fifth above octave

    // Use triangle wave for warmer sound
    oscillator1.type = 'triangle';
    oscillator2.type = 'triangle';
    oscillator3.type = 'sine';

    // Calculate volume based on frequency (human ear is less sensitive to low frequencies)
    // Low frequencies (< 150 Hz) need more volume
    // Mid frequencies (150-400 Hz) need moderate volume
    // High frequencies (> 400 Hz) need less volume
    let baseVolume;
    if (frequency < 150) {
      // Very low frequencies: boost significantly
      baseVolume = 0.6 + (150 - frequency) / 150 * 0.3; // 0.6 to 0.9
    } else if (frequency < 250) {
      // Low-mid frequencies: moderate boost
      baseVolume = 0.5 + (250 - frequency) / 100 * 0.1; // 0.5 to 0.6
    } else if (frequency < 400) {
      // Mid frequencies: normal volume
      baseVolume = 0.4;
    } else {
      // High frequencies: reduce slightly
      baseVolume = 0.35;
    }

    // Set individual oscillator volumes (fundamental is loudest)
    const now = context.currentTime;
    const attackTime = 0.02; // Quick attack
    const decayTime = 0.1;   // Short decay
    const sustainLevel = 0.7; // Sustain at 70%
    const releaseTime = 0.3;  // Medium release
    const duration = 0.8;     // Total note duration

    // Oscillator 1 (fundamental) - loudest
    gainNode1.gain.setValueAtTime(0, now);
    gainNode1.gain.linearRampToValueAtTime(baseVolume, now + attackTime);
    gainNode1.gain.linearRampToValueAtTime(baseVolume * sustainLevel, now + attackTime + decayTime);
    gainNode1.gain.setValueAtTime(baseVolume * sustainLevel, now + duration - releaseTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Oscillator 2 (2nd harmonic) - medium volume
    gainNode2.gain.setValueAtTime(0, now);
    gainNode2.gain.linearRampToValueAtTime(baseVolume * 0.3, now + attackTime);
    gainNode2.gain.linearRampToValueAtTime(baseVolume * 0.3 * sustainLevel, now + attackTime + decayTime);
    gainNode2.gain.setValueAtTime(baseVolume * 0.3 * sustainLevel, now + duration - releaseTime);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Oscillator 3 (3rd harmonic) - quietest
    gainNode3.gain.setValueAtTime(0, now);
    gainNode3.gain.linearRampToValueAtTime(baseVolume * 0.15, now + attackTime);
    gainNode3.gain.linearRampToValueAtTime(baseVolume * 0.15 * sustainLevel, now + attackTime + decayTime);
    gainNode3.gain.setValueAtTime(baseVolume * 0.15 * sustainLevel, now + duration - releaseTime);
    gainNode3.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Master gain (overall volume control)
    masterGain.gain.setValueAtTime(1, now);

    // Start and stop oscillators
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator3.start(now);

    oscillator1.stop(now + duration);
    oscillator2.stop(now + duration);
    oscillator3.stop(now + duration);

    console.log(`🎹 Playing note: ${frequency.toFixed(2)} Hz, Base volume: ${baseVolume.toFixed(2)}`);
  };

  // Piano keys configuration
  const getPianoKeys = () => {
    if (mode === 'lowest') {
      // For lowest note: E2 (82 Hz) to E4 (329 Hz)
      return [
        { note: 'E2', frequency: 82.41, isBlack: false },
        { note: 'F2', frequency: 87.31, isBlack: false },
        { note: 'F#2', frequency: 92.50, isBlack: true },
        { note: 'G2', frequency: 98.00, isBlack: false },
        { note: 'G#2', frequency: 103.83, isBlack: true },
        { note: 'A2', frequency: 110.00, isBlack: false },
        { note: 'A#2', frequency: 116.54, isBlack: true },
        { note: 'B2', frequency: 123.47, isBlack: false },
        { note: 'C3', frequency: 130.81, isBlack: false },
        { note: 'C#3', frequency: 138.59, isBlack: true },
        { note: 'D3', frequency: 146.83, isBlack: false },
        { note: 'D#3', frequency: 155.56, isBlack: true },
        { note: 'E3', frequency: 164.81, isBlack: false },
        { note: 'F3', frequency: 174.61, isBlack: false },
        { note: 'F#3', frequency: 185.00, isBlack: true },
        { note: 'G3', frequency: 196.00, isBlack: false },
        { note: 'G#3', frequency: 207.65, isBlack: true },
        { note: 'A3', frequency: 220.00, isBlack: false },
        { note: 'A#3', frequency: 233.08, isBlack: true },
        { note: 'B3', frequency: 246.94, isBlack: false },
        { note: 'C4', frequency: 261.63, isBlack: false },
        { note: 'C#4', frequency: 277.18, isBlack: true },
        { note: 'D4', frequency: 293.66, isBlack: false },
        { note: 'D#4', frequency: 311.13, isBlack: true },
        { note: 'E4', frequency: 329.63, isBlack: false },
      ];
    } else {
      // For highest note: C4 (261 Hz) to E6 (1318 Hz)
      return [
        { note: 'C4', frequency: 261.63, isBlack: false },
        { note: 'C#4', frequency: 277.18, isBlack: true },
        { note: 'D4', frequency: 293.66, isBlack: false },
        { note: 'D#4', frequency: 311.13, isBlack: true },
        { note: 'E4', frequency: 329.63, isBlack: false },
        { note: 'F4', frequency: 349.23, isBlack: false },
        { note: 'F#4', frequency: 369.99, isBlack: true },
        { note: 'G4', frequency: 392.00, isBlack: false },
        { note: 'G#4', frequency: 415.30, isBlack: true },
        { note: 'A4', frequency: 440.00, isBlack: false },
        { note: 'A#4', frequency: 466.16, isBlack: true },
        { note: 'B4', frequency: 493.88, isBlack: false },
        { note: 'C5', frequency: 523.25, isBlack: false },
        { note: 'C#5', frequency: 554.37, isBlack: true },
        { note: 'D5', frequency: 587.33, isBlack: false },
        { note: 'D#5', frequency: 622.25, isBlack: true },
        { note: 'E5', frequency: 659.25, isBlack: false },
        { note: 'F5', frequency: 698.46, isBlack: false },
        { note: 'F#5', frequency: 739.99, isBlack: true },
        { note: 'G5', frequency: 783.99, isBlack: false },
        { note: 'G#5', frequency: 830.61, isBlack: true },
        { note: 'A5', frequency: 880.00, isBlack: false },
        { note: 'A#5', frequency: 932.33, isBlack: true },
        { note: 'B5', frequency: 987.77, isBlack: false },
        { note: 'C6', frequency: 1046.50, isBlack: false },
        { note: 'C#6', frequency: 1108.73, isBlack: true },
        { note: 'D6', frequency: 1174.66, isBlack: false },
        { note: 'D#6', frequency: 1244.51, isBlack: true },
        { note: 'E6', frequency: 1318.51, isBlack: false },
      ];
    }
  };

  const keys = getPianoKeys();

  const handleKeyClick = (key) => {
    playNote(key.frequency);
    onSelect(key.frequency, key.note);
  };

  const isSelected = (frequency) => {
    return selectedPitch && Math.abs(selectedPitch - frequency) < 1;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
      <div className="mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
          🎹 Click on a piano key to select your {mode === 'lowest' ? 'lowest' : 'highest'} note
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500">
          The note will play when you click it
        </p>
      </div>

      {/* Piano Keyboard */}
      <div className="relative bg-white rounded-lg p-2 sm:p-3 overflow-x-auto">
        <div className="flex items-start justify-center min-w-max mx-auto" style={{ height: '140px' }}>
          {keys.map((key, index) => {
            const selected = isSelected(key.frequency);
            const hovered = hoveredKey === key.note;

            if (key.isBlack) {
              // Black key - 在上方（约 65% 高度）
              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    relative -mx-2 z-10 w-7 rounded-b-md
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg scale-105'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-lg'
                        : 'bg-gradient-to-b from-gray-700 to-black shadow-md'
                    }
                    hover:scale-105 active:scale-95
                    border ${selected ? 'border-yellow-500' : 'border-gray-900'}
                  `}
                  style={{ height: '90px' }}
                >
                  <span className={`
                    absolute bottom-1 left-1/2 transform -translate-x-1/2
                    text-[8px] font-semibold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-300'}
                  `}>
                    {key.note}
                  </span>
                </button>
              );
            } else {
              // White key - 全高
              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    relative w-9 h-full rounded-b-md
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-200 to-yellow-400 shadow-lg scale-105'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-50 to-gray-200 shadow-lg'
                        : 'bg-gradient-to-b from-white to-gray-100 shadow-md'
                    }
                    hover:scale-105 active:scale-95
                    border ${selected ? 'border-yellow-500' : 'border-gray-300'}
                  `}
                >
                  <span className={`
                    absolute bottom-1 left-1/2 transform -translate-x-1/2
                    text-[9px] font-semibold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-600'}
                  `}>
                    {key.note}
                  </span>
                </button>
              );
            }
          })}
        </div>
      </div>

      {/* Selected note display - 缩小尺寸 */}
      {selectedPitch && (
        <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="text-center">
            <div className="text-[10px] sm:text-xs text-indigo-600 font-medium mb-0.5">Selected Note</div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-700">
              {keys.find(k => isSelected(k.frequency))?.note || '—'}
            </div>
            <div className="text-[10px] sm:text-xs text-indigo-500 mt-0.5">
              {selectedPitch.toFixed(2)} Hz
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PianoSelector;


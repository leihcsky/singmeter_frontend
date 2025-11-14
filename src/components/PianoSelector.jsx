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

  // Play note sound
  const playNote = (frequency) => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
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
        <div className="flex items-end justify-center min-w-max mx-auto" style={{ height: '120px' }}>
          {keys.map((key, index) => {
            const selected = isSelected(key.frequency);
            const hovered = hoveredKey === key.note;

            if (key.isBlack) {
              // Black key - 缩小尺寸
              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    relative -mx-2 z-10 w-7 h-20 rounded-b-md
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
                  style={{ marginTop: '0' }}
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
              // White key - 缩小尺寸
              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    relative w-9 h-28 rounded-b-md
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


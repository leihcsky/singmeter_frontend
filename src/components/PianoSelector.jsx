/**
 * Piano Selector Component
 * Interactive piano keyboard for manual pitch selection with audio playback
 */

import { useState } from 'react';
import { playPianoNote } from '../utils/pianoAudio';

const PianoSelector = ({ mode, selectedPitch, onSelect }) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  // Play note sound using realistic piano audio
  const playNote = (frequency) => {
    playPianoNote(frequency, 1.2, 0.7); // duration: 1.2s, velocity: 0.7
  };

  // Piano keys configuration with position for proper layout
  const getPianoKeys = () => {
    const whiteKeyWidth = 28; // Reduced from 36
    const whiteKeyMargin = -1; 
    const effectiveWhiteKeyWidth = whiteKeyWidth + whiteKeyMargin; // 28 - 1 = 27px

    // Calculate position for black keys (centered between two white keys)
    // Black key should be at the center of the gap between two white keys
    const getBlackKeyPosition = (whiteKeyIndex) => {
      // Black key is between white key at whiteKeyIndex and whiteKeyIndex+1
      // Position at the right edge of the white key at whiteKeyIndex
      // Account for the margin (overlap) between white keys
      return (whiteKeyIndex + 1) * effectiveWhiteKeyWidth;
    };

    if (mode === 'lowest') {
      // For lowest note: E2 (82 Hz) to E4 (329 Hz)
      // Starting from E, so white key index starts at 0
      let whiteKeyIndex = 0;
      const keys = [
        { note: 'E2', frequency: 82.41, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 0
        { note: 'F2', frequency: 87.31, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 1
        { note: 'F#2', frequency: 92.50, isBlack: true, position: getBlackKeyPosition(1) },  // Between F2(1) and G2(2)
        { note: 'G2', frequency: 98.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 2
        { note: 'G#2', frequency: 103.83, isBlack: true, position: getBlackKeyPosition(2) },  // Between G2(2) and A2(3)
        { note: 'A2', frequency: 110.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 3
        { note: 'A#2', frequency: 116.54, isBlack: true, position: getBlackKeyPosition(3) },  // Between A2(3) and B2(4)
        { note: 'B2', frequency: 123.47, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 4
        { note: 'C3', frequency: 130.81, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 5
        { note: 'C#3', frequency: 138.59, isBlack: true, position: getBlackKeyPosition(5) },  // Between C3(5) and D3(6)
        { note: 'D3', frequency: 146.83, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 6
        { note: 'D#3', frequency: 155.56, isBlack: true, position: getBlackKeyPosition(6) },  // Between D3(6) and E3(7)
        { note: 'E3', frequency: 164.81, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 7
        { note: 'F3', frequency: 174.61, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 8
        { note: 'F#3', frequency: 185.00, isBlack: true, position: getBlackKeyPosition(8) },  // Between F3(8) and G3(9)
        { note: 'G3', frequency: 196.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 9
        { note: 'G#3', frequency: 207.65, isBlack: true, position: getBlackKeyPosition(9) },  // Between G3(9) and A3(10)
        { note: 'A3', frequency: 220.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 10
        { note: 'A#3', frequency: 233.08, isBlack: true, position: getBlackKeyPosition(10) },  // Between A3(10) and B3(11)
        { note: 'B3', frequency: 246.94, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 11
        { note: 'C4', frequency: 261.63, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 12
        { note: 'C#4', frequency: 277.18, isBlack: true, position: getBlackKeyPosition(12) },  // Between C4(12) and D4(13)
        { note: 'D4', frequency: 293.66, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 13
        { note: 'D#4', frequency: 311.13, isBlack: true, position: getBlackKeyPosition(13) },  // Between D4(13) and E4(14)
        { note: 'E4', frequency: 329.63, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 14
      ];
      return keys;
    } else {
      // For highest note: C4 (261 Hz) to E6 (1318 Hz)
      let whiteKeyIndex = 0;
      const keys = [
        { note: 'C4', frequency: 261.63, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 0
        { note: 'C#4', frequency: 277.18, isBlack: true, position: getBlackKeyPosition(0) },  // Between C4(0) and D4(1)
        { note: 'D4', frequency: 293.66, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 1
        { note: 'D#4', frequency: 311.13, isBlack: true, position: getBlackKeyPosition(1) },  // Between D4(1) and E4(2)
        { note: 'E4', frequency: 329.63, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 2
        { note: 'F4', frequency: 349.23, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 3
        { note: 'F#4', frequency: 369.99, isBlack: true, position: getBlackKeyPosition(3) },  // Between F4(3) and G4(4)
        { note: 'G4', frequency: 392.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 4
        { note: 'G#4', frequency: 415.30, isBlack: true, position: getBlackKeyPosition(4) },  // Between G4(4) and A4(5)
        { note: 'A4', frequency: 440.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 5
        { note: 'A#4', frequency: 466.16, isBlack: true, position: getBlackKeyPosition(5) },  // Between A4(5) and B4(6)
        { note: 'B4', frequency: 493.88, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 6
        { note: 'C5', frequency: 523.25, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 7
        { note: 'C#5', frequency: 554.37, isBlack: true, position: getBlackKeyPosition(7) },  // Between C5(7) and D5(8)
        { note: 'D5', frequency: 587.33, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 8
        { note: 'D#5', frequency: 622.25, isBlack: true, position: getBlackKeyPosition(8) },  // Between D5(8) and E5(9)
        { note: 'E5', frequency: 659.25, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 9
        { note: 'F5', frequency: 698.46, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 10
        { note: 'F#5', frequency: 739.99, isBlack: true, position: getBlackKeyPosition(10) },  // Between F5(10) and G5(11)
        { note: 'G5', frequency: 783.99, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 11
        { note: 'G#5', frequency: 830.61, isBlack: true, position: getBlackKeyPosition(11) },  // Between G5(11) and A5(12)
        { note: 'A5', frequency: 880.00, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 12
        { note: 'A#5', frequency: 932.33, isBlack: true, position: getBlackKeyPosition(12) },  // Between A5(12) and B5(13)
        { note: 'B5', frequency: 987.77, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 13
        { note: 'C6', frequency: 1046.50, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 14
        { note: 'C#6', frequency: 1108.73, isBlack: true, position: getBlackKeyPosition(14) },  // Between C6(14) and D6(15)
        { note: 'D6', frequency: 1174.66, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 15
        { note: 'D#6', frequency: 1244.51, isBlack: true, position: getBlackKeyPosition(15) },  // Between D6(15) and E6(16)
        { note: 'E6', frequency: 1318.51, isBlack: false, whiteIndex: whiteKeyIndex++ },  // 16
      ];
      return keys;
    }
  };

  const keys = getPianoKeys();
  const whiteKeys = keys.filter(k => !k.isBlack);
  const blackKeys = keys.filter(k => k.isBlack);

  const handleKeyClick = (key) => {
    playNote(key.frequency);
    onSelect(key.frequency, key.note);
  };

  const isSelected = (frequency) => {
    return selectedPitch && Math.abs(selectedPitch - frequency) < 1;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <div className="mb-2 text-center">
        <h3 className="text-xs font-semibold text-gray-700">
          🎹 Select {mode === 'lowest' ? 'lowest' : 'highest'} note
        </h3>
      </div>

      {/* Piano Keyboard - Two-layer rendering */}
      <div className="relative bg-white rounded-lg p-2 overflow-x-auto shadow-inner">
        <div className="relative min-w-max mx-auto flex justify-center" style={{ height: '120px' }}>
          {/* White keys layer */}
          <div className="flex relative">
            {whiteKeys.map((key) => {
              const selected = isSelected(key.frequency);
              const hovered = hoveredKey === key.note;

              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    relative h-full rounded-b-[4px]
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-lg scale-[1.02] z-10'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-50 to-gray-200 shadow-md z-10'
                        : 'bg-gradient-to-b from-white to-gray-100 shadow-sm'
                    }
                    active:scale-95
                    border-r border-gray-300 ${selected ? 'border border-yellow-600' : 'border-l border-t border-b'}
                  `}
                  style={{ width: '28px', marginRight: '-1px' }}
                >
                  <span className={`
                    absolute bottom-1.5 left-1/2 transform -translate-x-1/2
                    text-[9px] font-bold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-400'}
                  `}>
                    {key.note}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Black keys layer */}
          <div className="absolute inset-0 pointer-events-none flex justify-center">
            <div className="relative" style={{ width: `${whiteKeys.length * 27}px` }}>
            {blackKeys.map((key) => {
              const selected = isSelected(key.frequency);
              const hovered = hoveredKey === key.note;

              return (
                <button
                  key={key.note}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.note)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`
                    absolute z-20 rounded-b-[3px] pointer-events-auto
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-md'
                        : 'bg-gradient-to-b from-gray-700 to-black shadow-sm'
                    }
                    border ${selected ? 'border-yellow-500' : 'border-gray-900'}
                  `}
                  style={{
                    width: '18px',
                    height: '75px',
                    left: `${key.position}px`,
                    top: '0',
                    transform: selected
                      ? 'translateX(-50%) scale(1.05)'
                      : hovered
                        ? 'translateX(-50%) scale(1.05)'
                        : 'translateX(-50%)'
                  }}
                >
                  <span className={`
                    absolute bottom-1.5 left-1/2 transform -translate-x-1/2
                    text-[8px] font-bold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-400'}
                  `}>
                    {key.note}
                  </span>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected note display removed for compactness - handled by parent component */}
    </div>
  );
};

export default PianoSelector;


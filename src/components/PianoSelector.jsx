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
    const whiteKeyWidth = 48; // Width of each white key
    const whiteKeyMargin = -2; // marginRight: -2px (overlap between keys)
    const effectiveWhiteKeyWidth = whiteKeyWidth + whiteKeyMargin; // 48 - 2 = 46px

    // Calculate position for black keys (centered between two white keys)
    // Black key should be at the center of the gap between two white keys
    const getBlackKeyPosition = (whiteKeyIndex) => {
      // Black key is between white key at whiteKeyIndex and whiteKeyIndex+1
      // Position at the right edge of the white key at whiteKeyIndex
      // Account for the -2px margin (overlap) between white keys
      // The transform: translateX(-50%) will center the black key automatically
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
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
      <div className="mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
          🎹 Click on a piano key to select your {mode === 'lowest' ? 'lowest' : 'highest'} note
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500">
          The note will play when you click it
        </p>
      </div>

      {/* Piano Keyboard - Two-layer rendering */}
      <div className="relative bg-white rounded-lg p-2 sm:p-3 overflow-x-auto">
        <div className="relative min-w-max mx-auto flex justify-center" style={{ height: '150px' }}>
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
                    relative h-full rounded-b-lg
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-xl scale-105 z-10'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg z-10'
                        : 'bg-gradient-to-b from-white to-gray-100 shadow-md'
                    }
                    hover:scale-105 active:scale-95
                    border-r-2 border-gray-400 ${selected ? 'border-2 border-yellow-600' : 'border-l-2 border-t-2 border-b-2'}
                  `}
                  style={{ width: '48px', marginRight: '-2px' }}
                >
                  <span className={`
                    absolute bottom-2 left-1/2 transform -translate-x-1/2
                    text-[10px] font-bold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-700'}
                  `}>
                    {key.note}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Black keys layer */}
          <div className="absolute inset-0 pointer-events-none flex justify-center">
            <div className="relative" style={{ width: `${whiteKeys.length * 46}px` }}>
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
                    absolute z-20 rounded-b-lg pointer-events-auto
                    transition-all duration-150 cursor-pointer
                    ${selected
                      ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-xl'
                      : hovered
                        ? 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-lg'
                        : 'bg-gradient-to-b from-gray-700 to-black shadow-md'
                    }
                    border-2 ${selected ? 'border-yellow-500' : 'border-gray-900'}
                  `}
                  style={{
                    width: '32px',
                    height: '95px',
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
                    absolute bottom-2 left-1/2 transform -translate-x-1/2
                    text-[9px] font-bold whitespace-nowrap
                    ${selected ? 'text-yellow-900' : 'text-gray-300'}
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


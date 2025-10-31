/**
 * Piano Keyboard Visualization Component
 * Displays vocal range on a piano keyboard with logarithmic (musical) scale
 */

import { useMemo } from 'react';

const PianoKeyboard = ({ lowestNote, highestNote, lowestFreq, highestFreq }) => {
  // Note names in chromatic scale
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Reference range: E2 to C6 (49 keys total)
  const REFERENCE_START = 'E2';  // MIDI 40
  const REFERENCE_END = 'C6';    // MIDI 84
  
  /**
   * Convert note name to MIDI number
   * @param {string} noteStr - Note name like "C4", "F#3"
   * @returns {number} MIDI note number
   */
  const noteToMidi = (noteStr) => {
    const match = noteStr.match(/([A-G]#?)(\d+)/);
    if (!match) return 0;
    const [, note, octave] = match;
    const noteIndex = NOTE_NAMES.indexOf(note);
    return (parseInt(octave) + 1) * 12 + noteIndex;
  };
  
  /**
   * Convert MIDI number to note name
   * @param {number} midi - MIDI note number
   * @returns {string} Note name like "C4"
   */
  const midiToNote = (midi) => {
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = midi % 12;
    return NOTE_NAMES[noteIndex] + octave;
  };
  
  /**
   * Check if a note is a black key
   * @param {string} note - Note name like "C#", "D"
   * @returns {boolean}
   */
  const isBlackKey = (note) => {
    return note.includes('#');
  };
  
  // Calculate MIDI range
  const referenceMidiStart = noteToMidi(REFERENCE_START); // E2 = 40
  const referenceMidiEnd = noteToMidi(REFERENCE_END);     // C6 = 84
  const userMidiStart = noteToMidi(lowestNote);
  const userMidiEnd = noteToMidi(highestNote);
  
  // Generate all keys in the reference range
  const allKeys = useMemo(() => {
    const keys = [];
    for (let midi = referenceMidiStart; midi <= referenceMidiEnd; midi++) {
      const noteName = midiToNote(midi);
      const isBlack = isBlackKey(noteName);
      const isInUserRange = midi >= userMidiStart && midi <= userMidiEnd;
      const isLowest = midi === userMidiStart;
      const isHighest = midi === userMidiEnd;
      
      keys.push({
        midi,
        noteName,
        isBlack,
        isInUserRange,
        isLowest,
        isHighest,
      });
    }
    return keys;
  }, [referenceMidiStart, referenceMidiEnd, userMidiStart, userMidiEnd]);
  
  // Separate white and black keys for rendering
  const whiteKeys = allKeys.filter(key => !key.isBlack);
  const blackKeys = allKeys.filter(key => key.isBlack);
  
  // Calculate positions for black keys (relative to white keys)
  const getBlackKeyPosition = (midi) => {
    // Count how many white keys are before this black key
    // We need to count from the reference start (E2)
    let whiteKeyCount = 0;

    for (let m = referenceMidiStart; m < midi; m++) {
      const note = midiToNote(m);
      if (!isBlackKey(note)) {
        whiteKeyCount++;
      }
    }

    // Black key is positioned between the last white key and the next white key
    // If there are N white keys before this black key, the last white key is at position N-1
    // So the black key is at position (N-1) + 0.5 = N - 0.5
    return whiteKeyCount - 0.5;
  };
  
  // Reference markers (E2, C4, C6)
  const referenceMarkers = [
    { note: 'E2', midi: 40, label: 'E2 (Bass Low)' },
    { note: 'C4', midi: 60, label: 'C4 (Middle C)' },
    { note: 'C6', midi: 84, label: 'C6 (Soprano High)' },
  ];
  
  const getMarkerPosition = (midi) => {
    const whiteKeysBefore = allKeys.filter(k => !k.isBlack && k.midi < midi).length;
    return (whiteKeysBefore / whiteKeys.length) * 100;
  };
  
  return (
    <div className="w-full">
      {/* Reference markers */}
      <div className="relative h-6 mb-2">
        {referenceMarkers.map(marker => {
          const position = getMarkerPosition(marker.midi);
          return (
            <div
              key={marker.note}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600">
                  {marker.note}
                </div>
                <div className="w-px h-2 bg-gray-400"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Piano keyboard */}
      <div className="relative bg-white rounded-lg p-2 sm:p-3 overflow-x-auto border-2 border-gray-300">
        <div className="relative min-w-[600px] sm:min-w-[700px] h-32 sm:h-40">
          {/* White keys */}
          <div className="absolute inset-0 flex gap-[1px]">
            {whiteKeys.map((key, index) => (
              <div
                key={key.midi}
                className={`
                  flex-1 rounded-b-md transition-all duration-200 relative
                  ${key.isInUserRange
                    ? 'bg-gradient-to-b from-indigo-400 to-purple-500'
                    : 'bg-white'
                  }
                  ${key.isLowest || key.isHighest ? 'ring-4 ring-yellow-400 ring-opacity-90 z-10' : ''}
                `}
                style={{
                  border: '1px solid #000',
                  boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Note label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-1">
                  <span className={`
                    text-[9px] sm:text-[10px] font-medium
                    ${key.isInUserRange
                      ? 'text-white font-bold'
                      : 'text-gray-600'
                    }
                  `}>
                    {key.noteName}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Black keys */}
          <div className="absolute inset-0 pointer-events-none">
            {blackKeys.map(key => {
              const position = getBlackKeyPosition(key.midi);
              const whiteKeyWidth = 100 / whiteKeys.length;
              const leftPercent = position * whiteKeyWidth;

              return (
                <div
                  key={key.midi}
                  className={`
                    absolute top-0 rounded-b-sm transition-all duration-200 z-20
                    ${key.isInUserRange
                      ? 'bg-gradient-to-b from-indigo-600 to-indigo-800'
                      : 'bg-black'
                    }
                    ${key.isLowest || key.isHighest ? 'ring-4 ring-yellow-400 ring-opacity-90' : ''}
                  `}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${whiteKeyWidth * 0.6}%`,
                    height: '58%',
                    border: '1px solid #000',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* Note label */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-1">
                    <span className={`
                      text-[7px] sm:text-[8px] font-medium
                      ${key.isInUserRange
                        ? 'text-indigo-200 font-bold'
                        : 'text-gray-400'
                      }
                    `}>
                      {key.noteName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* User range markers */}
      <div className="mt-3 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400 ring-2 ring-yellow-400 ring-opacity-50"></div>
          <div>
            <div className="font-semibold text-gray-700">{lowestNote}</div>
            <div className="text-[10px] text-gray-500">{lowestFreq.toFixed(1)} Hz</div>
          </div>
        </div>
        
        <div className="text-center px-4">
          <div className="text-gray-500 text-[10px] sm:text-xs">Your Range</div>
          <div className="font-bold text-indigo-600">
            {userMidiEnd - userMidiStart + 1} keys
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div>
            <div className="font-semibold text-gray-700 text-right">{highestNote}</div>
            <div className="text-[10px] text-gray-500 text-right">{highestFreq.toFixed(1)} Hz</div>
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 ring-2 ring-yellow-400 ring-opacity-50"></div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 justify-center text-[10px] sm:text-xs text-gray-600">
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 border border-indigo-600 rounded"></div>
          <span>Your Range</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-6 bg-white border-2 border-gray-300 rounded"></div>
          <span>Other Keys</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-400 ring-2 ring-yellow-400 ring-opacity-50"></div>
          <span>Lowest/Highest</span>
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard;


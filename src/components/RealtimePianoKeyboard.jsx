/**
 * Realtime Piano Keyboard Component for Pitch Detector
 * Highlights the current detected note in real-time
 */

import { useMemo, useState } from 'react';
import { playPianoNote } from '../utils/pianoAudio';

const RealtimePianoKeyboard = ({ currentFrequency }) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  // Play note sound using realistic piano audio
  const playNote = (frequency) => {
    playPianoNote(frequency, 1.5, 0.7); // duration: 1.5s, velocity: 0.7
  };

  // Convert MIDI number to frequency
  const midiToFrequency = (midi) => {
    return 440 * Math.pow(2, (midi - 69) / 12);
  };

  // Convert frequency to MIDI number
  const frequencyToMidi = (frequency) => {
    return Math.round(69 + 12 * Math.log2(frequency / 440));
  };

  // Convert MIDI number to note name
  const midiToNote = (midi) => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midi / 12) - 1;
    const noteName = noteNames[midi % 12];
    return `${noteName}${octave}`;
  };

  // Check if a note is a black key
  const isBlackKey = (noteName) => {
    return noteName.includes('#');
  };

  // Get current MIDI note from detected frequency
  const currentMidi = currentFrequency ? frequencyToMidi(currentFrequency) : null;

  // Define reference range: C2 to C6 (4 octaves)
  const referenceMidiStart = 36; // C2
  const referenceMidiEnd = 84;   // C6

  // Generate all keys in the reference range
  const allKeys = useMemo(() => {
    const keys = [];
    for (let midi = referenceMidiStart; midi <= referenceMidiEnd; midi++) {
      const noteName = midiToNote(midi);
      const isBlack = isBlackKey(noteName);
      const isCurrent = midi === currentMidi;
      
      keys.push({
        midi,
        noteName,
        isBlack,
        isCurrent,
      });
    }
    return keys;
  }, [currentMidi]);

  // Separate white and black keys for rendering
  const whiteKeys = allKeys.filter(key => !key.isBlack);
  const blackKeys = allKeys.filter(key => key.isBlack);

  // Calculate white key width percentage
  const whiteKeyWidth = 100 / whiteKeys.length;

  // Calculate positions for black keys (relative to white keys)
  const getBlackKeyPosition = (midi) => {
    // Count how many white keys are before this black key
    let whiteKeyCount = 0;

    for (let m = referenceMidiStart; m < midi; m++) {
      const note = midiToNote(m);
      if (!isBlackKey(note)) {
        whiteKeyCount++;
      }
    }

    // Black key should be centered between two white keys
    // Position at the right edge of white key before it
    // We'll use transform: translateX(-50%) to center the black key
    return whiteKeyCount;
  };

  return (
    <div className="w-full overflow-x-auto pt-12 pb-1">
      {/* Piano keyboard container */}
      <div className="relative bg-white rounded-lg p-2 sm:p-3 border-2 border-gray-300 w-full mx-auto">
        <div className="relative w-full min-w-[600px] h-24 sm:h-32">
          {/* White keys */}
          <div className="absolute inset-0 flex gap-[1px]">
            {whiteKeys.map((key) => (
              <div
                key={key.midi}
                className={`
                  flex-1 rounded-b-md transition-all duration-200 relative cursor-pointer
                  ${key.isCurrent
                    ? 'bg-gradient-to-b from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 animate-pulse'
                    : 'bg-white hover:bg-gray-100'
                  }
                  ${hoveredKey === key.midi ? 'transform scale-y-[0.98]' : ''}
                `}
                style={{
                  border: '1px solid #000',
                  boxShadow: hoveredKey === key.midi
                    ? 'inset 0 2px 8px rgba(0, 0, 0, 0.3)'
                    : key.isCurrent
                    ? '0 0 20px rgba(168, 85, 247, 0.6)'
                    : 'inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => playNote(midiToFrequency(key.midi))}
                onMouseEnter={() => setHoveredKey(key.midi)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Floating Note Animation */}
                {key.isCurrent && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-1 pointer-events-none z-30">
                    <div className="text-xl animate-float-note text-purple-600 font-bold filter drop-shadow-sm">
                      🎵
                    </div>
                  </div>
                )}

                {/* Note label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-1">
                  <span className={`
                    text-[9px] sm:text-[10px] font-medium
                    ${key.isCurrent
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
            {blackKeys.map((key) => {
              const position = getBlackKeyPosition(key.midi);
              const leftPercent = position * whiteKeyWidth;

              return (
                <div
                  key={key.midi}
                  className={`
                    absolute top-0 rounded-b-sm transition-all duration-200 z-20 cursor-pointer pointer-events-auto
                    ${key.isCurrent
                      ? 'bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 animate-pulse'
                      : 'bg-black hover:bg-gray-800'
                    }
                  `}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${whiteKeyWidth * 0.6}%`,
                    height: '58%',
                    transform: hoveredKey === key.midi
                      ? 'translateX(-50%) scaleY(0.96)'
                      : 'translateX(-50%)',
                    border: '1px solid #000',
                    boxShadow: hoveredKey === key.midi
                      ? '0 4px 8px rgba(0, 0, 0, 0.6)'
                      : key.isCurrent
                      ? '0 0 20px rgba(168, 85, 247, 0.6)'
                      : '0 2px 4px rgba(0, 0, 0, 0.4)',
                  }}
                  onClick={() => playNote(midiToFrequency(key.midi))}
                  onMouseEnter={() => setHoveredKey(key.midi)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {/* Floating Note Animation for Black Keys */}
                  {key.isCurrent && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-1 pointer-events-none z-30">
                      <div className="text-lg animate-float-note text-purple-400 font-bold filter drop-shadow-sm">
                        ♪
                      </div>
                    </div>
                  )}

                  {/* Note label */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-1">
                    <span className={`
                      text-[7px] sm:text-[8px] font-medium
                      ${key.isCurrent
                        ? 'text-purple-200 font-bold'
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

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-b from-purple-400 to-purple-600 border border-purple-700"></div>
          <span className="text-gray-700">Current Note</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white border border-gray-400"></div>
          <span className="text-gray-700">Other Keys</span>
        </div>
      </div>
    </div>
  );
};

export default RealtimePianoKeyboard;


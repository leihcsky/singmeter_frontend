/**
 * Vocal range chart: voice types on a shared pitch axis (E2-C6).
 * Ranges follow common pedagogical references (approximate comfortable spans).
 */

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CHART_START_MIDI = 40; // E2
const CHART_END_MIDI = 84; // C6

function noteToMidi(noteStr) {
  const match = noteStr.match(/([A-G]#?)(\d+)/);
  if (!match) return CHART_START_MIDI;
  const [, note, octave] = match;
  const noteIndex = NOTE_NAMES.indexOf(note);
  return (parseInt(octave, 10) + 1) * 12 + noteIndex;
}

function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  return NOTE_NAMES[midi % 12] + octave;
}

/** Typical comfortable ranges (not absolute vocal limits). */
const VOICE_TYPES = [
  { label: 'Bass', low: 'E2', high: 'E4', color: 'bg-indigo-700', group: 'Male voices' },
  { label: 'Baritone', low: 'A2', high: 'A4', color: 'bg-indigo-500', group: 'Male voices' },
  { label: 'Tenor', low: 'C3', high: 'C5', color: 'bg-violet-500', group: 'Male voices' },
  { label: 'Alto / Contralto', low: 'F3', high: 'F5', color: 'bg-purple-500', group: 'Female voices' },
  { label: 'Mezzo-Soprano', low: 'A3', high: 'A5', color: 'bg-fuchsia-500', group: 'Female voices' },
  { label: 'Soprano', low: 'C4', high: 'C6', color: 'bg-pink-500', group: 'Female voices' },
];

const SATB = [
  { label: 'Soprano (S)', low: 'C4', high: 'C6', color: 'bg-pink-500' },
  { label: 'Alto (A)', low: 'F3', high: 'F5', color: 'bg-purple-500' },
  { label: 'Tenor (T)', low: 'C3', high: 'C5', color: 'bg-violet-500' },
  { label: 'Bass (B)', low: 'E2', high: 'E4', color: 'bg-indigo-700' },
];

const SPAN = CHART_END_MIDI - CHART_START_MIDI + 1;

function pitchPercent(midi) {
  return ((midi - CHART_START_MIDI) / (SPAN - 1)) * 100;
}

function formatRange(low, high) {
  return `${low} \u2013 ${high}`;
}

function ChartHowToRead() {
  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50/80 px-4 py-3 mb-4 text-left text-sm text-gray-700 leading-relaxed">
      <p className="font-semibold text-gray-900 mb-1">How to read this chart</p>
      <ul className="list-disc list-outside pl-5 space-y-1">
        <li>
          <strong>Horizontal axis (bottom):</strong> pitch from low (E2, left) to high (C6, right).
        </li>
        <li>
          <strong>Colored bar:</strong> where that voice type usually sings comfortably, not every note
          you might ever hit.
        </li>
        <li>
          <strong>Overlap is normal:</strong> bars cross because voice types share notes; your tessitura
          matters more than one extreme note.
        </li>
        <li>
          <strong>Range on the bar:</strong> lowest and highest note (e.g. C3{' '}
          <span aria-hidden="true">{'\u2013'}</span> C5) at the center of each colored bar.
        </li>
      </ul>
    </div>
  );
}

function RangeBar({ low, high, color, label }) {
  const lowMidi = noteToMidi(low);
  const highMidi = noteToMidi(high);
  const left = pitchPercent(lowMidi);
  const width = Math.max(pitchPercent(highMidi) - left, 1.5);
  const rangeText = formatRange(low, high);
  const labelInside = width >= 14;

  return (
    <div className="relative w-full h-9 flex items-center gap-2 min-w-0">
      <div className="relative flex-1 h-7 min-w-0">
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-full rounded-md ${color} shadow-sm ring-1 ring-black/5`}
          style={{ left: `${left}%`, width: `${width}%` }}
          title={`${label}: ${rangeText}`}
          aria-hidden
        />
        <span
          className="absolute top-0 bottom-0 w-0.5 bg-gray-800/25 rounded-full pointer-events-none"
          style={{ left: `${left}%` }}
          aria-hidden
        />
        <span
          className="absolute top-0 bottom-0 w-0.5 bg-gray-800/25 rounded-full pointer-events-none"
          style={{ left: `${left + width}%` }}
          aria-hidden
        />
        {labelInside && (
          <span
            className="absolute top-1/2 text-[10px] sm:text-xs font-semibold text-white drop-shadow-sm pointer-events-none whitespace-nowrap px-1"
            style={{
              left: `${left + width / 2}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {rangeText}
          </span>
        )}
      </div>
      {!labelInside && (
        <span className="text-[11px] sm:text-xs font-semibold text-indigo-800 whitespace-nowrap shrink-0">
          {rangeText}
        </span>
      )}
    </div>
  );
}

function PitchAxis() {
  const markers = [];
  for (let midi = CHART_START_MIDI; midi <= CHART_END_MIDI; midi++) {
    if (NOTE_NAMES[midi % 12] !== 'C') continue;
    markers.push({ midi, label: midiToNote(midi) });
  }
  if (NOTE_NAMES[CHART_START_MIDI % 12] !== 'C') {
    markers.unshift({ midi: CHART_START_MIDI, label: midiToNote(CHART_START_MIDI) });
  }

  return (
    <div className="relative h-9 border-t border-gray-300 mt-2 mb-1 px-0.5">
      <p className="text-[10px] text-gray-400 mb-0.5 text-left">Pitch (low to high)</p>
      {markers.map(({ midi, label }, index) => {
        const isFirst = index === 0;
        const isLast = index === markers.length - 1;
        return (
          <span
            key={midi}
            className={`absolute text-[11px] sm:text-xs text-gray-600 font-medium whitespace-nowrap ${
              isFirst ? 'translate-x-0' : isLast ? '-translate-x-full' : '-translate-x-1/2'
            }`}
            style={{ left: `${pitchPercent(midi)}%`, top: '1.15rem' }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

function ChartBlock({ title, subtitle, rows }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 text-left">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px] px-4 py-4">
          <div className="relative mb-2 h-2" aria-hidden>
            {[40, 52, 64, 76, 84].map((midi) => (
              <div
                key={midi}
                className="absolute top-0 bottom-0 w-px bg-gray-200"
                style={{ left: `${pitchPercent(midi)}%` }}
              />
            ))}
          </div>

          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[10rem_1fr] gap-2 sm:gap-3 items-center mb-3 last:mb-0"
            >
              <div className="text-left pr-1 text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                {row.label}
              </div>
              <RangeBar low={row.low} high={row.high} color={row.color} label={row.label} />
            </div>
          ))}

          <PitchAxis />
        </div>
      </div>
    </div>
  );
}

export default function VocalRangeChartVisual() {
  const maleRows = VOICE_TYPES.filter((v) => v.group === 'Male voices');
  const femaleRows = VOICE_TYPES.filter((v) => v.group === 'Female voices');

  return (
    <figure className="my-8 not-prose" aria-labelledby="vocal-range-chart-title">
      <figcaption id="vocal-range-chart-title" className="sr-only">
        Vocal range chart for bass, baritone, tenor, alto, mezzo-soprano, soprano, and SATB from E2 to C6
      </figcaption>

      <ChartHowToRead />

      <div className="space-y-4">
        <ChartBlock
          title="Male voice types"
          subtitle="Approximate comfortable ranges on the same E2-C6 axis"
          rows={maleRows}
        />
        <ChartBlock
          title="Female voice types"
          subtitle="Ranges overlap with male types in the middle register (expected)"
          rows={femaleRows}
        />
        <ChartBlock
          title="SATB choir (four-part) reference"
          subtitle="Same layout as above; SATB maps to Soprano / Alto / Tenor / Bass"
          rows={SATB}
        />
      </div>

      <p className="text-sm text-gray-500 mt-3 text-left leading-relaxed">
        Ranges align with common voice-type references and our vocal range test. Values are typical for
        trained singers; your comfortable range may differ.
      </p>
    </figure>
  );
}

export { VOICE_TYPES, SATB, noteToMidi, midiToNote, CHART_START_MIDI, CHART_END_MIDI };

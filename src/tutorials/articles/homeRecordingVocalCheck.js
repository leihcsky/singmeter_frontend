const meta = {
  id: 'home-recording-vocal-check',
  slug: 'home-recording-vocal-check',
  title: 'Home Recording Vocal Check',
  seoTitle: 'Home Recording Vocal Check with Pitch Detector',
  seoDescription:
    'Record a 30-second vocal take at home, then use SingMeter Pitch Detector to review pitch on your hardest note. Mic distance and room tips included.',
  excerpt:
    'A short home-recording workflow with a pitch sanity check—not a full production course.',
  level: 'Advanced',
  track: 'care',
  trackLabel: 'Care & recording',
  duration: '20 min',
  date: '2026-05-23',
  prerequisites: ['pitch-calibration-10'],
  nextSlug: 'bridge-and-mix-practice',
  category: 'Recording',
};

const intro =
  'Recording exposes pitch issues that feel fine in the room. You will capture a short take on your phone or computer, listen back once, then use Pitch Detector on the problem note live—not on the playback file (our detector needs a live mic). This lesson is a quality check, not mixing or EQ.';

const tools = [
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Live mic check on the note that bothered you in playback.',
  },
  {
    to: '/tone-generator',
    label: 'Tone Generator',
    hint: 'Optional reference before re-singing the problem note.',
  },
  {
    to: '/vocal-range-test',
    label: 'Vocal Range Test',
    hint: 'Confirm the take sits inside your saved range.',
  },
];

const steps = [
  {
    title: 'Set up a quiet corner',
    duration: '3 min',
    body: `Reduce echo: record facing a closet, duvet, or bookshelf—not bare walls.\n\nTurn off fans and notifications.\n\nPhone: voice memos app, landscape not required. Laptop: built-in mic is OK for a check; external USB mic is better if you have one.\n\nDistance: 15–25 cm (6–10 in) from the mic, slightly off-axis (not directly in the breath stream).`,
  },
  {
    title: 'Record one short take',
    duration: '5 min',
    body: `Record 30–45 seconds: one verse or chorus you know well, in a key you already practiced on Song Key Finder.\n\nDo one full take only—do not punch in yet.\n\nLabel the file with date and song name.`,
  },
  {
    title: 'Listen back with one question',
    duration: '5 min',
    body: `Use headphones. Ask: “Where did I go flat or sharp?” Mark one timestamp (e.g. 0:22 on the high word).\n\nIgnore reverb wishes and tone color for now—pitch only.\n\nIf everything sounds off-key, the key may be wrong; revisit Song Key Finder before re-recording.`,
    toolCallout: { to: '/song-key-finder', label: 'Song Key Finder' },
  },
  {
    title: 'Live pitch check on the problem note',
    duration: '5 min',
    body: `Open Pitch Detector. Sing only the problem word or note from the take—3 sustained attempts.\n\nIf flat: more support. If sharp: less volume, relax jaw.\n\nOptional: play the target note on Tone Generator once, then sing without scooping.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Decide: re-record or keep practicing',
    duration: '2 min',
    body: `Green zone on the problem note at least once → schedule a second take tomorrow after warm-up.\n\nStill struggling → do not re-record today; run 10-Minute Pitch Calibration and try again another day.\n\nNever stack more than 3 full takes in one session—fatigue makes pitch worse.`,
    toolCallout: { to: '/tutorials/pitch-calibration-10', label: 'Pitch Calibration Tutorial' },
  },
];

const selfCheck = [
  'I have one labeled recording and one timestamp marked for pitch issues.',
  'I checked the problem note live on Pitch Detector, not by uploading the WAV file.',
  'I know whether to re-record or return to pitch practice first.',
];

const goDeeper = [
  { to: '/blog/use-pitch-detector-for-training', label: 'Pitch Detector for Training (full guide)' },
  { to: '/blog/improve-singing-pitch', label: 'Improve Singing Pitch' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

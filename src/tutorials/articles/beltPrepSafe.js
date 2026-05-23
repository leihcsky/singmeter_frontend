const meta = {
  id: 'belt-prep-safe',
  slug: 'belt-prep-safe',
  title: 'Safe Belt Prep (Not Full Belt Training)',
  seoTitle: 'Safe Belt Prep Tutorial for Singers',
  seoDescription:
    'Prepare for powerful high notes safely: range check, supported speech-level practice, and Pitch Detector limits—before full belt work.',
  excerpt:
    'Pre-belt conditioning—volume discipline and range honesty—not a “belt like Broadway” course.',
  level: 'Advanced',
  track: 'advanced',
  trackLabel: 'Advanced technique',
  duration: '18 min',
  date: '2026-05-23',
  prerequisites: ['bridge-and-mix-practice'],
  nextSlug: null,
  category: 'Technique',
};

const intro =
  'Belting is high-risk if you copy pop singers on day one. This lesson is preconditioning: breath support, moderate volume, and knowing your ceiling from the Vocal Range Test. For full belt theory, read the blog article linked below. Stop on pain.';

const tools = [
  {
    to: '/vocal-range-test',
    label: 'Vocal Range Test',
    hint: 'Confirm top comfortable note before loud practice.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Keep peak notes in green zone at medium volume.',
  },
  {
    to: '/tutorials/vocal-health-recovery-day',
    label: 'Vocal Health Recovery',
    hint: 'Use if throat feels tired after this session.',
  },
];

const steps = [
  {
    title: 'Honest range ceiling',
    duration: '3 min',
    body: `Open your saved range or retest. Your “belt prep ceiling” is 2–3 semitones below your absolute highest test note.\n\nWrite that note. You will not sing louder above it today.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Speech-level “hey” (not shout)',
    duration: '5 min',
    body: `Say “hey” like calling a friend across a room—not yelling. Repeat on 3 pitches in your upper middle range, 8 times each.\n\nThroat should feel open, not squeezed. If you cough or itch, stop.`,
  },
  {
    title: 'Supported hold on ceiling note',
    duration: '5 min',
    body: `On your belt prep ceiling note, sing “ah” for 2 seconds at medium volume—3 reps, 15 seconds rest.\n\nOpen Pitch Detector: aim for green zone without increasing volume to get there.\n\nIf you need more volume to hit pitch, the note is too high—drop 1 semitone.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Cool down and log',
    duration: '5 min',
    body: `Lip trill down from middle range for 30 seconds. Drink water.\n\nLog: date, ceiling note, how throat feels (1–5). If 3+, run Vocal Health Recovery tomorrow instead of belt work.`,
    toolCallout: { to: '/tutorials/vocal-health-recovery-day', label: 'Recovery tutorial' },
  },
];

const selfCheck = [
  'I stayed at or below my written belt prep ceiling.',
  'Throat feels no worse than before the session (fatigue OK, pain not OK).',
  'I know which blog/tutorial to read next for full belt technique.',
];

const goDeeper = [
  { to: '/blog/belt-high-notes-safely', label: 'How to Belt High Notes Safely' },
  { to: '/blog/vocal-health-and-maintenance', label: 'Vocal Health and Maintenance' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

const meta = {
  id: 'breath-and-posture-basics',
  slug: 'breath-and-posture-basics',
  title: 'Breath & Posture for Singers',
  seoTitle: 'Breath & Posture Tutorial for Singers',
  seoDescription:
    'Four practical breath and alignment exercises for singers—no long theory. Use before range tests, pitch work, or songs.',
  excerpt:
    'Exercise-only lesson: diaphragmatic breath, rib expansion, and singing posture you can repeat daily.',
  level: 'Beginner',
  track: 'start',
  trackLabel: 'Start here',
  duration: '12 min',
  date: '2026-05-23',
  prerequisites: [],
  nextSlug: 'transpose-a-song',
  category: 'Technique',
};

const intro =
  'This lesson is exercises only—save the anatomy for the blog article linked at the end. You need no microphone. Do these four drills before your Vocal Range Test, pitch practice, or song work. Stop any exercise that causes dizziness or pain.';

const tools = [
  {
    to: '/metronome',
    label: 'Online Metronome',
    hint: 'Optional: 60 BPM for timed exhale exercises.',
  },
  {
    to: '/tutorials/daily-warmup-15',
    label: '15-Minute Daily Warm-Up',
    hint: 'Run this breath block first, then continue with the full warm-up.',
  },
];

const steps = [
  {
    title: 'Posture check (wall test)',
    duration: '2 min',
    body: `Stand with your back lightly touching a wall: heels, calves, shoulders, and back of head.\n\nThere should be a small space at your lower back—do not flatten it completely.\n\nChin level, shoulders down. Memorize this alignment, then step away and recreate it.`,
  },
  {
    title: 'Low belly breath (hand placement)',
    duration: '3 min',
    body: `One hand on lower belly, one on lower ribs.\n\nInhale through the nose for 4 counts: belly moves out, ribs widen sideways—not lifted shoulders.\n\nExhale on “sss” for 8 counts. Belly draws in slowly.\n\nRepeat 6 times. If shoulders rise, shorten the inhale.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Supported exhale on pitch (easy hum)',
    duration: '4 min',
    body: `Inhale as above. On exhale, hum a comfortable mid-range note for as long as the “sss” lasted.\n\nThe hum should feel steady, not pressed. If it wavers or cracks, use less air.\n\nRepeat 4 times with 10 seconds rest between.\n\nOptional: open Pitch Detector once and confirm the hum is a stable single note.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Rib swing (silent “huh”)',
    duration: '3 min',
    body: `Short, silent “huh” puffs from the belly—not throat clicks. 8 puffs, rest, 8 more.\n\nPurpose: wake up breath support without warming the voice loudly.\n\nFinish with one full inhale and a long relaxed exhale through the mouth.`,
  },
];

const selfCheck = [
  'I can inhale without lifting my shoulders noticeably.',
  'A comfortable hum lasts at least one full 8-count exhale.',
  'I know this posture setup and will use it before my next SingMeter practice.',
];

const goDeeper = [
  { to: '/blog/breathing-and-posture-for-singers', label: 'Breathing and Posture for Singers (full guide)' },
  { to: '/blog/vocal-health-and-maintenance', label: 'Vocal Health and Maintenance' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

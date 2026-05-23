const meta = {
  id: 'ear-training-starter',
  slug: 'ear-training-starter',
  title: 'Ear Training Starter (Intervals)',
  seoTitle: 'Ear Training Starter: Intervals with Tone & Pitch',
  seoDescription:
    'Train major thirds and perfect fifths in 20 minutes: hear a reference on Tone Generator, sing the interval, verify on Pitch Detector.',
  excerpt:
    'Build interval memory with a hear–sing–check loop using two SingMeter tools.',
  level: 'Intermediate',
  track: 'apply',
  trackLabel: 'Apply your range',
  duration: '20 min',
  date: '2026-05-22',
  prerequisites: ['pitch-calibration-10'],
  nextSlug: 'song-in-the-right-key',
  category: 'Ear Training',
};

const intro =
  'Ear training here means matching distances between notes—not reading notation. You will practice two intervals (major third and perfect fifth) from a fixed root. Use the same root for the whole session so your ear learns relative distance.';

const tools = [
  {
    to: '/tone-generator',
    label: 'Tone Generator',
    hint: 'Play root and target; sine wave, 30–40% volume.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Verify both notes after you sing.',
  },
];

const steps = [
  {
    title: 'Choose your root note',
    duration: '2 min',
    body: `Pick Do in a comfortable part of your range (e.g. G3, C4, or D4).\n\nWrite the root name on paper. All intervals today start from this note.`,
  },
  {
    title: 'Learn the major third by ear',
    duration: '6 min',
    body: `On Tone Generator, play your root (Do) for 2 seconds, then play the major third (Mi) for 2 seconds—repeat 5 times without singing.\n\nExamples: C4 → E4, G3 → B3, D4 → F#4.\n\nClose your eyes for the last 3 listens and imagine the jump.`,
    toolCallout: { to: '/tone-generator', label: 'Tone Generator' },
  },
  {
    title: 'Sing the major third and check',
    duration: '5 min',
    body: `Play Do once. Stop the tone. Sing Do, then Mi from memory on “La.”\n\nOpen Pitch Detector: sing Do again—check green zone. Sing Mi—check green zone.\n\nIf Mi is flat, replay the reference once, then retry (max 2 replays per attempt).`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Learn the perfect fifth',
    duration: '4 min',
    body: `Same root. Play Do, then Sol (perfect fifth)—e.g. C4→G4, G3→D4.\n\nListen 5 times, then sing Do–Sol–Do without the generator.\n\nVerify both notes on Pitch Detector.`,
    toolCallout: { to: '/tone-generator', label: 'Tone Generator' },
  },
  {
    title: 'Mixed drill',
    duration: '3 min',
    body: `Random order: a friend calls “third” or “fifth,” or flip a coin.\n\nFrom your root, sing only the requested interval top note, then the full interval down.\n\nStop while accuracy is still good—do not drill when tired.`,
  },
];

const selfCheck = [
  'I can sing a major third and perfect fifth from my chosen root without sliding from below.',
  'Pitch Detector showed both notes within about ±15 cents at least once each.',
  'I know which interval felt harder today (third or fifth).',
];

const goDeeper = [
  { to: '/blog/ear-training-for-singers', label: 'Ear Training for Singers' },
  { to: '/blog/sing-in-tune-without-piano', label: 'Sing in Tune Without Piano' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

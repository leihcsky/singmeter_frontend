const meta = {
  id: 'vocal-range-test-guided',
  slug: 'vocal-range-test-guided',
  title: 'Your First Vocal Range Test',
  seoTitle: 'Vocal Range Test Tutorial: Step-by-Step',
  seoDescription:
    'Complete your first SingMeter vocal range test in 12 minutes: warm-up, record low and high notes, save results, and avoid common mistakes.',
  excerpt:
    'A guided practice session to measure your lowest and highest singable notes and save them for transpose and pitch tools.',
  level: 'Beginner',
  track: 'start',
  trackLabel: 'Start here',
  duration: '12 min',
  date: '2026-05-22',
  prerequisites: [],
  nextSlug: 'pitch-calibration-10',
  category: 'Vocal Range',
};

const intro =
  'This is a hands-on lesson—not a theory article. You will warm up, run the SingMeter Vocal Range Test, and save your results so Song Key Finder and future practice sessions can use them. Allow 12 minutes in a quiet room with headphones if possible.';

const tools = [
  {
    to: '/vocal-range-test',
    label: 'Vocal Range Test',
    hint: 'Main tool for this lesson. Microphone required.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Optional: check one note before you test if you are unsure you are singing a clear pitch.',
  },
];

const steps = [
  {
    title: 'Set up your space',
    duration: '2 min',
    body: `Close unnecessary browser tabs so the test can use your microphone without lag.\n\nSit or stand tall: feet flat, shoulders relaxed, phone or laptop mic about 20–30 cm (8–12 in) from your mouth—not directly in front to avoid breath pops.\n\nHave water nearby. If your throat feels tight or hoarse, stop and try again later; never push painful notes.`,
  },
  {
    title: 'Light warm-up (no test yet)',
    duration: '3 min',
    body: `Hum gently from your speaking pitch downward, then upward—about 30 seconds each direction.\n\nDo 3 lip trills sliding through your comfortable middle range. The goal is blood flow, not your highest note.\n\nIf you own the Metronome tool, set 60 BPM and hum one note per beat for 8 beats. Otherwise hum at a comfortable pace.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Open the test and allow the microphone',
    duration: '1 min',
    body: `Open the Vocal Range Test and click Start when prompted. Choose Allow if the browser asks for microphone access.\n\nIf access is blocked, check your browser address bar or system privacy settings and refresh the page.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Record your lowest comfortable note',
    duration: '2 min',
    body: `Sing a steady “Ah” or “Oh” on the lowest note you can sustain clearly for 2–3 seconds—not a croak or whisper.\n\nRepeat up to 3 times and keep your best attempt. If the pitch wavers, support from the belly and try again.\n\nTip: sliding down slowly often lands more accurately than attacking the note from above.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Record your highest comfortable note',
    duration: '2 min',
    body: `Use the same vowel on the highest note you can sing without strain or cracking. It should feel like “effort but healthy,” not shouting.\n\nIf you crack, back off slightly and choose the last clean note instead of your absolute max.\n\nTake 10 seconds of silence between tries so you do not fatigue.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Review and save your results',
    duration: '2 min',
    body: `On the results screen, note your low note, high note, and any voice-type hint shown.\n\nYour range is saved automatically for tools like Song Key Finder (you may see “Loaded from your test” later).\n\nWrite your range on paper or in your practice notes—for example C3–G4—so you remember it offline.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
];

const selfCheck = [
  'I can state my low and high note names (e.g. A2 and F4) without reopening the tool.',
  'Both notes were sung with a clear tone, not breathy whispers or shouted peaks.',
  'I know where to find my saved range on Song Key Finder when transposing a song.',
];

const goDeeper = [
  { to: '/blog/how-to-test-vocal-range', label: 'How to Test Your Vocal Range (theory & FAQ)' },
  { to: '/blog/vocal-range-vs-voice-type', label: 'Vocal Range vs Voice Type' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

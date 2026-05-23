const meta = {
  id: 'daily-warmup-15',
  slug: 'daily-warmup-15',
  title: '15-Minute Daily Warm-Up',
  seoTitle: '15-Minute Vocal Warm-Up with Metronome',
  seoDescription:
    'A timed 15-minute vocal warm-up using SingMeter Metronome and optional Tone Generator: lip trills, hums, and a five-note scale.',
  excerpt:
    'A repeatable warm-up schedule you can run before every practice or range test.',
  level: 'Beginner',
  track: 'start',
  trackLabel: 'Start here',
  duration: '15 min',
  date: '2026-05-22',
  prerequisites: [],
  nextSlug: 'breath-and-posture-basics',
  category: 'Warm-Up',
};

const intro =
  'Warming up is not optional for vocal health. This clock-driven routine uses the Metronome for steady timing and optionally the Tone Generator for one reference pitch on your scale. Do not rush—stay in your comfortable range until the last few minutes.';

const tools = [
  {
    to: '/metronome',
    label: 'Online Metronome',
    hint: '72 BPM for most steps; 60 BPM if you are tired.',
  },
  {
    to: '/tone-generator',
    label: 'Tone Generator',
    hint: 'Optional sine tone on the first note of your scale only.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Optional final check on one sustained note.',
  },
];

const steps = [
  {
    title: 'Breath and posture (metronome off)',
    duration: '2 min',
    body: `Stand or sit tall. Inhale for 4 counts, exhale on “ssss” for 8 counts—repeat 4 times.\n\nRoll shoulders back. Release jaw tension by massaging lightly at the corners of the mouth.`,
  },
  {
    title: 'Lip trills at 72 BPM',
    duration: '4 min',
    body: `Set Metronome to 72 BPM, 4/4.\n\nLip trill one pitch per beat for 16 beats in your middle range.\n\nSlide up 2 beats, down 2 beats—repeat for 4 cycles. Stop if you feel dizzy.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Humming fifths',
    duration: '4 min',
    body: `Same tempo. Hum a comfortable note for 4 beats, jump to a fifth above for 4 beats, return for 4 beats, rest 4 beats.\n\nRepeat on “mm” with closed lips—keep volume moderate.\n\nIf the fifth is hard, use a fourth instead.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Five-note scale (optional tone on Do)',
    duration: '4 min',
    body: `Choose Do in your comfortable range (e.g. C4). Play it once on Tone Generator (sine, low volume).\n\nSing Do–Re–Mi–Fa–Sol–Fa–Mi–Re–Do on “La” or “Mi,” one syllable per beat at 72 BPM.\n\nOnly the first note uses the generator; the rest is from memory.`,
    toolCallout: { to: '/tone-generator', label: 'Tone Generator' },
  },
  {
    title: 'Optional pitch check',
    duration: '1 min',
    body: `Hold Do for 4 beats on Pitch Detector. Green zone for 3 seconds means you are ready for harder work.\n\nIf not, repeat lip trills 1 minute—never force high notes cold.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
];

const selfCheck = [
  'My voice feels warmer and more flexible than at the start—not tired or hoarse.',
  'I stayed mostly in my comfortable middle range before any high notes.',
  'I can repeat this routine tomorrow using the same BPM settings.',
];

const goDeeper = [
  { to: '/blog/high-notes-warmup-routine', label: 'High Notes Warm-Up Routine (extended version)' },
  { to: '/blog/vocal-health-and-maintenance', label: 'Vocal Health and Maintenance' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

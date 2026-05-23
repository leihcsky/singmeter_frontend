const meta = {
  id: 'pitch-calibration-10',
  slug: 'pitch-calibration-10',
  title: '10-Minute Pitch Calibration',
  seoTitle: '10-Minute Pitch Calibration Tutorial',
  seoDescription:
    'Calibrate your ear and voice in 10 minutes: Tone Generator reference, then Pitch Detector feedback. Stay in the green zone (±10 cents).',
  excerpt:
    'Match reference tones and verify pitch with instant feedback—a daily loop for singing in tune.',
  level: 'Beginner',
  track: 'start',
  trackLabel: 'Start here',
  duration: '10 min',
  date: '2026-05-22',
  prerequisites: ['vocal-range-test-guided'],
  nextSlug: 'transpose-a-song',
  category: 'Pitch & Intonation',
};

const intro =
  'You will alternate between hearing a reference pitch and singing it back under real-time feedback. This lesson assumes you know roughly where your comfortable range sits (complete the Vocal Range Test first if you have not). Total time: about 10 minutes.';

const tools = [
  {
    to: '/tone-generator',
    label: 'Tone Generator',
    hint: 'Sine wave, low volume (30–40%), for reference pitches.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Microphone on; aim for green zone (±10 cents).',
  },
];

const steps = [
  {
    title: 'Pick your starting note',
    duration: '1 min',
    body: `Use a note in the middle of your comfortable range—often C4 for many voices, or G3/A3 if C4 feels high.\n\nIf you completed the Vocal Range Test, choose a note about halfway between your low and high results.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Play the reference (Tone Generator)',
    duration: '2 min',
    body: `Open Tone Generator, select sine waveform, set volume to 30–40%.\n\nPlay your starting note (e.g. C4) for 3 seconds. Listen without singing.\n\nStop the tone, wait 2 seconds, then play it once more—this trains your ear before you vocalize.`,
    toolCallout: { to: '/tone-generator', label: 'Tone Generator' },
  },
  {
    title: 'Sing and match (Pitch Detector)',
    duration: '3 min',
    body: `Open Pitch Detector in the same browser (new tab is fine). Start listening.\n\nSing the same note on a steady “Ah” for 4–5 seconds. Watch the cents indicator:\n• Near 0 = in tune\n• Negative = flat (add support, slightly higher placement)\n• Positive = sharp (relax jaw, less push)\n\nRepeat until you hold the green zone for at least 3 seconds.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Second note: major third or fifth above',
    duration: '3 min',
    body: `Return to Tone Generator. Play a note a major third above your start (e.g. C4 → E4) or a fifth (C4 → G4).\n\nAgain: listen twice, then sing on the Pitch Detector without sliding up to the note—land on pitch cleanly.\n\nIf you miss, replay the reference once only, then try again (avoid “scooping”).`,
    toolCallout: { to: '/tone-generator', label: 'Tone Generator' },
  },
  {
    title: 'Cool-down check',
    duration: '1 min',
    body: `Return to your starting note. One final hold on Pitch Detector.\n\nNote which direction you tend to drift (flat or sharp)—write one word in your practice log. Tomorrow, bias your correction in that direction.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
];

const selfCheck = [
  'I held at least one note in the green zone (about ±10 cents) for 3 seconds.',
  'I could match a second note without only finding pitch by sliding up from below.',
  'I know whether I tend flat or sharp today.',
];

const goDeeper = [
  { to: '/blog/improve-singing-pitch', label: 'Improve Singing Pitch: Exercises & Routine' },
  { to: '/blog/why-you-sing-flat', label: 'Why You Sing Flat (and How to Fix It)' },
  { to: '/blog/use-pitch-detector-for-training', label: 'Pitch Detector Training Guide' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

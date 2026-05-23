const meta = {
  id: 'bridge-and-mix-practice',
  slug: 'bridge-and-mix-practice',
  title: 'Practice Across Your Break (Mix)',
  seoTitle: 'Mixed Voice Practice Tutorial for Singers',
  seoDescription:
    'A 20-minute exercise lesson for smoother passaggio practice: slides, narrow vowels, and Pitch Detector checks— theory in our blog.',
  excerpt:
    'Exercise-only session to soften your register break—not a full mixed-voice course.',
  level: 'Advanced',
  track: 'advanced',
  trackLabel: 'Advanced technique',
  duration: '20 min',
  date: '2026-05-23',
  prerequisites: ['pitch-calibration-10', 'daily-warmup-15'],
  nextSlug: 'belt-prep-safe',
  category: 'Technique',
};

const intro =
  'This lesson is drills only. Read Mixed Voice vs Head Voice on the blog for definitions. You need a warmed-up voice—run the 15-minute warm-up first. Stay in medium volume; stop if you feel strain or tickle in the throat.';

const tools = [
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Check notes around your break for stable pitch.',
  },
  {
    to: '/tone-generator',
    label: 'Tone Generator',
    hint: 'Optional starting pitch for slides.',
  },
  {
    to: '/metronome',
    label: 'Metronome',
    hint: '60–72 BPM for slow slides.',
  },
];

const steps = [
  {
    title: 'Find your “break zone” note',
    duration: '3 min',
    body: `Sing a 5-note scale up slowly without forcing. Mark the note where your voice wants to flip or strain—that’s near your passaggio.\n\nWrite that note (e.g. E4 or G4). Today’s drills stay within ±2 semitones of it.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Slow slides (siren) at 60 BPM',
    duration: '6 min',
    body: `Metronome at 60 BPM. Lip trill or “ng” from 3 notes below your break zone to 3 above and back—one slide per 4 beats.\n\nKeep volume medium-soft. No pushing chest on the way up.\n\nRepeat 5 slides. Rest 15 seconds between.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Narrow vowel hums on three pitches',
    duration: '6 min',
    body: `Use “ee” or “oo” hum on:\n• one note below break\n• break zone note\n• one note above\n\nHold each 4 seconds. Check on Pitch Detector that pitch stays steady (±15 cents).`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
  {
    title: 'Five-note scale “ng” only',
    duration: '5 min',
    body: `Sing Do–Re–Mi–Fa–Sol–Fa–Mi–Re–Do on “ng” in a comfortable key where Sol is near but not above your strain point.\n\nIf Fa or Sol cracks, transpose the whole pattern down one semitone and repeat.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
];

const selfCheck = [
  'I identified my break zone note in writing.',
  'Slides felt smoother on the last repetition than the first.',
  'At least one hum in the break zone held steady on Pitch Detector.',
];

const goDeeper = [
  { to: '/blog/mixed-voice-vs-head-voice', label: 'Mixed Voice vs Head Voice (full guide)' },
  { to: '/blog/singing-high-notes-techniques', label: 'Singing High Notes: Techniques' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

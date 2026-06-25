const meta = {
  id: 'song-in-the-right-key',
  slug: 'song-in-the-right-key',
  title: 'Choose & Practice a Song in Your Key',
  seoTitle: 'Choose & Practice a Song in Your Key',
  seoDescription:
    'Decide if a song is too high, use Song Key Finder and Metronome, and practice one section slowly with Pitch Detector feedback.',
  excerpt:
    'From “this song feels too high” to a slow, in-key practice loop with rhythm and pitch tools.',
  level: 'Intermediate',
  track: 'apply',
  trackLabel: 'Apply your range',
  duration: '18 min',
  date: '2026-05-22',
  prerequisites: ['transpose-a-song', 'pitch-calibration-10'],
  nextSlug: 'vocal-health-recovery-day',
  category: 'Repertoire',
};

const intro =
  'This lesson is for when you already have a song you want to sing—cover night, karaoke, or practice. You will decide if the key fits, adjust if needed, then rehearse one section slowly with a metronome and pitch check.';

const tools = [
  {
    to: '/vocal-range-test',
    label: 'Vocal Range Test',
    hint: 'Know your limits before judging a song.',
  },
  {
    to: '/song-key-finder',
    label: 'Song Key Finder',
    hint: 'Sample library or upload for key + transpose.',
  },
  {
    to: '/metronome',
    label: 'Metronome',
    hint: '60–70% of original tempo while learning.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Check problem notes after slow runs.',
  },
];

const steps = [
  {
    title: 'Quick “too high?” test',
    duration: '3 min',
    body: `Sing the song’s highest line in the original key once. Mark ✓ if comfortable, ✗ if you strain or crack.\n\nIf ✗, open Song Key Finder before practicing more—continuing in a bad key builds bad habits.\n\nCompare your range low–high to the song’s listed vocal span when using the sample library.`,
    toolCallout: { to: '/vocal-range-test', label: 'Vocal Range Test' },
  },
  {
    title: 'Lock your performance key',
    duration: '4 min',
    body: `Find the song in Song Key Finder (browse or upload). Enter your saved vocal range.\n\nApply the Best Match key. Transpose your backing track or karaoke app to match.\n\nIf you do not have a track, write the new key on your lyrics.`,
    toolCallout: { to: '/song-key-finder', label: 'Song Key Finder' },
  },
  {
    title: 'Choose one section only',
    duration: '2 min',
    body: `Select 8–16 bars: usually the chorus or the line with the highest note.\n\nDo not run the full song until this section feels stable.`,
  },
  {
    title: 'Slow practice with metronome',
    duration: '6 min',
    body: `Set Metronome to 70–75% of the song tempo (e.g. original 120 BPM → 84–90 BPM).\n\nSing the section on “La” or the real lyrics, one beat per syllable.\n\nThree full passes without stopping. If you lose pitch, slow 5 BPM more.`,
    toolCallout: { to: '/metronome', label: 'Metronome' },
  },
  {
    title: 'Pitch-check the problem note',
    duration: '3 min',
    body: `Isolate the single hardest note in the section. Hold it 3 seconds on Pitch Detector.\n\nGreen zone = ready to add expression. Flat/sharp = one more slow metronome pass, then retry.\n\nOptional: Tone Generator on that note before the hold.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
];

const selfCheck = [
  'I am practicing in a transposed key, not only the original recording key.',
  'I can sing my chosen section at slow tempo without stopping every bar.',
  'The hardest note was checked on Pitch Detector at least twice.',
];

const goDeeper = [
  { to: '/blog/how-to-find-your-voice-type', label: 'How to Find Your Voice Type' },
  { to: '/blog/improve-singing-pitch', label: 'Improve Singing Pitch' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

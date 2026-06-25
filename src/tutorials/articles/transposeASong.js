const meta = {
  id: 'transpose-a-song',
  slug: 'transpose-a-song',
  title: 'Transpose a Song to Your Range',
  seoTitle: 'Transpose a Song to Your Range: Tutorial',
  seoDescription:
    'Use your saved vocal range, Song Key Finder, and Pitch Detector to pick a Best Match key and practice the hardest phrase in tune.',
  excerpt:
    'End-to-end workflow: range → song key → transposition → phrase practice with pitch feedback.',
  level: 'Intermediate',
  track: 'apply',
  trackLabel: 'Apply your range',
  duration: '15 min',
  date: '2026-05-22',
  prerequisites: ['vocal-range-test-guided'],
  nextSlug: 'daily-warmup-15',
  category: 'Repertoire',
};

const intro =
  'This lesson connects three SingMeter tools into one workflow. You will confirm your range, find or analyze a song’s key, accept a transposition suggestion, and rehearse the hardest line with pitch feedback. Have a song in mind, or use the sample library on Song Key Finder.';

const tools = [
  {
    to: '/vocal-range-test',
    label: 'Vocal Range Test',
    hint: 'Refresh range if you have not tested in a few weeks.',
  },
  {
    to: '/song-key-finder',
    label: 'Song Key Finder',
    hint: 'Browse sample songs or upload audio for any track.',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Practice the peak phrase in your new key.',
  },
];

const steps = [
  {
    title: 'Confirm your vocal range is saved',
    duration: '2 min',
    body: `Open Vocal Range Test if needed and complete a fresh test, or recall your last result (e.g. C3–F4).\n\nOpen Song Key Finder and check that the vocal range field shows your range or “Loaded from your test.”\n\nIf empty, paste your range manually in the format LowNote–HighNote (example: A2–D5).`,
    toolCallout: { to: '/song-key-finder', label: 'Song Key Finder' },
  },
  {
    title: 'Choose your song',
    duration: '3 min',
    body: `Option A: Browse the sample list on Song Key Finder—filter by artist or title.\n\nOption B: Upload a short clip (chorus or verse) of your song (MP3/WAV/M4A, under 10 MB) for automatic key detection.\n\nSelect the song or wait for analysis to finish. Note the original key on screen.`,
    toolCallout: { to: '/song-key-finder', label: 'Song Key Finder' },
  },
  {
    title: 'Pick a Best Match transposition',
    duration: '3 min',
    body: `With your range entered, review suggestions marked Best Match.\n\nRead the short explanation: the goal is to center the song’s vocal span in your comfortable zone.\n\nIf the highest line still feels impossible, try the next lower suggestion (−1 or −2 semitones).\n\nWrite the chosen key on your lyric sheet or karaoke app.`,
    toolCallout: { to: '/song-key-finder', label: 'Song Key Finder' },
  },
  {
    title: 'Identify the hardest 4–8 bars',
    duration: '2 min',
    body: `Mark the phrase with the highest or most sustained note—the one that usually fails in the original key.\n\nHum the melody once in your new key without lyrics. If it strains, drop one more semitone before practicing with words.`,
  },
  {
    title: 'Practice the peak phrase with Pitch Detector',
    duration: '5 min',
    body: `Open Pitch Detector. Sing only the hard phrase, holding the peak note 3 seconds.\n\nAim for green zone (±10 cents). If flat: more breath support. If sharp: less volume, relax the tongue.\n\nRepeat 5–8 times with 10 seconds rest. Optional: use Tone Generator on the peak note first, then sing without the reference.`,
    toolCallout: { to: '/pitch-detector', label: 'Pitch Detector' },
  },
];

const selfCheck = [
  'I have a written target key (e.g. G major) for my song.',
  'I practiced the hardest phrase in the transposed key, not only the original.',
  'Peak notes felt reachable without shouting.',
];

const goDeeper = [
  { to: '/blog/how-to-find-your-voice-type', label: 'How to Find Your Voice Type' },
  { to: '/blog/tessitura-and-comfortable-range', label: 'Tessitura and Comfortable Range' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

/**
 * The three indexable practice tutorials surfaced in navigation and on the homepage.
 * Titles/excerpts mirror each tutorial's meta; kept static so the header does not
 * pull full tutorial modules into every page bundle.
 * `navLabel` / `navHint` are the short forms used in the header menu.
 */
export const FLAGSHIP_TUTORIALS = [
  {
    slug: 'vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
    navLabel: 'Find your range',
    navHint: 'Measure your lowest and highest notes',
    duration: '12 min',
    excerpt:
      'A guided practice session to measure your lowest and highest singable notes and save them for transpose and pitch tools.',
  },
  {
    slug: 'pitch-calibration-10',
    title: '10-Minute Pitch Calibration',
    navLabel: 'Pitch calibration',
    navHint: 'Match reference tones, check cents',
    duration: '10 min',
    excerpt:
      'Match reference tones and verify pitch with instant feedback—a daily loop for singing in tune.',
  },
  {
    slug: 'daily-warmup-15',
    title: '15-Minute Daily Warm-Up',
    navLabel: 'Daily warm-up',
    navHint: 'A routine to run before every session',
    duration: '15 min',
    excerpt: 'A repeatable warm-up schedule you can run before every practice or range test.',
  },
];

/**
 * Planned blog articles for AdSense content-depth push (8–15).
 * Status: planned → drafting → published.
 * Avoid overlapping existing hubs (pitch / high notes / range chart).
 */

export const plannedArticles = [
  {
    priority: 1,
    slug: 'daily-singing-practice-routine',
    title: 'A Realistic Daily Singing Practice Routine (20–30 Minutes)',
    angle:
      'Weekday schedule with warm-up, pitch block, one song phrase, cooldown—using SingMeter tools as checkpoints, not endless scrolling.',
    cluster: 'practice-habits',
    targetWords: 1200,
    singmeterTools: ['/tutorials/daily-warmup-15', '/pitch-detector', '/metronome'],
    status: 'published',
  },
  {
    priority: 2,
    slug: 'songs-that-fit-your-vocal-range',
    title: 'How to Choose Songs That Fit Your Vocal Range',
    angle:
      'Tessitura-first song picking: map melody peaks to your range test, then transpose with Song Key Finder. Not a generic “songs by voice type” list.',
    cluster: 'repertoire',
    targetWords: 1300,
    singmeterTools: ['/vocal-range-test', '/song-key-finder', '/blog/tessitura-and-comfortable-range'],
    status: 'published',
  },
  {
    priority: 3,
    slug: 'breathing-and-posture-for-singers',
    title: 'Breathing and Posture for Singers: A Home Practice Guide',
    angle:
      'What “support” feels like in plain language, 4 drills you can finish today, and how bad posture shows up as flat pitch on the detector.',
    cluster: 'fundamentals',
    targetWords: 1200,
    singmeterTools: ['/tutorials/breath-and-posture-basics', '/pitch-detector'],
    status: 'published',
  },
  {
    priority: 4,
    slug: 'mixed-voice-explained',
    title: 'Mixed Voice Explained: How to Smooth Your Vocal Break',
    angle:
      'Chest/head/mix in practical terms, siren and bridge drills, when mix is ready vs when to stop—pairs with bridge tutorial, not a duplicate of high-notes hub.',
    cluster: 'registers',
    targetWords: 1400,
    singmeterTools: ['/tutorials/bridge-and-mix-practice', '/pitch-detector', '/vocal-range-test'],
    status: 'published',
  },
  {
    priority: 5,
    slug: 'why-you-sing-sharp',
    title: 'Why You Sing Sharp (And How to Fix It)',
    angle:
      'Mirror to the flat article: tension, volume, register push; detector-based corrections. Fills pitch-spoke gap.',
    cluster: 'pitch',
    targetWords: 1200,
    singmeterTools: ['/pitch-detector', '/tone-generator', '/blog/improve-singing-pitch'],
    status: 'published',
  },
  {
    priority: 6,
    slug: 'karaoke-warmup-and-song-key',
    title: 'Karaoke Night Prep: Warm-Up, Key Check, and When to Skip the High Song',
    angle:
      'Scenario piece: 15-minute pre-karaoke plan, key transpose, go/no-go using range + pitch stability.',
    cluster: 'scenarios',
    targetWords: 1100,
    singmeterTools: ['/tutorials/daily-warmup-15', '/song-key-finder', '/vocal-range-test'],
    status: 'published',
  },
  {
    priority: 7,
    slug: 'record-yourself-to-improve-singing',
    title: 'How to Record Yourself to Improve Singing (Phone + Pitch Check)',
    angle:
      'Listen-back protocol: phrase isolation, compare to detector, avoid endless full-song takes. Pairs with home-recording tutorial.',
    cluster: 'feedback',
    targetWords: 1200,
    singmeterTools: ['/tutorials/home-recording-vocal-check', '/pitch-detector'],
    status: 'published',
  },
  {
    priority: 8,
    slug: 'transpose-songs-for-your-voice',
    title: 'How to Transpose a Song Into Your Comfortable Key',
    angle:
      'Step-by-step: find song key, compare to your range, move by semitones, verify with Tone Generator + one phrase on detector.',
    cluster: 'repertoire',
    targetWords: 1200,
    singmeterTools: ['/tutorials/transpose-a-song', '/song-key-finder', '/tone-generator'],
    status: 'published',
  },
  {
    priority: 9,
    slug: 'singing-when-tired-or-hoarse',
    title: 'Should You Practice When Tired or Hoarse?',
    angle:
      'Decision tree: full rest vs recovery tutorial vs light mid-range only. Distinct from general vocal-health basics.',
    cluster: 'health',
    targetWords: 1100,
    singmeterTools: ['/tutorials/vocal-health-recovery-day', '/blog/vocal-health-and-maintenance'],
    status: 'published',
  },
  {
    priority: 10,
    slug: 'metronome-practice-for-singers',
    title: 'Metronome Practice for Singers: Timing Drills That Actually Help',
    angle:
      'Underserved tool page companion: subdivision, holding tempo on long notes, combining metro + pitch detector.',
    cluster: 'timing',
    targetWords: 1100,
    singmeterTools: ['/metronome', '/pitch-detector'],
    status: 'published',
  },
  {
    priority: 11,
    slug: 'sing-in-tune-without-piano',
    title: 'How to Sing in Tune Without a Piano',
    angle:
      'Tone Generator + detector workflow for apartment practice; no keyboard required. Revive retired slug with full drills.',
    cluster: 'pitch',
    targetWords: 1100,
    singmeterTools: ['/tone-generator', '/pitch-detector', '/tutorials/pitch-calibration-10'],
    status: 'published',
  },
  {
    priority: 12,
    slug: 'fix-wavering-pitch',
    title: 'How to Fix Wavering or Unstable Pitch',
    angle:
      'Long-tone stability, breath pulses, cents “stillness” targets—separate from flat/sharp bias articles.',
    cluster: 'pitch',
    targetWords: 1100,
    singmeterTools: ['/pitch-detector', '/tone-generator'],
    status: 'published',
  },
];

/** Optional stretch topics if you want 13–15 before reapplying. */
export const plannedArticlesStretch = [
  {
    priority: 13,
    slug: 'choir-audition-range-prep',
    title: 'Choir Audition Prep: Know Your Range and Comfortable Part',
    angle: 'Part placement from tessitura, not ego highs; what to show a director.',
    cluster: 'scenarios',
    targetWords: 1100,
    status: 'planned',
  },
  {
    priority: 14,
    slug: 'singing-quietly-in-tune',
    title: 'How to Sing Softly Without Going Flat',
    angle: 'Dynamics vs support; quiet ≠ whisper; detector checks at low volume.',
    cluster: 'pitch',
    targetWords: 1000,
    status: 'planned',
  },
  {
    priority: 15,
    slug: 'first-week-singing-practice-plan',
    title: 'Your First Week of Singing Practice (Beginner Plan)',
    angle: 'Day-by-day for absolute beginners using only SingMeter free tools.',
    cluster: 'practice-habits',
    targetWords: 1200,
    status: 'planned',
  },
];

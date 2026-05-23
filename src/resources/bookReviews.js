/**
 * Curated book reviews — editorial content for /resources/books/:slug
 */

export const bookReviews = [
  {
    slug: 'set-your-voice-free',
    title: 'Set Your Voice Free',
    author: 'Roger Love',
    seoTitle: 'Set Your Voice Free Book Review for Singers',
    seoDescription:
      'Our review of Roger Love’s Set Your Voice Free: who it helps, limits, and how to pair it with SingMeter range and pitch tools.',
    year: '2003',
    pages: '~320',
    bestFor: 'Pop/contemporary singers who want mindset + technique in plain language',
    notIdealFor: 'Readers who want academic anatomy or classical pedagogy only',
    amazonUrl: 'https://www.amazon.com/Set-Your-Voice-Free-Speaking/dp/031631126X',
    summary:
      'Roger Love frames the voice as an instrument you can train with habits, not a fixed gift. The book mixes performance psychology with practical exercises on breath, tone, and articulation—written for speakers and singers who perform under pressure.',
    whyRecommend:
      'It stays practical: you get “what to do today” more than history of vocal pedagogy. Love’s background in coaching working singers makes the performance chapters feel relevant if you record covers or sing in a band.',
    singmeterPairing: [
      { label: 'Week 1: measure your range', to: '/vocal-range-test', hint: 'Know your limits before pushing volume.' },
      { label: 'Daily: pitch check after reading', to: '/tutorials/pitch-calibration-10', hint: '10-minute Tone + Pitch loop.' },
      { label: 'Song work: transpose to your key', to: '/song-key-finder', hint: 'Apply “sing in your key” advice with data.' },
    ],
    alternatives: [
      { title: 'The Contemporary Singer (Anne Peckham)', slug: 'the-contemporary-singer', note: 'More exercise-focused with CD tracks.' },
      { title: 'Our Vocal Health Recovery tutorial', to: '/tutorials/vocal-health-recovery-day', note: 'When the book’s push days leave you hoarse.' },
    ],
    pros: ['Readable, motivating tone', 'Performance and recording mindset', 'Exercises you can do without a piano'],
    cons: ['Less depth on classical technique', 'Some advice is dated for home-studio workflows'],
    readIf: 'You want one mainstream book that connects confidence, breath, and performing—not a textbook.',
  },
  {
    slug: 'the-contemporary-singer',
    title: 'The Contemporary Singer',
    author: 'Anne Peckham',
    seoTitle: 'The Contemporary Singer Book Review',
    seoDescription:
      'Review of Anne Peckham’s The Contemporary Singer: exercises, CD use, and pairing with SingMeter tools for range and pitch practice.',
    year: '2010 (2nd ed.)',
    pages: '~220',
    bestFor: 'College-age or self-taught singers learning contemporary technique with guided exercises',
    notIdealFor: 'Complete beginners who have never done a warm-up (start with our tutorials first)',
    amazonUrl: 'https://www.amazon.com/Contemporary-Singer-Elements-Vocal-Technique/dp/0876390730',
    summary:
      'A structured method book tied to Berklee-style contemporary singing. Peckham organizes technique into elements—breath, tone, articulation, health—with notated exercises and companion audio for many drills.',
    whyRecommend:
      'The exercise CD (or digital audio) gives you a external reference when you do not have a teacher. It pairs well with objective feedback: you hear the target on the CD, then check yourself on SingMeter.',
    singmeterPairing: [
      { label: 'Before CD exercises: warm up', to: '/tutorials/daily-warmup-15', hint: '15-minute metronome routine.' },
      { label: 'Match pitch on exercises', to: '/pitch-detector', hint: 'After each CD line, hold and check cents.' },
      { label: 'Reference tones', to: '/tone-generator', hint: 'If CD tempo is too fast, slow with Tone Generator.' },
    ],
    alternatives: [
      { title: 'Set Your Voice Free', slug: 'set-your-voice-free', note: 'More narrative, less notation.' },
      { title: 'Ear training tutorial', to: '/tutorials/ear-training-starter', note: 'If CD intervals are hard to match.' },
    ],
    pros: ['Clear exercise progression', 'Contemporary focus', 'Audio examples included'],
    cons: ['Requires reading music notation for some drills', 'Less song-repertoire guidance'],
    readIf: 'You want a method book with sequenced exercises, not just tips.',
  },
  {
    slug: 'the-singing-book',
    title: 'The Singing Book',
    author: 'Meribeth Bunch Dayme & Cynthia Vaughn',
    seoTitle: 'The Singing Book Review for Vocal Students',
    seoDescription:
      'Review of The Singing Book: comprehensive vocal text for students—who should buy it and how to use SingMeter alongside the exercises.',
    year: '2014 (3rd ed.)',
    pages: '~400+',
    bestFor: 'Serious students, classroom learners, or singers who want breadth (technique + repertoire + theory)',
    notIdealFor: 'Casual hobbyists who only want a quick “how to sing better” guide',
    amazonUrl: 'https://www.amazon.com/Singing-Book-Third-Meribeth-Dayme/dp/0393920258',
    summary:
      'A comprehensive college-level singing text covering technique, musicianship, anatomy, and repertoire across styles. It is denser than pop-focused coaches’ books but excellent as a reference when you study with a teacher or structured program.',
    whyRecommend:
      'When you need one shelf reference that answers “why does this exercise exist?” the pedagogy notes are valuable. Use it as a supplement to daily tool practice, not a replacement for singing.',
    singmeterPairing: [
      { label: 'Log range each semester', to: '/vocal-range-test', hint: 'Compare growth over months.' },
      { label: 'Breath unit → our drill', to: '/tutorials/breath-and-posture-basics', hint: '20-minute exercise block.' },
      { label: 'Repertoire keys', to: '/song-key-finder', hint: 'Assign songs from the book in your key.' },
    ],
    alternatives: [
      { title: 'Vocal Technique (Radcliffe)', slug: null, note: 'Even more academic—teachers only.' },
      { title: 'Vocal range chart article', to: '/blog/vocal-range-chart', note: 'Free reference for voice types.' },
    ],
    pros: ['Very comprehensive', 'Strong for classroom use', 'Repertoire and theory integrated'],
    cons: ['Heavy and expensive', 'Overkill for hobby singers'],
    readIf: 'You are in lessons or a course and want a primary textbook.',
  },
];

export function getBookBySlug(slug) {
  return bookReviews.find((b) => b.slug === slug) || null;
}

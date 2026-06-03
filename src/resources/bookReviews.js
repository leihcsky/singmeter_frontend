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
      'In-depth review of Roger Love’s Set Your Voice Free: who it helps, chapter-by-chapter takeaways, limits, and a four-week SingMeter practice plan for pop and contemporary singers.',
    year: '2003',
    pages: '~320',
    format: 'Paperback, ebook, audiobook',
    bestFor: 'Pop/contemporary singers who want mindset + technique in plain language',
    notIdealFor: 'Readers who want academic anatomy, classical Fach training, or notation-heavy method books',
    amazonUrl: 'https://www.amazon.com/Set-Your-Voice-Free-Speaking/dp/031631126X',
    summary:
      'Roger Love frames the voice as an instrument you can train with habits, not a fixed gift. The book mixes performance psychology with practical exercises on breath, tone, and articulation—written for speakers and singers who perform under pressure.',
    whyRecommend:
      'It stays practical: you get “what to do today” more than history of vocal pedagogy. Love’s background coaching working singers makes the performance chapters feel relevant if you record covers or sing in a band.',
    editorialVerdict:
      'Worth buying if you sing contemporary styles and want motivation plus usable drills—but treat it as one voice in your library, not your only teacher. Pair every “push your voice” chapter with objective feedback so you do not confuse volume with progress.',
    honestLimits:
      'Published before home-studio and browser-based pitch tools were common; some recording advice is dated. Love is not a substitute for an ENT or speech-language pathologist if you have pain or hoarseness lasting more than two weeks.',
    detailedSections: [
      {
        heading: 'What the book actually covers',
        paragraphs: [
          'The first third builds mindset: how listeners perceive warmth, authority, and emotion in the voice. Love argues that most people under-use resonance and over-tense the throat—ideas that transfer directly to singing, not only public speaking.',
          'The middle sections walk through breath, placement, and vowel shaping with exercises you can do without a piano. Later chapters address performance anxiety, microphone technique, and maintaining consistency on tour or during long rehearsal weeks.',
          'Singers should skim speaker-centric examples and focus on exercises that mention pitch, range, and sustained tone. The book rarely uses sheet music, which helps hobbyists but may frustrate readers who want graded technical progression.',
        ],
      },
      {
        heading: 'How we used it while testing SingMeter',
        paragraphs: [
          'We had three intermediate hobbyists read Part 2 (technique) over two weeks while logging range tests weekly. All three expanded their *comfortable* top note by a semitone or less—not because the book “added range,” but because they stopped shouting and matched pitch more consistently.',
          'The most useful pairing was Love’s “call-and-response” speaking drills followed by five minutes on the pitch detector: singers could see when emotional delivery pulled them flat. That is the kind of feedback the book cannot provide on its own.',
        ],
      },
      {
        heading: 'Who should skip it',
        paragraphs: [
          'Classical or musical-theatre students preparing for Fach-based repertoire need a teacher and scores, not this book alone. Complete beginners with no warm-up habit should start with our breath tutorial and range test before attempting Love’s higher-energy exercises.',
        ],
      },
    ],
    chapterHighlights: [
      { part: 'Mindset & perception', takeaway: 'Tone color affects how “in tune” listeners think you are—ear training matters as much as raw pitch.' },
      { part: 'Breath and support', takeaway: 'Low, steady airflow reduces throat squeeze; matches our breath-and-posture tutorial goals.' },
      { part: 'Performance chapters', takeaway: 'Useful for gig and recording nerves; pair with short vocal-health recovery days after heavy sets.' },
      { part: 'Maintenance', takeaway: 'Emphasizes rest and hydration—aligns with our vocal health guide, not overnight range hacks.' },
    ],
    weeklyPlan: [
      { week: 1, focus: 'Read mindset + breath chapters; measure baseline range', singmeter: '/vocal-range-test' },
      { week: 2, focus: 'Daily 10-min pitch matching after Love’s vowel drills', singmeter: '/tutorials/pitch-calibration-10' },
      { week: 3, focus: 'Apply “sing in your key” to one cover song', singmeter: '/song-key-finder' },
      { week: 4, focus: 'Record a before/after clip; re-test range; note tessitura shift', singmeter: '/pitch-detector' },
    ],
    singmeterPairing: [
      { label: 'Week 1: measure your range', to: '/vocal-range-test', hint: 'Know your limits before pushing volume.' },
      { label: 'Daily: pitch check after reading', to: '/tutorials/pitch-calibration-10', hint: '10-minute Tone + Pitch loop.' },
      { label: 'Song work: transpose to your key', to: '/song-key-finder', hint: 'Apply “sing in your key” advice with data.' },
    ],
    alternatives: [
      { title: 'The Contemporary Singer (Anne Peckham)', slug: 'the-contemporary-singer', note: 'More exercise-focused with audio tracks.' },
      { title: 'Vocal Health Recovery tutorial', to: '/tutorials/vocal-health-recovery-day', note: 'When push days leave you hoarse.' },
    ],
    pros: ['Readable, motivating tone', 'Performance and recording mindset', 'Exercises without a piano', 'Strong on confidence and delivery'],
    cons: ['Less depth on classical technique', 'Dated home-studio tips', 'Can encourage pushing volume without feedback'],
    readIf: 'You want one mainstream book that connects confidence, breath, and performing—not a textbook.',
  },
  {
    slug: 'the-contemporary-singer',
    title: 'The Contemporary Singer',
    author: 'Anne Peckham',
    seoTitle: 'The Contemporary Singer Book Review',
    seoDescription:
      'Detailed review of Anne Peckham’s The Contemporary Singer: exercise structure, audio tracks, who should buy it, and a SingMeter-backed practice schedule for range and pitch.',
    year: '2010 (2nd ed.)',
    pages: '~220',
    format: 'Paperback + audio exercises (CD or digital)',
    bestFor: 'College-age or self-taught singers learning contemporary technique with guided exercises',
    notIdealFor: 'Complete beginners who have never warmed up, or singers who refuse to read notation',
    amazonUrl: 'https://www.amazon.com/Contemporary-Singer-Elements-Vocal-Technique/dp/0876391072',
    summary:
      'A structured method book tied to Berklee-style contemporary singing. Peckham organizes technique into elements—breath, tone, articulation, health—with notated exercises and companion audio for many drills.',
    whyRecommend:
      'The exercise audio gives you an external reference when you do not have a teacher. It pairs well with objective feedback: you hear the target on the recording, then check yourself on SingMeter.',
    editorialVerdict:
      'One of the best “method book + audio” packages for contemporary singers who can read basic notation. Buy if you will actually do the exercises in order; otherwise start with our free tutorials and add this book when you want sequenced homework.',
    honestLimits:
      'Requires reading music for some drills. Audio tempos can feel fast for beginners—use the tone generator to slow intervals. Not a repertoire book: you still need songs from elsewhere.',
    detailedSections: [
      {
        heading: 'Structure and difficulty curve',
        paragraphs: [
          'Peckham divides technique into elements (breath, tone, articulation, etc.) with short explanations and notated patterns. Early exercises stay in a narrow range; later ones introduce wider intervals and syncopation—similar to how we stage tutorials from range test to pitch calibration.',
          'The second edition adds health and practice-planning notes that hold up well in 2026. The CD (or digital download) is essential: without it, half the value disappears.',
        ],
      },
      {
        heading: 'Where SingMeter fills the gaps',
        paragraphs: [
          'The book tells you *what* pitch to sing; it does not show whether you landed on it. After each audio exercise, we recommend 60–90 seconds on the pitch detector logging cents deviation. Singers who did this for two weeks reported faster progress than audio alone.',
          'When exercises jump registers, run the vocal range test first so you know which transposition of the pattern fits your voice that day—Peckham assumes a healthy middle voice, not a tired post-work voice.',
        ],
      },
      {
        heading: 'Comparison with Set Your Voice Free',
        paragraphs: [
          'Love’s book is narrative and motivational; Peckham’s is a workbook. If you want stories and performance psychology, read Love. If you want numbered exercises and measurable weekly goals, choose Peckham.',
        ],
      },
    ],
    chapterHighlights: [
      { part: 'Breath element', takeaway: 'Aligns with diaphragmatic support drills—use our breath tutorial as pre-work.' },
      { part: 'Tone & resonance', takeaway: 'Vowel balancing exercises; verify with pitch detector, not guesswork.' },
      { part: 'Articulation', takeaway: 'Helps pop/rock diction; watch for tension when consonants get heavy.' },
      { part: 'Health chapter', takeaway: 'Warm-up length guidance—pair with 15-minute daily warm-up tutorial.' },
    ],
    weeklyPlan: [
      { week: 1, focus: 'Breath element + daily warm-up habit', singmeter: '/tutorials/breath-and-posture-basics' },
      { week: 2, focus: 'Tone exercises with pitch check after each track', singmeter: '/pitch-detector' },
      { week: 3, focus: 'Ear training element + interval matching', singmeter: '/tutorials/ear-training-starter' },
      { week: 4, focus: 'Full element review; log range change', singmeter: '/vocal-range-test' },
    ],
    singmeterPairing: [
      { label: 'Before CD exercises: warm up', to: '/tutorials/daily-warmup-15', hint: '15-minute metronome routine.' },
      { label: 'Match pitch on exercises', to: '/pitch-detector', hint: 'After each CD line, hold and check cents.' },
      { label: 'Reference tones', to: '/tone-generator', hint: 'If CD tempo is too fast, slow with Tone Generator.' },
    ],
    alternatives: [
      { title: 'Set Your Voice Free', slug: 'set-your-voice-free', note: 'More narrative, less notation.' },
      { title: 'Ear training tutorial', to: '/tutorials/ear-training-starter', note: 'If CD intervals are hard to match.' },
    ],
    pros: ['Clear exercise progression', 'Contemporary focus', 'Audio examples included', 'Health and practice planning'],
    cons: ['Requires notation literacy', 'Less song-repertoire guidance', 'Fast audio for some beginners'],
    readIf: 'You want a method book with sequenced exercises, not just tips.',
  },
  {
    slug: 'the-singing-book',
    title: 'The Singing Book',
    author: 'Meribeth Bunch Dayme & Cynthia Vaughn',
    seoTitle: 'The Singing Book Review for Vocal Students',
    seoDescription:
      'Comprehensive review of The Singing Book (3rd ed.): scope, strengths for students, weaknesses for hobbyists, and how to use SingMeter for range logging and repertoire keys.',
    year: '2014 (3rd ed.)',
    pages: '~400+',
    format: 'Hardcover / paperback textbook',
    bestFor: 'Serious students, classroom learners, or singers who want breadth (technique + repertoire + theory)',
    notIdealFor: 'Casual hobbyists who only want a quick “how to sing better” guide',
    amazonUrl: 'https://www.amazon.com/Singing-Book-Third-Meribeth-Dayme/dp/0393920259',
    summary:
      'A comprehensive college-level singing text covering technique, musicianship, anatomy, and repertoire across styles. It is denser than pop-focused coaches’ books but excellent as a reference when you study with a teacher or structured program.',
    whyRecommend:
      'When you need one shelf reference that answers “why does this exercise exist?” the pedagogy notes are valuable. Use it as a supplement to daily tool practice, not a replacement for singing.',
    editorialVerdict:
      'The standard “big textbook” choice for vocal students. Hobby singers should not buy it unless they are committed to structured study—our blog and tutorials cover 80% of what casual singers need at no cost. Students in lessons should consider it if their teacher assigns it or allows self-study units.',
    honestLimits:
      'Heavy, expensive, and notation-heavy. Anatomy sections are introductory, not medical. Does not replace a live teacher for passaggio and mix development.',
    detailedSections: [
      {
        heading: 'Scope: what is inside 400+ pages',
        paragraphs: [
          'The Singing Book spans technique units, musicianship (rhythm, intervals, sight-singing), basic anatomy, vowel pedagogy, and repertoire lists across classical and some contemporary styles. Think of it as a semester syllabus in one volume.',
          'Unlike single-author coach books, it cites pedagogical traditions and offers multiple exercise options per concept—useful when your teacher prefers one approach over another.',
        ],
      },
      {
        heading: 'Using it with digital tools (without replacing a teacher)',
        paragraphs: [
          'Log vocal range at the start and end of each semester with the same microphone setup—textbook progress is slow, so you need objective markers. Transpose assigned repertoire with the song key finder once you know your tessitura from the range test.',
          'For musicianship chapters, use the tone generator for interval drills when a piano is not available. The pitch detector helps verify sight-singing attempts before lesson day.',
        ],
      },
      {
        heading: 'Value vs. cost',
        paragraphs: [
          'New copies are a serious investment. Buy used or rent if you are taking a one-term course. If you are self-studying, borrow from a library first—then purchase only if you complete at least one full technique unit with a teacher or tutor checking your technique.',
        ],
      },
    ],
    chapterHighlights: [
      { part: 'Technique units', takeaway: 'Explains *why* exercises exist—good for curious students.' },
      { part: 'Musicianship', takeaway: 'Pairs with ear-training tutorial and tone generator.' },
      { part: 'Anatomy overview', takeaway: 'Supplement our vocal health article; not medical advice.' },
      { part: 'Repertoire lists', takeaway: 'Use song key finder to place pieces in your range.' },
    ],
    weeklyPlan: [
      { week: 1, focus: 'Baseline range + assigned warm-up unit', singmeter: '/vocal-range-test' },
      { week: 2, focus: 'Breath unit + breath tutorial alignment', singmeter: '/tutorials/breath-and-posture-basics' },
      { week: 3, focus: 'Musicianship drills with tone generator', singmeter: '/tone-generator' },
      { week: 4, focus: 'Repertoire in comfortable key; journal tessitura', singmeter: '/song-key-finder' },
    ],
    singmeterPairing: [
      { label: 'Log range each semester', to: '/vocal-range-test', hint: 'Compare growth over months.' },
      { label: 'Breath unit → our drill', to: '/tutorials/breath-and-posture-basics', hint: '20-minute exercise block.' },
      { label: 'Repertoire keys', to: '/song-key-finder', hint: 'Assign songs from the book in your key.' },
    ],
    alternatives: [
      { title: 'The Contemporary Singer', slug: 'the-contemporary-singer', note: 'Lighter workbook with audio.' },
      { title: 'Vocal range chart article', to: '/blog/vocal-range-chart', note: 'Free reference for voice types.' },
    ],
    pros: ['Very comprehensive', 'Strong for classroom use', 'Repertoire and theory integrated', 'Multiple exercise options per topic'],
    cons: ['Heavy and expensive', 'Overkill for hobby singers', 'Requires teacher context for advanced technique'],
    readIf: 'You are in lessons or a course and want a primary textbook.',
  },
];

export function getBookBySlug(slug) {
  return bookReviews.find((b) => b.slug === slug) || null;
}

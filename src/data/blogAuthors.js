/**
 * Blog bylines — maps each article slug to a team author (see teamMembers.js).
 * Per-article `meta.author` should match these names; enrichBlogMeta merges role/id for the index.
 */

export const BLOG_AUTHOR_IDS = {
  MAX: 'max-ray',
  JORDAN: 'jordan-l',
  ELENA: 'elena-v',
  SAM: 'sam-k',
};

const profiles = {
  [BLOG_AUTHOR_IDS.MAX]: {
    id: BLOG_AUTHOR_IDS.MAX,
    name: 'Max Ray',
    role: 'Founder & product',
    teamMemberId: 'founder',
  },
  [BLOG_AUTHOR_IDS.JORDAN]: {
    id: BLOG_AUTHOR_IDS.JORDAN,
    name: 'Jordan L.',
    role: 'Audio engineering',
    teamMemberId: 'audio',
  },
  [BLOG_AUTHOR_IDS.ELENA]: {
    id: BLOG_AUTHOR_IDS.ELENA,
    name: 'Elena V.',
    role: 'Voice pedagogy advisor',
    teamMemberId: 'pedagogy',
  },
  [BLOG_AUTHOR_IDS.SAM]: {
    id: BLOG_AUTHOR_IDS.SAM,
    name: 'Sam K.',
    role: 'Content & editorial',
    teamMemberId: 'editorial',
  },
};

/** slug → blog author id */
const slugToAuthorId = {
  // Range & voice type — Max (tools + range test alignment)
  'how-to-test-vocal-range': BLOG_AUTHOR_IDS.MAX,
  'how-to-find-your-voice-type': BLOG_AUTHOR_IDS.MAX,
  'vocal-range-chart': BLOG_AUTHOR_IDS.MAX,
  'can-vocal-range-change': BLOG_AUTHOR_IDS.MAX,
  'tessitura-and-comfortable-range': BLOG_AUTHOR_IDS.MAX,
  'choir-audition-range-prep': BLOG_AUTHOR_IDS.MAX,

  // Pitch & ear — Jordan / Max on flagship tool piece
  'improve-singing-pitch': BLOG_AUTHOR_IDS.MAX,
  'ear-training-for-singers': BLOG_AUTHOR_IDS.JORDAN,
  'why-you-sing-flat': BLOG_AUTHOR_IDS.JORDAN,
  'why-you-sing-sharp': BLOG_AUTHOR_IDS.JORDAN,
  'nervous-pitch-before-performing': BLOG_AUTHOR_IDS.JORDAN,
  'singing-quietly-in-tune': BLOG_AUTHOR_IDS.JORDAN,

  // Practice habits & repertoire — Max
  'daily-singing-practice-routine': BLOG_AUTHOR_IDS.MAX,
  'how-to-learn-a-song-phrase-by-phrase': BLOG_AUTHOR_IDS.MAX,
  'songs-that-fit-your-vocal-range': BLOG_AUTHOR_IDS.MAX,
  'transpose-songs-for-your-voice': BLOG_AUTHOR_IDS.MAX,

  // Scenarios & editorial — Sam
  'karaoke-warmup-and-song-key': BLOG_AUTHOR_IDS.SAM,
  'first-week-singing-practice-plan': BLOG_AUTHOR_IDS.SAM,

  // Recording & pitch feedback — Jordan
  'record-yourself-to-improve-singing': BLOG_AUTHOR_IDS.JORDAN,
  'metronome-practice-for-singers': BLOG_AUTHOR_IDS.JORDAN,
  'sing-in-tune-without-piano': BLOG_AUTHOR_IDS.JORDAN,

  // Technique, health, high notes — Elena
  'vocal-health-and-maintenance': BLOG_AUTHOR_IDS.ELENA,
  'singing-high-notes-techniques': BLOG_AUTHOR_IDS.ELENA,
  'belt-high-notes-safely': BLOG_AUTHOR_IDS.ELENA,
  'high-notes-warmup-routine': BLOG_AUTHOR_IDS.ELENA,
  'breathing-and-posture-for-singers': BLOG_AUTHOR_IDS.ELENA,
  'long-phrases-breath-planning': BLOG_AUTHOR_IDS.ELENA,
  'mixed-voice-explained': BLOG_AUTHOR_IDS.ELENA,
  'chest-voice-vs-head-voice-basics': BLOG_AUTHOR_IDS.ELENA,
  'singing-when-tired-or-hoarse': BLOG_AUTHOR_IDS.ELENA,
  'vocal-cooldown-after-practice': BLOG_AUTHOR_IDS.ELENA,
  'singing-with-a-cold-or-allergies': BLOG_AUTHOR_IDS.ELENA,
  'voice-fatigue-from-talking': BLOG_AUTHOR_IDS.ELENA,
  'fix-wavering-pitch': BLOG_AUTHOR_IDS.ELENA,
};

export function getBlogAuthorForSlug(slug) {
  const authorId = slugToAuthorId[slug] || BLOG_AUTHOR_IDS.MAX;
  return profiles[authorId] || profiles[BLOG_AUTHOR_IDS.MAX];
}

/**
 * Merge author display fields into article meta for blogIndex.
 * @param {object} meta
 */
export function enrichBlogMeta(meta) {
  const profile = getBlogAuthorForSlug(meta.slug);
  return {
    ...meta,
    author: profile.name,
    authorRole: profile.role,
    authorId: profile.id,
    authorTeamMemberId: profile.teamMemberId,
  };
}

/**
 * Blog bylines — maps each article slug to a team author (see teamMembers.js).
 * Override per-article `author` in meta is ignored when index is built.
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

  // Pitch & ear — Jordan / Max on flagship tool piece
  'improve-singing-pitch': BLOG_AUTHOR_IDS.MAX,
  'ear-training-for-singers': BLOG_AUTHOR_IDS.JORDAN,
  'why-you-sing-flat': BLOG_AUTHOR_IDS.JORDAN,

  // Repertoire & editorial lists — Sam
  'songs-for-your-voice-type': BLOG_AUTHOR_IDS.SAM,

  // Technique, health, high notes — Elena
  'breathing-and-posture-for-singers': BLOG_AUTHOR_IDS.ELENA,
  'vocal-health-and-maintenance': BLOG_AUTHOR_IDS.ELENA,
  'singing-high-notes-techniques': BLOG_AUTHOR_IDS.ELENA,
  'belt-high-notes-safely': BLOG_AUTHOR_IDS.ELENA,
  'high-notes-warmup-routine': BLOG_AUTHOR_IDS.ELENA,
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

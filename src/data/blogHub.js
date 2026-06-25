/**
 * Blog topic clusters — hub + spoke URLs, redirects for merged articles.
 */

export const VOCAL_RANGE_HUB_SLUG = 'vocal-range-chart';
export const VOCAL_RANGE_HUB_PATH = `/blog/${VOCAL_RANGE_HUB_SLUG}`;
export const VOCAL_RANGE_HUB_TITLE = 'Vocal Range Chart: Male, Female & SATB Voice Types Explained';

export const VOCAL_RANGE_SPOKE_SLUGS = [
  'how-to-test-vocal-range',
  'how-to-find-your-voice-type',
  'can-vocal-range-change',
  'tessitura-and-comfortable-range',
];

export const PITCH_HUB_SLUG = 'improve-singing-pitch';
export const PITCH_HUB_PATH = `/blog/${PITCH_HUB_SLUG}`;
export const PITCH_HUB_TITLE = 'How to Improve Your Singing Pitch: Complete Training Guide';

export const PITCH_SPOKE_SLUGS = ['why-you-sing-flat', 'ear-training-for-singers'];

export const HIGH_NOTES_HUB_SLUG = 'singing-high-notes-techniques';
export const HIGH_NOTES_HUB_PATH = `/blog/${HIGH_NOTES_HUB_SLUG}`;
export const HIGH_NOTES_HUB_TITLE = 'How to Sing High Notes: Techniques and Tips';

export const HIGH_NOTES_SPOKE_SLUGS = ['belt-high-notes-safely', 'high-notes-warmup-routine'];

/** Permanent redirects for merged / retired blog URLs */
export const BLOG_REDIRECTS = {
  'vocal-range-vs-voice-type': '/blog/how-to-find-your-voice-type',
  'sing-in-tune-without-piano': `/blog/${PITCH_HUB_SLUG}`,
  'use-pitch-detector-for-training': `/blog/${PITCH_HUB_SLUG}`,
  'famous-singers-vocal-ranges': VOCAL_RANGE_HUB_PATH,
  'mixed-voice-vs-head-voice': `/blog/${HIGH_NOTES_HUB_SLUG}`,
  'songs-for-your-voice-type': '/blog/how-to-find-your-voice-type',
  'breathing-and-posture-for-singers': '/blog/vocal-health-and-maintenance',
};

const CLUSTERS = [
  {
    hubSlug: VOCAL_RANGE_HUB_SLUG,
    hubPath: VOCAL_RANGE_HUB_PATH,
    hubTitle: VOCAL_RANGE_HUB_TITLE,
    seriesLabel: 'Vocal range guide series',
    spokeSlugs: VOCAL_RANGE_SPOKE_SLUGS,
  },
  {
    hubSlug: PITCH_HUB_SLUG,
    hubPath: PITCH_HUB_PATH,
    hubTitle: PITCH_HUB_TITLE,
    seriesLabel: 'Pitch & intonation series',
    spokeSlugs: PITCH_SPOKE_SLUGS,
  },
  {
    hubSlug: HIGH_NOTES_HUB_SLUG,
    hubPath: HIGH_NOTES_HUB_PATH,
    hubTitle: HIGH_NOTES_HUB_TITLE,
    seriesLabel: 'High notes technique series',
    spokeSlugs: HIGH_NOTES_SPOKE_SLUGS,
  },
];

export function getBlogCluster(slug) {
  for (const cluster of CLUSTERS) {
    if (slug === cluster.hubSlug) return { ...cluster, role: 'hub' };
    if (cluster.spokeSlugs.includes(slug)) return { ...cluster, role: 'spoke' };
  }
  return null;
}

export function isVocalRangeHub(slug) {
  return slug === VOCAL_RANGE_HUB_SLUG;
}

export function isVocalRangeSpoke(slug) {
  return VOCAL_RANGE_SPOKE_SLUGS.includes(slug);
}

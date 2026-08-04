/**
 * Blog topic clusters — hub + spoke URLs; retired slugs return 404.
 */

export const VOCAL_RANGE_HUB_SLUG = 'vocal-range-chart';
export const VOCAL_RANGE_HUB_PATH = `/blog/${VOCAL_RANGE_HUB_SLUG}`;
export const VOCAL_RANGE_HUB_TITLE = 'Vocal Range Chart: Male, Female & SATB Voice Types Explained';

export const VOCAL_RANGE_SPOKE_SLUGS = [
  'how-to-test-vocal-range',
  'how-to-find-your-voice-type',
  'can-vocal-range-change',
  'tessitura-and-comfortable-range',
  'songs-that-fit-your-vocal-range',
  'transpose-songs-for-your-voice',
  'choir-audition-range-prep',
];

export const PITCH_HUB_SLUG = 'improve-singing-pitch';
export const PITCH_HUB_PATH = `/blog/${PITCH_HUB_SLUG}`;
export const PITCH_HUB_TITLE = 'How to Improve Your Singing Pitch: Complete Training Guide';

export const PITCH_SPOKE_SLUGS = [
  'why-you-sing-flat',
  'why-you-sing-sharp',
  'ear-training-for-singers',
  'record-yourself-to-improve-singing',
  'sing-in-tune-without-piano',
  'fix-wavering-pitch',
  'singing-quietly-in-tune',
];

export const HIGH_NOTES_HUB_SLUG = 'singing-high-notes-techniques';
export const HIGH_NOTES_HUB_PATH = `/blog/${HIGH_NOTES_HUB_SLUG}`;
export const HIGH_NOTES_HUB_TITLE = 'How to Sing High Notes: Techniques and Tips';

export const HIGH_NOTES_SPOKE_SLUGS = [
  'belt-high-notes-safely',
  'high-notes-warmup-routine',
  'mixed-voice-explained',
];

/** Slugs removed from the site — no article file; show 404 (not 301). */
export const RETIRED_BLOG_SLUGS = new Set([
  'vocal-range-vs-voice-type',
  'use-pitch-detector-for-training',
  'famous-singers-vocal-ranges',
  'mixed-voice-vs-head-voice',
  'songs-for-your-voice-type',
]);

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

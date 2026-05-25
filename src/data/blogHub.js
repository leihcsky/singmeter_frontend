/**
 * Vocal range blog cluster — hub + spoke URLs for deduplication and cross-links.
 */

export const VOCAL_RANGE_HUB_SLUG = 'vocal-range-chart';
export const VOCAL_RANGE_HUB_PATH = `/blog/${VOCAL_RANGE_HUB_SLUG}`;
export const VOCAL_RANGE_HUB_TITLE = 'Vocal Range Chart: Male, Female & SATB Voice Types Explained';

export const VOCAL_RANGE_SPOKE_SLUGS = [
  'how-to-test-vocal-range',
  'how-to-find-your-voice-type',
  'vocal-range-vs-voice-type',
  'can-vocal-range-change',
  'tessitura-and-comfortable-range',
  'famous-singers-vocal-ranges',
  'songs-for-your-voice-type',
];

export function isVocalRangeHub(slug) {
  return slug === VOCAL_RANGE_HUB_SLUG;
}

export function isVocalRangeSpoke(slug) {
  return VOCAL_RANGE_SPOKE_SLUGS.includes(slug);
}

/**
 * Which URLs are promoted in sitemap vs noindex,follow (still linked internally).
 * P0: align crawl budget with pages Google should index.
 */

/** Hub/list pages — noindex exact paths (see applyRouteSeo NOINDEX_EXACT_PATHS). */

/** Blog spokes deprioritized until P1 rewrite (thin / overlapping). */
export const NOINDEX_BLOG_SLUGS = new Set([
  'breathing-and-posture-for-singers',
  'songs-for-your-voice-type',
]);

/** Flagship tutorials kept in sitemap; all other /tutorials/:slug are noindex. */
export const INDEXED_TUTORIAL_SLUGS = new Set([
  'vocal-range-test-guided',
  'pitch-calibration-10',
  'song-in-the-right-key',
  'daily-warmup-15',
]);

export function isNoIndexBlogSlug(slug) {
  return NOINDEX_BLOG_SLUGS.has(slug);
}

export function isNoIndexTutorialSlug(slug) {
  return !INDEXED_TUTORIAL_SLUGS.has(slug);
}

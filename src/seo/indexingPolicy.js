/**
 * Which URLs are promoted in sitemap vs noindex,follow (still linked internally).
 * P0: align crawl budget with pages Google should index.
 */

/** Hub/list pages — noindex exact paths (see applyRouteSeo NOINDEX_EXACT_PATHS). */

/**
 * Blog spokes deprioritized (thin / overlapping). Empty now that the two
 * remaining thin articles were 301-merged into their flagship pages.
 */
export const NOINDEX_BLOG_SLUGS = new Set([]);

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

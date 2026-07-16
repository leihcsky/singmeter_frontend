/**
 * Which URLs are promoted in sitemap vs noindex,follow (still linked internally).
 * Trust pages like /contact are indexable; thin list hubs may stay noindex.
 */

/**
 * Blog spokes deprioritized (thin / overlapping). Empty now that the two
 * remaining thin articles were removed; retired URLs return 404.
 */
export const NOINDEX_BLOG_SLUGS = new Set([]);

/** All practice tutorials are indexable and listed in sitemap. */
export const INDEXED_TUTORIAL_SLUGS = new Set([
  'vocal-range-test-guided',
  'pitch-calibration-10',
  'daily-warmup-15',
  'breath-and-posture-basics',
  'transpose-a-song',
  'ear-training-starter',
  'song-in-the-right-key',
  'vocal-health-recovery-day',
  'home-recording-vocal-check',
  'bridge-and-mix-practice',
  'belt-prep-safe',
]);

export function isNoIndexBlogSlug(slug) {
  return NOINDEX_BLOG_SLUGS.has(slug);
}

export function isNoIndexTutorialSlug(slug) {
  return !INDEXED_TUTORIAL_SLUGS.has(slug);
}

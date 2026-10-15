/**
 * Which URLs are promoted in sitemap vs noindex,follow (still linked internally).
 * Trust pages like /contact are indexable; thin list hubs may stay noindex.
 */
import { FLAGSHIP_TUTORIALS } from '../data/flagshipTutorials';

/**
 * Blog spokes deprioritized (thin / overlapping). Empty now that the two
 * remaining thin articles were removed; retired URLs return 404.
 */
export const NOINDEX_BLOG_SLUGS = new Set([]);

/**
 * Flagship tutorials only — indexable and in sitemap. Other tutorials stay live
 * as noindex,follow (they overlap blog guides on the same topics).
 * Keep in sync with NOINDEX_TUTORIAL_PRERENDER_ROUTES in scripts/parse-sitemap-routes.mjs.
 */
export const INDEXED_TUTORIAL_SLUGS = new Set(FLAGSHIP_TUTORIALS.map((t) => t.slug));

export function isNoIndexBlogSlug(slug) {
  return NOINDEX_BLOG_SLUGS.has(slug);
}

export function isNoIndexTutorialSlug(slug) {
  return !INDEXED_TUTORIAL_SLUGS.has(slug);
}

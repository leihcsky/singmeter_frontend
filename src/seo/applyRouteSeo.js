/**
 * Early canonical only — title / description / keywords stay on each page's useEffect.
 * Do not set document.title or meta description here (ranking-sensitive).
 */
import {
  isNoIndexBlogSlug,
  isNoIndexTutorialSlug,
} from './indexingPolicy';

export const SITE_ORIGIN = 'https://www.singmeter.com';

export function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

/**
 * Thin list/legal hubs stay noindex to focus crawl budget on articles & tools.
 * /contact is intentionally indexable (AdSense trust signal).
 * These paths are still in sitemap so prerender emits correct HTML (not homepage).
 */
const NOINDEX_EXACT_PATHS = new Set([
  '/disclaimer',
  '/faq',
  '/glossary',
  '/resources',
  '/tutorials',
]);

export function isNoIndexPath(pathname) {
  const path = normalizePath(pathname);

  if (NOINDEX_EXACT_PATHS.has(path)) {
    return true;
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && isNoIndexBlogSlug(blogMatch[1])) {
    return true;
  }

  const tutorialMatch = path.match(/^\/tutorials\/([^/]+)$/);
  if (tutorialMatch && isNoIndexTutorialSlug(tutorialMatch[1])) {
    return true;
  }

  return false;
}

function setRobotsMeta(content) {
  let el = document.querySelector('meta[name="robots"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Sets robots to noindex,follow or restores index,follow for the current route. */
export function applyRobots(pathname) {
  setRobotsMeta(isNoIndexPath(pathname) ? 'noindex, follow' : 'index, follow');
}

function setLinkRel(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Canonical URL only; matches index.html inline script + per-page setLinkTag('canonical', …). */
export function applyCanonical(pathname) {
  const path = normalizePath(pathname);
  const canonical = `${SITE_ORIGIN}${path === '/' ? '' : path}`;
  setLinkRel('canonical', canonical);
}

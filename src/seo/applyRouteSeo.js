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
 * These paths are NOT in sitemap; prerender still covers them via PRERENDER_EXTRA_ROUTES.
 */
const NOINDEX_EXACT_PATHS = new Set([
  '/blog',
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

/**
 * Ensure exactly one rel=canonical in <head>.
 * Duplicate tags (e.g. leftover homepage canonical in prerender shells) confuse crawlers.
 */
export function setCanonicalHref(href) {
  const links = [...document.querySelectorAll('link[rel="canonical"]')];
  if (links.length === 0) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    el.setAttribute('href', href);
    document.head.appendChild(el);
    return;
  }
  links[0].setAttribute('href', href);
  for (let i = 1; i < links.length; i += 1) {
    links[i].remove();
  }
}

function setLinkRel(rel, href) {
  if (rel === 'canonical') {
    setCanonicalHref(href);
    return;
  }
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
  setCanonicalHref(canonical);
}

/** Absolute canonical for the current path (no trailing slash except origin root). */
export function canonicalHrefForPath(pathname) {
  const path = normalizePath(pathname);
  return `${SITE_ORIGIN}${path === '/' ? '' : path}`;
}

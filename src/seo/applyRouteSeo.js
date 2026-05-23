/**
 * Early canonical only — title / description / keywords stay on each page's useEffect.
 * Do not set document.title or meta description here (ranking-sensitive).
 */
export const SITE_ORIGIN = 'https://www.singmeter.com';

export function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
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

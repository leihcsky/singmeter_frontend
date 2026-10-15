import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Parse public/sitemap.xml and return pathname routes (e.g. "/", "/blog/foo").
 */
export function getRoutesFromSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const routes = [];
  const locRe = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRe.exec(xml)) !== null) {
    try {
      const url = new URL(match[1].trim());
      const route = url.pathname.replace(/\/+$/, '') || '/';
      routes.push(route);
    } catch {
      // skip invalid URLs
    }
  }
  return [...new Set(routes)];
}

/**
 * Non-flagship tutorials: noindex (see src/seo/indexingPolicy.js) but still
 * reachable from blog CTAs, so they must be prerendered or Vercel returns 404.
 */
const NOINDEX_TUTORIAL_PRERENDER_ROUTES = [
  '/tutorials/breath-and-posture-basics',
  '/tutorials/transpose-a-song',
  '/tutorials/ear-training-starter',
  '/tutorials/song-in-the-right-key',
  '/tutorials/vocal-health-recovery-day',
  '/tutorials/home-recording-vocal-check',
  '/tutorials/bridge-and-mix-practice',
  '/tutorials/belt-prep-safe',
];

/**
 * noindex hub pages stay out of sitemap (AdSense/crawl signal) but still need
 * prerender so direct visits and internal links do not soft-404 to homepage.
 */
export const PRERENDER_EXTRA_ROUTES = [
  '/blog',
  '/tutorials',
  '/resources',
  '/glossary',
  '/faq',
  '/disclaimer',
  ...NOINDEX_TUTORIAL_PRERENDER_ROUTES,
];

export function getPrerenderRoutes(sitemapPath = defaultSitemapPath()) {
  return [...new Set([...getRoutesFromSitemap(sitemapPath), ...PRERENDER_EXTRA_ROUTES])];
}

export function defaultSitemapPath() {
  return path.join(__dirname, '..', 'public', 'sitemap.xml');
}

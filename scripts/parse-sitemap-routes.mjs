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

export function defaultSitemapPath() {
  return path.join(__dirname, '..', 'public', 'sitemap.xml');
}

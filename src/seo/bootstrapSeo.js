/**
 * Apply canonical + basic meta before React hydrates (SPA SEO).
 * index.html also sets canonical via inline script for crawlers that skip modules.
 */
import { blogIndex } from '../blog';

const SITE_ORIGIN = 'https://www.singmeter.com';
const TITLE_BRAND = ' | SingMeter';

function normalizePath(pathname) {
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

function setMetaTag(name, content, isProperty = false) {
  const attribute = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function bootstrapSeo() {
  const path = normalizePath(window.location.pathname);
  const canonical = `${SITE_ORIGIN}${path === '/' ? '' : path}`;

  setLinkRel('canonical', canonical);

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (!blogMatch) return;

  const article = blogIndex.find((a) => a.slug === blogMatch[1]);
  if (!article) return;

  const metaTitle = `${(article.seoTitle || article.title).trim()}${TITLE_BRAND}`;
  const metaDescription = (article.seoDescription || article.excerpt || '').trim();

  document.title = metaTitle;
  if (metaDescription) {
    setMetaTag('description', metaDescription);
    setMetaTag('og:description', metaDescription, true);
    setMetaTag('twitter:description', metaDescription);
  }
  setMetaTag('og:url', canonical, true);
  setMetaTag('og:type', 'article', true);
}

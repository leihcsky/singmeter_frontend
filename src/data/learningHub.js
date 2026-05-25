/**
 * Homepage learning hub — latest blog posts sorted by recency.
 */
import { blogIndex } from '../blog';

function articleSortKey(article) {
  const raw = article.updatedDate || article.date;
  if (!raw) return 0;
  const t = Date.parse(raw);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * @param {number} [limit=3]
 * @returns {Array<typeof blogIndex[number]>}
 */
export function getLatestBlogPosts(limit = 3) {
  return [...blogIndex]
    .sort((a, b) => articleSortKey(b) - articleSortKey(a))
    .slice(0, limit)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      readTime: article.readTime,
      date: article.date,
      updatedDate: article.updatedDate,
      dateLabel: formatArticleDateLabel(article),
    }));
}

function formatArticleDateLabel(article) {
  const raw = article.updatedDate || article.date;
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  const formatted = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return article.updatedDate && article.updatedDate !== article.date
    ? `Updated ${formatted}`
    : formatted;
}

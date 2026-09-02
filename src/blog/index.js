/**
 * Blog public API — metadata catalog (lightweight) + lazy article loaders.
 * Article JSX is loaded only on /blog/:slug via loadBlogArticle().
 */
export { blogCatalog } from './catalog.generated.js';
export { blogCatalog as blogIndex } from './catalog.generated.js';
export { loadBlogArticle, getBlogCatalogEntry } from './articleLoaders.js';

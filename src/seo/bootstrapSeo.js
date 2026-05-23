/**
 * Runs before React hydrate. Sets canonical only.
 * Title and meta description are owned exclusively by each page (and BlogArticlePage).
 */
import { applyCanonical } from './applyRouteSeo';

export function bootstrapSeo() {
  applyCanonical(window.location.pathname);
}

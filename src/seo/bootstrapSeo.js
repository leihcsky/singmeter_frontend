/**
 * Runs before React hydrate. Sets canonical only.
 * Title and meta description are owned exclusively by each page (and BlogArticlePage).
 */
import { applyCanonical, applyRobots } from './applyRouteSeo';

export function bootstrapSeo() {
  const path = window.location.pathname;
  applyCanonical(path);
  applyRobots(path);
}

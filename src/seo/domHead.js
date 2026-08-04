/**
 * Shared head helpers so every page updates the same canonical tag
 * (and removes duplicates) instead of appending a second link.
 */
import { setCanonicalHref } from './applyRouteSeo';

export function setMetaTag(name, content, isProperty = false) {
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function setLinkTag(rel, href) {
  if (rel === 'canonical') {
    setCanonicalHref(href);
    return;
  }
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

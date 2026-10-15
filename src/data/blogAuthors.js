/**
 * Blog bylines — every article is written by the founder (see teamMembers.js).
 * Per-article `meta.author` should match this name; enrichBlogMeta merges role/id for the index.
 */

const AUTHOR = {
  id: 'max-ray',
  name: 'Max Ray',
  role: 'Founder & product',
  teamMemberId: 'founder',
};

export function getBlogAuthorForSlug() {
  return AUTHOR;
}

/**
 * Merge author display fields into article meta for blogIndex.
 * @param {object} meta
 */
export function enrichBlogMeta(meta) {
  return {
    ...meta,
    author: AUTHOR.name,
    authorRole: AUTHOR.role,
    authorId: AUTHOR.id,
    authorTeamMemberId: AUTHOR.teamMemberId,
  };
}

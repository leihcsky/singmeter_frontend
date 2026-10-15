/**
 * About page profile — SingMeter is written and built by its founder.
 */

export const TEAM_INTRO =
  'SingMeter is an independent, one-person project run by Max Ray. It is not a clinic, a voice studio, or an app company—just a singer who builds the tools he uses at home and writes up what he learns along the way.';

export const teamMembers = [
  {
    id: 'founder',
    name: 'Max Ray',
    role: 'Founder & product',
    isFounder: true,
    bio: 'Software developer and beginner singer. Max started practicing at home and at karaoke in late 2025 and built SingMeter alongside it—starting with the Vocal Range Test, because he didn’t know his own range and kept choosing songs that sat too high or too low. He builds the tools and writes the guides, tutorials, and book reviews from a learner’s point of view. He is not a licensed voice teacher or clinician, so health topics point you to a professional when it matters.',
    focuses: ['Tools & engineering', 'Guides & tutorials', 'Book reviews'],
    accent: 'indigo',
  },
];

const ACCENT_CLASSES = {
  indigo: {
    avatar: 'bg-indigo-600 text-white',
    border: 'border-indigo-200 hover:border-indigo-300',
    tag: 'bg-indigo-50 text-indigo-800',
  },
};

export function getMemberAccentClasses(accent) {
  return ACCENT_CLASSES[accent] || ACCENT_CLASSES.indigo;
}

/** Initials for avatar circle, e.g. "Max Ray" → "MR" */
export function getMemberInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/\./g, '').charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

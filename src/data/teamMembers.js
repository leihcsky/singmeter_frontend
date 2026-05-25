/**
 * SingMeter team — About page profiles (roles and bios reflect how we work).
 */

export const TEAM_INTRO =
  'SingMeter is an independent project led by Max Ray, with a small group of collaborators in audio, vocal pedagogy, and editorial review. We are not a clinic or a large app company—just people who sing and build tools we actually use at home.';

export const teamMembers = [
  {
    id: 'founder',
    name: 'Max Ray',
    role: 'Founder & product',
    isFounder: true,
    bio: 'Software developer and lifelong singing enthusiast. Max started SingMeter after one too many practice sessions with unclear feedback—wanting range and pitch readings that feel as straightforward as a tuner, without uploading voice recordings to a server. He designs the tools, the practice tutorial paths, and how everything links together for home practice.',
    focuses: ['Vocal range test', 'Practice tutorials', 'Product & engineering'],
    accent: 'indigo',
  },
  {
    id: 'audio',
    name: 'Jordan L.',
    role: 'Audio engineering',
    bio: 'Tunes browser-based pitch detection and test flows so readings stay stable across microphones and rooms. Documents tool limits—SingMeter is for practice feedback, not medical diagnosis.',
    focuses: ['Web Audio API', 'Pitch accuracy', 'Privacy-first processing'],
    accent: 'blue',
  },
  {
    id: 'pedagogy',
    name: 'Elena V.',
    role: 'Voice pedagogy advisor',
    bio: 'Conservatory-trained voice teacher who reviews warm-ups, health copy, and advanced tutorials (mix, belt prep) for sustainable technique. Ensures exercises say when to stop and rest.',
    focuses: ['Technique tutorials', 'Vocal health content', 'Exercise safety'],
    accent: 'purple',
  },
  {
    id: 'editorial',
    name: 'Sam K.',
    role: 'Content & editorial',
    bio: 'Writes and edits blog guides, book reviews, and Resources picks. Keeps tutorials distinct from articles and avoids thin affiliate or search-link pages.',
    focuses: ['Blog & reviews', 'Editorial standards', 'Learning hub curation'],
    accent: 'pink',
  },
];

const ACCENT_CLASSES = {
  indigo: {
    avatar: 'bg-indigo-600 text-white',
    border: 'border-indigo-200 hover:border-indigo-300',
    tag: 'bg-indigo-50 text-indigo-800',
  },
  blue: {
    avatar: 'bg-blue-600 text-white',
    border: 'border-blue-100 hover:border-blue-200',
    tag: 'bg-blue-50 text-blue-800',
  },
  purple: {
    avatar: 'bg-purple-600 text-white',
    border: 'border-purple-100 hover:border-purple-200',
    tag: 'bg-purple-50 text-purple-800',
  },
  pink: {
    avatar: 'bg-pink-600 text-white',
    border: 'border-pink-100 hover:border-pink-200',
    tag: 'bg-pink-50 text-pink-800',
  },
};

export function getMemberAccentClasses(accent) {
  return ACCENT_CLASSES[accent] || ACCENT_CLASSES.indigo;
}

/** Initials for avatar circle, e.g. "Max Ray" → "MR", "Jordan L." → "JL" */
export function getMemberInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/\./g, '').charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

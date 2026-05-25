/**
 * Tutorial page bylines — author and reviewer by slug.
 */

const ELENA = { name: 'Elena V.', role: 'Voice pedagogy advisor' };
const MAX = { name: 'Max Ray', role: 'Founder & product' };
const JORDAN = { name: 'Jordan L.', role: 'Audio engineering' };

const ELENA_REVIEWED_SLUGS = new Set([
  'breath-and-posture-basics',
  'vocal-health-recovery-day',
  'bridge-and-mix-practice',
  'belt-prep-safe',
  'daily-warmup-15',
]);

const JORDAN_REVIEWED_SLUGS = new Set([
  'pitch-calibration-10',
  'ear-training-starter',
  'home-recording-vocal-check',
]);

export function getTutorialByline(slug) {
  return {
    author: MAX,
    reviewer: ELENA_REVIEWED_SLUGS.has(slug)
      ? ELENA
      : JORDAN_REVIEWED_SLUGS.has(slug)
        ? JORDAN
        : null,
  };
}

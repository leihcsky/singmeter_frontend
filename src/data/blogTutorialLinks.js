/**
 * Primary practice tutorial for each blog article (footer CTA).
 */

export const blogPracticeTutorialBySlug = {
  'how-to-test-vocal-range': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'how-to-find-your-voice-type': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'vocal-range-chart': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'can-vocal-range-change': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'tessitura-and-comfortable-range': {
    path: '/tutorials/song-in-the-right-key',
    title: 'Choose & Practice a Song in Your Key',
  },
  'improve-singing-pitch': {
    path: '/tutorials/pitch-calibration-10',
    title: '10-Minute Pitch Calibration',
  },
  'why-you-sing-flat': {
    path: '/tutorials/pitch-calibration-10',
    title: '10-Minute Pitch Calibration',
  },
  'ear-training-for-singers': {
    path: '/tutorials/ear-training-starter',
    title: 'Ear Training Starter',
  },
  'vocal-health-and-maintenance': {
    path: '/tutorials/vocal-health-recovery-day',
    title: 'Vocal Health Recovery Day',
  },
  'singing-high-notes-techniques': {
    path: '/tutorials/bridge-and-mix-practice',
    title: 'Mixed Voice Practice',
  },
  'belt-high-notes-safely': {
    path: '/tutorials/belt-prep-safe',
    title: 'Safe Belt Prep',
  },
  'high-notes-warmup-routine': {
    path: '/tutorials/daily-warmup-15',
    title: '15-Minute Daily Warm-Up',
  },
  'daily-singing-practice-routine': {
    path: '/tutorials/daily-warmup-15',
    title: '15-Minute Daily Warm-Up',
  },
  'songs-that-fit-your-vocal-range': {
    path: '/tutorials/song-in-the-right-key',
    title: 'Choose & Practice a Song in Your Key',
  },
  'breathing-and-posture-for-singers': {
    path: '/tutorials/breath-and-posture-basics',
    title: 'Breath & Posture Basics',
  },
  'mixed-voice-explained': {
    path: '/tutorials/bridge-and-mix-practice',
    title: 'Mixed Voice Practice',
  },
  'why-you-sing-sharp': {
    path: '/tutorials/pitch-calibration-10',
    title: '10-Minute Pitch Calibration',
  },
};

export function getBlogPracticeTutorial(slug) {
  return blogPracticeTutorialBySlug[slug] || null;
}

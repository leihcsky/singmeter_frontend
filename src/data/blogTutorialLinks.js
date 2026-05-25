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
  'vocal-range-vs-voice-type': {
    path: '/tutorials/song-in-the-right-key',
    title: 'Choose & Practice a Song in Your Key',
  },
  'can-vocal-range-change': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'tessitura-and-comfortable-range': {
    path: '/tutorials/song-in-the-right-key',
    title: 'Choose & Practice a Song in Your Key',
  },
  'famous-singers-vocal-ranges': {
    path: '/tutorials/vocal-range-test-guided',
    title: 'Your First Vocal Range Test',
  },
  'songs-for-your-voice-type': {
    path: '/tutorials/song-in-the-right-key',
    title: 'Choose & Practice a Song in Your Key',
  },
  'improve-singing-pitch': {
    path: '/tutorials/pitch-calibration-10',
    title: '10-Minute Pitch Calibration',
  },
  'use-pitch-detector-for-training': {
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
  'sing-in-tune-without-piano': {
    path: '/tutorials/ear-training-starter',
    title: 'Ear Training Starter',
  },
  'breathing-and-posture-for-singers': {
    path: '/tutorials/breath-and-posture-basics',
    title: 'Breath & Posture for Singers',
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
  'mixed-voice-vs-head-voice': {
    path: '/tutorials/bridge-and-mix-practice',
    title: 'Mixed Voice Practice',
  },
  'high-notes-warmup-routine': {
    path: '/tutorials/daily-warmup-15',
    title: '15-Minute Daily Warm-Up',
  },
};

export function getBlogPracticeTutorial(slug) {
  return blogPracticeTutorialBySlug[slug] || null;
}

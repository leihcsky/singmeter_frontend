import vocalRangeTestGuided from './articles/vocalRangeTestGuided';
import pitchCalibration10 from './articles/pitchCalibration10';
import transposeASong from './articles/transposeASong';
import dailyWarmup15 from './articles/dailyWarmup15';
import breathAndPostureBasics from './articles/breathAndPostureBasics';
import earTrainingStarter from './articles/earTrainingStarter';
import songInTheRightKey from './articles/songInTheRightKey';
import vocalHealthRecoveryDay from './articles/vocalHealthRecoveryDay';
import homeRecordingVocalCheck from './articles/homeRecordingVocalCheck';
import bridgeAndMixPractice from './articles/bridgeAndMixPractice';
import beltPrepSafe from './articles/beltPrepSafe';

const tutorialModules = [
  vocalRangeTestGuided,
  pitchCalibration10,
  transposeASong,
  dailyWarmup15,
  breathAndPostureBasics,
  earTrainingStarter,
  songInTheRightKey,
  vocalHealthRecoveryDay,
  homeRecordingVocalCheck,
  bridgeAndMixPractice,
  beltPrepSafe,
];

export const tutorialIndex = tutorialModules.map((mod) => ({
  ...mod.meta,
  intro: mod.intro,
  tools: mod.tools,
  steps: mod.steps,
  selfCheck: mod.selfCheck,
  goDeeper: mod.goDeeper,
}));

export function getTutorialBySlug(slug) {
  const mod = tutorialModules.find((t) => t.meta.slug === slug);
  if (!mod) return null;
  const nextSlug = mod.meta.nextSlug;
  const nextMod = nextSlug ? tutorialModules.find((t) => t.meta.slug === nextSlug) : null;
  return {
    ...mod,
    nextTutorial: nextMod
      ? { slug: nextMod.meta.slug, title: nextMod.meta.title }
      : undefined,
  };
}

export const tutorialTracks = [
  {
    id: 'start',
    title: 'Start here',
    description: 'Foundations: range, pitch, warm-up, and breath support.',
    slugs: [
      'vocal-range-test-guided',
      'pitch-calibration-10',
      'daily-warmup-15',
      'breath-and-posture-basics',
    ],
  },
  {
    id: 'apply',
    title: 'Apply your range',
    description: 'Transpose songs, train your ear, and rehearse in the right key.',
    slugs: ['transpose-a-song', 'ear-training-starter', 'song-in-the-right-key'],
  },
  {
    id: 'care',
    title: 'Care & recording',
    description: 'Recovery when tired and a home-recording pitch check.',
    slugs: ['vocal-health-recovery-day', 'home-recording-vocal-check'],
  },
  {
    id: 'advanced',
    title: 'Advanced technique',
    description: 'Register blend and safe belt preparation—with tool feedback.',
    slugs: ['bridge-and-mix-practice', 'belt-prep-safe'],
  },
];

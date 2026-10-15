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
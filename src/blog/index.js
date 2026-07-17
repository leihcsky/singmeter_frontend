import ImproveSingingPitchArticle from './articles/ImproveSingingPitchArticle';
import HowToTestVocalRangeArticle from './articles/HowToTestVocalRangeArticle';
import SingingHighNotesTechniquesArticle from './articles/SingingHighNotesTechniquesArticle';
import WhyYouSingFlatArticle from './articles/WhyYouSingFlatArticle';
import WhyYouSingSharpArticle from './articles/WhyYouSingSharpArticle';
import EarTrainingForSingersArticle from './articles/EarTrainingForSingersArticle';
import HowToFindYourVoiceTypeArticle from './articles/HowToFindYourVoiceTypeArticle';
import VocalRangeChartArticle from './articles/VocalRangeChartArticle';
import CanVocalRangeChangeArticle from './articles/CanVocalRangeChangeArticle';
import TessituraAndComfortableRangeArticle from './articles/TessituraAndComfortableRangeArticle';
import BeltHighNotesSafelyArticle from './articles/BeltHighNotesSafelyArticle';
import HighNotesWarmupRoutineArticle from './articles/HighNotesWarmupRoutineArticle';
import VocalHealthArticle from './articles/VocalHealthArticle';
import DailySingingPracticeRoutineArticle from './articles/DailySingingPracticeRoutineArticle';
import SongsThatFitYourVocalRangeArticle from './articles/SongsThatFitYourVocalRangeArticle';
import BreathingAndPostureForSingersArticle from './articles/BreathingAndPostureForSingersArticle';
import MixedVoiceExplainedArticle from './articles/MixedVoiceExplainedArticle';
import { enrichBlogMeta } from '../data/blogAuthors';

export const blogIndex = [
  { ...enrichBlogMeta(DailySingingPracticeRoutineArticle.meta), component: DailySingingPracticeRoutineArticle },
  { ...enrichBlogMeta(SongsThatFitYourVocalRangeArticle.meta), component: SongsThatFitYourVocalRangeArticle },
  { ...enrichBlogMeta(WhyYouSingSharpArticle.meta), component: WhyYouSingSharpArticle },
  { ...enrichBlogMeta(MixedVoiceExplainedArticle.meta), component: MixedVoiceExplainedArticle },
  { ...enrichBlogMeta(BreathingAndPostureForSingersArticle.meta), component: BreathingAndPostureForSingersArticle },
  { ...enrichBlogMeta(ImproveSingingPitchArticle.meta), component: ImproveSingingPitchArticle },
  { ...enrichBlogMeta(HowToTestVocalRangeArticle.meta), component: HowToTestVocalRangeArticle },
  { ...enrichBlogMeta(SingingHighNotesTechniquesArticle.meta), component: SingingHighNotesTechniquesArticle },
  { ...enrichBlogMeta(WhyYouSingFlatArticle.meta), component: WhyYouSingFlatArticle },
  { ...enrichBlogMeta(EarTrainingForSingersArticle.meta), component: EarTrainingForSingersArticle },
  { ...enrichBlogMeta(HowToFindYourVoiceTypeArticle.meta), component: HowToFindYourVoiceTypeArticle },
  { ...enrichBlogMeta(VocalRangeChartArticle.meta), component: VocalRangeChartArticle },
  { ...enrichBlogMeta(CanVocalRangeChangeArticle.meta), component: CanVocalRangeChangeArticle },
  { ...enrichBlogMeta(TessituraAndComfortableRangeArticle.meta), component: TessituraAndComfortableRangeArticle },
  { ...enrichBlogMeta(BeltHighNotesSafelyArticle.meta), component: BeltHighNotesSafelyArticle },
  { ...enrichBlogMeta(HighNotesWarmupRoutineArticle.meta), component: HighNotesWarmupRoutineArticle },
  { ...enrichBlogMeta(VocalHealthArticle.meta), component: VocalHealthArticle },
];

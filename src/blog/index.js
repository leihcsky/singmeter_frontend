import ImproveSingingPitchArticle from './articles/ImproveSingingPitchArticle';
import HowToTestVocalRangeArticle from './articles/HowToTestVocalRangeArticle';
import SingingHighNotesTechniquesArticle from './articles/SingingHighNotesTechniquesArticle';
import SongsForYourVoiceTypeArticle from './articles/SongsForYourVoiceTypeArticle';
import WhyYouSingFlatArticle from './articles/WhyYouSingFlatArticle';
import EarTrainingForSingersArticle from './articles/EarTrainingForSingersArticle';
import SingInTuneWithoutPianoArticle from './articles/SingInTuneWithoutPianoArticle';
import UsePitchDetectorForTrainingArticle from './articles/UsePitchDetectorForTrainingArticle';
import HowToFindYourVoiceTypeArticle from './articles/HowToFindYourVoiceTypeArticle';
import VocalRangeChartArticle from './articles/VocalRangeChartArticle';
import VocalRangeVsVoiceTypeArticle from './articles/VocalRangeVsVoiceTypeArticle';
import CanVocalRangeChangeArticle from './articles/CanVocalRangeChangeArticle';
import TessituraAndComfortableRangeArticle from './articles/TessituraAndComfortableRangeArticle';
import FamousSingersVocalRangesArticle from './articles/FamousSingersVocalRangesArticle';
import BeltHighNotesSafelyArticle from './articles/BeltHighNotesSafelyArticle';
import MixedVoiceVsHeadVoiceArticle from './articles/MixedVoiceVsHeadVoiceArticle';
import HighNotesWarmupRoutineArticle from './articles/HighNotesWarmupRoutineArticle';
import BreathingAndPostureArticle from './articles/BreathingAndPostureArticle';
import VocalHealthArticle from './articles/VocalHealthArticle';
import { enrichBlogMeta } from '../data/blogAuthors';

export const blogIndex = [
  { ...enrichBlogMeta(ImproveSingingPitchArticle.meta), component: ImproveSingingPitchArticle },
  { ...enrichBlogMeta(HowToTestVocalRangeArticle.meta), component: HowToTestVocalRangeArticle },
  { ...enrichBlogMeta(SingingHighNotesTechniquesArticle.meta), component: SingingHighNotesTechniquesArticle },
  { ...enrichBlogMeta(SongsForYourVoiceTypeArticle.meta), component: SongsForYourVoiceTypeArticle },
  { ...enrichBlogMeta(WhyYouSingFlatArticle.meta), component: WhyYouSingFlatArticle },
  { ...enrichBlogMeta(EarTrainingForSingersArticle.meta), component: EarTrainingForSingersArticle },
  { ...enrichBlogMeta(SingInTuneWithoutPianoArticle.meta), component: SingInTuneWithoutPianoArticle },
  { ...enrichBlogMeta(UsePitchDetectorForTrainingArticle.meta), component: UsePitchDetectorForTrainingArticle },
  { ...enrichBlogMeta(HowToFindYourVoiceTypeArticle.meta), component: HowToFindYourVoiceTypeArticle },
  { ...enrichBlogMeta(VocalRangeChartArticle.meta), component: VocalRangeChartArticle },
  { ...enrichBlogMeta(VocalRangeVsVoiceTypeArticle.meta), component: VocalRangeVsVoiceTypeArticle },
  { ...enrichBlogMeta(CanVocalRangeChangeArticle.meta), component: CanVocalRangeChangeArticle },
  { ...enrichBlogMeta(TessituraAndComfortableRangeArticle.meta), component: TessituraAndComfortableRangeArticle },
  { ...enrichBlogMeta(FamousSingersVocalRangesArticle.meta), component: FamousSingersVocalRangesArticle },
  { ...enrichBlogMeta(BeltHighNotesSafelyArticle.meta), component: BeltHighNotesSafelyArticle },
  { ...enrichBlogMeta(MixedVoiceVsHeadVoiceArticle.meta), component: MixedVoiceVsHeadVoiceArticle },
  { ...enrichBlogMeta(HighNotesWarmupRoutineArticle.meta), component: HighNotesWarmupRoutineArticle },
  { ...enrichBlogMeta(BreathingAndPostureArticle.meta), component: BreathingAndPostureArticle },
  { ...enrichBlogMeta(VocalHealthArticle.meta), component: VocalHealthArticle },
];

import ChoirAuditionRangePrepArticle from './articles/ChoirAuditionRangePrepArticle';
import SingingQuietlyInTuneArticle from './articles/SingingQuietlyInTuneArticle';
import FirstWeekSingingPracticePlanArticle from './articles/FirstWeekSingingPracticePlanArticle';
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
import VocalCooldownAfterPracticeArticle from './articles/VocalCooldownAfterPracticeArticle';
import SingingWithAColdOrAllergiesArticle from './articles/SingingWithAColdOrAllergiesArticle';
import VoiceFatigueFromTalkingArticle from './articles/VoiceFatigueFromTalkingArticle';
import HowToLearnASongPhraseByPhraseArticle from './articles/HowToLearnASongPhraseByPhraseArticle';
import ChestVoiceVsHeadVoiceBasicsArticle from './articles/ChestVoiceVsHeadVoiceBasicsArticle';
import LongPhrasesBreathPlanningArticle from './articles/LongPhrasesBreathPlanningArticle';
import NervousPitchBeforePerformingArticle from './articles/NervousPitchBeforePerformingArticle';
import DailySingingPracticeRoutineArticle from './articles/DailySingingPracticeRoutineArticle';
import SongsThatFitYourVocalRangeArticle from './articles/SongsThatFitYourVocalRangeArticle';
import BreathingAndPostureForSingersArticle from './articles/BreathingAndPostureForSingersArticle';
import MixedVoiceExplainedArticle from './articles/MixedVoiceExplainedArticle';
import KaraokeWarmupAndSongKeyArticle from './articles/KaraokeWarmupAndSongKeyArticle';
import RecordYourselfToImproveSingingArticle from './articles/RecordYourselfToImproveSingingArticle';
import TransposeSongsForYourVoiceArticle from './articles/TransposeSongsForYourVoiceArticle';
import SingingWhenTiredOrHoarseArticle from './articles/SingingWhenTiredOrHoarseArticle';
import MetronomePracticeForSingersArticle from './articles/MetronomePracticeForSingersArticle';
import SingInTuneWithoutPianoArticle from './articles/SingInTuneWithoutPianoArticle';
import FixWaveringPitchArticle from './articles/FixWaveringPitchArticle';
import { enrichBlogMeta } from '../data/blogAuthors';

export const blogIndex = [
  { ...enrichBlogMeta(NervousPitchBeforePerformingArticle.meta), component: NervousPitchBeforePerformingArticle },
  { ...enrichBlogMeta(LongPhrasesBreathPlanningArticle.meta), component: LongPhrasesBreathPlanningArticle },
  { ...enrichBlogMeta(ChestVoiceVsHeadVoiceBasicsArticle.meta), component: ChestVoiceVsHeadVoiceBasicsArticle },
  { ...enrichBlogMeta(HowToLearnASongPhraseByPhraseArticle.meta), component: HowToLearnASongPhraseByPhraseArticle },
  { ...enrichBlogMeta(VoiceFatigueFromTalkingArticle.meta), component: VoiceFatigueFromTalkingArticle },
  { ...enrichBlogMeta(SingingWithAColdOrAllergiesArticle.meta), component: SingingWithAColdOrAllergiesArticle },
  { ...enrichBlogMeta(VocalCooldownAfterPracticeArticle.meta), component: VocalCooldownAfterPracticeArticle },
  { ...enrichBlogMeta(FirstWeekSingingPracticePlanArticle.meta), component: FirstWeekSingingPracticePlanArticle },
  { ...enrichBlogMeta(SingingQuietlyInTuneArticle.meta), component: SingingQuietlyInTuneArticle },
  { ...enrichBlogMeta(ChoirAuditionRangePrepArticle.meta), component: ChoirAuditionRangePrepArticle },
  { ...enrichBlogMeta(MetronomePracticeForSingersArticle.meta), component: MetronomePracticeForSingersArticle },
  { ...enrichBlogMeta(SingInTuneWithoutPianoArticle.meta), component: SingInTuneWithoutPianoArticle },
  { ...enrichBlogMeta(FixWaveringPitchArticle.meta), component: FixWaveringPitchArticle },
  { ...enrichBlogMeta(KaraokeWarmupAndSongKeyArticle.meta), component: KaraokeWarmupAndSongKeyArticle },
  { ...enrichBlogMeta(RecordYourselfToImproveSingingArticle.meta), component: RecordYourselfToImproveSingingArticle },
  { ...enrichBlogMeta(TransposeSongsForYourVoiceArticle.meta), component: TransposeSongsForYourVoiceArticle },
  { ...enrichBlogMeta(SingingWhenTiredOrHoarseArticle.meta), component: SingingWhenTiredOrHoarseArticle },
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

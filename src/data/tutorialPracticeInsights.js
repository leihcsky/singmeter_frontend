/**
 * Per-tutorial editorial blocks (why it works, mistakes, safety) — shown on detail pages only.
 */

export const tutorialPracticeInsightsBySlug = {
  'vocal-range-test-guided': {
    whyItWorks:
      'Measuring lowest and highest comfortable notes first stops you from choosing songs or keys that fight your voice. The test gives a baseline you can compare after weeks of practice.',
    commonMistakes: [
      'Pushing for extreme notes that hurt or sound airy—only count clear, repeatable pitches.',
      'Testing once in a noisy room; background noise skews pitch detection.',
      'Treating the voice-type label as permanent instead of a starting map.',
    ],
    whenToStop:
      'Stop if you feel pain, burning, or sudden hoarseness. Rest and retry another day; see our vocal health guide if symptoms last.',
  },
  'pitch-calibration-10': {
    whyItWorks:
      'Alternating reference tones with sung feedback trains your ear and body in short loops. Ten minutes is enough to build a daily habit without vocal fatigue.',
    commonMistakes: [
      'Sliding up to a note instead of landing on pitch cleanly.',
      'Singing too loud on the detector—keep volume moderate for accurate cents readings.',
      'Skipping the reference listen step and guessing the note.',
    ],
    whenToStop:
      'If your throat feels tight or you cannot hold any note near the green zone after several tries, stop and warm up with gentle humming.',
  },
  'transpose-a-song': {
    whyItWorks:
      'Songs feel easier when most notes sit in your tessitura, not just inside your absolute range. Transposing before practice reduces strain and makes pitch work more rewarding.',
    commonMistakes: [
      'Transposing only the key letter without checking how many notes still sit too high.',
      'Practicing the original key out of pride instead of comfort.',
      'Ignoring breath needs in the new key—higher keys often need more support.',
    ],
    whenToStop:
      'Stop if the transposed version still forces shouting or cracking on the chorus; pick a lower key or a different song.',
  },
  'daily-warmup-15': {
    whyItWorks:
      'Gradual warm-ups increase blood flow and coordination before harder singing. The metronome keeps tempo honest so you do not rush slides or scales.',
    commonMistakes: [
      'Starting with loud high notes before gentle humming.',
      'Rushing the metronome tempo to “finish faster.”',
      'Treating warm-up as optional on days you only sing one song.',
    ],
    whenToStop:
      'End early if hoarseness appears during sirens or if you are recovering from illness—switch to the vocal health recovery tutorial.',
  },
  'breath-and-posture-basics': {
    whyItWorks:
      'Stable posture and low rib expansion give the vocal folds steady airflow. Pitch and range work fail quickly when breath is shallow or shoulders are lifted.',
    commonMistakes: [
      'Pushing the stomach out without expanding the sides and back.',
      'Locking the knees or curling the shoulders while singing.',
      'Holding breath between phrases instead of releasing gently.',
    ],
    whenToStop:
      'If you feel dizzy, lightheaded, or tight in the neck, pause and breathe normally seated before continuing.',
  },
  'ear-training-starter': {
    whyItWorks:
      'Hearing a reference, then singing it back with visual cents feedback connects ear and voice. Short intervals are easier to memorize than full melodies at first.',
    commonMistakes: [
      'Only practicing with lyrics instead of neutral vowels.',
      'Ignoring flat/sharp bias—write down whether you tend flat or sharp today.',
      'Using speakers so loud the mic picks up the reference instead of your voice.',
    ],
    whenToStop:
      'Take a break if your focus drops and errors increase—ear training is more effective in fresh 10-minute sessions.',
  },
  'song-in-the-right-key': {
    whyItWorks:
      'Applying range data to real repertoire is where technique pays off. Phrase-by-phrase pitch checks reveal which lines need key change or extra practice.',
    commonMistakes: [
      'Choosing a key from the original artist instead of your range test.',
      'Practicing only the chorus and ignoring verse tessitura.',
      'Singing full volume before phrases are in tune.',
    ],
    whenToStop:
      'Stop if repeated attempts on one line cause strain—lower the key again or simplify the phrase.',
  },
  'vocal-health-recovery-day': {
    whyItWorks:
      'Gentle movement and hydration support recovery better than complete silence followed by a hard comeback. Light pitch checks confirm stability without pushing range.',
    commonMistakes: [
      'Whispering instead of true vocal rest—whisper can strain more than soft speech.',
      'Testing full range on a recovery day to “see if you are better.”',
      'Returning to belting or long sets the same day as recovery exercises.',
    ],
    whenToStop:
      'If pain or hoarseness persists beyond two weeks, do not rely on tutorials—see a qualified clinician or voice specialist.',
  },
  'home-recording-vocal-check': {
    whyItWorks:
      'Home recordings hide pitch problems that feel fine while singing. The detector on playback reveals drift you can fix before sharing tracks.',
    commonMistakes: [
      'Monitoring with loud headphones that leak into the mic.',
      'Recording one take only without checking problem phrases.',
      'Blaming the mic when the issue is pitch or key choice.',
    ],
    whenToStop:
      'Stop recording sessions when your voice feels tired—fatigue shows up as flat notes first.',
  },
  'bridge-and-mix-practice': {
    whyItWorks:
      'Light “gee” and “nay” patterns thin heavy chest coordination so upper notes connect without a hard break. Tools keep you in tune while register feel changes.',
    commonMistakes: [
      'Pushing chest volume as notes rise instead of staying light.',
      'Practicing mix drills when the voice is already tired or sick.',
      'Expecting instant range extension in one session.',
    ],
    whenToStop:
      'Stop at any sharp pain, crack that hurts, or loss of your normal speaking voice.',
  },
  'belt-prep-safe': {
    whyItWorks:
      'Safe belting builds on support and forward resonance, not throat pressure. Short phrases with pitch feedback prevent shouting on high notes.',
    commonMistakes: [
      'Confusing loud chest voice with healthy belt.',
      'Skipping breath-and-posture work before belt drills.',
      'Belting without a warm-up on cold voices.',
    ],
    whenToStop:
      'Stop immediately with pain, burning, or if you cannot speak comfortably after the session.',
  },
};

export function getTutorialPracticeInsights(slug) {
  return tutorialPracticeInsightsBySlug[slug] || null;
}

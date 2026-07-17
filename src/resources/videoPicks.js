/**
 * Featured external video picks for Resources — keep short (editor depth > list size).
 * Full channel directories read as thin aggregation for AdSense; prefer 2 strong picks.
 */

export const videoPicks = [
  {
    id: 'eric-arceneaux-warmup',
    title: 'Eric Arceneaux (YouTube)',
    creator: 'Eric Arceneaux',
    description:
      'Clear contemporary warm-ups and technique breakdowns. Best used as a follow-along after you already know which SingMeter drill you will do next—not as endless playlist scrolling.',
    duration: 'Varies',
    bestFor: 'Guided warm-ups before range or pitch work',
    link: 'https://www.youtube.com/c/EricArceneaux',
    whyRecommend:
      'He explains what each exercise is for. That matches how we structure tutorials: purpose first, then tool feedback.',
    singmeterPairing:
      'Run our 15-Minute Daily Warm-Up tutorial, then open the Pitch Detector for a 5-minute mid-range check.',
    notIdealFor: 'Hoarse or painful days—use Vocal Health Recovery instead of more warm-up volume.',
    tutorialLink: '/tutorials/daily-warmup-15',
    blogLink: '/blog/vocal-health-and-maintenance',
  },
  {
    id: 'dr-dan-vocal-health',
    title: "Dr. Dan's Voice Essentials (YouTube)",
    creator: 'Dr. Dan Robinson',
    description:
      'Sustainable technique and vocal care—useful when you need a second opinion on rest, hydration habits, and not “pushing through.”',
    duration: 'Varies',
    bestFor: 'Tired-voice weeks and sustainable practice habits',
    link: 'https://www.youtube.com/@DrDanRobinson',
    whyRecommend:
      'Emphasizes recovery and longevity over viral high-note challenges—aligned with our recovery tutorial and health guide.',
    singmeterPairing:
      'On tired days, do Vocal Health Recovery first. When you return, warm up lightly and re-check range before peak notes.',
    notIdealFor: 'Sharp pain, sudden voice loss, or illness—see a clinician.',
    tutorialLink: '/tutorials/vocal-health-recovery-day',
    blogLink: '/blog/vocal-health-and-maintenance',
  },
];

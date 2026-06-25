const meta = {
  id: 'vocal-health-recovery-day',
  slug: 'vocal-health-recovery-day',
  title: 'Vocal Health Recovery Day',
  seoTitle: 'Vocal Health Recovery Day: Singer Tutorial',
  seoDescription:
    'A gentle recovery-day protocol when your voice feels tired: hydration, silence, light hums, and when to return to full practice with SingMeter.',
  excerpt:
    'What to do on a tired-voice day—and how to return safely to range and pitch tools.',
  level: 'Beginner',
  track: 'care',
  trackLabel: 'Care & recovery',
  duration: '10 min active + rest',
  date: '2026-05-23',
  prerequisites: [],
  nextSlug: 'home-recording-vocal-check',
  category: 'Vocal Health',
};

const intro =
  'Use this lesson when your voice feels hoarse, tired, or worn after a long rehearsal—not when you have sharp pain (see a doctor or voice therapist for pain). Recovery is active rest: hydration, silence, and only gentle sound. Do not run a full Vocal Range Test or belt high notes today.';

const tools = [
  {
    to: '/tutorials/daily-warmup-15',
    label: '15-Minute Warm-Up',
    hint: 'Use only after you are fully recovered (usually tomorrow or later).',
  },
  {
    to: '/pitch-detector',
    label: 'Pitch Detector',
    hint: 'Optional on return day: one soft note check only—not full drills.',
  },
];

const steps = [
  {
    title: 'Stop and assess (no singing yet)',
    duration: '2 min',
    body: `Rate your voice 1–5: 1 = normal, 5 = very hoarse or painful.\n\nIf 4–5 with pain, stop all singing and consider medical advice.\n\nIf 2–3 (tired, dull tone): continue this recovery protocol.\n\nNo Vocal Range Test, Song Key Finder belting, or long Pitch Detector sessions today.`,
  },
  {
    title: 'Hydration and environment',
    duration: '3 min',
    body: `Drink room-temperature water now; aim for consistent sips over the next few hours—not chugging ice water.\n\nAvoid whispering (it strains more than soft speaking).\n\nIf air is dry, humidify the room or breathe steam from a shower (not over boiling water).`,
  },
  {
    title: 'Vocal silence block',
    duration: '20–60 min',
    body: `No singing, no shouting, minimal talking for at least 20 minutes—longer if you gigged last night.\n\nText or write instead of long phone calls.\n\nThis is the most effective part of recovery for tired folds.`,
  },
  {
    title: 'Gentle straw or lip trill (optional)',
    duration: '3 min',
    body: `If you must make sound: lip trills in your mid range only, very quiet, for 30 seconds—rest 30 seconds—repeat 3 times.\n\nNo high notes, no full songs.\n\nStop immediately if you feel tickling or pain.`,
  },
  {
    title: 'Plan your return',
    duration: '2 min',
    body: `Tomorrow or when your voice feels 1–2 again:\n1) Run Breath & Posture (short version)\n2) Full 15-Minute Warm-Up\n3) Light Pitch Calibration—no more than 10 minutes\n\nLog today as a rest day in your practice notes so you do not stack hard sessions.`,
    toolCallout: { to: '/tutorials/breath-and-posture-basics', label: 'Breath & Posture' },
  },
];

const selfCheck = [
  'I avoided range tests, belting, and long pitch drills while tired.',
  'I drank water and took a real silence break—not just “singing quietly.”',
  'I know which tutorial to run first when my voice feels normal again.',
];

const goDeeper = [
  { to: '/blog/vocal-health-and-maintenance', label: 'Vocal health basics (full article)' },
  { to: '/blog/high-notes-warmup-routine', label: 'High Notes Warm-Up (for return days only)' },
];

export default { meta, intro, tools, steps, selfCheck, goDeeper };

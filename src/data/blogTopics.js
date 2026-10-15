/**
 * The four blog topics. Each article's `meta.category` must equal one topic's `category`;
 * /blog groups articles by this field and related-article lists stay within a topic.
 */
export const BLOG_TOPICS = [
  {
    id: 'pitch',
    category: 'Pitch & Ear Training',
    description: 'Sing in tune: read a pitch detector, fix flat or sharp habits, and train your ear.',
  },
  {
    id: 'range',
    category: 'Vocal Range & Song Key',
    description: 'Measure your range, understand your voice type, and pick or transpose songs that fit.',
  },
  {
    id: 'technique',
    category: 'Technique',
    description: 'Breath support, registers, mixed voice, and high notes without strain.',
  },
  {
    id: 'practice',
    category: 'Practice & Vocal Health',
    description: 'Practice routines, learning songs, performing, and keeping your voice healthy.',
  },
];

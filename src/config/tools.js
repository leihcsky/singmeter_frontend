/**
 * Tools Configuration
 * Central place to manage all tools in the application
 * 
 * To add a new tool:
 * 1. Add tool object to the array below
 * 2. Set appropriate category, priority, and badges
 * 3. Create the tool page component
 * 4. Add route in App.jsx
 * 
 * Categories:
 * - Testing Tools: Tools for testing vocal abilities
 * - Practice Tools: Tools for practicing and improving
 * - Analysis Tools: Tools for analyzing audio/music
 * - Audio Tools: Tools for audio processing
 */

export const tools = [
  {
    id: 'vocal-range-test',
    path: '/vocal-range-test',
    icon: '🎤',
    name: 'Vocal Range Test',
    shortName: 'Range', // For mobile bottom nav
    description: 'Discover your singing range and voice type in just 3 minutes. Perfect for beginners and pros alike - get personalized song recommendations that match your voice.',
    category: 'Testing Tools',
    priority: 1, // Lower number = higher priority (shows first)
    badge: 'Popular',
    badgeColor: 'bg-pink-100 text-pink-700',
    gradient: 'from-indigo-600 to-purple-600',
    comingSoon: false,
  },
  {
    id: 'pitch-detector',
    path: '/pitch-detector',
    icon: '🎵',
    name: 'Pitch Detector',
    shortName: 'Pitch',
    description: 'See your pitch in real-time as you sing or play. Great for practice, learning, or just having fun - improve your pitch accuracy at your own pace.',
    category: 'Testing Tools',
    priority: 2,
    badge: 'New',
    badgeColor: 'bg-green-100 text-green-700',
    gradient: 'from-purple-600 to-pink-600',
    comingSoon: false,
  },
  
  // Future tools - uncomment and configure when ready to launch
  
  // {
  //   id: 'key-finder',
  //   path: '/key-finder',
  //   icon: '🎹',
  //   name: 'Song Key Finder',
  //   shortName: 'Key Finder',
  //   description: 'Upload a song and instantly discover its musical key. Perfect for musicians, singers, and music learners.',
  //   category: 'Analysis Tools',
  //   priority: 3,
  //   badge: null,
  //   badgeColor: null,
  //   gradient: 'from-blue-600 to-cyan-600',
  //   comingSoon: true,
  // },
  
  // {
  //   id: 'autotune',
  //   path: '/autotune',
  //   icon: '🎚️',
  //   name: 'Autotune Online',
  //   shortName: 'Autotune',
  //   description: 'Auto-tune your recordings online for free. Upload your audio and get professional-sounding results instantly.',
  //   category: 'Audio Tools',
  //   priority: 4,
  //   badge: null,
  //   badgeColor: null,
  //   gradient: 'from-green-600 to-teal-600',
  //   comingSoon: true,
  // },
  
  // {
  //   id: 'vocal-warmups',
  //   path: '/vocal-warmups',
  //   icon: '🔥',
  //   name: 'Vocal Warm-ups',
  //   shortName: 'Warm-ups',
  //   description: 'Guided vocal warm-up exercises to prepare your voice. Follow along with audio examples and improve your technique.',
  //   category: 'Practice Tools',
  //   priority: 5,
  //   badge: null,
  //   badgeColor: null,
  //   gradient: 'from-orange-600 to-red-600',
  //   comingSoon: true,
  // },
  
  // {
  //   id: 'metronome',
  //   path: '/metronome',
  //   icon: '⏱️',
  //   name: 'Online Metronome',
  //   shortName: 'Metronome',
  //   description: 'Keep perfect time with our online metronome. Adjustable tempo, time signatures, and sound options.',
  //   category: 'Practice Tools',
  //   priority: 6,
  //   badge: null,
  //   badgeColor: null,
  //   gradient: 'from-gray-600 to-slate-600',
  //   comingSoon: true,
  // },
  
  // {
  //   id: 'chord-finder',
  //   path: '/chord-finder',
  //   icon: '🎸',
  //   name: 'Chord Finder',
  //   shortName: 'Chords',
  //   description: 'Find guitar and piano chords instantly. Search by name or discover chords by playing notes.',
  //   category: 'Analysis Tools',
  //   priority: 7,
  //   badge: null,
  //   badgeColor: null,
  //   gradient: 'from-amber-600 to-yellow-600',
  //   comingSoon: true,
  // },
];

/**
 * Get tools by category
 * @returns {Object} Tools grouped by category
 */
export const getToolsByCategory = () => {
  return tools.reduce((acc, tool) => {
    const category = tool.category || 'Other Tools';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {});
};

/**
 * Get active tools (not coming soon)
 * @returns {Array} Active tools
 */
export const getActiveTools = () => {
  return tools.filter(tool => !tool.comingSoon);
};

/**
 * Get coming soon tools
 * @returns {Array} Coming soon tools
 */
export const getComingSoonTools = () => {
  return tools.filter(tool => tool.comingSoon);
};

/**
 * Get tool by ID
 * @param {string} id - Tool ID
 * @returns {Object|null} Tool object or null
 */
export const getToolById = (id) => {
  return tools.find(tool => tool.id === id) || null;
};

/**
 * Get tool by path
 * @param {string} path - Tool path
 * @returns {Object|null} Tool object or null
 */
export const getToolByPath = (path) => {
  return tools.find(tool => tool.path === path) || null;
};

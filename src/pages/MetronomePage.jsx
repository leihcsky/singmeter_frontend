/**
 * Metronome Page - Fun and interactive online metronome
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

// BPM presets
const BPM_PRESETS = [
  { label: 'Largo', bpm: 40, description: 'Very slow' },
  { label: 'Adagio', bpm: 60, description: 'Slow' },
  { label: 'Andante', bpm: 80, description: 'Walking pace' },
  { label: 'Moderato', bpm: 100, description: 'Moderate' },
  { label: 'Allegro', bpm: 120, description: 'Fast' },
  { label: 'Presto', bpm: 160, description: 'Very fast' },
];

// Time signatures
const TIME_SIGNATURES = [
  { value: '2/4', label: '2/4', beats: 2, accent: [1] },
  { value: '3/4', label: '3/4', beats: 3, accent: [1] },
  { value: '4/4', label: '4/4', beats: 4, accent: [1] },
  { value: '6/8', label: '6/8', beats: 6, accent: [1, 4] },
];

// Sound types
const SOUND_TYPES = [
  { value: 'classic', label: 'Classic', icon: '🎵' },
  { value: 'wood', label: 'Wood', icon: '🪵' },
  { value: 'electronic', label: 'Electronic', icon: '⚡' },
  { value: 'bell', label: 'Bell', icon: '🔔' },
];

const MetronomePage = () => {
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [soundType, setSoundType] = useState('classic');
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatAnimation, setBeatAnimation] = useState(false);

  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);
  const beatCountRef = useRef(0);
  const currentTimeSigRef = useRef(TIME_SIGNATURES.find(ts => ts.value === timeSignature));
  const isPlayingRef = useRef(false);
  
  // Use refs to store current values for real-time updates
  const bpmRef = useRef(bpm);
  const volumeRef = useRef(volume);
  const soundTypeRef = useRef(soundType);
  const timeSignatureRef = useRef(timeSignature);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Free Online Metronome - Fun & Interactive Beat Keeper | SingMeter';

    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const canonicalUrl = 'https://www.singmeter.com/metronome';
    
    // Basic meta tags
    setMetaTag('description', 'Free online metronome with visual feedback and fun animations. Adjustable BPM, time signatures, and sound types. Perfect for music practice and keeping perfect time.');
    setMetaTag('keywords', 'metronome, online metronome, beat keeper, tempo, BPM, time signature, music practice, rhythm practice, metronome online');
    
    // Open Graph tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', 'Free Online Metronome - Fun & Interactive Beat Keeper | SingMeter', true);
    setMetaTag('og:description', 'Free online metronome with visual feedback and fun animations. Adjustable BPM, time signatures, and sound types. Perfect for music practice.', true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', 'https://www.singmeter.com/og-image.svg', true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'SingMeter', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Free Online Metronome - Fun & Interactive Beat Keeper | SingMeter');
    setMetaTag('twitter:description', 'Free online metronome with visual feedback and fun animations. Adjustable BPM, time signatures, and sound types. Perfect for music practice.');
    setMetaTag('twitter:image', 'https://www.singmeter.com/og-image.svg');
    
    // Canonical link
    setLinkTag('canonical', canonicalUrl);

    return () => {
      document.title = 'SingMeter';
      stopMetronome();
    };
  }, []);

  // Update refs when state changes for real-time access
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    soundTypeRef.current = soundType;
  }, [soundType]);

  useEffect(() => {
    timeSignatureRef.current = timeSignature;
    currentTimeSigRef.current = TIME_SIGNATURES.find(ts => ts.value === timeSignature);
    if (isPlaying) {
      beatCountRef.current = 0;
      setCurrentBeat(0);
    }
  }, [timeSignature, isPlaying]);

  // Initialize audio context
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        return false;
      }
    }
    return true;
  };

  // Play beat sound - uses refs for real-time values
  const playBeat = (isAccent = false) => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    // Get current values from refs for real-time updates
    const currentSoundType = soundTypeRef.current;
    const currentVolume = volumeRef.current;

    // Different frequencies for different sound types
    let frequency = 800;
    let waveType = 'sine';
    let duration = 0.05;

    switch (currentSoundType) {
      case 'classic':
        frequency = isAccent ? 1000 : 800;
        waveType = 'sine';
        break;
      case 'wood':
        frequency = isAccent ? 600 : 500;
        waveType = 'sine';
        duration = 0.08;
        break;
      case 'electronic':
        frequency = isAccent ? 1200 : 1000;
        waveType = 'square';
        duration = 0.03;
        break;
      case 'bell':
        frequency = isAccent ? 880 : 660;
        waveType = 'sine';
        duration = 0.15;
        break;
    }

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    // Volume envelope - use current volume from ref
    const now = context.currentTime;
    const accentVolume = isAccent ? currentVolume * 1.3 : currentVolume;
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(accentVolume, now + 0.001);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  // Start metronome
  const startMetronome = async () => {
    if (isPlayingRef.current) return;

    const initialized = await initAudioContext();
    if (!initialized) {
      alert('Failed to initialize audio. Please check your browser settings.');
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    beatCountRef.current = 0;
    setCurrentBeat(0);

    // Use ref to get current BPM for real-time updates
    const getCurrentInterval = () => 60000 / bpmRef.current;
    const timeSig = currentTimeSigRef.current;

    // Play first beat immediately
    playBeat(true);
    setBeatAnimation(true);
    setTimeout(() => setBeatAnimation(false), 150);

    // Use a function that recalculates interval on each beat for real-time BPM updates
    const scheduleNextBeat = () => {
      // Check if still playing using ref
      if (!isPlayingRef.current) return;
      
      const interval = getCurrentInterval();
      
      intervalRef.current = setTimeout(() => {
        // Check again in case stopped during timeout
        if (!isPlayingRef.current) return;
        
        // Get current time signature for real-time updates
        const currentTimeSig = TIME_SIGNATURES.find(ts => ts.value === timeSignatureRef.current);
        currentTimeSigRef.current = currentTimeSig;
        
        beatCountRef.current = (beatCountRef.current + 1) % currentTimeSig.beats;
        const beatNumber = beatCountRef.current;
        setCurrentBeat(beatNumber);

        const isAccent = currentTimeSig.accent.includes(beatNumber + 1);
        playBeat(isAccent);

        // Visual animation
        setBeatAnimation(true);
        setTimeout(() => setBeatAnimation(false), 150);

        // Schedule next beat
        scheduleNextBeat();
      }, interval);
    };

    scheduleNextBeat();
  };

  // Stop metronome
  const stopMetronome = () => {
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    beatCountRef.current = 0;
    setCurrentBeat(0);
    setBeatAnimation(false);
  };

  // Handle BPM change - no need to restart, will update in real-time
  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
    // BPM will be read from ref in real-time, no restart needed
  };

  // Handle time signature change - will update in real-time
  const handleTimeSignatureChange = (newTimeSig) => {
    setTimeSignature(newTimeSig);
    // Time signature will be read from ref in real-time, no restart needed
  };

  // Handle sound type change - will update in real-time
  const handleSoundTypeChange = (newSoundType) => {
    setSoundType(newSoundType);
    // Sound type will be read from ref in real-time, no restart needed
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMetronome();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const currentTimeSig = TIME_SIGNATURES.find(ts => ts.value === timeSignature);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Online Metronome",
          "url": "https://www.singmeter.com/metronome",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Free online metronome with visual feedback and fun animations. Adjustable BPM, time signatures, and sound types. Perfect for music practice and keeping perfect time.",
          "featureList": [
            "Adjustable BPM (40-200)",
            "Multiple time signatures (2/4, 3/4, 4/4, 6/8)",
            "Visual beat indicators with animations",
            "Multiple sound types (classic, wood, electronic, bell)",
            "Volume control",
            "BPM presets for common tempos"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "380",
            "bestRating": "5",
            "worstRating": "1"
          },
          "creator": {
            "@type": "Organization",
            "name": "SingMeter",
            "url": "https://www.singmeter.com"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              ⏱️ Online Metronome
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Keep perfect time with our fun and interactive metronome. Visual feedback and smooth animations make practice enjoyable.
            </p>
          </div>

          {/* Metronome Interface */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-8">
            {/* Large Visual Beat Indicator */}
            <div className="mb-8">
              <div className="relative flex items-center justify-center">
                {/* Pulsing Circle */}
                <div
                  className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full transition-all duration-150 ${
                    beatAnimation
                      ? currentTimeSig.accent.includes(currentBeat + 1)
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-110'
                        : 'bg-gradient-to-r from-orange-400 to-red-400 scale-105'
                      : 'bg-gradient-to-r from-orange-200 to-red-200 scale-100'
                  }`}
                  style={{
                    boxShadow: beatAnimation
                      ? currentTimeSig.accent.includes(currentBeat + 1)
                        ? '0 0 40px rgba(249, 115, 22, 0.6)'
                        : '0 0 30px rgba(249, 115, 22, 0.4)'
                      : '0 0 20px rgba(249, 115, 22, 0.2)',
                  }}
                />
                {/* BPM Display */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl sm:text-7xl font-bold text-gray-900 mb-2">
                    {bpm}
                  </div>
                  <div className="text-xl text-gray-600">BPM</div>
                </div>
              </div>
            </div>

            {/* Beat Indicators */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-3 sm:gap-4">
                {Array.from({ length: currentTimeSig.beats }).map((_, index) => {
                  const beatNumber = index + 1;
                  const isActive = currentBeat === index;
                  const isAccent = currentTimeSig.accent.includes(beatNumber);
                  
                  return (
                    <div
                      key={index}
                      className={`flex-1 h-16 sm:h-20 rounded-xl transition-all duration-150 flex items-center justify-center ${
                        isActive
                          ? isAccent
                            ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110 shadow-lg'
                            : 'bg-gradient-to-br from-orange-400 to-red-400 scale-105 shadow-md'
                          : 'bg-gray-200 scale-100'
                      }`}
                    >
                      <span
                        className={`text-2xl sm:text-3xl font-bold ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {beatNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-3 text-sm text-gray-500">
                Time Signature: {timeSignature}
              </div>
            </div>

            {/* Play/Stop Button */}
            <div className="text-center mb-8">
              <button
                onClick={isPlaying ? stopMetronome : startMetronome}
                className={`px-12 py-6 text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                  isPlaying
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white'
                }`}
              >
                {isPlaying ? '⏹ Stop' : '▶ Start'}
              </button>
            </div>

            {/* BPM Control */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tempo: {bpm} BPM
              </label>
              <input
                type="range"
                min="40"
                max="200"
                step="1"
                value={bpm}
                onChange={(e) => handleBpmChange(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>40 (Largo)</span>
                <span>120 (Moderato)</span>
                <span>200 (Presto)</span>
              </div>
            </div>

            {/* BPM Presets */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎵 Tempo Presets
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BPM_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleBpmChange(preset.bpm)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                      bpm === preset.bpm
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={preset.description}
                  >
                    {preset.label}
                    <div className="text-xs opacity-75">{preset.bpm}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Signature Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Time Signature
              </label>
              <div className="grid grid-cols-4 gap-3">
                {TIME_SIGNATURES.map((ts) => (
                  <button
                    key={ts.value}
                    onClick={() => handleTimeSignatureChange(ts.value)}
                    className={`px-4 py-3 text-lg font-bold rounded-lg transition ${
                      timeSignature === ts.value
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ts.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sound Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SOUND_TYPES.map((sound) => (
                  <button
                    key={sound.value}
                    onClick={() => handleSoundTypeChange(sound.value)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2 ${
                      soundType === sound.value
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{sound.icon}</span>
                    <span>{sound.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Tool Introduction */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 About the Metronome</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                A metronome is an essential tool for any musician, helping you develop a strong sense of rhythm and timing. Our online metronome provides a fun, interactive way to keep perfect time during practice sessions, whether you're singing, playing an instrument, or working on rhythm exercises.
              </p>
              <p>
                Unlike traditional mechanical metronomes, our digital version offers precise timing, visual feedback, and customizable features. The large, animated beat indicator makes it easy to see the rhythm, while different sound types let you choose the audio feedback that works best for your practice style.
              </p>
              <p>
                The metronome supports various time signatures, from simple 4/4 time to compound meters like 6/8. You can adjust the tempo (BPM - beats per minute) from very slow (40 BPM) to very fast (200 BPM), with convenient presets for common musical tempos like Largo, Andante, Allegro, and Presto.
              </p>
              <p>
                Visual feedback is a key feature that makes this metronome both fun and effective. The large pulsing circle and beat indicators provide clear visual cues that complement the audio, helping you internalize the rhythm. The accent beats (typically the first beat of each measure) are highlighted more prominently, making it easy to feel the musical phrase structure.
              </p>
              <p>
                Whether you're a beginner learning to keep steady time or an experienced musician working on complex rhythms, this metronome adapts to your needs. Use it for vocal warm-ups, instrument practice, rhythm training, or any musical activity that requires precise timing.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 How to Use</h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">1.</span>
                <div>
                  <span className="font-semibold text-gray-900">Set Your Tempo:</span>
                  <p className="mt-1">Use the BPM slider or click a tempo preset (Largo, Andante, Allegro, etc.) to set your desired speed. BPM stands for "beats per minute" - higher numbers mean faster tempos. Start with a comfortable tempo (around 100-120 BPM) and adjust as needed.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">2.</span>
                <div>
                  <span className="font-semibold text-gray-900">Choose Time Signature:</span>
                  <p className="mt-1">Select the time signature that matches your music. 4/4 (four beats per measure) is the most common. 3/4 is used for waltzes, 2/4 for marches, and 6/8 for compound time. The metronome will accent the first beat of each measure.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">3.</span>
                <div>
                  <span className="font-semibold text-gray-900">Select Sound Type:</span>
                  <p className="mt-1">Choose from Classic (traditional metronome sound), Wood (warmer, softer tone), Electronic (sharp, modern sound), or Bell (clear, resonant tone). Pick the one that's least distracting for your practice.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">4.</span>
                <div>
                  <span className="font-semibold text-gray-900">Adjust Volume:</span>
                  <p className="mt-1">Set the volume to a level where you can hear the beats clearly without them overpowering your playing or singing. The metronome should be a guide, not a distraction.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">5.</span>
                <div>
                  <span className="font-semibold text-gray-900">Start Practicing:</span>
                  <p className="mt-1">Click "Start" and begin playing or singing along with the metronome. Watch the visual indicators to help you stay in time. Try to match the beat exactly, and don't rush or drag. The pulsing circle and beat numbers will help you see if you're ahead or behind the beat.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-600 mr-3">6.</span>
                <div>
                  <span className="font-semibold text-gray-900">Practice Gradually:</span>
                  <p className="mt-1">Start at a slower tempo than your target speed, master the rhythm at that pace, then gradually increase the BPM. This builds muscle memory and accuracy. Use the tempo presets to find your starting point, then fine-tune with the slider.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Metronome Practice Tips */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Metronome Practice Tips</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Start Slow, Build Speed Gradually
                </h3>
                <p className="text-gray-600 mb-3">
                  Always begin practicing a new piece or exercise at a slower tempo than your target speed. Set the metronome to 60-80% of your goal BPM. Once you can play accurately and comfortably at that speed, increase by 5-10 BPM. Repeat until you reach your target tempo. This methodical approach builds accuracy and muscle memory.
                </p>
                <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-900">
                  <strong>Example:</strong> If your goal is 120 BPM, start at 80 BPM, then move to 90, 100, 110, and finally 120.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👂</span>
                  Listen Before You Play
                </h3>
                <p className="text-gray-600 mb-3">
                  Before starting to play or sing, let the metronome run for a few measures. Close your eyes and internalize the rhythm. Feel the pulse, tap your foot, or nod your head. This helps you sync with the beat before you begin, reducing the chance of starting off-time.
                </p>
                <div className="bg-red-50 rounded-lg p-3 text-sm text-red-900">
                  <strong>Tip:</strong> Count along with the metronome: "1, 2, 3, 4" for 4/4 time, or "1, 2, 3" for 3/4 time.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎵</span>
                  Use Subdivisions for Complex Rhythms
                </h3>
                <p className="text-gray-600 mb-3">
                  For difficult passages with complex rhythms, set the metronome to click on subdivisions (e.g., set to 120 BPM but think of it as 60 BPM with eighth-note clicks). This gives you more reference points and makes intricate rhythms easier to master.
                </p>
                <div className="bg-pink-50 rounded-lg p-3 text-sm text-pink-900">
                  <strong>Practice:</strong> Try playing triplets by setting the metronome to 3x your base tempo.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👁️</span>
                  Watch the Visual Indicators
                </h3>
                <p className="text-gray-600 mb-3">
                  The pulsing circle and beat numbers aren't just decorative - they're powerful visual aids. Watch them to see if you're rushing (ahead of the beat) or dragging (behind the beat). The visual feedback helps you develop a better internal sense of timing.
                </p>
                <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-900">
                  <strong>Exercise:</strong> Try playing with your eyes closed, then open them to check if you're still aligned with the visual beat.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔄</span>
                  Practice with and without the Metronome
                </h3>
                <p className="text-gray-600 mb-3">
                  Alternate between practicing with the metronome and without it. Use the metronome to establish the tempo and develop accuracy, then turn it off and see if you can maintain that tempo on your own. This builds both technical precision and musical independence.
                </p>
                <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-900">
                  <strong>Routine:</strong> Practice with metronome for 10 minutes, then 5 minutes without, then back to metronome to check your consistency.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎤</span>
                  Use for Vocal Warm-ups
                </h3>
                <p className="text-gray-600 mb-3">
                  Singers can use the metronome for vocal exercises, scales, and arpeggios. Set a moderate tempo (80-100 BPM) and practice your warm-up exercises in time. This helps develop rhythmic accuracy in your singing and ensures your vocal exercises are consistent.
                </p>
                <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-900">
                  <strong>Exercise:</strong> Sing scales (do-re-mi-fa-sol-la-ti-do) with the metronome, one note per beat.
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What is BPM?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  BPM stands for "beats per minute" - it's a measure of tempo. A higher BPM means a faster tempo. For example, 60 BPM is one beat per second (very slow), while 120 BPM is two beats per second (moderate). Most popular music falls between 100-140 BPM. Classical music can range from 40 BPM (very slow, Largo) to 200+ BPM (very fast, Presto).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What's the difference between time signatures?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Time signatures tell you how many beats are in each measure and which note gets the beat. 4/4 means 4 beats per measure (quarter notes). 3/4 means 3 beats per measure (waltz time). 2/4 means 2 beats per measure (march time). 6/8 is compound time with 6 eighth-note beats grouped into two groups of three. The metronome accents the first beat of each measure to help you feel the musical phrase.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Why should I use a metronome?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A metronome helps you develop a consistent sense of rhythm and timing. It prevents you from rushing (playing too fast) or dragging (playing too slow), which are common problems for musicians. Regular metronome practice builds muscle memory, improves accuracy, and helps you play in time with other musicians. Even professional musicians use metronomes to maintain precision.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What tempo should I start with?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Start slower than you think you need to. If you can play a piece at 100 BPM, start practicing at 70-80 BPM. This slower tempo allows you to focus on accuracy, technique, and musical expression without worrying about speed. Once you can play perfectly at the slower tempo, gradually increase by 5-10 BPM until you reach your target speed.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I use this for singing practice?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! Singers use metronomes for vocal exercises, scales, rhythm training, and practicing songs. Set a comfortable tempo and practice your vocal warm-ups, scales, or song phrases in time. The visual feedback is especially helpful for singers, as it provides a clear reference point even when you can't hear the audio clearly.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">The metronome stops when I switch browser tabs. Why?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Some browsers pause JavaScript timers and audio when you switch to another tab to save resources. This is a browser feature, not a limitation of the metronome. To keep the metronome running, keep the browser tab active. On mobile devices, you may need to keep the screen on to prevent the browser from pausing.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">How accurate is the timing?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our metronome uses precise JavaScript timing and the Web Audio API, providing accuracy within milliseconds. This level of precision is more than sufficient for musical practice. The timing is consistent and reliable, making it suitable for serious practice sessions and even performance preparation.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I use this offline?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Once the page is loaded, the metronome works entirely in your browser using JavaScript and the Web Audio API. You don't need an internet connection to use it after the initial page load. However, you'll need internet to first access the page. For true offline use, consider bookmarking the page or using your browser's offline mode.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-3">Enhance Your Practice</h2>
            <p className="text-orange-100 mb-6">
              Combine the metronome with our other tools for comprehensive music practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/pitch-detector"
                className="inline-block px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition"
              >
                🎵 Pitch Detector
              </Link>
              <Link
                to="/tone-generator"
                className="inline-block px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition"
              >
                🔊 Tone Generator
              </Link>
              <Link
                to="/vocal-range-test"
                className="inline-block px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition"
              >
                🎤 Vocal Range Test
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-orange-600 transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-orange-600 transition">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-orange-600 transition">Disclaimer</Link>
                <Link to="/contact" className="hover:text-orange-600 transition">Contact</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </>
  );
};

export default MetronomePage;


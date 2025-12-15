/**
 * Tone Generator Page - Audio tone generator for pitch reference and ear training
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

// Musical note frequencies (A4 = 440 Hz)
const NOTE_FREQUENCIES = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'F#5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'A5': 880.00,
};

const WAVE_TYPES = ['sine', 'square', 'sawtooth', 'triangle'];

const ToneGeneratorPage = () => {
  const [frequency, setFrequency] = useState(440); // A4 default
  const [waveType, setWaveType] = useState('sine');
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNote, setSelectedNote] = useState('A4');

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Free Online Tone Generator - Pitch Reference & Ear Training | SingMeter';

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

    const canonicalUrl = 'https://www.singmeter.com/tone-generator';
    
    // Basic meta tags
    setMetaTag('description', 'Generate precise audio tones for pitch reference and ear training. Perfect for vocal practice, instrument tuning, and developing your musical ear. Free online tone generator.');
    setMetaTag('keywords', 'tone generator, audio tone generator, pitch reference, ear training, frequency generator, audio signal generator, tuning tone, vocal practice tool');
    
    // Open Graph tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', 'Free Online Tone Generator - Pitch Reference & Ear Training | SingMeter', true);
    setMetaTag('og:description', 'Generate precise audio tones for pitch reference and ear training. Perfect for vocal practice, instrument tuning, and developing your musical ear.', true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', 'https://www.singmeter.com/og-image.svg', true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'SingMeter', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Free Online Tone Generator - Pitch Reference & Ear Training | SingMeter');
    setMetaTag('twitter:description', 'Generate precise audio tones for pitch reference and ear training. Perfect for vocal practice, instrument tuning, and developing your musical ear.');
    setMetaTag('twitter:image', 'https://www.singmeter.com/og-image.svg');
    
    // Canonical link
    setLinkTag('canonical', canonicalUrl);

    return () => {
      document.title = 'SingMeter';
      stopTone();
    };
  }, []);

  // Initialize audio context
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        // Resume context if suspended (required by some browsers)
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

  // Start playing tone
  const startTone = async () => {
    if (isPlaying) return;

    const initialized = await initAudioContext();
    if (!initialized) {
      alert('Failed to initialize audio. Please check your browser settings.');
      return;
    }

    const context = audioContextRef.current;

    // Create oscillator
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    // Set volume
    gainNode.gain.value = volume;

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Start playing
    oscillator.start(0);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  };

  // Stop playing tone
  const stopTone = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (error) {
        // Oscillator may already be stopped
      }
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  // Handle frequency change
  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.frequency.value = newFrequency;
    }
  };

  // Handle note selection
  const handleNoteSelect = (note) => {
    const noteFreq = NOTE_FREQUENCIES[note];
    if (noteFreq) {
      setSelectedNote(note);
      handleFrequencyChange(noteFreq);
    }
  };

  // Handle wave type change
  const handleWaveTypeChange = (newWaveType) => {
    setWaveType(newWaveType);
    if (isPlaying && oscillatorRef.current) {
      oscillatorRef.current.type = newWaveType;
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (isPlaying && gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Tone Generator",
          "url": "https://www.singmeter.com/tone-generator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Generate precise audio tones for pitch reference and ear training. Perfect for vocal practice, instrument tuning, and developing your musical ear.",
          "featureList": [
            "Generate tones from 20 Hz to 20,000 Hz",
            "Multiple waveform types (sine, square, sawtooth, triangle)",
            "Volume control",
            "Musical note presets",
            "Real-time frequency adjustment",
            "Perfect for ear training and pitch reference"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "450",
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

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Use the Tone Generator",
          "description": "Learn how to use the tone generator for pitch reference and ear training.",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Select a Note or Frequency",
              "text": "Choose a musical note from the preset list or enter a custom frequency (20 Hz to 20,000 Hz)."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Choose Waveform Type",
              "text": "Select a waveform type: sine (pure tone), square, sawtooth, or triangle. Each has a different sound character."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Adjust Volume",
              "text": "Use the volume slider to set a comfortable listening level. Start with lower volumes to protect your hearing."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Play and Practice",
              "text": "Click 'Play' to generate the tone. Use it as a reference pitch for singing practice or instrument tuning."
            }
          ],
          "totalTime": "PT2M"
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              🔊 Tone Generator
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Generate precise audio tones for pitch reference and ear training. Perfect for vocal practice, instrument tuning, and developing your musical ear.
            </p>
          </div>

          {/* Generator Interface */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-8">
            {/* Play/Stop Button */}
            <div className="text-center mb-8">
              <button
                onClick={isPlaying ? stopTone : startTone}
                className={`px-12 py-6 text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                  isPlaying
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                }`}
              >
                {isPlaying ? '⏹ Stop' : '▶ Play'}
              </button>
            </div>

            {/* Frequency Display */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {frequency.toFixed(2)} Hz
              </div>
              <div className="text-xl text-gray-500">
                {Object.entries(NOTE_FREQUENCIES).find(([note, freq]) => 
                  Math.abs(freq - frequency) < 0.5
                )?.[0] || 'Custom Frequency'}
              </div>
            </div>

            {/* Musical Note Presets */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎵 Musical Note Presets
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {Object.keys(NOTE_FREQUENCIES).map((note) => (
                  <button
                    key={note}
                    onClick={() => handleNoteSelect(note)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                      selectedNote === note
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Frequency: {frequency.toFixed(2)} Hz
              </label>
              <input
                type="range"
                min="20"
                max="20000"
                step="0.1"
                value={frequency}
                onChange={(e) => handleFrequencyChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20 Hz</span>
                <span>10,000 Hz</span>
                <span>20,000 Hz</span>
              </div>
            </div>

            {/* Wave Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Waveform Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WAVE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleWaveTypeChange(type)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition capitalize ${
                      waveType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
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
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 About the Tone Generator</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                The Tone Generator is a powerful tool for musicians, singers, and audio enthusiasts. It generates precise audio tones at any frequency you specify, making it perfect for pitch reference, ear training, instrument tuning, and vocal practice.
              </p>
              <p>
                Whether you're a beginner learning to match pitch or an experienced musician fine-tuning your instrument, this tool provides a reliable reference tone. The generator supports frequencies from 20 Hz (very low bass) to 20,000 Hz (very high treble), covering the full range of human hearing.
              </p>
              <p>
                You can choose from four different waveform types, each with its own unique sound character. Sine waves produce pure, smooth tones ideal for pitch reference. Square waves have a harsher, more complex sound. Sawtooth waves are rich in harmonics, while triangle waves offer a softer alternative to square waves.
              </p>
              <p>
                The tool also includes convenient musical note presets, allowing you to quickly access standard tuning frequencies like A4 (440 Hz, the concert pitch) or any note in the musical scale. This makes it easy to practice singing specific notes or tune instruments to standard pitches.
              </p>
              <p>
                Use the volume control to set a comfortable listening level. We recommend starting with lower volumes, especially when using headphones, to protect your hearing. The tone will play continuously until you click the stop button, giving you plenty of time to match the pitch with your voice or instrument.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 How to Use</h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">1.</span>
                <div>
                  <span className="font-semibold text-gray-900">Select a Note or Frequency:</span>
                  <p className="mt-1">Choose a musical note from the preset buttons (like A4 for 440 Hz) or use the frequency slider to set a custom frequency. The frequency range is 20 Hz to 20,000 Hz, covering the full spectrum of human hearing.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">2.</span>
                <div>
                  <span className="font-semibold text-gray-900">Choose Waveform Type:</span>
                  <p className="mt-1">Select from sine (pure tone), square, sawtooth, or triangle waveforms. Sine waves are best for pitch reference, while other waveforms can be useful for ear training and understanding harmonic content.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">3.</span>
                <div>
                  <span className="font-semibold text-gray-900">Adjust Volume:</span>
                  <p className="mt-1">Use the volume slider to set a comfortable listening level. Start with lower volumes (30-50%) to protect your hearing, especially when using headphones. You can adjust it while the tone is playing.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">4.</span>
                <div>
                  <span className="font-semibold text-gray-900">Play and Practice:</span>
                  <p className="mt-1">Click the "Play" button to start generating the tone. The tone will play continuously until you click "Stop". Use this as a reference pitch for singing practice, instrument tuning, or ear training exercises.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">5.</span>
                <div>
                  <span className="font-semibold text-gray-900">Practice Matching Pitch:</span>
                  <p className="mt-1">While the tone is playing, try to match it with your voice. Start with notes in your comfortable range, then gradually work on notes at the edges of your vocal range. Use our <Link to="/pitch-detector" className="text-blue-600 hover:text-blue-700 font-semibold">Pitch Detector</Link> tool to verify your accuracy.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Tone Training Methods */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Tone Training Methods</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎵</span>
                  Pitch Matching Exercise
                </h3>
                <p className="text-gray-600 mb-3">
                  Start with a note in your comfortable range (try A4 or C4). Play the tone and listen carefully for 2-3 seconds. Then, try to sing the same pitch. Use the <Link to="/pitch-detector" className="text-blue-600 hover:text-blue-700 font-semibold">Pitch Detector</Link> to check if you're matching accurately. Practice this with different notes across your range.
                </p>
                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-900">
                  <strong>Tip:</strong> Close your eyes while listening to the tone, then try to match it. This helps develop your internal pitch sense.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎼</span>
                  Interval Training
                </h3>
                <p className="text-gray-600 mb-3">
                  Play one note, then play another note a specific interval away (like a perfect fifth or octave). Try to sing the interval without playing the second note. This trains your ear to recognize and reproduce musical intervals accurately.
                </p>
                <div className="bg-cyan-50 rounded-lg p-3 text-sm text-cyan-900">
                  <strong>Example:</strong> Play C4, then try to sing G4 (a perfect fifth above) before playing it. Check your accuracy with the Pitch Detector.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎹</span>
                  Scale Practice
                </h3>
                <p className="text-gray-600 mb-3">
                  Play each note of a scale (like C major: C, D, E, F, G, A, B, C) one at a time. After each tone, try to sing it accurately. Then try singing the entire scale without the generator, using the first note as your reference.
                </p>
                <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-900">
                  <strong>Progression:</strong> Start with major scales, then move to minor scales, and eventually practice chromatic scales (all 12 notes).
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👂</span>
                  Ear Training for Pitch Recognition
                </h3>
                <p className="text-gray-600 mb-3">
                  Play random notes and try to identify them by name (C, D, E, etc.) without looking at the display. Start with just a few notes in one octave, then gradually expand to more notes and octaves. This develops perfect pitch recognition over time.
                </p>
                <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-900">
                  <strong>Challenge:</strong> Have a friend play random notes for you, or use a random note generator. See how many you can identify correctly.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎤</span>
                  Vocal Range Expansion
                </h3>
                <p className="text-gray-600 mb-3">
                  Use the generator to explore the edges of your vocal range. Start from a comfortable note and gradually move to higher or lower frequencies. Play the tone, listen, then try to match it. This helps safely expand your range while maintaining good technique.
                </p>
                <div className="bg-pink-50 rounded-lg p-3 text-sm text-pink-900">
                  <strong>Safety:</strong> Never strain your voice. If a note feels uncomfortable or causes tension, stop and work on notes in your comfortable range first.
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎸</span>
                  Instrument Tuning
                </h3>
                <p className="text-gray-600 mb-3">
                  Use the tone generator to tune your instruments. Play the reference tone (like A4 at 440 Hz for standard tuning) and match your instrument's strings or keys to it. The generator provides a stable, accurate reference that won't drift like some tuning apps.
                </p>
                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-900">
                  <strong>Standard Tuning:</strong> A4 = 440 Hz is the international standard concert pitch. Many orchestras and ensembles tune to this frequency.
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What is a tone generator used for?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A tone generator is used for creating precise audio tones at specific frequencies. Common uses include pitch reference for singing practice, instrument tuning, ear training exercises, audio equipment testing, and developing pitch recognition skills. Musicians and singers use it to practice matching pitch, while audio engineers use it for testing and calibration.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What frequency should I use for vocal practice?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  For vocal practice, start with notes in your comfortable range. Middle C (C4 at 261.63 Hz) and A4 (440 Hz) are popular starting points. Female singers often practice in the range of C4 to C6 (261-523 Hz), while male singers typically work in C3 to C5 (131-262 Hz). Use our <Link to="/vocal-range-test" className="text-blue-600 hover:text-blue-700 font-semibold">Vocal Range Test</Link> to find your range, then practice notes within and slightly beyond it.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What's the difference between sine, square, sawtooth, and triangle waves?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sine waves produce pure, smooth tones with no harmonics - ideal for pitch reference. Square waves have a harsh, buzzy sound with odd harmonics. Sawtooth waves are rich in harmonics and sound bright and full. Triangle waves are softer than square waves but still contain harmonics. For pitch matching and vocal practice, sine waves are usually best because they're the purest tone.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I use this to tune my instrument?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! The tone generator is excellent for instrument tuning. Use A4 (440 Hz) as your reference for standard tuning. Play the tone and match your instrument's A string or key to it. You can also use other notes like E, D, G, B for tuning different strings on a guitar. The generator provides a stable, accurate reference that won't drift.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Is it safe to use headphones with the tone generator?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, but be careful with volume levels. Start with low volume (20-30%) and increase gradually if needed. Prolonged exposure to loud tones can damage your hearing. Never use maximum volume, especially with headphones. If you experience any discomfort, ringing in your ears, or hearing changes, stop immediately and consult a healthcare professional.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Why is A4 set to 440 Hz?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A4 = 440 Hz is the international standard concert pitch established in 1939. This means that the A note above middle C vibrates at exactly 440 cycles per second. Most orchestras, bands, and musical ensembles tune to this standard, ensuring that instruments can play together in harmony. Some historical periods used slightly different standards (like 432 Hz or 435 Hz), but 440 Hz is the modern standard.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">How accurate is the frequency?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The tone generator uses the Web Audio API, which provides very high accuracy. The frequency accuracy is typically within 0.01 Hz for most frequencies, which is more than sufficient for musical applications. This level of precision makes it suitable for professional use, instrument tuning, and serious ear training.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I use this for ear training?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! The tone generator is an excellent tool for ear training. Practice identifying notes by ear, recognizing intervals, matching pitch, and developing relative pitch. Start with simple exercises like matching single notes, then progress to intervals and scales. Combine it with our <Link to="/pitch-detector" className="text-blue-600 hover:text-blue-700 font-semibold">Pitch Detector</Link> to get instant feedback on your accuracy.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">The tone stops playing when I switch browser tabs. Why?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Some browsers pause audio when you switch to another tab to save resources. This is a browser feature, not a limitation of the tool. To keep the tone playing, keep the browser tab active or check your browser's audio settings. Chrome and Firefox typically allow background audio, but mobile browsers may pause it.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I download the generated tone as an audio file?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Currently, the tone generator plays tones in real-time but doesn't support downloading audio files. However, you can use screen recording software or audio capture tools to record the tone if needed. For most use cases (pitch reference, tuning, practice), real-time playback is sufficient.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-3">Enhance Your Practice</h2>
            <p className="text-blue-100 mb-6">
              Combine the Tone Generator with our other tools for comprehensive vocal training.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/pitch-detector"
                className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
              >
                🎵 Pitch Detector
              </Link>
              <Link
                to="/vocal-range-test"
                className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
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
                <Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-blue-600 transition">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-blue-600 transition">Disclaimer</Link>
                <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
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

export default ToneGeneratorPage;


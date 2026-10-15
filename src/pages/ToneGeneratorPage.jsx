/**
 * Tone Generator Page - Audio tone generator for pitch reference and ear training
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import ToolPageDeepDive from '../components/ToolPageDeepDive';

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

const toneGeneratorFaqItems = [
  {
    question: "What is a tone generator used for?",
    answer: "A tone generator is used for creating precise audio tones at specific frequencies. Common uses include pitch reference for singing practice, instrument tuning, ear training exercises, audio equipment testing, and developing pitch recognition skills. Musicians and singers use it to practice matching pitch, while audio engineers use it for testing and calibration."
  },
  {
    question: "What frequency should I use for vocal practice?",
    answer: "For vocal practice, start with notes in your comfortable range. Middle C (C4 at 261.63 Hz) and A4 (440 Hz) are popular starting points. Female singers often practice in the range of C4 to C6 (261-523 Hz), while male singers typically work in C3 to C5 (131-262 Hz). Use our Vocal Range Test to find your range, then practice notes within and slightly beyond it."
  },
  {
    question: "What's the difference between sine, square, sawtooth, and triangle waves?",
    answer: "Sine waves produce pure, smooth tones with no harmonics - ideal for pitch reference. Square waves have a harsh, buzzy sound with odd harmonics. Sawtooth waves are rich in harmonics and sound bright and full. Triangle waves are softer than square waves but still contain harmonics. For pitch matching and vocal practice, sine waves are usually best because they're the purest tone."
  },
  {
    question: "Can I use this to tune my instrument?",
    answer: "Yes! The tone generator is excellent for instrument tuning. Use A4 (440 Hz) as your reference for standard tuning. Play the tone and match your instrument's A string or key to it. You can also use other notes like E, D, G, B for tuning different strings on a guitar. The generator provides a stable, accurate reference that won't drift."
  },
  {
    question: "Is it safe to use headphones with the tone generator?",
    answer: "Yes, but be careful with volume levels. Start with low volume (20-30%) and increase gradually if needed. Prolonged exposure to loud tones can damage your hearing. Never use maximum volume, especially with headphones. If you experience any discomfort, ringing in your ears, or hearing changes, stop immediately and consult a healthcare professional."
  },
  {
    question: "Why is A4 set to 440 Hz?",
    answer: "A4 = 440 Hz is the international standard concert pitch established in 1939. This means that the A note above middle C vibrates at exactly 440 cycles per second. Most orchestras, bands, and musical ensembles tune to this standard, ensuring that instruments can play together in harmony. Some historical periods used slightly different standards (like 432 Hz or 435 Hz), but 440 Hz is the modern standard."
  },
  {
    question: "How accurate is the frequency?",
    answer: "The tone generator uses the Web Audio API, which provides very high accuracy. The frequency accuracy is typically within 0.01 Hz for most frequencies, which is more than sufficient for musical applications. This level of precision makes it suitable for professional use, instrument tuning, and serious ear training."
  },
  {
    question: "Can I use this for ear training?",
    answer: "Absolutely! The tone generator is an excellent tool for ear training. Practice identifying notes by ear, recognizing intervals, matching pitch, and developing relative pitch. Start with simple exercises like matching single notes, then progress to intervals and scales. Combine it with our Pitch Detector to get instant feedback on your accuracy."
  },
  {
    question: "The tone stops playing when I switch browser tabs. Why?",
    answer: "Some browsers pause audio when you switch to another tab to save resources. This is a browser feature, not a limitation of the tool. To keep the tone playing, keep the browser tab active or check your browser's audio settings. Chrome and Firefox typically allow background audio, but mobile browsers may pause it."
  },
  {
    question: "Can I download the generated tone as an audio file?",
    answer: "Currently, the tone generator plays tones in real-time but doesn't support downloading audio files. However, you can use screen recording software or audio capture tools to record the tone if needed. For most use cases (pitch reference, tuning, practice), real-time playback is sufficient."
  }
];

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
      } catch {
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
                {Object.entries(NOTE_FREQUENCIES).find(([, freq]) => 
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

          <ToolPageDeepDive
            accent="blue"
            heading="Pitch reference tuned for vocal practice, not lab audio"
            howWeTest={{
              intro:
                'We validate this generator against concert A4 (440 Hz) on multiple devices and compare sung matches on our Pitch Detector. The goal is a stable reference singers can hear clearly at low volume—not the loudest possible tone.',
              bullets: [
                'Frequency readout: Web Audio oscillator targets the selected Hz; we spot-check A4, C4, and G4 against an external tuner and expect agreement within about ±0.1 Hz at comfortable volumes.',
                'Waveform choice: sine wave only for vocal matching tests—square/sawtooth add harmonics that confuse the ear and can pull the Pitch Detector toward overtones.',
                'Volume safety: default 50% with earbuds; we flag any session where users need >70% volume to hear the tone over room noise (fix the room, not the slider).',
                'Note presets: each labeled note (C4–A5) is checked against our internal frequency table so preset buttons match the Hz field after selection.',
              ],
            }}
            practiceCase={{
              title: '15-minute pitch calibration loop (Tone → sing → detector)',
              duration: '15 min · sine wave · 30–40% volume',
              steps: [
                'From your Vocal Range Test, pick a middle note (e.g. G3, C4, or G4). Select it here, sine waveform, volume ~35%.',
                'Play 3 seconds → stop → sing “Ah” on that pitch for 4 seconds without scooping. Repeat once.',
                'Open Pitch Detector: sing the same note and hold until cents stay within about ±10 for 3 seconds.',
                'Move up a major third (e.g. C4 → E4): play reference, sing, check on detector. One replay of the tone allowed if you miss.',
                'Finish on your starting note. Log whether you tended flat or sharp today—that bias is what you correct tomorrow.',
              ],
            }}
            misconceptions={[
              {
                myth: '“The tone generator tells me if I’m in tune.”',
                reality:
                  'It only plays the target pitch. You still need your ear or the Pitch Detector for feedback—this tool is the reference, not the judge.',
              },
              {
                myth: '“Louder reference = easier to match.”',
                reality:
                  'High volume masks pitch errors and fatigues your ear. We practice at 30–40% with headphones; increase room quietness before volume.',
              },
              {
                myth: '“Any waveform works for vocals.”',
                reality:
                  'Use sine for pitch work. Square or sawtooth are useful to hear timbre differences, but they are poor references for matching vocal pitch cleanly.',
              },
            ]}
            blogLink={{
              to: '/blog/improve-singing-pitch',
              label: 'Improve Singing Pitch (hub)',
            }}
            tutorialLink={{
              to: '/tutorials/pitch-calibration-10',
              label: '10-Minute Pitch Calibration',
            }}
          />

          {/* Tool Introduction */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 About the Tone Generator</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                The Tone Generator is an online pitch generator for singers: pick a note preset such as C4 or A4 (440 Hz),
                or set any frequency, and it plays a steady reference tone you can match with your voice. Use it to find a
                starting note before a song, check intervals while you train your ear, or hear exactly where a phrase
                should land.
              </p>
              <p>
                For pitch matching, a sine wave at low volume is easiest to sing against; square, sawtooth, and triangle
                waves add harmonics if you find a pure tone hard to hear. The tone keeps playing until you press Stop, so
                you have time to listen, sing, and compare. Keep the volume modest, especially on headphones.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Vocal & Ear Training Exercises</h2>
            
            <div className="space-y-6">
              
              {/* 1. Attack (起音) */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">⚡</span>
                  1. Tone Attack (Clean Onset)
                </h3>
                <p className="text-gray-600 mb-3">
                  A good singer starts notes cleanly without "scooping" up to the pitch.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Exercise:</strong> Set a comfortable note (e.g., C4). Click "Play" and listen. Then, stop the tone.</p>
                  <p>Take a breath, and try to sing that note <strong>immediately</strong> and accurately on the syllable "Ah" or "Mah".</p>
                  <p>Play the tone again to check if you started on the correct pitch.</p>
                </div>
              </div>

              {/* 2. Matching (对音) */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-indigo-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  2. Pitch Matching (Intonation)
                </h3>
                <p className="text-gray-600 mb-3">
                  Developing the ability to match an external reference pitch is crucial for staying in tune.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Exercise:</strong> Play a random note. Listen for 3 seconds.</p>
                  <p>Sing the note while the tone is playing. Listen to the "beating" sound (wavering) - it slows down as you get closer to the pitch.</p>
                  <p><strong>Verification:</strong> Use our <Link to="/pitch-detector" className="text-indigo-600 font-bold hover:underline">Pitch Detector</Link> in a separate tab to see exactly how many cents you are off.</p>
                </div>
              </div>

              {/* 3. Ear Training (听觉训练) */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👂</span>
                  3. Ear Training & Intervals
                </h3>
                <p className="text-gray-600 mb-3">
                  Train your brain to recognize the distance between notes (intervals).
                </p>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <strong>Interval Jump:</strong> Play C4. Stop it. Try to sing G4 (Perfect 5th). Then play G4 to check.
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <strong>Scale Builder:</strong> Play C4. Sing the Major Scale (Do-Re-Mi-Fa-Sol-La-Ti-Do) up to C5. Then play C5 to see if you landed on the correct pitch.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection items={toneGeneratorFaqItems} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </>
  );
};

export default ToneGeneratorPage;

/**
 * Pitch Detector Page - Real-time pitch detection tool
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ContentSection from '../components/ContentSection';
import { AudioPitchDetector, frequencyToNote } from '../utils/pitchDetector';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import RealtimePianoKeyboard from '../components/RealtimePianoKeyboard';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from '../utils/analytics';
import FAQSection from '../components/FAQSection';
import PracticePathSection from '../components/PracticePathSection';
import ToolPageDeepDive from '../components/ToolPageDeepDive';

const pitchDetectorFaqItems = [
  {
    question: "How does the pitch detector work?",
    answer: "Our pitch detector uses the Web Audio API to analyze sound waves from your microphone. It calculates the fundamental frequency of your voice in real-time and maps it to the nearest musical note."
  },
  {
    question: "Why is the pitch reading fluctuating?",
    answer: "The human voice naturally has small variations (vibrato) and imperfections. If the fluctuations are large, try singing a steady, straight tone and ensure you are in a quiet environment to reduce background noise."
  },
  {
    question: "What is a 'cent' in tuning?",
    answer: "A cent is a unit of measure for pitch. There are 100 cents in a semitone (the distance between two adjacent keys on a piano). Being within ±10 cents is generally considered 'in tune' for most singing contexts."
  },
  {
    question: "Do I need a special microphone?",
    answer: "No, most built-in laptop or phone microphones work perfectly fine. However, using a headset or external microphone can improve accuracy by reducing background noise and echo."
  },
  {
    question: "Is my voice data recorded?",
    answer: "No. All pitch analysis happens locally in your browser. Your audio data is never sent to our servers or stored anywhere."
  }
];

const PitchDetectorPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [error, setError] = useState(null);
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');

  const detectorRef = useRef(null);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Free Online Pitch Detector - Real-Time Vocal Pitch Analysis | SingMeter';

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

    setMetaTag('description', 'Detect your singing pitch in real-time with our free online pitch detector. See your pitch accuracy, improve your singing, and practice with instant feedback. No download required.');
    setMetaTag('keywords', 'pitch detector, pitch test, vocal pitch detector, singing pitch test, pitch accuracy, vocal tuner, singing tuner, pitch analyzer, voice pitch test');
    setLinkTag('canonical', 'https://www.singmeter.com/pitch-detector');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  // Start listening
  const handleStartListening = async () => {
    trackEvent(GA_ACTIONS.START_LISTENING, GA_CATEGORIES.PITCH_DETECTOR, 'Start Listening');
    console.log('🎵 Starting pitch detector...');
    setError(null);

    // Clean up existing detector
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    // Create new detector
    detectorRef.current = new AudioPitchDetector();
    const result = await detectorRef.current.initialize();

    if (!result.success) {
      console.error('❌ Microphone initialization failed:', result);
      setShowMicPermission(true);
      setMicPermissionError(result.errorType || 'permission_denied');
      setError('Microphone access is required for pitch detection.');
      detectorRef.current = null;
      return;
    }

    console.log('✅ Microphone initialized, starting detection...');
    setIsListening(true);
    startDetection();
  };

  // Stop listening (keep the last result)
  const handleStopListening = () => {
    console.log('🛑 Stopping pitch detector...');
    setIsListening(false);

    if (detectorRef.current) {
      detectorRef.current.stopDetection();
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }

    // Keep currentPitch, currentNote to show last result
    // Don't reset them here
  };

  // Detection loop using AudioPitchDetector's startDetection API
  const startDetection = () => {
    if (!detectorRef.current) {
      console.log('❌ No detector, cannot start detection');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 50; // Update UI every 50ms for smoother animations

    // Use AudioPitchDetector's startDetection method with callback
    detectorRef.current.startDetection((pitch) => {
      const now = Date.now();

      if (pitch) {
        // console.log('🔊 Pitch detected:', {
        //   pitch: pitch.toFixed(2),
        //   clarity: clarity.toFixed(2)
        // });

        // 音高已经过 AudioPitchDetector 的过滤和平滑处理
        const noteInfo = frequencyToNote(pitch);

        // Throttled UI updates
        if (now - lastUpdateTime >= updateInterval) {
          setCurrentPitch(pitch);
          setCurrentNote(noteInfo);

          lastUpdateTime = now;
        }
      }
    });

    console.log('✅ Detection started with AudioPitchDetector.startDetection()');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting, cleaning up...');
      if (detectorRef.current) {
        detectorRef.current.stopDetection();
        detectorRef.current.cleanup();
      }
    };
  }, []);

  // Calculate pitch deviation (cents) - use cents from frequencyToNote
  const deviation = currentNote ? currentNote.cents : 0;
  const isInTune = Math.abs(deviation) < 10;

  return (
    <>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Pitch Detector",
          "url": "https://www.singmeter.com/pitch-detector",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Detect your singing pitch in real-time with our free online pitch detector. See your pitch accuracy, improve your singing, and practice with instant feedback.",
          "featureList": [
            "Real-time pitch detection",
            "Visual pitch display with note name and frequency",
            "Pitch accuracy indicator (cents deviation)",
            "In-tune indicator",
            "Interactive piano keyboard visualization",
            "Instant feedback for vocal training"
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
          "name": "How to Use the Pitch Detector",
          "description": "Learn how to use the pitch detector to analyze and improve your singing pitch accuracy.",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Click Start Listening",
              "text": "Allow microphone access when prompted. The pitch detector will start listening to your voice."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Sing or Play a Note",
              "text": "Sing any note or play an instrument. The detector will show the note name, frequency, and pitch accuracy in real-time."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Check Your Pitch Accuracy",
              "text": "Watch the pitch indicator to see if you're flat, sharp, or in tune. The piano keyboard will highlight the detected note."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Practice and Improve",
              "text": "Use the instant feedback to adjust your pitch and improve your singing accuracy."
            }
          ],
          "totalTime": "PT1M"
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            🎵 Pitch Detector
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            See your pitch in real-time as you sing or play. Perfect for vocal training and pitch accuracy practice.
          </p>
        </div>

        {/* Detector Interface */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 mb-4">
          {!isListening && !currentNote ? (
            // Initial state: Show only Start button
            <div className="text-center">
              <button
                onClick={handleStartListening}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🎤 Start Listening
              </button>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>
          ) : (
            // Listening or stopped with results: Show results and button
            <div className="space-y-8">
              {/* Current Note Display */}
              <div className="text-center">
                <div className="mb-2">
                  <div className="text-6xl font-bold text-indigo-600 mb-1">
                    {currentNote ? currentNote.fullNote : '---'}
                  </div>
                  <div className="text-xl text-gray-500">
                    {currentPitch ? `${currentPitch.toFixed(2)} Hz` : '--- Hz'}
                  </div>
                </div>

                {/* Pitch Indicator */}
                {currentNote && (
                  <div className="max-w-3xl mx-auto">
                    {/* Status Text Display */}
                    <div className="text-center mb-4 h-8 flex items-center justify-center">
                      <span className={`text-xl font-black tracking-widest uppercase transition-all duration-200 ${
                        isInTune ? 'text-green-500 scale-110 drop-shadow-sm' : 
                        deviation > 0 ? 'text-orange-500' : 'text-blue-500'
                      }`}>
                        {isInTune ? '✨ PERFECT ✨' : 
                         deviation > 0 ? 'TOO SHARP ♯' : 'TOO FLAT ♭'}
                      </span>
                    </div>

                    {/* Tuner Gauge */}
                    <div className="relative h-28 bg-gray-900 rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] border-4 border-gray-800 overflow-hidden">
                      
                      {/* Background Gradients (Safe Zone Visual) */}
                      <div className="absolute inset-0 flex opacity-30">
                        <div className="w-1/2 bg-gradient-to-r from-blue-900/0 via-blue-900/0 to-green-500/20"></div>
                        <div className="w-1/2 bg-gradient-to-l from-orange-900/0 via-orange-900/0 to-green-500/20"></div>
                      </div>

                      {/* Center Sweet Spot Highlight */}
                      <div className={`absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-16 transition-colors duration-200 z-0 ${
                        isInTune ? 'bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-transparent'
                      }`}></div>

                      {/* Grid Lines / Ticks */}
                      <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Center Line (0) */}
                        <div className={`absolute left-1/2 top-4 bottom-8 w-1 rounded-full -translate-x-1/2 z-10 transition-colors ${
                          isInTune ? 'bg-green-500' : 'bg-white/70'
                        }`}></div>
                        
                        {/* Minor Ticks (every 10 cents) */}
                        {[-40, -30, -20, -10, 10, 20, 30, 40].map(tick => (
                          <div 
                            key={`minor-${tick}`}
                            className={`absolute w-0.5 rounded-full ${Math.abs(tick) % 20 === 0 ? 'bg-white/90 top-6 bottom-10' : 'bg-white/50 top-10 bottom-12'}`}
                            style={{ left: `calc(50% + ${tick}%)` }}
                          ></div>
                        ))}
                        
                        {/* Major Ticks (every 20 cents) - Redundant with above logic but kept for clarity if needed, actually merged into loop above for cleaner code */}
                        {/* Let's redo the loop to handle both */}
                        
                        {/* Tick Labels */}
                        <div className="absolute bottom-2 w-full h-4 pointer-events-none">
                          <div className="absolute left-[10%] -translate-x-1/2 text-[10px] font-mono text-gray-200 font-bold">-40</div>
                          <div className="absolute left-[30%] -translate-x-1/2 text-[10px] font-mono text-gray-200 font-bold">-20</div>
                          <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono text-transparent font-bold">0</div>
                          <div className="absolute left-[70%] -translate-x-1/2 text-[10px] font-mono text-gray-200 font-bold">+20</div>
                          <div className="absolute left-[90%] -translate-x-1/2 text-[10px] font-mono text-gray-200 font-bold">+40</div>
                        </div>
                      </div>

                      {/* Moving Needle Indicator */}
                      <div 
                        className="absolute top-0 bottom-0 w-0 transition-all duration-100 ease-out z-20 will-change-transform"
                        style={{
                          left: `calc(50% + ${Math.max(-48, Math.min(48, deviation))}%)`,
                        }}
                      >
                        {/* Visual Container (Centered on the line) */}
                        <div className="relative h-full">
                          
                          {/* 1. The Line (Thin, Glowing) */}
                          <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 rounded-full ${
                            isInTune ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,1)]' : 
                            'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                          }`}></div>
                          
                          {/* 2. The Head (Classic Sharp Arrow) */}
                          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[9px] z-10 ${
                             isInTune ? 'border-t-green-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]' : 'border-t-yellow-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                          }`}></div>

                          {/* 3. The Glow (Ambient Light) */}
                          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full blur-md opacity-50 pointer-events-none ${
                             isInTune ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>

                          {/* 4. Cents Value Tag (Floating Pill) */}
                          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono tracking-tighter shadow-lg border backdrop-blur-sm ${
                             isInTune ? 'bg-green-950/80 text-green-300 border-green-500/30' : 'bg-yellow-950/80 text-yellow-300 border-yellow-500/30'
                          }`}>
                            {deviation > 0 ? '+' : ''}{deviation}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Legend / Labels */}
                    <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-2 uppercase tracking-wider">
                      <span className="text-blue-400">Low (Flat)</span>
                      <span className="text-orange-400">High (Sharp)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Piano Keyboard Visualization */}
              <div className="!-mt-8 mb-4 relative z-10 max-w-3xl mx-auto">
                <RealtimePianoKeyboard
                  currentFrequency={currentPitch}
                />
                <div className="mt-1 text-center">
                  <p className="text-sm text-gray-600">
                    See your pitch visualized on a piano keyboard in real-time
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                {isListening ? (
                  <button
                    onClick={handleStopListening}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
                  >
                    Stop Listening
                  </button>
                ) : (
                  <button
                    onClick={handleStartListening}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    🎤 Start Listening
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tool Integration: Tone Generator & Metronome */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link to="/tone-generator" className="block group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition">
                  <span className="text-2xl">🎹</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">Need a Reference Note?</h3>
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">Ear Training</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                Can't find the pitch? Play a reference note first, listen carefully, then try to match it.
              </p>
              <div className="flex items-center text-indigo-600 font-bold text-sm">
                Open Tone Generator
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/metronome" className="block group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition">Working on Rhythm?</h3>
                  <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Tempo Control</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                Pitch is only half the battle. Practice your scales and songs with a steady beat.
              </p>
              <div className="flex items-center text-purple-600 font-bold text-sm">
                Open Metronome
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <PracticePathSection
          theme="blue"
          title="Singing Practice Path"
          intro="Use this page as the feedback step in a short loop: hear a reference on the Tone Generator, sing here, then lock rhythm on the Metronome. If you are preparing a cover, pair with the Song Key Finder after the Vocal Range Test so you practice in a key that fits your voice."
          comboTitle="10-Minute Session: Reference → Sing → Steady Time"
          comboSteps={[
            <>
              On the{' '}
              <Link to="/tone-generator" className="text-indigo-600 font-semibold hover:underline">
                Tone Generator
              </Link>
              , play a comfortable note (often C4 or a note from your{' '}
              <Link to="/vocal-range-test" className="text-indigo-600 font-semibold hover:underline">
                Vocal Range Test
              </Link>
              ) at low volume with a sine wave. Listen for two seconds.
            </>,
            'Return here, start the microphone, and sing the same pitch on a steady “Ah” for 3–5 seconds. Aim for the green zone (within about ±10 cents).',
            'Repeat with a second note a major third or fifth above—play the reference, then sing without scooping.',
            <>
              Finish with the{' '}
              <Link to="/metronome" className="text-indigo-600 font-semibold hover:underline">
                Online Metronome
              </Link>{' '}
              at 72–80 BPM: sing a five-note scale or one phrase of your song, one syllable per beat.
            </>,
          ]}
          routines={[
            {
              title: 'Calibration Match',
              duration: '3 minutes',
              settings: 'Tone Generator · sine · 30–40% volume',
              body: 'Play Middle C (C4) or your chosen root. Stop the tone, then sing and hold. If you are flat, add breath support; if sharp, relax the jaw and tongue.',
              goal: 'Hold the needle in the green zone for 3 seconds on one note.',
            },
            {
              title: 'Stability Hold',
              duration: '5 minutes',
              body: 'Pick a comfortable note in your range. Sing straight tone (no vibrato) for 5 seconds per attempt. Rest 10 seconds between tries.',
              goal: 'Keep deviation within ±10 cents without wavering.',
            },
            {
              title: 'Scale + Tempo',
              duration: '7 minutes',
              settings: 'Metronome 72 BPM · optional Tone on first note only',
              body: 'Sing Do–Re–Mi–Fa–Sol up and down on “La.” Use the generator only on Do and Sol to check endpoints; inner notes are from memory.',
              goal: 'Land each scale step in the center—not sliding up into pitch.',
            },
          ]}
          nextTools={[
            {
              to: '/tone-generator',
              label: 'Tone Generator',
              hint: 'Reference pitch before you sing into this detector.',
            },
            {
              to: '/metronome',
              label: 'Online Metronome',
              hint: 'Add steady rhythm after pitch is stable.',
            },
            {
              to: '/vocal-range-test',
              label: 'Vocal Range Test',
              hint: 'Pick practice notes inside your comfortable range.',
            },
            {
              to: '/song-key-finder',
              label: 'Song Key Finder',
              hint: 'Transpose a song to your range, then practice phrases here.',
            },
          ]}
          blogLink={{
            to: '/blog/ear-training-for-singers',
            label: 'Ear Training for Singers — build pitch memory step by step',
          }}
        />

        <ToolPageDeepDive
          accent="blue"
          heading="What the cents readout really tells you (and what it doesn't)"
          howWeTest={{
            intro:
              'We use this detector the way singers do—into a laptop or phone mic, in a normal room—and tune its readings against a reference tone. The point is honest feedback on your sustained pitch, not chasing a perfect zero that fights your natural vibrato.',
            bullets: [
              'Reference check: we sing notes matched to the Tone Generator (A4 = 440 Hz) and expect the detector to agree within a few cents on a steady, sustained tone.',
              'Vibrato vs. drift: a trained vibrato naturally swings ±10–15 cents around the center. We read the average position, not every momentary number—a wobble that always sits low means flat, not vibrato.',
              'Room and mic noise: fans, echo, and low-quality mics make the readout jumpy. We quiet the room first; a noisy signal reads as false sharp/flat spikes.',
              'Latency: there is a small delay between singing and display. We hold each note 2–3 seconds so the reading settles before judging it.',
            ],
          }}
          practiceCase={{
            title: 'Finding a hidden flat habit on long notes',
            duration: '10 min · quiet room · headphones',
            steps: [
              'A user sang G3 and the readout sat near 0 for a second, then slowly drifted to −20 cents as the note continued.',
              'That pattern—fine at onset, flat over time—pointed to fading breath support, not a tin ear.',
              'Fix: take a low breath, keep the ribs expanded, and add a touch of brightness as the note continues. On the next try the cents held within ±8 for the full 5 seconds.',
              'We repeated on three notes and logged the tendency, then moved to a song phrase that ends on a long held note to apply it.',
            ],
          }}
          misconceptions={[
            {
              myth: '“In tune means exactly 0 cents the whole time.”',
              reality:
                'Expressive singing moves slightly around the center. Aiming for a robotic 0 creates tension. We target a stable average within about ±10 cents.',
            },
            {
              myth: '“The detector is wrong because the number jumps around.”',
              reality:
                'Most jumpiness is room noise, a breathy onset, or vibrato. Quiet the space, hold the note, and read the settled average before blaming the tool.',
            },
            {
              myth: '“If I’m flat, I just need to sing louder.”',
              reality:
                'Volume is not pitch. Flatness on held notes is usually weak breath support or fatigue. We fix support and listening first—see the flat-singing guide below.',
            },
          ]}
          blogLink={{
            to: '/blog/why-you-sing-flat',
            label: 'Why You Sing Flat (and How to Fix It)',
          }}
          tutorialLink={{
            to: '/tutorials/pitch-calibration-10',
            label: '10-Minute Pitch Calibration',
          }}
        />

        {/* How to Use */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 How to Use This Tool</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Start the Detector</h3>
                <p className="text-sm text-gray-600">Click the microphone button to allow access. We process audio directly in your browser, so your voice is never recorded or sent to a server.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sing a Steady Note</h3>
                <p className="text-sm text-gray-600">Hold a comfortable note for a few seconds. Watch the needle move to see your pitch stability.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Check Your Tuning</h3>
                <ul className="text-sm text-gray-600 space-y-1 mt-1">
                  <li><span className="text-green-600 font-semibold">Green (Center):</span> In tune (±10 cents).</li>
                  <li><span className="text-yellow-600 font-semibold">Right:</span> Sharp (too high). Relax throat.</li>
                  <li><span className="text-yellow-600 font-semibold">Left:</span> Flat (too low). Support breath.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Practice Scales</h3>
                <p className="text-sm text-gray-600">Once you can hold a single note, try singing a simple scale (Do-Re-Mi) and see if you can hit each step accurately.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding Your Results */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Understanding Your Results</h2>

          <div className="space-y-6">
            {/* Note Name */}
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Note Name (e.g., C4, A3)</h3>
              <p className="text-gray-600 mb-2">
                This shows the musical note you're singing. The letter (C, D, E, F, G, A, B) represents the pitch class,
                and the number represents the octave.
              </p>
              <div className="bg-indigo-50 rounded-lg p-3 text-sm">
                <p className="text-indigo-900"><strong>Example:</strong> C4 is "Middle C" on a piano, the most common reference note.
                A4 (440 Hz) is the standard tuning pitch used by orchestras worldwide.</p>
              </div>
            </div>

            {/* Frequency (Hz) */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Frequency (Hz - Hertz)</h3>
              <p className="text-gray-600 mb-2">
                This is the number of sound wave vibrations per second. Higher numbers = higher pitch.
              </p>
              <div className="bg-purple-50 rounded-lg p-3 text-sm space-y-1">
                <p className="text-purple-900"><strong>Common frequencies:</strong></p>
                <ul className="list-disc list-outside pl-5 space-y-1 text-purple-800">
                  <li>Male voices: typically 85-180 Hz (low notes) to 330-660 Hz (high notes)</li>
                  <li>Female voices: typically 165-255 Hz (low notes) to 660-1,100 Hz (high notes)</li>
                  <li>Middle C (C4): 261.63 Hz</li>
                  <li>Concert A (A4): 440 Hz</li>
                </ul>
              </div>
            </div>

            {/* Cents */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cents (Pitch Accuracy)</h3>
              <p className="text-gray-600 mb-2">
                A "cent" is a unit of musical pitch. There are 100 cents between any two adjacent notes.
                The indicator shows how close you are to the target note.
              </p>
              <div className="bg-green-50 rounded-lg p-3 text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-green-900">In Tune (±10 cents)</p>
                    <p className="text-green-800">Excellent! Your pitch is accurate enough for most musical contexts.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">♭</span>
                  <div>
                    <p className="font-bold text-gray-900">Flat (negative cents)</p>
                    <p className="text-gray-700">Your pitch is slightly lower than the target note. Try singing a bit higher.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">♯</span>
                  <div>
                    <p className="font-bold text-gray-900">Sharp (positive cents)</p>
                    <p className="text-gray-700">Your pitch is slightly higher than the target note. Try singing a bit lower.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection items={pitchDetectorFaqItems} />

        {/* Practice Guide Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 border-2 border-indigo-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">📚</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Practice Guide</h2>
              <p className="text-gray-600">
                Want to master pitch accuracy? Learn proven exercises and techniques to improve your singing with our comprehensive guide.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Exercise Preview 1 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="font-bold text-gray-900">Single Note Accuracy</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Learn to hit and sustain a single note perfectly in tune. Master the foundation of pitch accuracy with step-by-step guidance.
              </p>
              <div className="text-xs text-indigo-600 font-semibold">
                ✓ 6-step detailed method
              </div>
            </div>

            {/* Exercise Preview 2 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎼</span>
                <h3 className="font-bold text-gray-900">Scale & Interval Training</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Improve pitch accuracy across multiple notes. Practice scales and intervals with real-time feedback to identify problem areas.
              </p>
              <div className="text-xs text-purple-600 font-semibold">
                ✓ Common issues & solutions
              </div>
            </div>

            {/* Exercise Preview 3 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎵</span>
                <h3 className="font-bold text-gray-900">Song Application</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Apply pitch accuracy to real songs. Learn how to practice effectively and identify phrases where you go off-pitch.
              </p>
              <div className="text-xs text-pink-600 font-semibold">
                ✓ 5-step practice method
              </div>
            </div>

            {/* Exercise Preview 4 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔧</span>
                <h3 className="font-bold text-gray-900">Problem Solving</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Fix common pitch problems like singing flat, sharp, or unstable. Get specific solutions for each issue with expert tips.
              </p>
              <div className="text-xs text-indigo-600 font-semibold">
                ✓ 4 common problems solved
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">✨</span>
              What You'll Learn in the Complete Guide
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>5 proven exercises for pitch accuracy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Understanding cents and deviation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Common pitch problems & solutions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>15-minute daily practice routine</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Professional accuracy standards</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Advanced tips for maximum improvement</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/blog/improve-singing-pitch"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span>📖</span>
              <span>Read the Complete Guide</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-sm text-gray-600 mt-3">
              8-minute read • Comprehensive exercises • Expert tips
            </p>
          </div>
        </div>

	        {/* More Pitch & Intonation Articles */}
	        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8 border border-gray-100">
	          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
	            Deepen Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Pitch &amp; Intonation</span> Training
	          </h2>
	          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
	            Use the SingMeter Pitch Detector together with these step-by-step guides to fix flat notes, train your ear,
	            and practice singing in tune without an instrument.
	          </p>
	          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
	            <Link
	              to="/blog/why-you-sing-flat"
	              className="group bg-indigo-50 rounded-2xl p-4 hover:bg-indigo-100 transition flex flex-col justify-between"
	            >
	              <div>
	                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-700">
	                  Why You Sing Flat (&amp; How to Fix It)
	                </h3>
	                <p className="text-xs text-gray-600 leading-relaxed">
	                  Understand the real reasons pitches sag and follow targeted exercises using the detector as feedback.
	                </p>
	              </div>
	              <span className="mt-3 text-xs font-semibold text-indigo-700 flex items-center group-hover:translate-x-1 transition-transform">
	                Read article
	                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                </svg>
	              </span>
	            </Link>

	            <Link
	              to="/blog/ear-training-for-singers"
	              className="group bg-purple-50 rounded-2xl p-4 hover:bg-purple-100 transition flex flex-col justify-between"
	            >
	              <div>
	                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-purple-700">
	                  Ear Training for Singers
	                </h3>
	                <p className="text-xs text-gray-600 leading-relaxed">
	                  Build a reliable musical ear so you can hear intervals and keys clearly and match them with your voice.
	                </p>
	              </div>
	              <span className="mt-3 text-xs font-semibold text-purple-700 flex items-center group-hover:translate-x-1 transition-transform">
	                Start training
	                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                </svg>
	              </span>
	            </Link>

	            <Link
	              to="/blog/improve-singing-pitch"
	              className="group bg-pink-50 rounded-2xl p-4 hover:bg-pink-100 transition flex flex-col justify-between"
	            >
	              <div>
	                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-pink-700">
	                  Improve Singing Pitch (hub guide)
	                </h3>
	                <p className="text-xs text-gray-600 leading-relaxed">
	                  Daily detector routines, practice without a piano, cents explained, and links to flat-note and ear-training guides.
	                </p>
	              </div>
	              <span className="mt-3 text-xs font-semibold text-pink-700 flex items-center group-hover:translate-x-1 transition-transform">
	                View guide
	                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                </svg>
	              </span>
	            </Link>
	          </div>
	        </div>

	        {/* Educational content */}
        <div className="space-y-16 mb-16">
          <ContentSection title="About This Pitch Detector">
            <p>
              SingMeter's <strong>Pitch Detector</strong> is a real-time vocal analysis tool designed to help singers train their ear 
              and improve their pitch accuracy. By visualizing the exact frequency of your voice, you can see instantly whether you are 
              singing in tune, sharp (too high), or flat (too low).
            </p>
            <p>
              Unlike a simple guitar tuner, this tool is optimized for the human voice. It detects the fundamental frequency of your 
              singing and maps it to the closest musical note, showing you the deviation in "cents."
            </p>
          </ContentSection>



          <ContentSection title="Understanding Pitch & Cents">
            <p>
              In music, the distance between two semitones (like C and C#) is divided into 100 smaller units called <strong>cents</strong>.
            </p>
            <ul>
              <li><strong>0 cents:</strong> Perfect pitch accuracy.</li>
              <li><strong>±10 cents:</strong> Generally considered "in tune" to the human ear.</li>
              <li><strong>±25 cents:</strong> Noticeably out of tune for trained listeners.</li>
              <li><strong>±50 cents:</strong> You are halfway to the next note (quarter tone).</li>
            </ul>
            <p className="mt-4">
              Most professional singers naturally fluctuate within ±10-15 cents due to vibrato and expression. The goal isn't to be robotic, but to center your pitch so it feels stable.
            </p>
          </ContentSection>

          <ContentSection title="Vocal Practice Routines">
            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                <h4 className="font-bold text-indigo-900 mb-2">1. The "Siren" Exercise</h4>
                <p className="text-sm text-gray-600">
                  Slide your voice from your lowest comfortable note to your highest and back down, like a siren. Watch the pitch detector track your movement. 
                  Aim for a smooth line without breaks or jumps.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                <h4 className="font-bold text-purple-900 mb-2">2. Long Tones</h4>
                <p className="text-sm text-gray-600">
                  Pick a comfortable note (like C4 or G3) and hold it for as long as you can on a single breath. Try to keep the needle in the green zone the entire time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-bold text-pink-900 mb-2">3. Interval Jumps</h4>
                <p className="text-sm text-gray-600">
                  Sing a root note, then jump up a 5th (e.g., C to G) and hold it. Check if you landed directly on the note or if you had to "scoop" up to it.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-2">4. Steps vs. Skips</h4>
                <p className="text-sm text-gray-600">
                  Practice moving by half-steps (chromatic scale) versus whole steps. This trains your fine motor control.
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Limitations & Disclaimer">
             <p className="text-sm text-gray-500">
                While this tool is highly accurate, it relies on your device's microphone. Background noise, poor microphone quality, or echo can affect results. 
                Also, remember that this is an educational tool, not a medical device. If you feel pain or strain while singing, stop immediately and consult a professional.
             </p>
          </ContentSection>
        </div>

        {/* Complete Your Vocal Toolkit */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-center text-white mb-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-8">Complete Your Vocal Toolkit</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/vocal-range-test" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition border border-white/10">
              <div className="text-3xl mb-3">🎤</div>
              <h3 className="font-bold text-lg mb-2 text-indigo-100 group-hover:text-white">Vocal Range Test</h3>
              <p className="text-sm text-indigo-200 mb-4 h-10">Discover your voice type and find your comfortable range.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 group-hover:text-white transition">Start Test →</span>
            </Link>

            <Link to="/tone-generator" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition border border-white/10">
              <div className="text-3xl mb-3">🎹</div>
              <h3 className="font-bold text-lg mb-2 text-indigo-100 group-hover:text-white">Tone Generator</h3>
              <p className="text-sm text-indigo-200 mb-4 h-10">Develop perfect pitch by listening to reference notes.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 group-hover:text-white transition">Play Tones →</span>
            </Link>

            <Link to="/metronome" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition border border-white/10">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-bold text-lg mb-2 text-indigo-100 group-hover:text-white">Metronome</h3>
              <p className="text-sm text-indigo-200 mb-4 h-10">Master your timing and practice rhythm consistency.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 group-hover:text-white transition">Start Beat →</span>
            </Link>
          </div>
        </div>
      </main>

        {/* Microphone Permission Modal */}
        {showMicPermission && (
          <MicrophonePermissionModal
            onClose={() => setShowMicPermission(false)}
            onRetry={handleStartListening}
            errorType={micPermissionError}
          />
        )}

        <Footer />

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </>
  );
};

// Microphone Permission Modal (simplified version)
const MicrophonePermissionModal = ({ onClose, onRetry, errorType = 'permission_denied' }) => {
  const canRetry = errorType === 'permission_denied' || errorType === 'unknown_error';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Microphone Access Required</h3>
        <p className="text-gray-600 mb-4">
          {errorType === 'no_device' ? (
            <>No microphone detected. Please connect a microphone and try again.</>
          ) : errorType === 'device_in_use' ? (
            <>Microphone is being used by another application. Please close other apps and try again.</>
          ) : (
            <>SingMeter needs access to your microphone to detect pitch. Your voice is never recorded or stored.</>
          )}
        </p>

        <div className="flex gap-3">
          {canRetry ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  onRetry();
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Got It
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PitchDetectorPage;


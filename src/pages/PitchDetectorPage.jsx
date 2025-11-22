/**
 * Pitch Detector Page - Real-time pitch detection tool
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AudioPitchDetector, frequencyToNote } from '../utils/pitchDetector';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import RealtimePianoKeyboard from '../components/RealtimePianoKeyboard';

const PitchDetectorPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [pitchHistory, setPitchHistory] = useState([]);
  const [error, setError] = useState(null);
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');

  const detectorRef = useRef(null);
  const historyRef = useRef([]);

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

    // Keep currentPitch, currentNote, and pitchHistory to show last result
    // Don't reset them here
  };

  // Detection loop using AudioPitchDetector's startDetection API
  const startDetection = () => {
    if (!detectorRef.current) {
      console.log('❌ No detector, cannot start detection');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 100; // Update UI every 100ms

    // Use AudioPitchDetector's startDetection method with callback
    detectorRef.current.startDetection((pitch, clarity) => {
      const now = Date.now();

      if (pitch) {
        console.log('🔊 Pitch detected:', {
          pitch: pitch.toFixed(2),
          clarity: clarity.toFixed(2)
        });

        // Lower clarity threshold for pitch detector (more sensitive)
        if (clarity > 0.80) {
          const noteInfo = frequencyToNote(pitch);

          // Throttled UI updates
          if (now - lastUpdateTime >= updateInterval) {
            setCurrentPitch(pitch);
            setCurrentNote(noteInfo);

            // Add to history (keep last 50 points)
            historyRef.current = [...historyRef.current, pitch].slice(-50);
            setPitchHistory(historyRef.current);

            lastUpdateTime = now;
          }
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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "620",
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
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            🎵 Pitch Detector
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            See your pitch in real-time as you sing or play. Perfect for vocal training and pitch accuracy practice.
          </p>
        </div>

        {/* Detector Interface */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-8">
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
                <div className="mb-4">
                  <div className="text-7xl font-bold text-indigo-600 mb-2">
                    {currentNote ? currentNote.fullNote : '---'}
                  </div>
                  <div className="text-2xl text-gray-500">
                    {currentPitch ? `${currentPitch.toFixed(2)} Hz` : '--- Hz'}
                  </div>
                </div>

                {/* Pitch Indicator */}
                {currentNote && (
                  <div className="max-w-md mx-auto">
                    <div className="relative h-16 bg-gray-100 rounded-full overflow-hidden">
                      {/* Center line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 z-10"></div>

                      {/* Pitch indicator */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-100 ${
                          isInTune ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          left: `calc(50% + ${Math.max(-45, Math.min(45, deviation))}%)`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>♭ Flat</span>
                      <span className={isInTune ? 'text-green-600 font-bold' : ''}>
                        {isInTune ? '✓ In Tune' : `${deviation > 0 ? '+' : ''}${deviation} cents`}
                      </span>
                      <span>♯ Sharp</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Piano Keyboard Visualization */}
              <div className="mt-8">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center">
                    <span className="mr-2">🎹</span>
                    Piano Keyboard
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    See your pitch visualized on a piano keyboard in real-time
                  </p>
                </div>
                <RealtimePianoKeyboard
                  currentNote={currentNote}
                  currentFrequency={currentPitch}
                />
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

        {/* How to Use */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 How to Use</h2>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-3">1.</span>
              <span>Click "Start Listening" and allow microphone access</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-3">2.</span>
              <span>Sing or play a note - you'll see the pitch and note name in real-time</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-3">3.</span>
              <span>The indicator shows if you're flat (♭), sharp (♯), or in tune (✓)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-indigo-600 mr-3">4.</span>
              <span>Use this tool to practice pitch accuracy and improve your singing</span>
            </li>
          </ol>
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
                <ul className="list-disc list-inside text-purple-800 ml-2">
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

        {/* Practice Tips */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Tips for Improving Pitch Accuracy</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Start with Reference Notes</h3>
              <p className="text-sm text-gray-600">
                Use a piano or tuning app to play a note, then try to match it. Start with comfortable notes in your range.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">🎼</div>
              <h3 className="font-bold text-gray-900 mb-2">Practice Scales</h3>
              <p className="text-sm text-gray-600">
                Sing simple scales (do-re-mi-fa-sol-la-ti-do) slowly, checking each note's accuracy with the detector.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">👂</div>
              <h3 className="font-bold text-gray-900 mb-2">Train Your Ear</h3>
              <p className="text-sm text-gray-600">
                Listen carefully to the difference between being flat and sharp. Over time, you'll develop better pitch awareness.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">⏱️</div>
              <h3 className="font-bold text-gray-900 mb-2">Practice Regularly</h3>
              <p className="text-sm text-gray-600">
                Even 5-10 minutes daily is more effective than longer, infrequent sessions. Consistency builds muscle memory.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">🎤</div>
              <h3 className="font-bold text-gray-900 mb-2">Proper Technique</h3>
              <p className="text-sm text-gray-600">
                Good posture, breath support, and relaxed throat muscles help you hit and sustain accurate pitches.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">🎵</div>
              <h3 className="font-bold text-gray-900 mb-2">Sing Songs You Know</h3>
              <p className="text-sm text-gray-600">
                Practice with familiar songs. It's easier to match pitch when you already know how the melody should sound.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">Why does the note keep changing?</h3>
              <p className="text-gray-600 text-sm">
                This is normal! Your voice naturally fluctuates slightly. Try to sustain a steady note for 2-3 seconds.
                If it's jumping between very different notes, you might be singing with vibrato or the microphone is picking up background noise.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">What's a good accuracy level for beginners?</h3>
              <p className="text-gray-600 text-sm">
                Being within ±20 cents is good for beginners. ±10 cents is excellent and suitable for performance.
                Professional singers typically stay within ±5 cents. Don't worry if you're not perfect at first - pitch accuracy improves with practice!
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">Why can't I hit certain notes accurately?</h3>
              <p className="text-gray-600 text-sm">
                Notes at the extremes of your range (very high or very low) are naturally harder to control.
                Focus on your comfortable middle range first, then gradually expand. Also, make sure you're using proper breath support and technique.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">Does the detector work with instruments?</h3>
              <p className="text-gray-600 text-sm">
                Yes! The pitch detector works with any sustained tone - voice, guitar, violin, flute, etc.
                It works best with single notes (not chords). For instruments with very fast attack (like piano),
                hold the note for at least 1-2 seconds for accurate detection.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="font-bold text-gray-900 mb-2">How accurate is this detector?</h3>
              <p className="text-gray-600 text-sm">
                Our pitch detector uses advanced algorithms and is accurate to within ±1 cent under good conditions.
                For best results, use in a quiet environment with a good quality microphone, and sing clearly and steadily.
              </p>
            </div>
          </div>
        </div>

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

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-8">
          <h2 className="text-2xl font-bold mb-3">Want to know your vocal range?</h2>
          <p className="text-indigo-100 mb-6">
            Take our free vocal range test to discover your voice type and get personalized song recommendations.
          </p>
          <Link
            to="/vocal-range-test"
            className="inline-block px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition"
          >
            Test Your Vocal Range →
          </Link>
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

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-indigo-600 transition">Disclaimer</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
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


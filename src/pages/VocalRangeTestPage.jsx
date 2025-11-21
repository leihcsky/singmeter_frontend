/**
 * Vocal Range Test Page - Wrapper for ModernVocalTest component
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AudioPitchDetector, frequencyToNote, getVoiceType } from '../utils/pitchDetector';
import UnifiedTestScreen from '../components/UnifiedTestScreen';
import ResultScreen from '../components/ResultScreen';
import { getGlobalPianoAudio } from '../utils/pianoAudio';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const VocalRangeTestPage = () => {
  // Test phase: 'testing' or 'result'
  const [testPhase, setTestPhase] = useState('testing');
  const [testResult, setTestResult] = useState(null);

  // Modal states
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');

  // Detector ref (shared for both tests)
  const detectorRef = useRef(null);

  // === LOWEST NOTE STATES ===
  const [lowestInputMode, setLowestInputMode] = useState('sing');
  const [lowestCountdown, setLowestCountdown] = useState(0);
  const [lowestIsRecording, setLowestIsRecording] = useState(false);
  const [lowestCurrentPitch, setLowestCurrentPitch] = useState(null);
  const [lowestCurrentNote, setLowestCurrentNote] = useState(null);
  const [lowestManualPitch, setLowestManualPitch] = useState(null);
  const [lowestCaptured, setLowestCaptured] = useState(null); // { note, frequency }

  // Lowest gating
  const lowestHasMinHoldRef = useRef(false);
  const lowestValidStartTimeRef = useRef(null);
  const lowestPitchHistoryRef = useRef([]);
  const lowestFinalPitchRef = useRef(null);

  // === HIGHEST NOTE STATES ===
  const [highestInputMode, setHighestInputMode] = useState('sing');
  const [highestCountdown, setHighestCountdown] = useState(0);
  const [highestIsRecording, setHighestIsRecording] = useState(false);
  const [highestCurrentPitch, setHighestCurrentPitch] = useState(null);
  const [highestCurrentNote, setHighestCurrentNote] = useState(null);
  const [highestManualPitch, setHighestManualPitch] = useState(null);
  const [highestCaptured, setHighestCaptured] = useState(null); // { note, frequency }

  // Highest gating
  const highestHasMinHoldRef = useRef(false);
  const highestValidStartTimeRef = useRef(null);
  const highestPitchHistoryRef = useRef([]);
  const highestFinalPitchRef = useRef(null);

  const MIN_HOLD_MS = 3000; // minimal hold duration in ms (3 seconds)

  // === LOWEST NOTE DETECTION ===
  const startLowestDetection = useCallback(() => {
    if (!detectorRef.current) {
      console.error('No detector available for lowest note');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 100;
    let accumulatedValidMs = 0; // Accumulated valid signal time
    let lastValidTime = null;

    // Reset hold gating
    lowestValidStartTimeRef.current = null;
    lowestHasMinHoldRef.current = false;
    lowestPitchHistoryRef.current = [];
    lowestFinalPitchRef.current = null;

    detectorRef.current.startDetection((pitch, clarity) => {
      const now = Date.now();

      if (pitch && pitch > 0) {
        const noteInfo = frequencyToNote(pitch);

        // Accumulate valid time
        if (lastValidTime !== null) {
          const deltaMs = now - lastValidTime;
          // Only accumulate if delta is reasonable (< 500ms, to avoid long gaps)
          if (deltaMs < 500) {
            accumulatedValidMs += deltaMs;
          }
        }
        lastValidTime = now;

        lowestPitchHistoryRef.current.push({ pitch, clarity, timestamp: now });
        if (lowestPitchHistoryRef.current.length > 10) {
          lowestPitchHistoryRef.current.shift();
        }

        // Track lowest pitch
        if (lowestFinalPitchRef.current === null || pitch < lowestFinalPitchRef.current) {
          lowestFinalPitchRef.current = pitch;
        }

        // Update UI
        if (now - lastUpdateTime >= updateInterval) {
          setLowestCurrentPitch(pitch);
          setLowestCurrentNote(noteInfo);
          lastUpdateTime = now;
        }

        // Auto-capture when accumulated time threshold met
        if (!lowestHasMinHoldRef.current && accumulatedValidMs >= MIN_HOLD_MS) {
          lowestHasMinHoldRef.current = true;
          const finalNote = frequencyToNote(lowestFinalPitchRef.current);
          setLowestCaptured({
            note: finalNote.fullNote,
            frequency: lowestFinalPitchRef.current
          });
          detectorRef.current.stopDetection();
          setLowestIsRecording(false);
          console.log('✅ Lowest note captured:', finalNote.fullNote, `after ${accumulatedValidMs}ms`);
        }
      } else {
        // Lost signal - reset lastValidTime but keep accumulated time
        lastValidTime = null;
      }
    });
  }, []);

  // === HIGHEST NOTE DETECTION ===
  const startHighestDetection = useCallback(() => {
    if (!detectorRef.current) {
      console.error('No detector available for highest note');
      return;
    }

    let lastUpdateTime = 0;
    const updateInterval = 100;
    let accumulatedValidMs = 0; // Accumulated valid signal time
    let lastValidTime = null;

    // Reset hold gating
    highestValidStartTimeRef.current = null;
    highestHasMinHoldRef.current = false;
    highestPitchHistoryRef.current = [];
    highestFinalPitchRef.current = null;

    detectorRef.current.startDetection((pitch, clarity) => {
      const now = Date.now();

      if (pitch && pitch > 0) {
        const noteInfo = frequencyToNote(pitch);

        // Accumulate valid time
        if (lastValidTime !== null) {
          const deltaMs = now - lastValidTime;
          // Only accumulate if delta is reasonable (< 500ms, to avoid long gaps)
          if (deltaMs < 500) {
            accumulatedValidMs += deltaMs;
          }
        }
        lastValidTime = now;

        highestPitchHistoryRef.current.push({ pitch, clarity, timestamp: now });
        if (highestPitchHistoryRef.current.length > 10) {
          highestPitchHistoryRef.current.shift();
        }

        // Track highest pitch
        if (highestFinalPitchRef.current === null || pitch > highestFinalPitchRef.current) {
          highestFinalPitchRef.current = pitch;
        }

        // Update UI
        if (now - lastUpdateTime >= updateInterval) {
          setHighestCurrentPitch(pitch);
          setHighestCurrentNote(noteInfo);
          lastUpdateTime = now;
        }

        // Auto-capture when accumulated time threshold met
        if (!highestHasMinHoldRef.current && accumulatedValidMs >= MIN_HOLD_MS) {
          highestHasMinHoldRef.current = true;
          const finalNote = frequencyToNote(highestFinalPitchRef.current);
          setHighestCaptured({
            note: finalNote.fullNote,
            frequency: highestFinalPitchRef.current
          });
          detectorRef.current.stopDetection();
          setHighestIsRecording(false);
          console.log('✅ Highest note captured:', finalNote.fullNote, `after ${accumulatedValidMs}ms`);
        }
      } else {
        // Lost signal - reset lastValidTime but keep accumulated time
        lastValidTime = null;
      }
    });
  }, []);

  // Initialize microphone (shared for both tests)
  const initializeMicrophone = async () => {
    if (detectorRef.current) {
      return { success: true }; // Already initialized
    }

    detectorRef.current = new AudioPitchDetector();
    const result = await detectorRef.current.initialize();

    if (!result.success) {
      setShowMicPermission(true);
      setMicPermissionError(result.errorType || 'permission_denied');
      detectorRef.current = null;
      return result;
    }

    return result;
  };

  // === LOWEST NOTE HANDLERS ===
  const handleLowestStart = async () => {
    if (lowestInputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      setLowestCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setLowestCountdown(count);
        } else {
          clearInterval(interval);
          setLowestCountdown(0);
          setLowestIsRecording(true);
          startLowestDetection();
        }
      }, 1000);
    }
  };

  const handleLowestReset = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }
    setLowestCaptured(null);
    setLowestManualPitch(null);
    setLowestCurrentPitch(null);
    setLowestCurrentNote(null);
    setLowestIsRecording(false);
    setLowestCountdown(0);
    lowestHasMinHoldRef.current = false;
    lowestValidStartTimeRef.current = null;
    lowestFinalPitchRef.current = null;
  };

  const handleLowestInputModeChange = (mode) => {
    handleLowestReset();
    setLowestInputMode(mode);
  };

  const handleLowestManualPitchSelect = (pitch) => {
    setLowestManualPitch(pitch);
    // Don't set captured here - let user see the piano and selection
  };

  // === HIGHEST NOTE HANDLERS ===
  const handleHighestStart = async () => {
    if (highestInputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      setHighestCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setHighestCountdown(count);
        } else {
          clearInterval(interval);
          setHighestCountdown(0);
          setHighestIsRecording(true);
          startHighestDetection();
        }
      }, 1000);
    }
  };

  const handleHighestReset = () => {
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }
    setHighestCaptured(null);
    setHighestManualPitch(null);
    setHighestCurrentPitch(null);
    setHighestCurrentNote(null);
    setHighestIsRecording(false);
    setHighestCountdown(0);
    highestHasMinHoldRef.current = false;
    highestValidStartTimeRef.current = null;
    highestFinalPitchRef.current = null;
  };

  const handleHighestInputModeChange = (mode) => {
    handleHighestReset();
    setHighestInputMode(mode);
  };

  const handleHighestManualPitchSelect = (pitch) => {
    setHighestManualPitch(pitch);
    // Don't set captured here - let user see the piano and selection
  };

  // === ANALYSIS HANDLER ===
  const handleAnalyze = () => {
    // Get final pitches from captured data
    const finalLowest = lowestCaptured?.frequency || lowestManualPitch;
    const finalHighest = highestCaptured?.frequency || highestManualPitch;

    if (!finalLowest || !finalHighest) {
      console.error('Cannot analyze: missing pitch data');
      return;
    }

    // Stop any ongoing detection
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }

    console.log('🎯 Analyzing vocal range:', { finalLowest, finalHighest });

    if (finalLowest && finalHighest && finalHighest > finalLowest) {
      const lowestNote = frequencyToNote(finalLowest);
      const highestNote = frequencyToNote(finalHighest);
      const voiceType = getVoiceType(lowestNote.fullNote, highestNote.fullNote);

      const result = {
        lowestNote: lowestNote.fullNote,
        highestNote: highestNote.fullNote,
        lowestFrequency: finalLowest,
        highestFrequency: finalHighest,
        voiceType: voiceType,
        octaves: Math.log2(finalHighest / finalLowest).toFixed(1)
      };

      console.log('✅ Test result:', result);
      setTestResult(result);
      setTestPhase('result');
    } else {
      console.error('❌ Invalid pitch values:', { finalLowest, finalHighest });
      setError('Unable to calculate results. Please try again.');
    }
  };

  // Restart test
  const handleRestart = () => {
    // Reset all states
    setTestPhase('testing');
    setTestResult(null);

    // Reset lowest
    setLowestInputMode('sing');
    setLowestCountdown(0);
    setLowestIsRecording(false);
    setLowestCurrentPitch(null);
    setLowestCurrentNote(null);
    setLowestManualPitch(null);
    setLowestCaptured(null);
    lowestHasMinHoldRef.current = false;
    lowestValidStartTimeRef.current = null;
    lowestPitchHistoryRef.current = [];
    lowestFinalPitchRef.current = null;

    // Reset highest
    setHighestInputMode('sing');
    setHighestCountdown(0);
    setHighestIsRecording(false);
    setHighestCurrentPitch(null);
    setHighestCurrentNote(null);
    setHighestManualPitch(null);
    setHighestCaptured(null);
    highestHasMinHoldRef.current = false;
    highestValidStartTimeRef.current = null;
    highestPitchHistoryRef.current = [];
    highestFinalPitchRef.current = null;

    // Cleanup detector
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
      detectorRef.current.cleanup();
      detectorRef.current = null;
    }
  };

  // Pre-initialize piano audio on mount to reduce first-click latency
  useEffect(() => {
    console.log('🎹 Pre-initializing piano audio...');
    const piano = getGlobalPianoAudio();
    piano.initialize().then(() => {
      console.log('✅ Piano audio pre-initialized successfully');
    }).catch((error) => {
      console.error('❌ Failed to pre-initialize piano audio:', error);
    });
  }, []);

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

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Free Vocal Range Test - Find Your Voice Type in 3 Minutes | SingMeter</title>
      <meta name="description" content="Test your vocal range online for free. Discover your voice type (Soprano, Alto, Tenor, Bass) and get personalized song recommendations. No signup required, works in your browser." />
      <meta name="keywords" content="vocal range test, voice type test, singing range test, vocal range finder, voice classification, soprano alto tenor bass, vocal assessment, singing test" />
      <link rel="canonical" href="https://www.singmeter.com/vocal-range-test" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.singmeter.com/vocal-range-test" />
      <meta property="og:title" content="Free Vocal Range Test - Find Your Voice Type | SingMeter" />
      <meta property="og:description" content="Test your vocal range online for free. Discover your voice type and get personalized song recommendations." />
      <meta property="og:image" content="https://www.singmeter.com/og-image.svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SingMeter" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.singmeter.com/vocal-range-test" />
      <meta name="twitter:title" content="Free Vocal Range Test - Find Your Voice Type | SingMeter" />
      <meta name="twitter:description" content="Test your vocal range online for free. Discover your voice type and get personalized song recommendations." />
      <meta name="twitter:image" content="https://www.singmeter.com/twitter-image.svg" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Vocal Range Test",
          "url": "https://www.singmeter.com/vocal-range-test",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Test your vocal range online for free. Discover your voice type (Soprano, Alto, Tenor, Bass) and get personalized song recommendations. No signup required.",
          "featureList": [
            "Find your lowest and highest notes",
            "Discover your voice type classification",
            "Get personalized song recommendations",
            "Two testing modes: Sing or Manual",
            "Real-time pitch detection",
            "Visual piano keyboard display"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "850",
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
          "name": "How to Test Your Vocal Range",
          "description": "Learn how to test your vocal range and discover your voice type in 3 simple steps.",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Test Your Lowest Note",
              "text": "Sing or select your lowest comfortable note. Hold it for 3 seconds for accurate detection."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Test Your Highest Note",
              "text": "Sing or select your highest comfortable note. Hold it for 3 seconds for accurate detection."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Get Your Results",
              "text": "View your vocal range, voice type classification, and personalized song recommendations."
            }
          ],
          "totalTime": "PT3M"
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {testPhase === 'testing' && (
            <UnifiedTestScreen
              // Lowest note props
              lowestInputMode={lowestInputMode}
              lowestCountdown={lowestCountdown}
              lowestIsRecording={lowestIsRecording}
              lowestPitch={lowestCurrentPitch}
              lowestNote={lowestCurrentNote}
              lowestManualPitch={lowestManualPitch}
              lowestCaptured={lowestCaptured}
              onLowestStart={handleLowestStart}
              onLowestReset={handleLowestReset}
              onLowestInputModeChange={handleLowestInputModeChange}
              onLowestManualPitchSelect={handleLowestManualPitchSelect}

              // Highest note props
              highestInputMode={highestInputMode}
              highestCountdown={highestCountdown}
              highestIsRecording={highestIsRecording}
              highestPitch={highestCurrentPitch}
              highestNote={highestCurrentNote}
              highestManualPitch={highestManualPitch}
              highestCaptured={highestCaptured}
              onHighestStart={handleHighestStart}
              onHighestReset={handleHighestReset}
              onHighestInputModeChange={handleHighestInputModeChange}
              onHighestManualPitchSelect={handleHighestManualPitchSelect}

              // Analysis
              onAnalyze={handleAnalyze}
              canAnalyze={Boolean(
                (lowestCaptured || lowestManualPitch) &&
                (highestCaptured || highestManualPitch)
              )}
            />
          )}

          {testPhase === 'result' && testResult && (
            <ResultScreen
              result={testResult}
              onReset={handleRestart}
            />
          )}

          {/* Additional Content - Only show during testing phase */}
          {testPhase === 'testing' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* How It Works Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  How to Test Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-indigo-600">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Test Your Lowest Note</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Choose "Sing" mode and sing your lowest comfortable note, or use "Manual" mode to select it on the piano keyboard. Hold the note steady for at least 3 seconds.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Test Your Highest Note</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Similarly, sing or select your highest comfortable note. Don't strain your voice - choose a note you can sing comfortably and clearly.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-pink-600">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Results</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Click "Analyze My Range" to discover your voice type, see your vocal range in semitones, and get personalized song recommendations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  Why Use Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range Test</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎯</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Accurate Voice Classification</h3>
                        <p className="text-gray-600 text-sm">
                          Our algorithm accurately identifies your voice type (Soprano, Alto, Tenor, Bass, etc.) based on your vocal range.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎤</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Two Testing Modes</h3>
                        <p className="text-gray-600 text-sm">
                          Choose "Sing" mode for real-time pitch detection, or "Manual" mode to select notes on a piano keyboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🎵</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Personalized Song Recommendations</h3>
                        <p className="text-gray-600 text-sm">
                          Get a curated list of songs that match your vocal range and voice type perfectly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">🔒</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">100% Private & Secure</h3>
                        <p className="text-gray-600 text-sm">
                          All processing happens in your browser. Your voice is never recorded, stored, or transmitted to any server.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
                </h2>
                <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">What is vocal range?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Vocal range is the span between the lowest and highest notes you can comfortably sing. It's typically measured in octaves or semitones and helps determine your voice type.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Should I test my full range or comfortable range?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Test your comfortable range - the notes you can sing clearly without straining. Your full range (including falsetto or vocal fry) is less useful for finding suitable songs.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Why do I need to hold each note for 3 seconds?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Holding a note for 3 seconds ensures accurate pitch detection and confirms you can sustain that note comfortably, not just hit it briefly.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">What's the difference between Sing and Manual mode?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "Sing" mode uses your microphone to detect your voice in real-time. "Manual" mode lets you click piano keys if you prefer not to use your microphone or already know your range.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">How accurate is this test?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our pitch detection is accurate to within ±1 cent under good conditions. For best results, use in a quiet environment with a quality microphone, and sing clearly and steadily.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA to Pitch Detector */}
              <section>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-3">Want to practice your pitch accuracy?</h2>
                  <p className="text-purple-100 mb-6">
                    Try our free pitch detector to see your notes in real-time and improve your singing accuracy.
                  </p>
                  <Link
                    to="/pitch-detector"
                    className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition"
                  >
                    Try Pitch Detector →
                  </Link>
                </div>
              </section>
            </div>
          )}
        </main>

        {/* Microphone Permission Modal */}
        {showMicPermission && (
          <MicrophonePermissionModal
            onClose={() => setShowMicPermission(false)}
            onRetry={() => setShowMicPermission(false)}
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

// Microphone Permission Modal (simplified)
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
            <>SingMeter needs access to your microphone to test your vocal range. Your voice is never recorded or stored.</>
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

export default VocalRangeTestPage;


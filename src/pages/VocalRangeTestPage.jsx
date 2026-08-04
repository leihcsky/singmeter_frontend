/**
 * Vocal Range Test Page - Wrapper for ModernVocalTest component
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ContentSection from '../components/ContentSection';
import { AudioPitchDetector, frequencyToNote, getVoiceType } from '../utils/pitchDetector';
import { useVocalPitchDetection } from '../hooks/useVocalPitchDetection';
import UnifiedTestScreen from '../components/UnifiedTestScreen';
import ResultScreen from '../components/ResultScreen';
import { getGlobalPianoAudio } from '../utils/pianoAudio';
import Header from '../components/Header';
import FAQSection from '../components/FAQSection';
import PracticePathSection from '../components/PracticePathSection';
import ToolPageDeepDive from '../components/ToolPageDeepDive';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import { trackEvent, GA_CATEGORIES, GA_ACTIONS } from '../utils/analytics';

const vocalRangeFaqItems = [
  {
    question: "What is vocal range?",
    answer: "Vocal range is the span between the lowest and highest notes you can comfortably sing. It's typically measured in octaves or semitones and helps determine your voice type."
  },
  {
    question: "Should I test my full range or comfortable range?",
    answer: "Test your comfortable range - the notes you can sing clearly without straining. Your full range (including falsetto or vocal fry) is less useful for finding suitable songs."
  },
  {
    question: "Why is my voice type important?",
    answer: "Knowing your voice type helps you choose songs that highlight your strengths rather than straining your voice. Singing within your natural classification allows for better tone, control, and longevity."
  },
  {
    question: "Can I increase my vocal range?",
    answer: "Yes! While your skeletal structure determines your voice type, your functional range can be expanded. Regular practice of scales and proper breath support can help you access notes that are currently weak."
  },
  {
    question: "What is a good vocal range for a beginner?",
    answer: "Most untrained singers have a range of about 1.5 to 2 octaves. With practice, this can often be expanded to 2.5 or even 3 octaves. Don't worry if your range seems small at first; it grows with exercise."
  },
  {
    question: "Why do I need to hold each note for 3 seconds?",
    answer: "Holding a note for 3 seconds ensures accurate pitch detection and confirms you can sustain that note comfortably, not just hit it briefly."
  },
  {
    question: "What's the difference between Sing and Manual mode?",
    answer: "\"Sing\" mode uses your microphone to detect your voice in real-time. \"Manual\" mode lets you click piano keys if you prefer not to use your microphone or already know your range."
  },
  {
    question: "Is this test accurate compared to a vocal coach?",
    answer: "SingMeter uses advanced pitch detection accurate to within ±1 cent. However, a vocal coach can also assess timbre and passagio. This tool is an excellent starting point for finding your comfortable range."
  },
  {
    question: "What should I do if the microphone isn't working?",
    answer: "First, ensure you've clicked 'Allow' when the browser asked for microphone permission. If you denied it, click the lock icon in your browser's address bar to reset permissions. Also, try using headphones to prevent feedback."
  }
];

/** Result-oriented voice type quick reference — matches getVoiceType() labels */
const VOICE_TYPE_REFERENCE = [
  {
    type: 'Soprano',
    label: 'Soprano',
    tag: 'High Female',
    range: 'C4 – C6',
    hint: 'Likely if your comfortable center sits high and your top reaches toward C6.',
    border: 'border-indigo-100',
    title: 'text-indigo-900',
  },
  {
    type: 'Mezzo-Soprano',
    label: 'Mezzo-Soprano',
    tag: 'Mid Female',
    range: 'A3 – A5',
    hint: 'Likely if most everyday singing feels easy between A3 and A5.',
    border: 'border-purple-100',
    title: 'text-purple-900',
  },
  {
    type: 'Alto',
    label: 'Alto / Contralto',
    tag: 'Low Female',
    range: 'F3 – F5',
    hint: 'Likely if your tone is warm and your range centers around F3–F5.',
    border: 'border-pink-100',
    title: 'text-pink-900',
  },
  {
    type: 'Tenor',
    label: 'Tenor',
    tag: 'High Male',
    range: 'C3 – C5',
    hint: 'Likely if you carry melody lines around C3–C5 without straining.',
    border: 'border-sky-100',
    title: 'text-sky-900',
  },
  {
    type: 'Baritone',
    label: 'Baritone',
    tag: 'Mid Male',
    range: 'A2 – A4',
    hint: 'Likely if your everyday singing sits around A2–A4.',
    border: 'border-blue-100',
    title: 'text-blue-900',
  },
  {
    type: 'Bass',
    label: 'Bass',
    tag: 'Low Male',
    range: 'E2 – E4',
    hint: 'Likely if your lowest usable notes reach E2–E3 with solid chest tone.',
    border: 'border-gray-200',
    title: 'text-gray-900',
  },
];

function VoiceTypeReferenceGrid({ highlightType }) {
  const showHighlight = highlightType && highlightType !== 'Unknown';

  return (
    <>
      {showHighlight && (
        <p className="text-sm text-indigo-700 font-medium mb-4">
          Your result suggests <strong>{highlightType}</strong> — see the highlighted card below.
        </p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
        {VOICE_TYPE_REFERENCE.map((vt) => {
          const highlighted = showHighlight && vt.type === highlightType;
          return (
            <div
              key={vt.type}
              className={`bg-white p-4 rounded-xl border shadow-sm ${
                highlighted
                  ? 'border-indigo-400 ring-2 ring-indigo-300 bg-indigo-50/50'
                  : vt.border
              }`}
            >
              <h4 className={`font-bold ${vt.title} mb-1`}>{vt.label}</h4>
              <p className="text-xs text-gray-500 mb-1">{vt.tag} · {vt.range}</p>
              <p className="text-sm text-gray-600">{vt.hint}</p>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Estimate only—not a substitute for a vocal coach. Full chart, SATB notes, and examples in our{' '}
        <Link to="/blog/vocal-range-chart" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
          vocal range chart
        </Link>
        .
      </p>
    </>
  );
}

const VocalRangeTestPage = () => {
  // Test phase: 'testing' or 'result'
  const [testPhase, setTestPhase] = useState('testing');
  const [testResult, setTestResult] = useState(null);
  const [resultWarnings, setResultWarnings] = useState([]); // Store validation warnings to display on result page

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Free Vocal Range Test – Find Your Highest & Lowest Notes Online';

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

    setMetaTag('description', 'Test your vocal range using your microphone. Find your lowest and highest notes instantly. Discover your voice type. Free, online, no signup.');
    setMetaTag('keywords', 'vocal range test, voice type test, singing range test, vocal range finder, voice classification, soprano alto tenor bass, vocal assessment, singing test');
    setLinkTag('canonical', 'https://www.singmeter.com/vocal-range-test');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  // Modal states
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('permission_denied');

  // Detector ref (shared for both tests)
  const detectorRef = useRef(null);

  // Refs for cross-validation
  const lowestValuesRef = useRef({ captured: null, manual: null });
  const highestValuesRef = useRef({ captured: null, manual: null });

  // === LOWEST NOTE HOOK ===
  const lowestHook = useVocalPitchDetection({
    type: 'lowest',
    detectorRef,
    otherValuesRef: highestValuesRef
  });

  // === HIGHEST NOTE HOOK ===
  const highestHook = useVocalPitchDetection({
    type: 'highest',
    detectorRef,
    otherValuesRef: lowestValuesRef
  });

  // Sync refs for validation
  useEffect(() => {
    lowestValuesRef.current = {
      captured: lowestHook.captured,
      manual: lowestHook.manualPitch
    };
  }, [lowestHook.captured, lowestHook.manualPitch]);

  useEffect(() => {
    highestValuesRef.current = {
      captured: highestHook.captured,
      manual: highestHook.manualPitch
    };
  }, [highestHook.captured, highestHook.manualPitch]);

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
    trackEvent(GA_ACTIONS.START_TEST, GA_CATEGORIES.VOCAL_TEST, 'Start Lowest Detection');
    if (lowestHook.inputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      lowestHook.setCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          lowestHook.setCountdown(count);
        } else {
          clearInterval(interval);
          lowestHook.setCountdown(0);
          lowestHook.setIsRecording(true);
          lowestHook.startDetection();
        }
      }, 1000);
    }
  };

  // === HIGHEST NOTE HANDLERS ===
  const handleHighestStart = async () => {
    trackEvent(GA_ACTIONS.START_TEST, GA_CATEGORIES.VOCAL_TEST, 'Start Highest Detection');
    if (highestHook.inputMode === 'sing') {
      const result = await initializeMicrophone();
      if (!result.success) return;

      // Start countdown
      highestHook.setCountdown(3);
      let count = 3;
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          highestHook.setCountdown(count);
        } else {
          clearInterval(interval);
          highestHook.setCountdown(0);
          highestHook.setIsRecording(true);
          highestHook.startDetection();
        }
      }, 1000);
    }
  };

  // === ANALYSIS HANDLER ===
  const handleAnalyze = () => {
    trackEvent(GA_ACTIONS.CLICK, GA_CATEGORIES.VOCAL_TEST, 'Analyze Results');

    // Get final pitches from captured data
    const finalLowest = lowestHook.captured?.frequency || lowestHook.manualPitch;
    const finalHighest = highestHook.captured?.frequency || highestHook.manualPitch;

    if (!finalLowest || !finalHighest) {
      console.error('Cannot analyze: missing pitch data');
      return;
    }

    // Stop any ongoing detection
    if (detectorRef.current) {
      detectorRef.current.stopDetection();
    }

    console.log('🎯 Analyzing vocal range:', { finalLowest, finalHighest });

    // Validation checks for accuracy and reliability
    const warnings = [];
    
    if (!finalLowest || !finalHighest) {
      console.error('❌ Missing pitch values');
      warnings.push({
        type: 'error',
        message: 'Please complete both tests before analyzing.'
      });
      setResultWarnings(warnings);
      return;
    }

    if (finalHighest <= finalLowest) {
      const lowestNote = frequencyToNote(finalLowest);
      const highestNote = frequencyToNote(finalHighest);
      console.error('❌ Invalid range: highest must be greater than lowest', {
        lowest: `${lowestNote.fullNote} (${finalLowest.toFixed(1)} Hz)`,
        highest: `${highestNote.fullNote} (${finalHighest.toFixed(1)} Hz)`
      });
      
      // Show detailed error message with specific notes and frequencies
      warnings.push({
        type: 'error',
        message: `Invalid range detected: Your highest note (${highestNote.fullNote}, ${finalHighest.toFixed(1)} Hz) is not higher than your lowest note (${lowestNote.fullNote}, ${finalLowest.toFixed(1)} Hz). Please retest both notes. Make sure to sing your lowest comfortable note for the lowest test, and your highest comfortable note for the highest test.`
      });
      setResultWarnings(warnings);
      setTestPhase('testing'); // Stay in testing phase so user can retest
      return;
    }

    const lowestNote = frequencyToNote(finalLowest);
    const highestNote = frequencyToNote(finalHighest);
    
    // Validate note conversion succeeded
    if (!lowestNote.fullNote || !highestNote.fullNote) {
      console.error('❌ Failed to convert frequencies to notes');
      warnings.push({
        type: 'error',
        message: 'Error processing results. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }

    // Validate that the notes are actually different (not just frequencies)
    if (lowestNote.fullNote === highestNote.fullNote) {
      console.error('❌ Invalid range: lowest and highest notes are the same', {
        note: lowestNote.fullNote,
        freq1: finalLowest,
        freq2: finalHighest
      });
      warnings.push({
        type: 'error',
        message: `Invalid range: Your lowest and highest notes are the same (${lowestNote.fullNote}). Please retest to find your actual vocal range.`
      });
      setResultWarnings(warnings);
      setTestPhase('testing');
      return;
    }

    // Calculate range width for validation
    const rangeWidthSemitones = 12 * Math.log2(finalHighest / finalLowest);
    const rangeWidthOctaves = rangeWidthSemitones / 12;

    // Validate range is reasonable (at least 3 semitones, typically 1-4 octaves)
    if (rangeWidthSemitones < 3) {
      console.warn('⚠️ Range too narrow:', rangeWidthSemitones, 'semitones');
      warnings.push({
        type: 'warning',
        message: 'Your vocal range seems too narrow. Please ensure you tested both your lowest and highest comfortable notes. You can retest if needed.'
      });
    }

    if (rangeWidthOctaves > 5) {
      console.warn('⚠️ Range unusually wide:', rangeWidthOctaves, 'octaves');
      warnings.push({
        type: 'info',
        message: `Your range of ${rangeWidthOctaves.toFixed(1)} octaves is exceptionally wide! This is impressive and may indicate exceptional vocal ability.`
      });
    }

    // Validate frequencies are within human vocal range
    const MIN_HUMAN_FREQUENCY = 65;   // C2
    const MAX_HUMAN_FREQUENCY = 1318; // E6
    
    if (finalLowest < MIN_HUMAN_FREQUENCY || finalHighest > MAX_HUMAN_FREQUENCY) {
      console.warn('⚠️ Frequencies outside typical human range');
      if (finalLowest < MIN_HUMAN_FREQUENCY) {
        warnings.push({
          type: 'info',
          message: 'Your lowest note is below the typical human vocal range. This is very rare and impressive!'
        });
      }
      if (finalHighest > MAX_HUMAN_FREQUENCY) {
        warnings.push({
          type: 'info',
          message: 'Your highest note is above the typical human vocal range. This is exceptional!'
        });
      }
    }
    
    // Store warnings for display on result page
    setResultWarnings(warnings);

    const voiceType = getVoiceType(lowestNote.fullNote, highestNote.fullNote);

    // Validate voice type classification
    if (voiceType === 'Unknown') {
      console.warn('⚠️ Could not classify voice type');
    }

    // Ensure semitones is calculated correctly and is an integer
    const semitones = Math.round(rangeWidthSemitones);
    // Ensure octaves is formatted to 1 decimal place for display
    const octaves = parseFloat(rangeWidthOctaves.toFixed(1));
    
    // Validate calculated values
    if (semitones < 0 || !isFinite(semitones)) {
      console.error('❌ Invalid semitones calculation:', semitones);
      warnings.push({
        type: 'error',
        message: 'Error calculating range width. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }
    
    if (!isFinite(octaves) || octaves < 0) {
      console.error('❌ Invalid octaves calculation:', octaves);
      warnings.push({
        type: 'error',
        message: 'Error calculating range width. Please try again.'
      });
      setResultWarnings(warnings);
      return;
    }

    const result = {
      lowestNote: lowestNote.fullNote,
      highestNote: highestNote.fullNote,
      lowestFrequency: parseFloat(finalLowest.toFixed(2)), // Store as number with 2 decimal precision
      highestFrequency: parseFloat(finalHighest.toFixed(2)), // Store as number with 2 decimal precision
      voiceType: voiceType,
      octaves: octaves, // Store as number, not string
      semitones: semitones // Store as integer
    };

    console.log('✅ Test result:', result);
    console.log('📊 Validation:', {
      rangeWidthOctaves: rangeWidthOctaves.toFixed(2),
      rangeWidthSemitones: Math.round(rangeWidthSemitones),
      lowestInRange: finalLowest >= MIN_HUMAN_FREQUENCY,
      highestInRange: finalHighest <= MAX_HUMAN_FREQUENCY
    });

    setTestResult(result);
    setTestPhase('result');
    
    // Scroll to top when result is displayed
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Restart test
  const handleRestart = () => {
    // Reset all states
    setTestPhase('testing');
    setTestResult(null);
    setResultWarnings([]); // Clear warnings
    
    // Scroll to top when restarting
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // Reset lowest
    lowestHook.setInputMode('sing');
    lowestHook.reset();

    // Reset highest
    highestHook.setInputMode('sing');
    highestHook.reset();

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

  // Scroll to top when result phase is displayed
  useEffect(() => {
    if (testPhase === 'result' && testResult) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [testPhase, testResult]);

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
              lowestInputMode={lowestHook.inputMode}
              lowestCountdown={lowestHook.countdown}
              lowestIsRecording={lowestHook.isRecording}
              lowestPitch={lowestHook.currentPitch}
              lowestNote={lowestHook.currentNote}
              lowestVolume={lowestHook.volume}
              lowestManualPitch={lowestHook.manualPitch}
              lowestCaptured={lowestHook.captured}
              lowestDetectionTimeLeft={lowestHook.detectionTimeLeft}
              lowestDetectionError={lowestHook.detectionError}
              onLowestStart={handleLowestStart}
              onLowestReset={lowestHook.reset}
              onLowestInputModeChange={lowestHook.handleInputModeChange}
              onLowestManualPitchSelect={lowestHook.handleManualPitchSelect}

              // Highest note props
              highestInputMode={highestHook.inputMode}
              highestCountdown={highestHook.countdown}
              highestIsRecording={highestHook.isRecording}
              highestPitch={highestHook.currentPitch}
              highestNote={highestHook.currentNote}
              highestVolume={highestHook.volume}
              highestManualPitch={highestHook.manualPitch}
              highestCaptured={highestHook.captured}
              highestDetectionTimeLeft={highestHook.detectionTimeLeft}
              highestDetectionError={highestHook.detectionError}
              onHighestStart={handleHighestStart}
              onHighestReset={highestHook.reset}
              onHighestInputModeChange={highestHook.handleInputModeChange}
              onHighestManualPitchSelect={highestHook.handleManualPitchSelect}

              // Analysis
              onAnalyze={handleAnalyze}
              canAnalyze={Boolean(
                (lowestHook.captured || lowestHook.manualPitch) &&
                (highestHook.captured || highestHook.manualPitch)
              )}
            />
          )}

          {testPhase === 'result' && testResult && (
            <ResultScreen
              result={testResult}
              onReset={handleRestart}
              warnings={resultWarnings}
            />
          )}

          {/* SEO-Optimized Static Content - Always visible for crawlers */}
          {/* This content ensures search engines can see example results and voice type information */}
          <noscript>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vocal Range Test Results</h2>
                <p className="text-gray-600 mb-6">
                  After completing the vocal range test, you receive your voice type, note range, and octave width.
                  Match your low and high notes to the reference below.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Bass:</strong> E2–E4</li>
                  <li><strong>Baritone:</strong> A2–A4</li>
                  <li><strong>Tenor:</strong> C3–C5</li>
                  <li><strong>Alto:</strong> F3–F5</li>
                  <li><strong>Mezzo-Soprano:</strong> A3–A5</li>
                  <li><strong>Soprano:</strong> C4–C6</li>
                </ul>
              </div>
            </div>
          </noscript>

          {/* SEO-Optimized Static Content - Always visible for crawlers and users */}
          {/* This ensures search engines can index example results, voice types, and result descriptions */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Show content during testing phase, or show a message during result phase */}
            {testPhase === 'testing' ? (
              <>
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

              <PracticePathSection
                theme="purple"
                title="Your Practice Path After the Test"
                intro="Use this test as the first step in a weekly loop: measure your range, calibrate pitch, then choose songs in a key that fits. New to the test? Follow our guided tutorial for microphone setup and common mistakes."
                comboTitle="12-Minute First Session"
                comboSteps={[
                  <>
                    Follow the{' '}
                    <Link to="/tutorials/vocal-range-test-guided" className="text-indigo-600 font-semibold hover:underline">
                      guided range test tutorial
                    </Link>{' '}
                    or complete the test above—save your lowest and highest comfortable notes.
                  </>,
                  <>
                    Open the{' '}
                    <Link to="/pitch-detector" className="text-indigo-600 font-semibold hover:underline">
                      Pitch Detector
                    </Link>{' '}
                    and sing your middle note three times; aim for the green zone (about ±10 cents).
                  </>,
                  <>
                    Browse the{' '}
                    <Link to="/song-key-finder" className="text-indigo-600 font-semibold hover:underline">
                      Song Key Finder
                    </Link>{' '}
                    filtered for your range and pick one song to practice this week.
                  </>,
                ]}
                routines={[
                  {
                    title: 'Guided first test',
                    duration: '12 min',
                    settings: 'Quiet room · headphones optional',
                    body: 'Walk through warm-up, low note, high note, and save results. Do not push painful extremes—comfortable notes only.',
                    goal: 'A saved range you can reuse in Song Key Finder.',
                  },
                  {
                    title: 'Pitch check',
                    duration: '5 min',
                    body: 'After the test, sing your tessitura (everyday middle notes) on the Pitch Detector. Note whether you tend flat or sharp.',
                    goal: 'Know your habitual pitch tendency before repertoire work.',
                  },
                  {
                    title: 'Repertoire pick',
                    duration: '10 min',
                    body: 'Filter sample songs by genre and key. Try transposing one favorite up or down a semitone and hum the chorus.',
                    goal: 'One song assigned for the week in a singable key.',
                  },
                ]}
                nextTools={[
                  { to: '/tutorials/pitch-calibration-10', label: 'Pitch calibration tutorial', hint: 'Next in the Start track' },
                  { to: '/tutorials/song-in-the-right-key', label: 'Song in your key', hint: 'After you know your range' },
                ]}
                blogLink={{ to: '/blog/how-to-test-vocal-range', label: 'How to test vocal range (full guide)' }}
              />

              <ToolPageDeepDive
                accent="purple"
                heading="How we keep this range test honest on real devices"
                howWeTest={{
                  intro:
                    'We test this tool on phone and laptop microphones in ordinary rooms, because that is where singers actually use it. The aim is a result you can trust as a comfortable working range—not a one-off peak you hit by straining.',
                  bullets: [
                    'Microphone reality: laptop and phone mics roll off the lowest bass notes. If your lowest note reads higher than it feels, we recommend retesting closer to the mic and trusting the note that still has solid tone—not breathy “fry”.',
                    'Octave errors: built-in mics sometimes report a note one octave off on very low or very breathy sounds. We cross-check by holding the note 2–3 seconds and watching for a stable reading before recording it.',
                    'Detection window: the analyzer locks onto a sustained pitch, so a quick scoop or slide can misread. We hold each target note steady rather than gliding into it.',
                    'Day-to-day variance: morning voices often lose a few top notes. We treat a single test as a snapshot and retest on 2–3 days to find a dependable average.',
                  ],
                }}
                practiceCase={{
                  title: 'A real first-test session (and what the numbers meant)',
                  duration: '12 min · quiet room · earbuds',
                  steps: [
                    'A baritone-leaning user warmed up 3 minutes, then recorded a lowest usable note of A2 and a highest controlled note of E4.',
                    'First attempt misfired: a glide into the low note read G2, but the tone was unstable, so we re-recorded with a steady 3-second hold and got a clean A2.',
                    'Result mapped to roughly A2–E4, overlapping Baritone on the chart. Rather than chase a higher top note, the user noted most songs felt easy around C3–C4 (their tessitura).',
                    'We saved the range and opened Song Key Finder to transpose one song down two semitones so the chorus sat inside that comfortable zone.',
                  ],
                }}
                misconceptions={[
                  {
                    myth: '“My highest note is my voice type.”',
                    reality:
                      'Voice type follows your comfortable zone (tessitura) and tone, not the single highest note you can squeak out. Two singers with the same top note can be different types.',
                  },
                  {
                    myth: '“A bigger range number is always better.”',
                    reality:
                      'A reliable, strain-free range you can actually sing in beats a wider range full of unusable extremes. We only count notes with solid tone.',
                  },
                  {
                    myth: '“The test result is fixed forever.”',
                    reality:
                      'Range shifts with warm-up, time of day, health, and training. Retest periodically—this tool is for tracking change, not a permanent label.',
                  },
                ]}
                blogLink={{
                  to: '/blog/vocal-range-chart',
                  label: 'Vocal Range Chart (all six voice types)',
                }}
                tutorialLink={{
                  to: '/tutorials/vocal-range-test-guided',
                  label: 'Your First Vocal Range Test',
                }}
              />

              {/* Educational content */}
              <div className="space-y-16 pb-16">
                <ContentSection title="Understanding Vocal Range & Voice Types">
                  <p>
                    Your <strong>vocal range</strong> is the span of comfortable, usable notes from lowest to highest—not
                    forced extremes. After the test, match your low and high notes to the cards below to see which voice
                    type your result most closely resembles.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Quick Voice Type Reference</h3>
                  <VoiceTypeReferenceGrid highlightType={testResult?.voiceType} />

                  <p className="text-gray-600 mt-6">
                    Range can shift with training, health, and age—this test captures today&apos;s comfortable span, not a
                    lifetime label.{' '}
                    <Link to="/blog/can-vocal-range-change" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
                      Learn what can change safely →
                    </Link>
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded-r-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Never force notes that feel painful or extremely tight. Record comfortable,
                      clear tones only.
                    </p>
                  </div>
                </ContentSection>

                <ContentSection title="How to Use This Vocal Range Test">
                  <p>
                    In short: warm up gently, sing down to your lowest <em>usable</em> note, sing up to your highest controlled
                    note, and let the analyzer calculate your range and closest voice type. Never push into pain or scream—comfortable
                    notes only.
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">What counts as a usable note</h3>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700 mb-4">
                    <li>Clear tone for about 1–2 seconds (not a scrape or scream)</li>
                    <li>No sharp throat pain; mild stretch at the edge is OK, pain is not</li>
                    <li>You could repeat the note tomorrow without fearing it</li>
                    <li>Whispery fry at the bottom or flippy squeaks at the top usually do <strong>not</strong> count</li>
                  </ul>
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">After the result: three useful next steps</h3>
                  <ol className="list-decimal list-outside ml-4 space-y-2 text-gray-700 mb-4">
                    <li>
                      Write your comfortable low and high (not just the heroic extremes). That band is closer to{' '}
                      <Link to="/blog/tessitura-and-comfortable-range" className="text-indigo-600 font-semibold underline">
                        tessitura
                      </Link>
                      .
                    </li>
                    <li>
                      Open the{' '}
                      <Link to="/song-key-finder" className="text-indigo-600 font-semibold underline">
                        Song Key Finder
                      </Link>{' '}
                      and transpose one song so the chorus peaks sit inside that band.
                    </li>
                    <li>
                      Retest every 4–6 weeks after consistent practice—not every day. Daily swings are mostly fatigue and room noise.
                    </li>
                  </ol>
                  <p>
                    For a guided 12-minute walkthrough with microphone setup, the exact descend/ascend method, and the most common
                    mistakes to avoid, follow our{' '}
                    <Link to="/tutorials/vocal-range-test-guided" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
                      step-by-step Vocal Range Test tutorial
                    </Link>
                    . Full written guide:{' '}
                    <Link to="/blog/how-to-test-vocal-range" className="text-indigo-600 font-semibold underline">
                      how to test vocal range
                    </Link>
                    .
                  </p>
                </ContentSection>
              </div>

              {/* FAQ Section */}
              <FAQSection items={vocalRangeFaqItems} />

              {/* Example result preview */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  Example <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Test Result</span>
                </h2>
                <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
                  After you finish, the analyzer shows your voice type, note range, and octave width—like this sample.
                </p>

                <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5 text-white text-center">
                    <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Voice type</p>
                    <h3 className="text-2xl font-bold">Tenor</h3>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 rounded-xl p-4 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Vocal Range</div>
                      <div className="text-xl font-bold text-indigo-700">C3 – C5</div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">Range Width</div>
                      <div className="text-xl font-bold text-indigo-700">2.0 oct</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Learn More: Vocal Range & Voice Types */}
	              <section className="mb-16">
	                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
	                  Learn More About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Vocal Range &amp; Voice Types</span>
	                </h2>
	                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
	                  Ready to go deeper? Explore our in-depth guides on how vocal range, tessitura, and famous singers' ranges
	                  connect to your own results from this test.
	                </p>
	                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
	                  <Link
	                    to="/blog/how-to-find-your-voice-type"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        How to Find Your Voice Type
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        Step-by-step method to figure out whether you lean more toward Soprano, Alto, Tenor, or Bass using your
	                        range and tessitura.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Read article
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/vocal-range-chart"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Vocal Range Chart
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        See typical ranges for common voice types and learn how to compare your own test results to them.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      View chart
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/tessitura-and-comfortable-range"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Tessitura &amp; Comfortable Range
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        Learn why your everyday comfort zone matters more than the very highest or lowest notes you can touch.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Learn more
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>

	                  <Link
	                    to="/blog/can-vocal-range-change"
	                    className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100 hover:border-indigo-200 flex flex-col justify-between"
	                  >
	                    <div>
	                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
	                        Can Your Vocal Range Change?
	                      </h3>
	                      <p className="text-sm text-gray-600 leading-relaxed">
	                        How training, age, and vocal health shift your usable range over time—and when to retest.
	                      </p>
	                    </div>
	                    <div className="mt-3 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
	                      Read article
	                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
	                      </svg>
	                    </div>
	                  </Link>
	                </div>
	              </section>

	              {/* CTA to Other Tools */}
              <section>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-3">Continue Your Vocal Training</h2>
                  <p className="text-purple-100 mb-6">
                    Now that you know your range, use our free tools to improve your pitch, practice with reference tones, and build rhythmic accuracy.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/pitch-detector"
                      className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition"
                    >
                      🎵 Pitch Detector
                    </Link>
                    <Link
                      to="/tone-generator"
                      className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition"
                    >
                      🔊 Tone Generator
                    </Link>
                    <Link
                      to="/metronome"
                      className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition"
                    >
                      🥁 Metronome
                    </Link>
                  </div>
                </div>
	              </section>
              </>
            ) : (
              <div className="py-8 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Match Your Result</h2>
                <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
                  Compare your range to the six voice types below. For the full chart and tessitura guidance, see our{' '}
                  <Link to="/blog/vocal-range-chart" className="text-indigo-600 hover:underline font-semibold">
                    vocal range chart
                  </Link>
                  .
                </p>
                <VoiceTypeReferenceGrid highlightType={testResult?.voiceType} />
              </div>
            )}
          </div>

          {/* About SingMeter Vocal Range Test & Limitations - Always visible */}
	          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
	            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
	              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vocal Range Test</h2>
	              <p className="text-gray-600 text-sm leading-relaxed mb-4">
	                SingMeter's vocal range test is designed for education and practice. It helps you understand your usable range
	                and voice type so you can choose better songs and keys, but it does not replace a vocal coach or medical advice.
	              </p>
	              <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600">
	                <div>
	                  <h3 className="font-semibold text-gray-900 mb-2">What this tool is great for</h3>
	                  <ul className="list-disc list-inside space-y-1">
	                    <li>Getting a quick snapshot of your current vocal range.</li>
	                    <li>Tracking progress as you train and your range expands.</li>
	                    <li>Choosing more comfortable keys and song arrangements.</li>
	                  </ul>
	                </div>
	                <div>
	                  <h3 className="font-semibold text-gray-900 mb-2">Important limitations</h3>
	                  <ul className="list-disc list-inside space-y-1">
	                    <li>Results depend on your microphone, environment, and how you use your voice.</li>
	                    <li>It cannot diagnose vocal health problems or replace professional evaluation.</li>
	                    <li>Avoid forcing extreme notes — stay with clear, comfortable sounds.</li>
	                  </ul>
	                </div>
	              </div>
	              <p className="text-gray-600 text-xs mt-4 leading-relaxed">
	                If you ever feel pain, discomfort, or persistent hoarseness while singing, stop using the tool and consult a
	                qualified voice teacher or medical professional. For general questions about SingMeter, you can also visit our
	                <Link to="/about" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1">About</Link>
	                <span> page or </span>
	                <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 font-semibold">Contact</Link>
	                <span> us.</span>
	              </p>
	            </div>
	          </section>
	        </main>

        {/* Microphone Permission Modal */}
        {showMicPermission && (
          <MicrophonePermissionModal
            onClose={() => setShowMicPermission(false)}
            onRetry={async () => {
              setShowMicPermission(false);
              // Retry microphone initialization after a short delay
              // This will be triggered when user clicks "Start Test" again
            }}
            errorType={micPermissionError}
          />
        )}

        {/* Footer */}
        <Footer />

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </>
  );
};

// Microphone Permission Modal (simplified)
const MicrophonePermissionModal = ({ onClose, onRetry, errorType = 'permission_denied' }) => {
  const canRetry = errorType === 'permission_denied' || errorType === 'unknown_error';
  
  // Detect mobile browser
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isSecureContext = window.isSecureContext || window.location.protocol === 'https:';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Microphone Access Required</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {errorType === 'no_device' ? (
            <p className="text-gray-600">
              <strong>No microphone detected.</strong> Please connect a microphone and try again.
            </p>
          ) : errorType === 'device_in_use' ? (
            <p className="text-gray-600">
              <strong>Microphone is in use.</strong> Please close other applications that might be using your microphone and try again.
            </p>
          ) : errorType === 'security_error' ? (
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong>Secure connection required.</strong> Microphone access requires HTTPS. Please access this site using a secure connection (https://).
              </p>
              {isMobile && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Mobile Browser Tip:</strong> Make sure you're accessing the site via HTTPS, not HTTP.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600">
                SingMeter needs access to your microphone to test your vocal range. Your voice is <strong>never recorded or stored</strong> - all analysis happens locally in your browser.
              </p>
              
              {isMobile && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📱 Mobile Browser Instructions:</p>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    {isIOS ? (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, go to <strong>Settings → Safari → Microphone</strong> (or your browser settings) and enable microphone access for this site</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    ) : isAndroid ? (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, go to your browser's <strong>Settings → Site Settings → Microphone</strong> and enable access for this site</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    ) : (
                      <>
                        <li>Tap <strong>"Allow"</strong> when prompted for microphone access</li>
                        <li>If you previously denied access, check your browser settings to enable microphone permissions</li>
                        <li>Make sure you're using <strong>HTTPS</strong> (secure connection)</li>
                      </>
                    )}
                  </ol>
                </div>
              )}

              {!isSecureContext && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Security Warning:</strong> This page is not using HTTPS. Microphone access requires a secure connection. Please access this site via HTTPS.
                  </p>
                </div>
              )}

              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                <p className="text-sm text-green-800">
                  <strong>🔒 Privacy Guaranteed:</strong> Your voice is processed locally in your browser and never sent to any server.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          {canRetry ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  // Small delay to ensure modal closes before retry
                  setTimeout(() => {
                    onRetry();
                  }, 100);
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


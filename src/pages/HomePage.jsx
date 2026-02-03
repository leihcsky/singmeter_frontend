/**
 * Home Page - Tools Collection Landing Page
 */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getActiveTools } from '../config/tools';
import Header from '../components/Header';
import AdsterraNativeBanner from '../components/AdsterraNativeBanner';
import FAQSection from '../components/FAQSection';

// Visual Components
const SoundWaveVisual = () => (
  <svg viewBox="0 0 1200 400" className="w-full h-full opacity-30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
        <stop offset="20%" stopColor="rgba(99, 102, 241, 0.5)" />
        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
        <stop offset="80%" stopColor="rgba(236, 72, 153, 0.5)" />
        <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
      </linearGradient>
    </defs>
    {/* Frequency Lines */}
    <path d="M0,200 Q150,300 300,200 T600,200 T900,200 T1200,200" fill="none" stroke="url(#waveGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '3s' }} />
    <path d="M0,200 Q150,100 300,200 T600,200 T900,200 T1200,200" fill="none" stroke="url(#waveGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '4s' }} />
    <path d="M0,200 Q150,250 300,200 T600,200 T900,200 T1200,200" fill="none" stroke="url(#waveGradient)" strokeWidth="1.5" opacity="0.5" />
    <path d="M0,200 Q150,150 300,200 T600,200 T900,200 T1200,200" fill="none" stroke="url(#waveGradient)" strokeWidth="1.5" opacity="0.5" />
    
    {/* Digital Bars (Visualizing Pitch) */}
    {[...Array(20)].map((_, i) => {
      const height = Math.random() * 100 + 20;
      return (
        <rect 
          key={i} 
          x={300 + i * 30} 
          y={200 - height / 2} 
          width="10" 
          height={height} 
          fill="url(#waveGradient)" 
          rx="5"
          opacity="0.6"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.5s' }}
        />
      );
    })}
  </svg>
);

const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Circular Gradients */}
    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200 blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-200 blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-pink-200 blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    
    {/* Grid Pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

const HomePage = () => {
  const activeTools = getActiveTools();

  const toolIcons = {
    'vocal-range-test': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    'pitch-detector': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
      </svg>
    ),
    'tone-generator': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
    'metronome': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    'song-key-finder': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    )
  };

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'SingMeter - Singing Practice Platform & Free Tools';

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

    const safeSetLinkTag = (rel, href) => {
        let element = document.querySelector(`link[rel="${rel}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            document.head.appendChild(element);
        }
        element.setAttribute('href', href);
    };

    setMetaTag('description', 'SingMeter helps singers understand their voice, sing in tune, and practice effectively with free online singing tests and tools. From vocal range to pitch accuracy, improve your singing step by step.');
    setMetaTag(
      'keywords',
      'singing test, singing practice tools, vocal range test, pitch detector, tone generator, metronome, song key finder, sing meter, voice training'
    );
    safeSetLinkTag('canonical', 'https://www.singmeter.com/');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const blogArticles = [
    {
      slug: 'improve-singing-pitch',
      title: 'How to Improve Your Singing Pitch: Complete Training Guide',
      excerpt: 'Learn proven exercises and techniques to improve your singing pitch accuracy and sing in tune consistently.',
      category: 'Guides',
      readTime: '8 min read'
    },
    {
      slug: 'how-to-test-vocal-range',
      title: 'How to Test Your Vocal Range',
      excerpt: 'Learn the professional methods to accurately test and measure your singing range.',
      category: 'Guides',
      readTime: '5 min read'
    },
    {
      slug: 'singing-high-notes-techniques',
      title: 'How to Sing High Notes',
      excerpt: 'Master the art of singing high notes with proven vocal techniques and exercises.',
      category: 'Techniques',
      readTime: '6 min read'
    },
    {
      slug: 'songs-for-your-voice-type',
      title: 'Best Songs for Your Voice Type',
      excerpt: 'Discover the perfect songs that match your vocal range and voice classification.',
      category: 'Song Lists',
      readTime: '7 min read'
    }
  ];

  const homeFaqItems = [
    {
      question: "Is SingMeter really free?",
      answer: "Yes, all tools on SingMeter are 100% free to use. We believe that everyone should have access to quality music education tools regardless of their budget. Our platform is supported by non-intrusive advertisements."
    },
    {
      question: "What kind of singing test can I take on Sing Meter?",
      answer: "You can take our popular Vocal Range Test (a comprehensive singing test for voice types) to find your range, and use our Pitch Detector to analyze your singing accuracy in real-time. Sing Meter offers these professional-grade tests for free."
    },
    {
      question: "Do I need a microphone?",
      answer: "For tools like the Pitch Detector and Vocal Range Test, yes, you will need a microphone. Most built-in laptop or phone microphones work perfectly fine for these exercises. For tools like the Metronome or Tone Generator, you only need speakers or headphones."
    },
    {
      question: "Can I use SingMeter on my phone?",
      answer: "Absolutely! SingMeter is designed to be fully responsive and works great on smartphones, tablets, and desktop computers. You can practice singing anywhere, anytime, directly from your web browser without installing any apps."
    },
    {
      question: "How accurate are the pitch detection tools?",
      answer: "Our pitch detection algorithm is highly accurate for clear, single-voice input. It uses advanced audio processing to detect the fundamental frequency of your voice in real-time. For best results, use the tools in a quiet environment and wear headphones to prevent audio feedback."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SingMeter",
          "url": "https://www.singmeter.com",
          "description": "SingMeter helps singers understand their voice, sing in tune, and practice effectively with free online tools.",
          "publisher": {
            "@type": "Organization",
            "name": "SingMeter",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.singmeter.com/logo-horizontal.svg"
            }
          }
        })}
      </script>

      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        <Header />

        <main className="flex-grow relative">
          {/* Hero Section */}
          <section className="relative w-full overflow-hidden bg-white">
            <BackgroundPattern />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col items-center text-center z-10">
              {/* Sound Wave Decoration */}
              <div className="absolute top-1/2 left-0 w-full h-full transform -translate-y-1/2 pointer-events-none z-0">
                <SoundWaveVisual />
              </div>

              <div className="relative z-10 max-w-5xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-gray-900 tracking-tight">
                  SingMeter helps singers
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2 pb-2">
                    understand their voice, sing in tune, and practice effectively
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl text-gray-600 mt-6 block font-bold">
                    — with free online singing tests & tools.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  From vocal range to pitch accuracy, follow a clear practice path and improve your singing step by step.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => scrollToSection('practice-path')}
                    className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    Start Singing Practice
                    <svg className="w-5 h-5 ml-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('problem-solver')}
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    Find the Right Tool for You
                    <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Core Module 1: Three Core Questions (Problem Solver) */}
          <section id="problem-solver" className="py-20 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  What do you want to improve?
                </h2>
                <p className="mt-4 text-xl text-gray-500">Select a goal to find the right tools for you.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Question 1: Pitch */}
                <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 relative z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">Am I singing in tune?</h3>
                  <p className="text-gray-600 mb-8 flex-grow relative z-10">
                    Use our real-time feedback tools to visualize your pitch accuracy and train your ear to match notes perfectly.
                  </p>
                  
                  <div className="space-y-3 mt-auto relative z-10">
                    <Link to="/pitch-detector" className="flex items-center justify-center w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm hover:shadow">
                      Pitch Detector
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                    <Link to="/tone-generator" className="flex items-center justify-center w-full py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Tone Generator
                    </Link>
                  </div>
                </div>

                {/* Question 2: Voice Type */}
                <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600 relative z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">What is my voice type?</h3>
                  <p className="text-gray-600 mb-8 flex-grow relative z-10">
                    Discover your unique vocal range (lowest to highest notes) and find out if you are a Soprano, Alto, Tenor, or Bass.
                  </p>
                  
                  <div className="mt-auto relative z-10">
                    <Link to="/vocal-range-test" className="flex items-center justify-center w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
                      Take Vocal Range Test
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>

                {/* Question 3: Practice Path */}
                <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  
                  <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 text-pink-600 relative z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">How should I practice?</h3>
                  <p className="text-gray-600 mb-8 flex-grow relative z-10">
                    Don't know where to start? Follow our structured, step-by-step practice path to build a solid vocal foundation.
                  </p>
                  
                  <div className="mt-auto relative z-10">
                    <button 
                      onClick={() => scrollToSection('practice-path')}
                      className="flex items-center justify-center w-full py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-sm hover:shadow cursor-pointer"
                    >
                      View Practice Path
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Module 2: Practice Path */}
          <section id="practice-path" className="py-16 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                  A Simple Singing Practice Path
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Follow this sequence to systematically improve your singing ability.
                </p>
              </div>

              <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-colors text-center lg:text-left">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0">1</div>
                    <h3 className="text-lg font-bold mb-2">Discover Range</h3>
                    <p className="text-sm text-gray-400 mb-4">Find your lowest and highest notes.</p>
                    <Link to="/vocal-range-test" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300">
                      Vocal Range Test &rarr;
                    </Link>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors text-center lg:text-left">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0">2</div>
                    <h3 className="text-lg font-bold mb-2">Find Key</h3>
                    <p className="text-sm text-gray-400 mb-4">Get the right key for your voice.</p>
                    <Link to="/song-key-finder" className="text-purple-400 text-sm font-semibold hover:text-purple-300">
                      Song Key Finder &rarr;
                    </Link>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors text-center lg:text-left">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0">3</div>
                    <h3 className="text-lg font-bold mb-2">Reference Note</h3>
                    <p className="text-sm text-gray-400 mb-4">Train your ear with target notes.</p>
                    <Link to="/tone-generator" className="text-blue-400 text-sm font-semibold hover:text-blue-300">
                      Tone Generator &rarr;
                    </Link>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors text-center lg:text-left">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0">4</div>
                    <h3 className="text-lg font-bold mb-2">Check Pitch</h3>
                    <p className="text-sm text-gray-400 mb-4">Match pitch with visual feedback.</p>
                    <Link to="/pitch-detector" className="text-green-400 text-sm font-semibold hover:text-green-300">
                      Pitch Detector &rarr;
                    </Link>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-colors text-center lg:text-left">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0">5</div>
                    <h3 className="text-lg font-bold mb-2">Steady Timing</h3>
                    <p className="text-sm text-gray-400 mb-4">Practice rhythm and tempo.</p>
                    <Link to="/metronome" className="text-orange-400 text-sm font-semibold hover:text-orange-300">
                      Online Metronome &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Adsterra Native Banner (Restored & Visible) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdsterraNativeBanner />
          </section>

          {/* Core Module 3: All Tools */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Explore All Tools</h2>
                <p className="mt-4 text-xl text-gray-500">
                  Simple, focused tools to help you become a better singer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeTools.map((tool) => (
                  <Link 
                    key={tool.id} 
                    to={tool.path}
                    className="group relative flex flex-col bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Decorative gradient blob */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      {toolIcons[tool.id] || <span className="text-3xl">{tool.icon}</span>}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                      Try {tool.shortName} 
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Blog/Guides Section */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Latest Singing Guides</h2>
                  <p className="mt-2 text-gray-600">Expert tips to help you master your voice</p>
                </div>
                <Link to="/blog" className="hidden sm:inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                  View all articles <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {blogArticles.map((article, index) => (
                  <Link key={index} to={`/blog/${article.slug}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link to="/blog" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                  View all articles <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Why SingMeter Section (SEO Content) */}
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Practice with SingMeter?</h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  Singing is a skill that can be learned and improved with the right tools and consistent practice. 
                  SingMeter provides a comprehensive suite of <strong>free online singing tests</strong> and practice tools designed to help vocalists of all levels 
                  visualize their voice and track their progress.
                </p>
                <p className="mb-6">
                  Whether you are a beginner trying to find your vocal range or an advanced singer working on 
                  pitch accuracy, our platform offers immediate visual feedback. This "biofeedback" mechanism is 
                  crucial for ear training, as it bridges the gap between what you hear in your head and the 
                  actual sound you produce.
                </p>
                <p>
                  Our tools run directly in your browser, ensuring privacy and ease of use. 
                  Take a quick <strong>singing test</strong> to analyze your voice type with our <strong>Vocal Range Test</strong>, 
                  or use our <strong>Pitch Detector</strong> to see your exact note in real-time. 
                  SingMeter is your dedicated digital vocal coach available 24/7.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection items={homeFaqItems} />
        </main>

        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">&copy; {new Date().getFullYear()} SingMeter. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-indigo-600 transition">Disclaimer</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;

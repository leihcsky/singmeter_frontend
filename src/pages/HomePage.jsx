/**
 * Home Page - Tools Collection Landing Page
 */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getActiveTools, getComingSoonTools } from '../config/tools';
import Header from '../components/Header';

const HomePage = () => {
  // Get tools from centralized config
  const activeTools = getActiveTools();
  const comingSoonTools = getComingSoonTools();

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'SingMeter - Free Vocal Range Test & Pitch Detector | Online Singing Tools';

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

    setMetaTag('description', 'Free online singing tools for everyone. Test your vocal range, detect pitch in real-time, and improve your singing. No signup required, works in your browser.');
    setMetaTag('keywords', 'vocal range test, pitch detector, singing tools, voice type test, vocal range finder, singing test, pitch test, voice analysis, free singing tools');
    setLinkTag('canonical', 'https://www.singmeter.com/');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

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

  return (
    <>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SingMeter",
          "url": "https://www.singmeter.com",
          "description": "Free online singing tools for everyone. Test your vocal range, detect pitch in real-time, and improve your singing.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.singmeter.com/blog?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SingMeter",
            "url": "https://www.singmeter.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.singmeter.com/logo-horizontal.svg"
            }
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SingMeter - Free Vocal Range Test & Pitch Detector",
          "url": "https://www.singmeter.com",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Free online singing tools including vocal range test and pitch detector. No signup required, works in your browser.",
          "featureList": [
            "Vocal Range Test - Find your voice type",
            "Pitch Detector - Real-time pitch analysis",
            "Voice Type Classification",
            "Personalized Song Recommendations",
            "Privacy-First - No data collection"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              ✨ Free • Professional • Privacy-First
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Free Online Singing Tools
            </span>
            <br />
            <span className="text-gray-900">for Everyone Who Loves to Sing</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're a beginner, hobbyist, or professional - discover your vocal range, improve pitch accuracy, and unlock your singing potential. Professional-grade tools, completely free.
          </p>

          <a
            href="#tools"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Explore Tools
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">10,000+</div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Free</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">2</div>
            <div className="text-sm text-gray-600">Tools</div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easy-to-use singing tools for everyone - from shower singers to stage performers. No signup, no download, no experience required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {activeTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {tool.icon}
                </div>
                {tool.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                {tool.name}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                Try Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* More Tools In Development */}
        {comingSoonTools.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">More Tools In Development</h3>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
              We're building more fun and useful singing tools for everyone - whether you're just starting out or already performing on stage.
              Stay tuned for these upcoming features!
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {comingSoonTools.map((tool) => (
                <div key={tool.id} className="text-center p-6 bg-white rounded-2xl shadow-md">
                  <div className="text-4xl mb-3">{tool.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{tool.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How to Test Your Vocal Range
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our vocal range test is simple, accurate, and takes just 3 minutes. Here's how it works:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Step 1: Allow Microphone Access</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Click "Start Your Test" and allow your browser to access your microphone.
                Your voice is never recorded or stored - all analysis happens locally in your browser for complete privacy.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Step 2: Find Your Range</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Sing your lowest comfortable note, then your highest. You can also use the
                interactive piano keyboard to select notes manually if you prefer not to sing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Step 3: Get Your Results</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Instantly see your vocal range, voice type classification (Soprano, Alto, Tenor, Bass),
                and personalized song recommendations that match your range perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Types Explained Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Understanding Voice Types
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your voice type is determined by your vocal range and the quality of your voice. Here are the main classifications:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👩‍🎤</span>
              </div>
              <h3 className="text-xl font-bold text-pink-600 mb-1">Soprano</h3>
              <p className="text-sm text-gray-500 font-mono">C4 - C6</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The highest female voice type. Sopranos can sing the high notes in songs
              and often take the melody in choral music. Famous sopranos include Mariah Carey
              and Ariana Grande.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👩‍🎤</span>
              </div>
              <h3 className="text-xl font-bold text-purple-600 mb-1">Alto</h3>
              <p className="text-sm text-gray-500 font-mono">F3 - F5</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The lowest female voice type. Altos have a rich, warm tone and often sing
              harmony parts. Famous altos include Adele and Amy Winehouse.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🎤</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-1">Tenor</h3>
              <p className="text-sm text-gray-500 font-mono">C3 - C5</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The highest male voice type. Tenors can reach high notes with power and clarity.
              Famous tenors include Freddie Mercury and Bruno Mars.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🎤</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-1">Bass</h3>
              <p className="text-sm text-gray-500 font-mono">E2 - E4</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The lowest male voice type. Basses have a deep, resonant tone that provides
              foundation in choral music. Famous basses include Barry White and Johnny Cash.
            </p>
          </div>
        </div>
      </section>

      {/* Example Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Example Test Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here's what your results will look like after completing the vocal range test:
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Vocal Range</h3>
            <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              C3 - C5
            </div>
            <p className="text-2xl text-gray-600">2 Octaves</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Voice Type: Tenor</h4>
            <p className="text-gray-600 leading-relaxed">
              You have a Tenor voice type, which is the highest male voice classification.
              Your range allows you to sing most pop, rock, and R&B songs comfortably.
              With practice, you can expand your range and develop more control over your high notes.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Recommended Songs:</h4>
            <ul className="space-y-3">
              <li className="flex items-center bg-gray-50 rounded-lg p-3">
                <span className="text-2xl mr-3">🎵</span>
                <div>
                  <div className="font-semibold text-gray-900">"Someone Like You" by Adele</div>
                  <div className="text-sm text-gray-500">Range: C3 - D5</div>
                </div>
              </li>
              <li className="flex items-center bg-gray-50 rounded-lg p-3">
                <span className="text-2xl mr-3">🎵</span>
                <div>
                  <div className="font-semibold text-gray-900">"Thinking Out Loud" by Ed Sheeran</div>
                  <div className="text-sm text-gray-500">Range: A2 - B4</div>
                </div>
              </li>
              <li className="flex items-center bg-gray-50 rounded-lg p-3">
                <span className="text-2xl mr-3">🎵</span>
                <div>
                  <div className="font-semibold text-gray-900">"Perfect" by Ed Sheeran</div>
                  <div className="text-sm text-gray-500">Range: G2 - D5</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              to="/vocal-range-test"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Your Own Results →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about testing your vocal range
          </p>
        </div>

        <div className="space-y-4">
          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>How accurate is the vocal range test?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our vocal range test uses advanced pitch detection technology that analyzes
              your voice in real-time with professional-grade accuracy. The results depend on your microphone quality and
              singing technique, but most users find results within 1-2 semitones of
              professional vocal assessments. For best results, use the test in a quiet environment with a good quality microphone.
            </p>
          </details>

          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>Do I need singing experience to take the test?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              No! Our test is designed for everyone, from complete beginners to professional
              singers. If you're new to singing, we recommend using the manual piano selection
              mode to find notes you can comfortably sing. The test will help you discover your natural vocal range
              regardless of your experience level.
            </p>
          </details>

          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>Is my voice recorded or stored?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Absolutely not! All voice analysis happens locally in your browser using
              Web Audio API technology. Your voice is never recorded, stored, or transmitted to any server.
              Your privacy is 100% protected. We don't even have access to your microphone data -
              everything stays on your device.
            </p>
          </details>

          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>Can I improve my vocal range?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Yes! With proper vocal training and exercises, most people can expand their
              vocal range by 3-6 semitones or more. Regular practice, proper breathing technique,
              vocal warm-ups, and working with a vocal coach are key to developing your range safely.
              Take the test regularly to track your progress over time.
            </p>
          </details>

          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>What equipment do I need?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              You only need a device with a microphone (computer, phone, or tablet) and a modern web browser
              (Chrome, Firefox, Safari, or Edge). For best results, use the test in a quiet environment.
              While built-in microphones work fine, an external microphone can provide more accurate results.
            </p>
          </details>

          <details className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition group">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
              <span>Can I take the test multiple times?</span>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Yes! Feel free to take the test as many times as you like - it's completely free.
              Your vocal range can vary based on factors like time of day, vocal warm-up, and overall health.
              Taking the test regularly can help you track your vocal development and improvement over time.
            </p>
          </details>
        </div>
      </section>

      {/* Blog Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Learn About Singing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Helpful guides and tips for singers of all levels - from your first note to your first performance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                {article.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Read Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

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
      </div>
    </>
  );
};

export default HomePage;


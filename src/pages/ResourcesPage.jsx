/**
 * Resources Page - Curated resources for singers
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LearnHubNav from '../components/LearnHubNav';
import { bookReviews } from '../resources/bookReviews';
import { videoPicks } from '../resources/videoPicks';

const ResourcesPage = () => {
  useEffect(() => {
    document.title = 'Singing Resources - Tools, Books & Videos | SingMeter';

    const setMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
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

    setMetaTag(
      'description',
      'Discover the best singing resources including tools, books, videos, and apps. Curated recommendations to help you improve your vocal skills and advance your singing journey.'
    );
    setMetaTag(
      'keywords',
      'singing resources, vocal training tools, singing books, vocal exercises, singing apps, music resources, voice training resources'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/resources');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const singmeterTools = [
    {
      id: 'vocal-range-test',
      name: 'Vocal Range Test',
      category: 'Testing Tools',
      description: 'Discover your voice type and range in minutes. Get song ideas that fit your comfortable notes.',
      pros: ['100% free', 'No signup required', 'Privacy-first', 'Instant results'],
      cons: ['Requires microphone'],
      bestFor: 'All singers',
      link: '/vocal-range-test',
    },
    {
      id: 'pitch-detector',
      name: 'Pitch Detector',
      category: 'Practice Tools',
      description: 'Real-time pitch feedback while you sing. Practice staying in tune with a live visual display.',
      pros: ['Real-time feedback', 'Free', 'Works in browser', 'No installation'],
      cons: ['Requires microphone'],
      bestFor: 'Pitch training',
      link: '/pitch-detector',
    },
    {
      id: 'tone-generator',
      name: 'Tone Generator',
      category: 'Practice Tools',
      description: 'Reference tones for ear training, warm-ups, and pitch matching. Adjustable frequency and waveforms.',
      pros: ['Adjustable frequency', 'Multiple waveforms', 'Free', 'No microphone needed'],
      cons: ['Requires speakers or headphones'],
      bestFor: 'Ear training & reference pitches',
      link: '/tone-generator',
    },
    {
      id: 'metronome',
      name: 'Metronome',
      category: 'Practice Tools',
      description: 'Keep steady time for scales, exercises, and songs. Adjustable BPM and time signatures in the browser.',
      pros: ['Adjustable BPM', 'Multiple time signatures', 'Free', 'Visual & audio beats'],
      cons: ['Requires speakers or headphones'],
      bestFor: 'Rhythm & timing practice',
      link: '/metronome',
    },
    {
      id: 'song-key-finder',
      name: 'Song Key Finder',
      category: 'Analysis Tools',
      description: 'Browse sample songs by key and genre, filter for your range, and plan transposition before you practice.',
      pros: ['Key & transpose hints', 'Free', 'Pairs with range test', 'No install'],
      cons: ['Sample library, not every song'],
      bestFor: 'Choosing keys for repertoire',
      link: '/song-key-finder',
    },
  ];

  const mobileApps = [
    {
      id: 'yousician',
      name: 'Yousician',
      category: 'Learning',
      description: 'Interactive music learning app with vocal courses. Structured lessons and real-time feedback on phone or tablet.',
      pros: ['Interactive lessons', 'Real-time feedback', 'Structured courses', 'Progress tracking'],
      cons: ['Premium subscription required'],
      bestFor: 'Structured learning',
      link: 'https://apps.apple.com/us/app/yousician-learn-guitar-piano-bass/id959883039',
    },
    {
      id: 'smule',
      name: 'Smule',
      category: 'Practice',
      description: 'Karaoke app with a large song library. Sing along for fun practice when you are away from your desk.',
      pros: ['Huge song library', 'Social features', 'Free version', 'Fun and engaging'],
      cons: ['Premium features paid', 'Internet required'],
      bestFor: 'Practice and fun',
      link: 'https://www.smule.com/',
    },
    {
      id: 'voice-memos',
      name: 'Voice Memos',
      category: 'Recording',
      description: 'Built-in iOS recorder for capturing takes and comparing progress over weeks.',
      pros: ['Built-in iOS app', 'High quality', 'Easy to use', 'Free'],
      cons: ['iOS only', 'Basic features'],
      bestFor: 'Practice recording',
      link: 'https://apps.apple.com/us/app/voice-memos/id1069512134',
    },
    {
      id: 'pro-metronome',
      name: 'Pro Metronome',
      category: 'Practice',
      description:
        'Offline metronome when you practice without a browser. For everyday rhythm work on SingMeter, use our free web metronome instead.',
      pros: ['Very accurate', 'Highly customizable', 'Multiple time signatures', 'Works offline'],
      cons: ['Premium features paid', 'Separate from SingMeter'],
      bestFor: 'Offline rhythm practice',
      link: 'https://apps.apple.com/us/app/pro-metronome/id477960671',
      singmeterAlternative: '/metronome',
    },
    {
      id: 'pitchlab-lite',
      name: 'PitchLab Lite',
      category: 'Reference',
      description:
        'Handy chromatic tuner for quick pitch checks. For sustained singing feedback, use our Pitch Detector in the browser.',
      pros: ['Very accurate', 'Visual display', 'Free', 'Portable tuner'],
      cons: ['Ads in free version', 'Not built for long vocal phrases'],
      bestFor: 'Quick pitch checks',
      link: 'https://apps.apple.com/us/app/pitchlab-lite/id389225271',
      singmeterAlternative: '/pitch-detector',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">Resources</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Singing Resources
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Curated tools, books, videos, and apps—with editor notes on why we recommend each pick and how to use
            them with SingMeter.
          </p>
          <LearnHubNav className="max-w-3xl mx-auto justify-center" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Link
            to="/tutorials"
            className="bg-white rounded-xl p-5 border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition text-center"
          >
            <span className="text-2xl">🎯</span>
            <h2 className="font-bold text-gray-900 mt-2">Practice tutorials</h2>
            <p className="text-sm text-gray-600 mt-1">Step-by-step lessons with our tools</p>
          </Link>
          <div className="bg-indigo-50 rounded-xl p-5 border-2 border-indigo-200 text-center">
            <span className="text-2xl">📚</span>
            <h2 className="font-bold text-gray-900 mt-2">You are here</h2>
            <p className="text-sm text-gray-600 mt-1">Reviews & external picks</p>
          </div>
          <Link
            to="/blog"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition text-center"
          >
            <span className="text-2xl">📝</span>
            <h2 className="font-bold text-gray-900 mt-2">Blog guides</h2>
            <p className="text-sm text-gray-600 mt-1">Deep dives on technique</p>
          </Link>
        </div>

        {/* SingMeter tools — third-party picks live in Mobile Apps only */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">SingMeter Tools</h2>
              <p className="text-gray-600">Free browser tools on this site—no install required</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {singmeterTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                    <span className="text-sm text-gray-500">{tool.category}</span>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    Free on SingMeter
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Pros</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tool.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠ Cons</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tool.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600"><strong>Best for:</strong> {tool.bestFor}</span>
                  <Link
                    to={tool.link}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    Try now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section id="books" className="mb-16 scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Book reviews</h2>
              <p className="text-gray-600">
                Full editor reviews—not Amazon search links. Who each book is for and how to use it with SingMeter.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookReviews.map((book) => (
              <article key={book.slug} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Editor review</p>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-4">{book.summary}</p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Best for:</strong> {book.bestFor}
                </p>
                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-100">
                  <Link
                    to={`/resources/books/${book.slug}`}
                    className="text-indigo-600 font-semibold text-sm hover:underline"
                  >
                    Read full review →
                  </Link>
                  <a
                    href={book.amazonUrl}
                    className="text-gray-500 text-sm hover:text-indigo-600"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    Amazon
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎥</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Video picks</h2>
              <p className="text-gray-600">
                Editor notes on YouTube channels we trust—each with why we recommend it and how to pair it with SingMeter
                tutorials (no generic search links).
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoPicks.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{video.duration}</span>
                  <span className="text-sm text-gray-600"><strong>Best for:</strong> {video.bestFor}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{video.description}</p>
                {video.whyRecommend && (
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-900">Why we recommend it:</strong> {video.whyRecommend}
                  </p>
                )}
                {video.singmeterPairing && (
                  <p className="text-sm text-indigo-900 bg-indigo-50 rounded-lg p-3 mb-3">
                    <strong>With SingMeter:</strong> {video.singmeterPairing}
                  </p>
                )}
                {video.notIdealFor && (
                  <p className="text-xs text-gray-500 mb-3">
                    <strong>Not ideal for:</strong> {video.notIdealFor}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    href={video.link}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube →
                  </a>
                  {video.tutorialLink && (
                    <Link to={video.tutorialLink} className="text-indigo-600 hover:underline text-sm font-semibold">
                      Our practice tutorial →
                    </Link>
                  )}
                  {video.blogLink && (
                    <Link to={video.blogLink} className="text-indigo-600 hover:underline text-sm font-semibold">
                      Full article →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Third-party apps — each listed once (not duplicated under SingMeter Tools) */}
        <section id="apps" className="mb-16 scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Mobile Apps</h2>
              <p className="text-gray-600">
                Third-party apps for learning, karaoke, and offline practice—we list each pick once here, not under
                SingMeter Tools above.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileApps.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                    <span className="text-sm text-gray-500">{app.category}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{app.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-xs font-semibold text-green-700 mb-1">✓ Pros</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {app.pros.slice(0, 2).map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-orange-700 mb-1">⚠ Cons</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {app.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-600"><strong>Best for:</strong> {app.bestFor}</span>
                  <div className="flex flex-wrap gap-3">
                    {app.singmeterAlternative && (
                      <Link
                        to={app.singmeterAlternative}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs"
                      >
                        Use SingMeter instead →
                      </Link>
                    )}
                    <a
                      href={app.link}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      App store / site →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Vocal Journey</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            Use our free tools to test your vocal range and improve your pitch accuracy. No signup required!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/vocal-range-test"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
            >
              Test Your Vocal Range
            </Link>
            <Link
              to="/pitch-detector"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Try Pitch Detector
            </Link>
            <Link
              to="/tone-generator"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Tone Generator
            </Link>
            <Link
              to="/metronome"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Metronome
            </Link>
            <Link
              to="/song-key-finder"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Song Key Finder
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResourcesPage;

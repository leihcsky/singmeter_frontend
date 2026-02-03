/**
 * Resources Page - Curated resources for singers
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ContentSection from '../components/ContentSection';

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

  const tools = [
    {
      name: 'SingMeter Vocal Range Test',
      category: 'Testing Tools',
      description: 'Our free online vocal range test helps you discover your voice type and range. Get instant results with personalized song recommendations.',
      pros: ['100% free', 'No signup required', 'Privacy-first', 'Instant results'],
      cons: ['Requires microphone'],
      bestFor: 'All singers',
      link: '/vocal-range-test',
      internal: true
    },
    {
      name: 'SingMeter Pitch Detector',
      category: 'Practice Tools',
      description: 'Real-time pitch detection tool to improve your singing accuracy. See your pitch in real-time and practice staying in tune.',
      pros: ['Real-time feedback', 'Free', 'Works in browser', 'No installation'],
      cons: ['Requires microphone'],
      bestFor: 'Pitch training',
      link: '/pitch-detector',
      internal: true
    },
    {
      name: 'Yousician',
      category: 'Practice Tools',
      description: 'Interactive music learning app with vocal courses. Provides real-time feedback and structured lessons for all levels.',
      pros: ['Interactive lessons', 'Real-time feedback', 'Structured courses', 'Multiple instruments'],
      cons: ['Premium subscription required'],
      bestFor: 'All levels',
      link: 'https://apps.apple.com/us/app/yousician-learn-guitar-piano-bass/id959883039',
      internal: false
    },
    {
      name: 'Smule',
      category: 'Practice Tools',
      description: 'Popular karaoke app where you can sing along with millions of songs. Great for practice and fun.',
      pros: ['Huge song library', 'Social features', 'Free version', 'Fun and engaging'],
      cons: ['Premium features paid', 'Internet required'],
      bestFor: 'Practice and fun',
      link: 'https://www.smule.com/',
      internal: false
    },
    {
      name: 'Voice Memos',
      category: 'Recording Tools',
      description: 'Built-in iOS voice recording app. Simple and reliable for capturing practice sessions and tracking progress.',
      pros: ['Built-in iOS app', 'High quality', 'Easy to use', 'Free'],
      cons: ['iOS only', 'Basic features'],
      bestFor: 'Practice recording',
      link: 'https://apps.apple.com/us/app/voice-memos/id1069512134',
      internal: false
    }
  ];

  const books = [
    {
      title: 'The Singing Book',
      author: 'Meribeth Bunch Dayme and Cynthia Vaughn',
      description: 'Comprehensive guide covering vocal technique, anatomy, and performance. Excellent for beginners and intermediate singers.',
      pros: ['Comprehensive', 'Well-illustrated', 'Includes exercises', 'CD included'],
      cons: ['Can be technical'],
      bestFor: 'Serious students',
      link: 'https://www.amazon.com/s?k=The+Singing+Book+Meribeth+Dayme&i=stripbooks'
    },
    {
      title: 'Set Your Voice Free',
      author: 'Roger Love',
      description: 'Practical vocal training guide from a renowned voice coach. Focuses on technique and performance.',
      pros: ['Practical approach', 'Easy to follow', 'Performance tips', 'Well-written'],
      cons: ['Less technical detail'],
      bestFor: 'All levels',
      link: 'https://www.amazon.com/Set-Your-Voice-Free-Speaking/dp/031631126X'
    },
    {
      title: 'The Complete Idiot\'s Guide to Singing',
      author: 'Phyllis Fulford and Michael Miller',
      description: 'Beginner-friendly guide to singing basics. Great starting point for new singers.',
      pros: ['Very accessible', 'Beginner-friendly', 'Clear explanations', 'Affordable'],
      cons: ['Less depth'],
      bestFor: 'Beginners',
      link: 'https://www.amazon.com/s?k=Complete+Idiot%27s+Guide+to+Singing+Phyllis+Fulford&i=stripbooks'
    },
    {
      title: 'Vocal Technique: A Guide for Conductors, Teachers, and Singers',
      author: 'Janet Radcliffe',
      description: 'Technical guide to vocal anatomy and technique. Best for teachers and serious students.',
      pros: ['Very detailed', 'Scientific approach', 'Comprehensive', 'Professional level'],
      cons: ['Can be dense', 'Not for beginners'],
      bestFor: 'Teachers and advanced students',
      link: 'https://www.amazon.com/s?k=Vocal+Technique+Janet+Radcliffe&i=stripbooks'
    },
    {
      title: 'The Contemporary Singer',
      author: 'Anne Peckham',
      description: 'Modern approach to vocal training with focus on contemporary styles. Includes exercises and techniques.',
      pros: ['Modern approach', 'Contemporary focus', 'Includes exercises', 'CD included'],
      cons: ['Less classical focus'],
      bestFor: 'Contemporary singers',
      link: 'https://www.amazon.com/s?k=The+Contemporary+Singer+Anne+Peckham&i=stripbooks'
    }
  ];

  const videos = [
    {
      title: 'Vocal Warm-Up Routine',
      creator: 'Eric Arceneaux',
      description: 'Complete 15-minute vocal warm-up routine suitable for all voice types. Perfect for daily practice.',
      duration: '15 min',
      bestFor: 'Daily practice',
      link: 'https://www.youtube.com/c/EricArceneaux'
    },
    {
      title: 'Breathing Techniques for Singers',
      creator: 'New York Vocal Coaching',
      description: 'In-depth tutorial on diaphragmatic breathing and breath support. Essential foundation for good singing.',
      duration: '20 min',
      bestFor: 'Beginners',
      link: 'https://www.youtube.com/user/NewYorkVocalCoaching'
    },
    {
      title: 'How to Sing High Notes',
      creator: 'Ken Tamplin Vocal Academy',
      description: 'Advanced techniques for expanding your range and singing high notes safely. Includes exercises.',
      duration: '30 min',
      bestFor: 'Intermediate/Advanced',
      link: 'https://www.youtube.com/results?search_query=Ken+Tamplin+how+to+sing+high+notes'
    },
    {
      title: 'Pitch Accuracy Training',
      creator: 'Singing Success',
      description: 'Exercises and techniques to improve your pitch accuracy. Great for singers who struggle with staying in tune.',
      duration: '25 min',
      bestFor: 'Pitch training',
      link: 'https://www.youtube.com/c/SingingSuccess'
    },
    {
      title: 'Vocal Health Tips',
      creator: 'Dr. Dan\'s Voice Essentials',
      description: 'Essential tips for maintaining vocal health. Learn how to protect your voice and avoid strain.',
      duration: '18 min',
      bestFor: 'All singers',
      link: 'https://www.youtube.com/results?search_query=Dr+Dan+Voice+Essentials+vocal+health'
    }
  ];

  const apps = [
    {
      name: 'Yousician',
      category: 'Learning',
      description: 'Interactive music learning app with vocal courses. Provides real-time feedback and structured lessons.',
      pros: ['Interactive lessons', 'Real-time feedback', 'Structured courses', 'Progress tracking'],
      cons: ['Premium subscription required'],
      bestFor: 'Structured learning',
      link: 'https://apps.apple.com/us/app/yousician-learn-guitar-piano-bass/id959883039'
    },
    {
      name: 'Smule',
      category: 'Practice',
      description: 'Popular karaoke app with millions of songs. Sing along and practice with your favorite tracks.',
      pros: ['Huge song library', 'Social features', 'Free version', 'Fun and engaging'],
      cons: ['Premium features paid', 'Internet required'],
      bestFor: 'Practice and fun',
      link: 'https://www.smule.com/'
    },
    {
      name: 'Voice Memos',
      category: 'Recording',
      description: 'Built-in iOS voice recording app. Simple and reliable for capturing practice sessions and tracking progress.',
      pros: ['Built-in iOS app', 'High quality', 'Easy to use', 'Free'],
      cons: ['iOS only', 'Basic features'],
      bestFor: 'Practice recording',
      link: 'https://apps.apple.com/us/app/voice-memos/id1069512134'
    },
    {
      name: 'Pro Metronome',
      category: 'Practice',
      description: 'Professional metronome app with customizable tempo and time signatures. Essential for rhythm training.',
      pros: ['Very accurate', 'Highly customizable', 'Multiple time signatures', 'Free version'],
      cons: ['Premium features paid'],
      bestFor: 'Rhythm practice',
      link: 'https://apps.apple.com/us/app/pro-metronome/id477960671'
    },
    {
      name: 'PitchLab Lite',
      category: 'Reference',
      description: 'Accurate chromatic tuner for pitch reference. Great for checking pitch accuracy and tuning instruments.',
      pros: ['Very accurate', 'Visual display', 'Free', 'Multiple instruments'],
      cons: ['Ads in free version'],
      bestFor: 'Pitch reference',
      link: 'https://apps.apple.com/us/app/pitchlab-lite/id389225271'
    }
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
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Singing Resources
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover curated tools, books, videos, and apps to enhance your vocal training journey.
          </p>
        </div>

        {/* Tools Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Recommended Tools</h2>
              <p className="text-gray-600">Essential tools for vocal training and practice</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-md border-2 ${
                  tool.internal ? 'border-indigo-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                    <span className="text-sm text-gray-500">{tool.category}</span>
                  </div>
                  {tool.internal && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      Our Tool
                    </span>
                  )}
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
                  {tool.internal ? (
                    <Link
                      to={tool.link}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                    >
                      Try Now →
                    </Link>
                  ) : (
                    <a
                      href={tool.link}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Recommended Books</h2>
              <p className="text-gray-600">Essential reading for vocal students and teachers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {books.map((book, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                <p className="text-gray-600 mb-4 leading-relaxed">{book.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Pros</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {book.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠ Cons</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {book.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600"><strong>Best for:</strong> {book.bestFor}</span>
                  <a
                    href={book.link}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find on Amazon →
                  </a>
                </div>
              </div>
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
              <h2 className="text-3xl font-bold text-gray-900">Video Tutorials</h2>
              <p className="text-gray-600">Top YouTube channels and video lessons for vocal training</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{video.duration}</span>
                  <span className="text-sm text-gray-600"><strong>Best for:</strong> {video.bestFor}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {video.creator}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{video.description}</p>
                <a
                  href={video.link}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Apps Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Mobile Apps</h2>
              <p className="text-gray-600">Useful apps for practice and training on the go</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
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
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600"><strong>Best for:</strong> {app.bestFor}</span>
                  <a
                    href={app.link}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download →
                  </a>
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2026 SingMeter. All rights reserved.</p>
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
  );
};

export default ResourcesPage;

/**
 * Tutorials hub — step-by-step practice lessons (not blog reposts).
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { tutorialIndex, tutorialTracks } from '../tutorials';
import LearnHubNav from '../components/LearnHubNav';

const TutorialsPage = () => {
  useEffect(() => {
    document.title = 'Vocal Practice Tutorials - Step-by-Step Guides | SingMeter';

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
      `${tutorialIndex.length} hands-on singing tutorials with SingMeter tools: vocal range test, pitch calibration, transposition, warm-ups, and ear training. Practice steps, not blog reposts.`
    );
    setMetaTag(
      'keywords',
      'vocal practice tutorials, singing exercises, vocal range tutorial, pitch training steps, SingMeter guides'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/tutorials');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const tutorialBySlug = Object.fromEntries(tutorialIndex.map((t) => [t.slug, t]));

  const levelBadge = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">Tutorials</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Practice Tutorials</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Step-by-step lessons you do with SingMeter tools—timed exercises, tool settings, and self-checks.
          </p>
          <LearnHubNav className="max-w-3xl mx-auto justify-center mb-6" />
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>
              <strong className="text-gray-900">{tutorialIndex.length}</strong> practice tutorials
            </span>
            <span>·</span>
            <span>10–20 min each</span>
            <span>·</span>
            <span>4 learning tracks</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200 text-center">
            <p className="text-xs font-bold text-indigo-600 uppercase">Hub</p>
            <p className="font-bold text-gray-900 mt-1">Tutorials (active)</p>
          </div>
          <Link
            to="/resources#books"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:border-indigo-200 text-center transition"
          >
            <p className="text-xs font-bold text-gray-500 uppercase">Reviews</p>
            <p className="font-bold text-gray-900 mt-1">Book reviews →</p>
          </Link>
          <Link
            to="/blog"
            className="bg-white rounded-xl p-4 border border-gray-100 hover:border-indigo-200 text-center transition"
          >
            <p className="text-xs font-bold text-gray-500 uppercase">Theory</p>
            <p className="font-bold text-gray-900 mt-1">Blog guides →</p>
          </Link>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-12 max-w-3xl mx-auto rounded-r-lg text-left">
          <p className="text-sm text-gray-800">
            <strong>New format:</strong> Each tutorial is a full lesson on its own page. Blog articles explain concepts;
            tutorials tell you exactly what to open, what settings to use, and what to do minute by minute.
          </p>
        </div>

        {tutorialTracks.map((track) => (
          <section key={track.id} className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{track.title}</h2>
              <p className="text-gray-600 mt-2">{track.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {track.slugs.map((slug, order) => {
                const tutorial = tutorialBySlug[slug];
                if (!tutorial) return null;
                return (
                  <Link
                    key={slug}
                    to={`/tutorials/${slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${levelBadge[tutorial.level] || 'bg-gray-100'}`}
                      >
                        {tutorial.level}
                      </span>
                      <span className="text-xs font-bold text-indigo-500">#{order + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                      {tutorial.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{tutorial.duration}</span>
                      <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Start
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended order</h2>
          <ol className="space-y-3">
            {tutorialIndex.map((t, i) => (
              <li key={t.slug} className="flex items-start gap-3 text-gray-700">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <Link to={`/tutorials/${t.slug}`} className="font-semibold text-indigo-600 hover:underline">
                    {t.title}
                  </Link>
                  <span className="text-gray-500 text-sm"> — {t.duration}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">Open the tools</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Tutorials reference these pages directly. Bookmark the ones you use most.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/vocal-range-test"
              className="px-5 py-2.5 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition text-sm"
            >
              Vocal Range Test
            </Link>
            <Link
              to="/pitch-detector"
              className="px-5 py-2.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition text-sm"
            >
              Pitch Detector
            </Link>
            <Link
              to="/song-key-finder"
              className="px-5 py-2.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition text-sm"
            >
              Song Key Finder
            </Link>
            <Link
              to="/tone-generator"
              className="px-5 py-2.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition text-sm"
            >
              Tone Generator
            </Link>
            <Link
              to="/metronome"
              className="px-5 py-2.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition text-sm"
            >
              Metronome
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning hub</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Tutorials = do; blog = understand; resources = curated books & apps with our reviews.
          </p>
          <LearnHubNav />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialsPage;

/**
 * Tutorials hub — step-by-step practice lessons (not blog reposts).
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { tutorialIndex } from '../tutorials';
import { FLAGSHIP_TUTORIALS } from '../data/flagshipTutorials';

const FLAGSHIP_SLUGS = new Set(FLAGSHIP_TUTORIALS.map((t) => t.slug));

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
  const moreTutorials = tutorialIndex.filter((t) => !FLAGSHIP_SLUGS.has(t.slug));

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

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Practice Tutorials</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step lessons you do with SingMeter tools—timed exercises, tool settings, and self-checks.
          </p>
        </div>

        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Start here</h2>
          <p className="text-gray-600 mb-6">Three guided sessions, in order. Each one takes 10–15 minutes.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {FLAGSHIP_TUTORIALS.map((flagship, i) => {
              const tutorial = tutorialBySlug[flagship.slug];
              if (!tutorial) return null;
              return (
                <Link
                  key={flagship.slug}
                  to={`/tutorials/${flagship.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-gray-500">{tutorial.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                    {tutorial.excerpt}
                  </p>
                  <span className="text-sm text-indigo-600 font-semibold">Start →</span>
                </Link>
              );
            })}
          </div>
        </section>

        {moreTutorials.length > 0 && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">More practice</h2>
            <p className="text-gray-600 text-sm mb-5">
              Focused sessions for specific skills, once the three above feel routine.
            </p>
            <ul className="divide-y divide-gray-100">
              {moreTutorials.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/tutorials/${t.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                      {t.title}
                    </span>
                    <span className="text-sm text-gray-500 shrink-0">{t.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TutorialsPage;

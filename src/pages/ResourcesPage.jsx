/**
 * Resources Page — editor reviews + a few trusted external picks.
 * Kept lean for AdSense: no third-party app directories, limited video list.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LearnHubNav from '../components/LearnHubNav';
import { bookReviews } from '../resources/bookReviews';
import { videoPicks } from '../resources/videoPicks';
import { tools } from '../config/tools';

const ResourcesPage = () => {
  useEffect(() => {
    document.title = 'Singing Resources - Book Reviews & Editor Picks | SingMeter';

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
      'SingMeter editor book reviews and two trusted video picks—with notes on who each is for and how to pair them with our free practice tools. Not an app or link directory.'
    );
    setMetaTag(
      'keywords',
      'singing book reviews, vocal training books, singing practice resources, singmeter editor picks'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/resources');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">Resources</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Singing Resources</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Editor book reviews and a small set of trusted video picks—each with who it is for and how to use it with
            SingMeter. For step-by-step practice, use our tutorials and blog guides.
          </p>
          <LearnHubNav className="max-w-3xl mx-auto justify-center" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Link
            to="/tutorials"
            className="bg-white rounded-xl p-5 border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition text-center"
          >
            <h2 className="font-bold text-gray-900">Practice tutorials</h2>
            <p className="text-sm text-gray-600 mt-1">Step-by-step lessons with our tools</p>
          </Link>
          <div className="bg-indigo-50 rounded-xl p-5 border-2 border-indigo-200 text-center">
            <h2 className="font-bold text-gray-900">You are here</h2>
            <p className="text-sm text-gray-600 mt-1">Reviews &amp; editor picks</p>
          </div>
          <Link
            to="/blog"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition text-center"
          >
            <h2 className="font-bold text-gray-900">Blog guides</h2>
            <p className="text-sm text-gray-600 mt-1">Deep dives on technique</p>
          </Link>
        </div>

        {/* Books first — original editorial content */}
        <section id="books" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Book reviews</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Full editor reviews written for home singers—who each title helps, honest limits, and a SingMeter practice
              pairing. Not a search-results or affiliate dump.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookReviews.map((book) => (
              <article
                key={book.slug}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col"
              >
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

        {/* Two video picks only */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Two video picks we trust</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              We keep this list short on purpose. Watch after you have a SingMeter drill planned—not instead of
              practicing with feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {videoPicks.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Best for:</strong> {video.bestFor}
                </p>
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
                      Related guide →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compact own-tools strip — not a third-party directory */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Practice on SingMeter</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Free browser tools on this site. No install, no signup—audio stays on your device for mic-based tools.
            </p>
          </div>
          <ul className="bg-white rounded-2xl border border-indigo-100 divide-y divide-gray-100 shadow-sm">
            {tools.map((tool) => (
              <li key={tool.id}>
                <Link
                  to={tool.path}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4 hover:bg-indigo-50/60 transition"
                >
                  <span className="font-semibold text-gray-900">{tool.name}</span>
                  <span className="text-sm text-gray-600 sm:text-right sm:max-w-md">{tool.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Looking for offline phone apps? We do not maintain an app directory. Prefer our free web tools above, or
            start with a{' '}
            <Link to="/tutorials" className="text-indigo-600 hover:underline font-medium">
              practice tutorial
            </Link>
            .
          </p>
        </section>

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prefer guided practice?</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            Tutorials and blog guides are where SingMeter adds the most original value—step-by-step sessions with tool
            feedback.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/tutorials"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
            >
              Browse tutorials
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Read guides
            </Link>
            <Link
              to="/vocal-range-test"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Vocal Range Test
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;

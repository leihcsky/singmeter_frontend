/**
 * Resources Page — original editor book reviews only.
 * Kept lean for AdSense: no third-party app, channel, or video directories.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LearnHubNav from '../components/LearnHubNav';
import { bookReviews } from '../resources/bookReviews';
import { tools } from '../config/tools';

const ResourcesPage = () => {
  useEffect(() => {
    document.title = 'Singing Book Reviews by SingMeter Editors | SingMeter';

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
      'Full SingMeter editor reviews of singing books—who each title is for, honest limits, and how to pair it with home practice. Not an app or link directory.'
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
            <li className="text-gray-900 font-medium">Book reviews</li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Singing Book Reviews</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Full editor reviews written for home singers—who each title helps, where it falls short, and how to pair
            it with practice. For step-by-step sessions, use our tutorials and singing guides.
          </p>
          <LearnHubNav className="max-w-3xl mx-auto justify-center" />
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

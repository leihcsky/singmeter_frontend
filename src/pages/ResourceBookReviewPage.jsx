/**
 * Full editorial book review — /resources/books/:slug
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getBookBySlug, bookReviews } from '../resources/bookReviews';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TITLE_BRAND = ' | SingMeter';

const ResourceBookReviewPage = () => {
  const { slug } = useParams();
  const book = getBookBySlug(slug);

  if (!book) {
    return <Navigate to="/resources" replace />;
  }

  const others = bookReviews.filter((b) => b.slug !== book.slug).slice(0, 2);

  useEffect(() => {
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const title = `${book.seoTitle}${TITLE_BRAND}`;
    document.title = title;
    setMeta('description', book.seoDescription);
    setLink('canonical', `https://www.singmeter.com/resources/books/${book.slug}`);

    return () => {
      document.title = 'SingMeter';
    };
  }, [book]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/resources" className="hover:text-indigo-600">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <Link to="/resources#books" className="hover:text-indigo-600">
            Books
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{book.title}</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-2">Book review</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            by {book.author}
            {book.year && <span className="text-gray-400"> · {book.year}</span>}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">{book.summary}</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why we recommend it</h2>
            <p className="text-gray-600 leading-relaxed">{book.whyRecommend}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h3 className="font-bold text-green-900 mb-2">Best for</h3>
              <p className="text-sm text-green-800">{book.bestFor}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">Not ideal for</h3>
              <p className="text-sm text-amber-800">{book.notIdealFor}</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Read this book if…</h2>
            <p className="text-gray-600 leading-relaxed">{book.readIf}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pair with SingMeter</h2>
            <p className="text-sm text-gray-600 mb-4">
              Books explain ideas; tools give feedback. A simple weekly loop:
            </p>
            <ul className="space-y-3">
              {book.singmeterPairing.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-semibold text-indigo-600 hover:underline">
                    {item.label}
                  </Link>
                  <span className="text-sm text-gray-600"> — {item.hint}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-bold text-green-700 mb-2">Pros</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {book.pros.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-orange-700 mb-2">Cons</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {book.cons.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Alternatives</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {book.alternatives.map((alt) => (
                <li key={alt.title}>
                  {alt.slug ? (
                    <Link to={`/resources/books/${alt.slug}`} className="text-indigo-600 font-semibold hover:underline">
                      {alt.title}
                    </Link>
                  ) : alt.to ? (
                    <Link to={alt.to} className="text-indigo-600 font-semibold hover:underline">
                      {alt.title}
                    </Link>
                  ) : (
                    <span className="font-semibold text-gray-800">{alt.title}</span>
                  )}
                  {' — '}
                  {alt.note}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              View on Amazon →
            </a>
            <Link to="/resources#books" className="inline-flex px-5 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-sm">
              All book reviews
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Amazon links may earn a commission at no extra cost to you. We only review books we believe help singers
            practice better with our tools.
          </p>
        </article>

        {others.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">More reviews</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((b) => (
                <Link
                  key={b.slug}
                  to={`/resources/books/${b.slug}`}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-indigo-200 transition"
                >
                  <h3 className="font-bold text-gray-900">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.author}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ResourceBookReviewPage;

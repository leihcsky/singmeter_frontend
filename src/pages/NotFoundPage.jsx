/**
 * Site-wide 404 — used by catch-all route and as the visual model for public/404.html.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { setCanonicalHref } from '../seo/applyRouteSeo';
import { setMetaTag } from '../seo/domHead';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found (404) | SingMeter';
    setMetaTag('description', 'This page does not exist on SingMeter. Browse free singing tools, tutorials, or the vocal training blog.');
    setMetaTag('robots', 'noindex, follow');
    setCanonicalHref(`https://www.singmeter.com${window.location.pathname.replace(/\/+$/, '') || ''}`);

    return () => {
      document.title = 'SingMeter';
      setMetaTag('robots', 'index, follow');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm font-semibold text-indigo-600 mb-2">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          This URL is not a SingMeter page. It may have been removed, or the link is incorrect.
          Try the home page, blog, or a free practice tool.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition"
          >
            Blog
          </Link>
          <Link
            to="/vocal-range-test"
            className="inline-flex items-center px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition"
          >
            Vocal Range Test
          </Link>
        </div>
      </main>
      <Footer variant="muted" />
    </div>
  );
};

export default NotFoundPage;

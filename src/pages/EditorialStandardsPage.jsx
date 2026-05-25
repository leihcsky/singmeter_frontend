/**
 * Editorial standards — E-E-A-T trust signals for SingMeter content
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditorialStandardsPage = () => {
  useEffect(() => {
    document.title = 'Editorial Standards - How SingMeter Writes & Reviews | SingMeter';

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
      'How SingMeter creates tutorials, blog articles, book reviews, and tool guidance. Our editorial process, limitations, affiliate disclosure, and update policy.'
    );
    setMetaTag(
      'keywords',
      'singmeter editorial standards, content policy, book review disclosure, vocal education editorial'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/editorial-standards');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-gray-400">
              /
            </li>
            <li className="text-gray-900 font-medium">Editorial Standards</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Editorial Standards</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: May 22, 2026</p>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="leading-relaxed mb-6">
                SingMeter is a practice platform: free browser tools plus original guides. This page explains how we create
                content, where our limits are, and how we handle recommendations and affiliate links.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What we publish</h2>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>
                  <strong>Practice tutorials</strong> — step-by-step sessions that use SingMeter tools (microphone, timing, or
                  reference tones).
                </li>
                <li>
                  <strong>Blog articles</strong> — longer explainers on technique, range, health, and repertoire.
                </li>
                <li>
                  <strong>Book reviews</strong> — full editorial reviews on{' '}
                  <Link to="/resources#books" className="text-indigo-600 hover:underline">
                    Resources
                  </Link>
                  , not generic store search links.
                </li>
                <li>
                  <strong>Curated external picks</strong> — YouTube channels and apps we name with a clear “why we recommend”
                  note and pairing with our tutorials.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How we write</h2>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>
                  Tutorials focus on <strong>doing</strong>; blog posts focus on <strong>understanding</strong>. We cross-link
                  instead of copying the same paragraphs on two URLs.
                </li>
                <li>
                  Tool pages keep their existing titles and meta descriptions for search stability; we add practice paths and
                  educational sections below the interactive tool.
                </li>
                <li>
                  Health-related content includes rest, “stop if it hurts,” and a reminder that SingMeter is not medical care.
                  See our <Link to="/disclaimer" className="text-indigo-600 hover:underline">Disclaimer</Link>.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who creates content</h2>
              <p className="mb-4 leading-relaxed">
                Articles are credited to the <strong>SingMeter Team</strong>. SingMeter was founded by{' '}
                <strong>Max Ray</strong> (product and engineering), with review from collaborators in audio engineering, voice
                pedagogy, and editorial. We are educators and tool builders, not licensed clinicians. For who does what, see{' '}
                <Link to="/about" className="text-indigo-600 hover:underline">
                  About SingMeter
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tool accuracy &amp; limitations</h2>
              <p className="mb-4 leading-relaxed">
                Pitch and range readings use browser-based audio analysis (including the Pitchy library on the pitch detector).
                Results depend on your microphone, room noise, and technique. Use readings for{' '}
                <strong>practice feedback</strong>, not medical diagnosis, audition grading, or legal proof of ability.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Affiliate &amp; external links</h2>
              <p className="mb-4 leading-relaxed">
                Some book reviews link to Amazon with an affiliate tag. We may earn a commission at no extra cost to you. We only
                review books we believe help singers and we state who each book is (and is not) for. YouTube and app links go to
                official channels or stores—we do not use generic search-result URLs as “recommendations.”
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Updates</h2>
              <p className="mb-4 leading-relaxed">
                Blog posts show published and updated dates when we materially change content. Tutorials and reviews are revised
                when tools change or pedagogy needs clarification. If you spot an error, please{' '}
                <Link to="/contact" className="text-indigo-600 hover:underline">
                  contact us
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related policies</h2>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>
                  <Link to="/privacy" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-indigo-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-indigo-600 hover:underline">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialStandardsPage;

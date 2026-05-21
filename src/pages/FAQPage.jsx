/**
 * FAQ Page — site-wide questions only.
 * Tool-specific FAQs live on each tool page (see toolFaqLinks).
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FaqAnswerContent, { faqAnswerToPlainText } from '../components/FaqAnswerContent';
import { siteFaqData, toolFaqLinks } from '../data/siteFaq';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.title = 'FAQ - Frequently Asked Questions | SingMeter';

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
      'Answers about SingMeter: free tools, privacy, microphones, browsers, and support. Tool-specific help is on each tool page.'
    );
    setMetaTag(
      'keywords',
      'singmeter faq, singing tools help, vocal tools privacy, free singing test, singmeter support'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/faq');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const categories = ['all', ...new Set(siteFaqData.map((item) => item.category))];

  const filteredFAQs = siteFaqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">FAQ</li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Site-wide answers about SingMeter, privacy, and getting started. For how each tool works,
            open that tool&apos;s page — each has its own FAQ section.
          </p>
        </div>

        {/* Tool-specific FAQ links */}
        <section className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-indigo-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tool-specific FAQs</h2>
            <p className="text-gray-600 text-sm mb-6">
              These questions are answered on each tool page so we don&apos;t repeat the same content here.
            </p>
            <ul className="space-y-3">
              {toolFaqLinks.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={`${tool.path}#faq`}
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl border border-gray-100 px-4 py-3 hover:border-indigo-200 hover:bg-indigo-50/50 transition"
                  >
                    <span className="font-semibold text-indigo-600 group-hover:text-indigo-700">
                      {tool.name} →
                    </span>
                    <span className="text-sm text-gray-500 sm:text-right">{tool.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Search and filter */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Questions
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a question..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredFAQs.length} of {siteFaqData.length} questions
          </div>
        </div>

        {/* Site-wide FAQ list */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {filteredFAQs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 sm:px-6 py-4 text-left flex items-start gap-3 sm:gap-4 justify-between hover:bg-gray-50 transition"
                aria-expanded={openIndex === index}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  {faq.icon || '❓'}
                </span>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 text-left leading-snug">
                      {faq.question}
                    </h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full whitespace-nowrap">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 mt-1 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-gray-100 bg-slate-50/60">
                  <div className="sm:ml-10 text-left">
                    <FaqAnswerContent text={faq.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: siteFaqData.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faqAnswerToPlainText(item.answer),
              },
            })),
          })}
        </script>

        {filteredFAQs.length === 0 && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            For tool help, visit the tool page FAQ above. For anything else, contact us.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;

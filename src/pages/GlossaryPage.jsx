/**
 * Glossary Page - Vocal terminology dictionary
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { glossaryTerms } from '../data/glossaryTerms';

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.title = 'Vocal Glossary - Singing Terms & Definitions | SingMeter';

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
      'Comprehensive glossary of vocal and singing terminology. Learn the definitions of vocal range, tessitura, falsetto, vibrato, and other important singing terms.'
    );
    setMetaTag(
      'keywords',
      'vocal glossary, singing terms, vocal terminology, singing dictionary, voice types, vocal range glossary, singing definitions'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/glossary');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const terms = glossaryTerms;

  const categories = ['all', ...new Set(terms.map(term => term.category))];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <li className="text-gray-900 font-medium">Glossary</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Vocal Glossary
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Learn the definitions of vocal and singing terminology. Understand key concepts to improve your vocal knowledge.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-2">
              <span className="text-2xl">📖</span>
              <span>{terms.length} Terms</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span>{categories.length - 1} Categories</span>
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Terms
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a term..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            {/* Category Filter */}
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
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTerms.length} of {terms.length} terms
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-6">
          {filteredTerms.map((term, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{term.term}</h2>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {term.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">
                {term.definition}
              </p>
              {term.readMore && (
                <p className="text-sm">
                  <Link
                    to={`/blog/${term.readMore.slug}`}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                  >
                    Read more: {term.readMore.label} →
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No terms found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply What You've Learned?</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            Use our free tools to test your vocal range and improve your pitch accuracy. Put your knowledge into practice!
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

      <Footer />
    </div>
  );
};

export default GlossaryPage;

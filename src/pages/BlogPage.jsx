/**
 * Blog Page - Educational Articles
 */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogCatalog } from '../blog';
import { BLOG_TOPICS } from '../data/blogTopics';
import { HIGH_NOTES_HUB_SLUG, PITCH_HUB_SLUG, VOCAL_RANGE_HUB_SLUG } from '../data/blogHub';

const HUB_SLUGS = new Set([PITCH_HUB_SLUG, VOCAL_RANGE_HUB_SLUG, HIGH_NOTES_HUB_SLUG]);

/** Topic hubs (pillar guides) first, then the rest in catalog order. */
const articlesForTopic = (category) =>
  blogCatalog
    .filter((article) => article.category === category)
    .sort((a, b) => Number(HUB_SLUGS.has(b.slug)) - Number(HUB_SLUGS.has(a.slug)));

const BlogPage = () => {
  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Vocal Training Blog - Singing Tips & Techniques | SingMeter';

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

    setMetaTag('description', 'Expert vocal training tips, singing techniques, and guides. Learn how to improve your singing voice, expand your range, and master pitch accuracy.');
    setMetaTag('keywords', 'vocal training, singing tips, singing techniques, vocal exercises, improve singing, voice training, singing guides');
    setLinkTag('canonical', 'https://www.singmeter.com/blog');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Vocal Training <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, techniques, and guides to help you discover and develop your singing voice
          </p>
        </div>

        {/* Topic Sections */}
        <div className="space-y-12">
          {BLOG_TOPICS.map((topic) => {
            const topicArticles = articlesForTopic(topic.category);

            if (!topicArticles.length) return null;

            return (
              <section key={topic.id} id={topic.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {topic.category}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {topic.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {topicArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/blog/${article.slug}`}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-6">
                        <p className="text-xs text-gray-500 mb-3">
                          By <span className="font-medium text-gray-700">{article.author}</span>
                          <span aria-hidden="true"> · </span>
                          {article.readTime}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                          <span>Read More</span>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Vocal Range?
          </h2>
          <p className="text-indigo-100 text-lg mb-6 max-w-2xl mx-auto">
            Use SingMeter's free online vocal range test to discover your voice type and singing capabilities in just 3 minutes.
          </p>
          <Link
            to="/vocal-range-test"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Start Your Free Test
          </Link>
        </div>
      </main>

      <Footer variant="muted" />
    </div>
  );
};

export default BlogPage;

/**
 * Blog Page - Educational Articles
 */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import { blogIndex } from '../blog';

// Blog Topics - thematic content clusters for the blog
const blogTopics = [
  {
    id: 'pitch-training',
    title: 'Pitch & Intonation Training',
    description: 'Improve your pitch accuracy and learn how to sing in tune using practical exercises and tools.',
    articleIds: [
      'improve-singing-pitch',
      'why-you-sing-flat',
      'ear-training-for-singers',
      'sing-in-tune-without-piano',
      'use-pitch-detector-for-training',
    ],
  },
  {
    id: 'vocal-range-and-voice-type',
    title: 'Vocal Range & Voice Type',
    description: 'Measure your vocal range, understand your voice type, and choose songs that fit your voice.',
    articleIds: [
      'how-to-test-vocal-range',
      'how-to-find-your-voice-type',
      'vocal-range-chart',
      'vocal-range-vs-voice-type',
      'can-vocal-range-change',
      'tessitura-and-comfortable-range',
      'songs-for-your-voice-type',
      'famous-singers-vocal-ranges',
    ],
  },
  {
    id: 'high-notes-and-power',
    title: 'High Notes & Advanced Techniques',
    description: 'Build the technique and control you need to sing high notes with power and confidence.',
    articleIds: [
      'singing-high-notes-techniques',
      'belt-high-notes-safely',
      'mixed-voice-vs-head-voice',
      'high-notes-warmup-routine',
    ],
  },
];

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
          {blogTopics.map((topic) => {
            const topicArticles = blogIndex.filter((article) =>
              topic.articleIds.includes(article.id)
            );

            if (!topicArticles.length) return null;

            return (
              <section key={topic.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {topic.title}
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
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                          {article.title}
                        </h2>
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

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">© 2026 SingMeter. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
              <span>•</span>
              <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;

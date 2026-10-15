/**
 * Home Page — publisher-first: original guides & tutorials lead; tools support practice.
 */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getActiveTools } from '../config/tools';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import HomeLearningHub from '../components/HomeLearningHub';
import { homeFaqItems } from '../data/siteFaq';
import { getLatestBlogPosts } from '../data/learningHub';

// Lightweight static hero backdrop — pure CSS gradients, no animated/blurred
// layers or large inline SVG, so it stays cheap to parse and paint on mobile.
const BackgroundPattern = () => (
  <div
    className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-50 via-white to-pink-50"
    aria-hidden
  />
);

const HomePage = () => {
  const activeTools = getActiveTools();
  const featuredGuides = getLatestBlogPosts(6);

  const toolIcons = {
    'vocal-range-test': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    'pitch-detector': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
      </svg>
    ),
    'tone-generator': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
    'metronome': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    'song-key-finder': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    )
  };

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'SingMeter — Singing Guides, Tutorials & Free Practice Tools';

    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const safeSetLinkTag = (rel, href) => {
        let element = document.querySelector(`link[rel="${rel}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            document.head.appendChild(element);
        }
        element.setAttribute('href', href);
    };

    setMetaTag('description', 'SingMeter publishes original singing guides and tutorials for home practice—plus free browser tools for vocal range, pitch, key, and tempo when you need a checkpoint.');
    setMetaTag(
      'keywords',
      'singing guides, singing tutorials, vocal practice, vocal range test, pitch detector, tone generator, metronome, song key finder, sing meter, voice training'
    );
    safeSetLinkTag('canonical', 'https://www.singmeter.com/');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SingMeter",
          "url": "https://www.singmeter.com",
          "description": "SingMeter publishes original singing guides and tutorials, with free browser tools for vocal range, pitch, and practice checkpoints.",
          "publisher": {
            "@type": "Organization",
            "name": "SingMeter",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.singmeter.com/logo-horizontal.svg"
            }
          }
        })}
      </script>

      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        <Header />

        <main className="flex-grow relative">
          {/* Hero — publisher-first: brand + guides, tools secondary */}
          <section className="relative w-full overflow-hidden bg-white">
            <BackgroundPattern />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 z-10">
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <p className="text-sm sm:text-base font-semibold text-indigo-600 uppercase tracking-wide mb-4">
                  SingMeter
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
                  Original singing guides
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2 pb-1">
                    that help you practice with purpose
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Long-form articles and step-by-step tutorials written for home singers—then free browser tools
                  when you need a range check, pitch readout, or metronome.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link
                    to="/blog"
                    className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto justify-center"
                  >
                    Read singing guides
                    <svg className="w-5 h-5 ml-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    onClick={() => scrollToSection('learning-hub')}
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    Guided practice
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('free-tools')}
                    className="inline-flex items-center px-6 py-3 text-indigo-700 text-base font-semibold hover:text-indigo-900 transition cursor-pointer"
                  >
                    Free tools ↓
                  </button>
                </div>
              </div>

              {featuredGuides.length > 0 && (
                <div className="relative z-10 max-w-5xl mx-auto">
                  <div className="flex items-end justify-between gap-4 mb-4 px-1">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-left">
                      Featured guides
                    </h2>
                    <Link
                      to="/blog"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                    >
                      All guides →
                    </Link>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3 text-left">
                    {featuredGuides.map((post) => (
                      <li key={post.slug}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white/90 px-4 py-3 hover:border-indigo-200 hover:shadow-sm transition"
                        >
                          <span className="text-xs font-semibold text-indigo-700 mb-1">
                            {post.category}
                            {post.readTime ? ` · ${post.readTime}` : ''}
                          </span>
                          <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition line-clamp-2 text-sm sm:text-base">
                            {post.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <HomeLearningHub />

          {/* Free tools — checkpoints that support the guides */}
          <section id="free-tools" className="defer-paint py-16 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Free practice tools</h2>
                <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                  Use these after a guide or tutorial—quick checks for range, pitch, key, tone, and tempo. New here?
                  Test your range first, find a song key that fits, then check pitch against a reference tone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeTools.map((tool) => (
                  <Link 
                    key={tool.id} 
                    to={tool.path}
                    className="group relative flex flex-col bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Decorative gradient blob */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      {toolIcons[tool.id] || <span className="text-3xl">{tool.icon}</span>}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                      Try {tool.shortName} 
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Why SingMeter Section (SEO Content) */}
          <section className="defer-paint py-16 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why SingMeter?</h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  SingMeter publishes original singing guides and step-by-step tutorials for home practice—
                  how to warm up, stay in tune, choose a song key, and build a routine you can repeat.
                  Free browser tools sit beside that writing so you can check range, pitch, or tempo when a lesson asks for it.
                </p>
                <p className="mb-6">
                  Whether you are finding your voice type or cleaning up pitch accuracy, start with an article or
                  a guided tutorial, then use visual feedback as a checkpoint—not as a substitute for practice.
                </p>
                <p>
                  Everything runs in your browser with no account required. Read the guides, follow a tutorial,
                  and open the Vocal Range Test or Pitch Detector only when you need a clear number to work from.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="defer-paint">
            <FAQSection items={homeFaqItems} />
            <p className="-mt-6 mb-12 text-center text-sm text-gray-600">
              More questions?{' '}
              <Link to="/faq" className="font-semibold text-indigo-600 hover:underline">
                Read the full FAQ
              </Link>
              .
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;

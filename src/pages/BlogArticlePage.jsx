/**
 * Blog Article Page - Individual Article View
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { blogIndex } from '../blog';
import Header from '../components/Header';

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = blogIndex.find((a) => a.slug === slug);

	// If article not found, redirect to blog page
	if (!article) {
		return <Navigate to="/blog" replace />;
	}

	// Get related articles (other articles in same category or just other articles)
	const relatedArticles = blogIndex
		.filter(a => a.id !== article.id)
		.slice(0, 2);

	// Dates and author information
	const publishedDate = new Date(article.date);
	const updatedDate = article.updatedDate ? new Date(article.updatedDate) : publishedDate;
	const hasBeenUpdated = !!article.updatedDate && article.updatedDate !== article.date;
	const formattedPublishedDate = publishedDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedUpdatedDate = updatedDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

  // Set document title and meta tags
  useEffect(() => {
    // Set title
    document.title = `${article.title} | SingMeter Blog`;

    // Set or update meta tags
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

	    const setLinkTag = (rel, href) => {
	      let element = document.querySelector(`link[rel="${rel}"]`);
	      if (!element) {
	        element = document.createElement('link');
	        element.setAttribute('rel', rel);
	        document.head.appendChild(element);
	      }
	      element.setAttribute('href', href);
	    };

		const canonicalUrl = `https://www.singmeter.com/blog/${article.slug}`;

		// Basic meta tags
		setMetaTag('description', article.excerpt);
		setMetaTag(
			'keywords',
			article.seoKeywords || `singing, vocal training, ${article.category.toLowerCase()}, music education`
		);
		setMetaTag('author', article.author || 'SingMeter Team');

		// Open Graph tags
		setMetaTag('og:type', 'article', true);
		setMetaTag('og:title', article.title, true);
		setMetaTag('og:description', article.excerpt, true);
			setMetaTag('og:url', canonicalUrl, true);
		setMetaTag('article:published_time', article.date, true);
		setMetaTag('article:modified_time', article.updatedDate || article.date, true);
		setMetaTag('article:section', article.category, true);

    // Twitter tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', article.title);
    setMetaTag('twitter:description', article.excerpt);

			// Canonical link
			setLinkTag('canonical', canonicalUrl);

		// Add JSON-LD structured data
    const existingScript = document.querySelector('script[data-article-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-article-schema', 'true');
		script.textContent = JSON.stringify({
		  "@context": "https://schema.org",
		  "@type": "Article",
		  "headline": article.title,
		  "description": article.excerpt,
		  "datePublished": article.date,
		  "dateModified": article.updatedDate || article.date,
				  "author": {
				    "@type": "Organization",
				    "name": article.author || "SingMeter Team",
				    "url": "https://www.singmeter.com"
				  },
				  "publisher": {
				    "@type": "Organization",
				    "name": "SingMeter",
				    "logo": {
				      "@type": "ImageObject",
				      "url": "https://www.singmeter.com/logo-horizontal.svg"
				    }
				  },
				  "mainEntityOfPage": {
				    "@type": "WebPage",
				    "@id": canonicalUrl
				  },
		  "articleSection": article.category,
		  "keywords": article.seoKeywords || "singing, vocal training, music education"
		});
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.title = 'SingMeter';
    };
  }, [article]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <li>
              <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">{article.readTime}</span>
	              <span className="text-gray-500 text-sm">
	                By <span className="font-medium text-gray-700">{article.author || 'SingMeter Team'}</span>
	              </span>
	              <span className="text-gray-500 text-sm">
	                {hasBeenUpdated
	                  ? `Published on ${formattedPublishedDate} · Updated on ${formattedUpdatedDate}`
	                  : `Published on ${formattedPublishedDate}`}
	              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-8"></div>
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {article.component && <article.component />}
            </div>
	            {/* Author Bio */}
	            <div className="mt-10 p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
	              <h2 className="text-base font-semibold text-indigo-800 mb-2">About SingMeter Team</h2>
	              <p className="text-sm text-indigo-900 leading-relaxed">
	                SingMeter started as a side project by a singer who is also a software developer. Today, the SingMeter Team brings
	                together a vocal enthusiast, a programmer, an audio engineer, and a vocal coach from a music conservatory.
	                We are not a big company - just a small group of people who love singing and technology, and we build simple,
	                accurate online tools and practical guides to help everyday singers understand, train, and take care of their voices.
	              </p>
	            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {related.category}
                    </span>
                    <span className="text-sm text-gray-500">{related.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Articles</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
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

export default BlogArticlePage;


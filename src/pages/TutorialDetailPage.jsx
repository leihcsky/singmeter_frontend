/**
 * Individual practice tutorial (/tutorials/:slug)
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getTutorialBySlug, tutorialIndex } from '../tutorials';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TutorialArticle from '../components/TutorialArticle';
import TutorialDetailFooter from '../components/TutorialDetailFooter';
import LearnHubNav from '../components/LearnHubNav';
import { tutorialPracticeInsightsBySlug } from '../data/tutorialPracticeInsights';

const TITLE_BRAND = ' | SingMeter';
const MAX_TITLE_TOTAL = 60;

function buildMetaTitle(tutorial) {
  const core = (tutorial.seoTitle || tutorial.title).trim();
  const maxCore = MAX_TITLE_TOTAL - TITLE_BRAND.length;
  if (core.length <= maxCore) return `${core}${TITLE_BRAND}`;
  let cut = core.slice(0, maxCore - 1);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > Math.floor(maxCore * 0.45)) cut = cut.slice(0, lastSpace);
  return `${cut.trimEnd()}…${TITLE_BRAND}`;
}

const TutorialDetailPage = () => {
  const { slug } = useParams();
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    return <Navigate to="/tutorials" replace />;
  }

  const { meta, intro, tools, steps, selfCheck, goDeeper, nextTutorial } = tutorial;
  const related = tutorialIndex.filter((t) => t.slug !== meta.slug).slice(0, 3);
  const practiceInsights = tutorialPracticeInsightsBySlug[meta.slug];

  useEffect(() => {
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

    const canonicalUrl = `https://www.singmeter.com/tutorials/${meta.slug}`;
    const metaTitle = buildMetaTitle(meta);
    const metaDescription = meta.seoDescription || meta.excerpt;

    document.title = metaTitle;
    setMetaTag('description', metaDescription);
    setMetaTag(
      'keywords',
      `singing tutorial, vocal practice, ${meta.category.toLowerCase()}, SingMeter, ${meta.slug.replace(/-/g, ' ')}`
    );
    setMetaTag('og:type', 'article', true);
    setMetaTag('og:title', meta.seoTitle || meta.title, true);
    setMetaTag('og:description', metaDescription, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', meta.seoTitle || meta.title);
    setMetaTag('twitter:description', metaDescription);
    setLinkTag('canonical', canonicalUrl);

    const existingScript = document.querySelector('script[data-tutorial-schema]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-tutorial-schema', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: meta.title,
      description: metaDescription,
      learningResourceType: 'Practice guide',
      educationalLevel: meta.level,
      timeRequired: `PT${parseInt(meta.duration, 10) || 15}M`,
      url: canonicalUrl,
      provider: {
        '@type': 'Organization',
        name: 'SingMeter',
        url: 'https://www.singmeter.com',
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title = 'SingMeter';
      document.querySelector('script[data-tutorial-schema]')?.remove();
    };
  }, [meta]);

  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  };

  const trackBadge = {
    start: 'bg-indigo-100 text-indigo-800',
    apply: 'bg-blue-100 text-blue-800',
    care: 'bg-amber-100 text-amber-800',
    advanced: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/tutorials" className="hover:text-indigo-600 transition">
                Tutorials
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{meta.title}</li>
          </ol>
        </nav>

        <LearnHubNav className="mb-8" />

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${levelColors[meta.level] || 'bg-gray-100 text-gray-800'}`}
            >
              {meta.level}
            </span>
            <span className="text-sm text-gray-500">{meta.duration}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trackBadge[meta.track] || 'bg-gray-100 text-gray-700'}`}
            >
              {meta.trackLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{meta.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{meta.excerpt}</p>
        </header>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 mb-10">
          <TutorialArticle
            intro={intro}
            tools={tools}
            steps={steps}
            selfCheck={selfCheck}
            goDeeper={goDeeper}
            practiceInsights={practiceInsights}
            nextTutorial={nextTutorial}
          />
          <TutorialDetailFooter slug={meta.slug} />
        </div>

        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More practice tutorials</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  to={`/tutorials/${t.slug}`}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition"
                >
                  <span className="text-xs font-semibold text-indigo-600">{t.level}</span>
                  <h3 className="font-bold text-gray-900 mt-1 group-hover:text-indigo-600">{t.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t.duration}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="text-center">
          <Link to="/tutorials" className="text-indigo-600 font-semibold hover:underline">
            ← All tutorials
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialDetailPage;

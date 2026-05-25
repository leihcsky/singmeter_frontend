/**
 * Homepage editorial / learning hub — tutorials, latest guides, trust signals.
 */
import { Link } from 'react-router-dom';
import LearnHubNav from './LearnHubNav';
import { getLatestBlogPosts } from '../data/learningHub';
import { tutorialTracks, tutorialIndex } from '../tutorials';
import { bookReviews } from '../resources/bookReviews';

const FEATURED_TUTORIAL_SLUG = 'vocal-range-test-guided';
const FEATURED_BOOK_SLUG = 'set-your-voice-free';

function getTutorialMeta(slug) {
  return tutorialIndex.find((t) => t.slug === slug) || null;
}

const HomeLearningHub = () => {
  const latestPosts = getLatestBlogPosts(3);
  const featuredTutorial = getTutorialMeta(FEATURED_TUTORIAL_SLUG);
  const featuredBook = bookReviews.find((b) => b.slug === FEATURED_BOOK_SLUG) || bookReviews[0];

  return (
    <section
      id="learning-hub"
      className="py-16 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-y border-indigo-100/80 scroll-mt-20"
      aria-labelledby="learning-hub-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
            Learn &amp; practice
          </p>
          <h2 id="learning-hub-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            SingMeter Learning Hub
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Free tools plus original tutorials, guides, and reviews.{' '}
            <strong className="text-gray-800">Tutorials</strong> are step-by-step practice;{' '}
            <strong className="text-gray-800">blog</strong> articles explain the why;{' '}
            <strong className="text-gray-800">resources</strong> hold editor picks—not generic search links.
          </p>
        </div>

        <LearnHubNav className="max-w-3xl mx-auto justify-center mb-10" />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Tutorial tracks */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Practice tutorial tracks</h3>
            <p className="text-sm text-gray-600 mb-6">
              Four paths from first range test to advanced mix work. Each lesson uses SingMeter tools with
              self-checks.
            </p>
            <ul className="space-y-4 flex-grow">
              {tutorialTracks.map((track) => {
                const firstSlug = track.slugs[0];
                const first = getTutorialMeta(firstSlug);
                return (
                  <li key={track.id} className="border-l-4 border-indigo-400 pl-4">
                    <p className="font-semibold text-gray-900 text-sm">{track.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 mb-1">{track.description}</p>
                    {first && (
                      <Link
                        to={`/tutorials/${first.slug}`}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Start: {first.title} →
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              {featuredTutorial && (
                <Link
                  to={`/tutorials/${featuredTutorial.slug}`}
                  className="inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  Start guided range test
                </Link>
              )}
              <Link
                to="/tutorials"
                className="inline-flex justify-center items-center px-4 py-2.5 bg-white text-indigo-700 border border-indigo-200 text-sm font-bold rounded-lg hover:bg-indigo-50 transition"
              >
                All tutorials
              </Link>
            </div>
          </div>

          {/* Latest blog */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Latest singing guides</h3>
                <p className="text-sm text-gray-600 mt-1">From the SingMeter blog—sorted by recent updates.</p>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
              >
                View all →
              </Link>
            </div>
            <ul className="space-y-4 flex-grow">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:shadow-sm transition"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                      {post.dateLabel && (
                        <span className="text-xs text-gray-400">{post.dateLabel}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition line-clamp-2 text-sm sm:text-base">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/blog"
              className="mt-6 text-center sm:hidden text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View all guides →
            </Link>
          </div>

          {/* Editorial trust */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Editorial picks</h3>
            <p className="text-sm text-gray-600 mb-4">
              We write our own tutorials and book reviews. SingMeter is for practice at home—not medical
              treatment.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">✓</span>
                <span>Step-by-step lessons linked to free browser tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">✓</span>
                <span>Full book reviews with who each title is for</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">✓</span>
                <span>YouTube and app picks with editor notes—not search pages</span>
              </li>
            </ul>

            {featuredBook && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6 flex-grow">
                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-1">
                  Featured review
                </p>
                <h4 className="font-bold text-gray-900">{featuredBook.title}</h4>
                <p className="text-xs text-gray-600 mt-1">by {featuredBook.author}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{featuredBook.summary}</p>
                <Link
                  to={`/resources/books/${featuredBook.slug}`}
                  className="inline-block mt-3 text-sm font-semibold text-indigo-600 hover:underline"
                >
                  Read full review →
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-auto text-sm">
              <Link
                to="/editorial-standards"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                How we write &amp; review →
              </Link>
              <Link to="/resources#books" className="font-semibold text-indigo-600 hover:text-indigo-800">
                All book reviews →
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                About the team
              </Link>
              <Link to="/disclaimer" className="text-gray-500 hover:text-indigo-600 text-xs">
                Medical &amp; tool disclaimer
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          Below, the <strong className="text-gray-700">five-tool practice path</strong> shows which SingMeter
          pages to open in order. Tutorial tracks above add minute-by-minute lessons on the same journey.
        </p>
      </div>
    </section>
  );
};

export default HomeLearningHub;

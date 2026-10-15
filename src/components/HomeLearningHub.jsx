/**
 * Homepage practice strip — the three flagship tutorials plus a pointer to editorial reviews.
 */
import { Link } from 'react-router-dom';
import { FLAGSHIP_TUTORIALS } from '../data/flagshipTutorials';

const HomeLearningHub = () => {
  return (
    <section
      id="learning-hub"
      className="defer-paint py-16 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-y border-indigo-100/80 scroll-mt-20"
      aria-labelledby="learning-hub-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
            Step-by-step practice
          </p>
          <h2 id="learning-hub-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Start with a guided session
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Guides explain the why; these tutorials walk you through a timed session with self-checks, using a free
            tool only where the lesson needs a number.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6">
          {FLAGSHIP_TUTORIALS.map((tutorial, index) => (
            <li key={tutorial.slug}>
              <Link
                to={`/tutorials/${tutorial.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-md p-6 hover:border-indigo-200 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{tutorial.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">{tutorial.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-indigo-600">Start lesson →</span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-sm text-gray-600">
          Prefer reading first? Browse our{' '}
          <Link to="/resources" className="font-semibold text-indigo-600 hover:underline">
            editor book reviews
          </Link>{' '}
          or see{' '}
          <Link to="/editorial-standards" className="font-semibold text-indigo-600 hover:underline">
            how we write and review
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default HomeLearningHub;

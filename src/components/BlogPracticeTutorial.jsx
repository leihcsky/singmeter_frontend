import { Link } from 'react-router-dom';
import { getBlogPracticeTutorial } from '../data/blogTutorialLinks';

const BlogPracticeTutorial = ({ slug }) => {
  const tutorial = getBlogPracticeTutorial(slug);
  if (!tutorial) return null;

  return (
    <div className="mt-10 p-5 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl not-prose">
      <p className="text-sm font-semibold text-gray-900 mb-2">Put this into practice</p>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Follow a step-by-step SingMeter tutorial with tool links and self-checks—not just reading.
      </p>
      <Link
        to={tutorial.path}
        className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition"
      >
        Start: {tutorial.title} →
      </Link>
    </div>
  );
};

export default BlogPracticeTutorial;

/**
 * Article footer: optional guided-practice link + one-line byline.
 */
import { Link } from 'react-router-dom';
import { getBlogPracticeTutorial } from '../data/blogTutorialLinks';

const BlogArticleFooter = ({ slug, author = 'Max Ray', authorRole }) => {
  const tutorial = getBlogPracticeTutorial(slug);

  return (
    <footer className="mt-10 pt-6 border-t border-gray-200 space-y-3 text-sm">
      {tutorial && (
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Practice this: </span>
          <Link to={tutorial.path} className="text-indigo-700 font-semibold hover:underline">
            {tutorial.title} →
          </Link>
        </p>
      )}
      <p className="text-gray-500">
        Written by{' '}
        <Link to="/about" className="text-gray-700 font-medium hover:text-indigo-600">
          {author}
        </Link>
        {authorRole ? ` · ${authorRole}` : ''} · Reviewed against our{' '}
        <Link to="/editorial-standards" className="text-gray-700 font-medium hover:text-indigo-600">
          editorial standards
        </Link>
      </p>
    </footer>
  );
};

export default BlogArticleFooter;

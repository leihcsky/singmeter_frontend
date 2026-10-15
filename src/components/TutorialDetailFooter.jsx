import { Link } from 'react-router-dom';
import { getTutorialByline } from '../data/tutorialAuthors';

const TutorialDetailFooter = ({ slug }) => {
  const { author } = getTutorialByline(slug);

  return (
    <footer className="mt-10 pt-8 border-t border-gray-200 not-prose space-y-4">
      <div className="text-sm text-gray-700 leading-relaxed">
        <p>
          <span className="font-semibold text-gray-900">Written by {author.name}</span>
          <span className="text-gray-500"> · {author.role}</span>
        </p>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        Written for safe home practice. Stop if you feel pain or hoarseness.{' '}
        <Link to="/disclaimer" className="text-indigo-600 font-semibold hover:underline">
          Scope &amp; limits
        </Link>
        {' · '}
        <Link to="/about" className="text-indigo-600 font-semibold hover:underline">
          About
        </Link>
        .
      </p>
    </footer>
  );
};

export default TutorialDetailFooter;

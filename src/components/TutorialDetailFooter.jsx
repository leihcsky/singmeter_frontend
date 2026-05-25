import { Link } from 'react-router-dom';
import { getTutorialByline } from '../data/tutorialAuthors';

const TutorialDetailFooter = ({ slug }) => {
  const { author, reviewer } = getTutorialByline(slug);

  return (
    <footer className="mt-10 pt-8 border-t border-gray-200 not-prose space-y-4">
      <div className="text-sm text-gray-700 leading-relaxed">
        <p>
          <span className="font-semibold text-gray-900">Written by {author.name}</span>
          <span className="text-gray-500"> · {author.role}</span>
        </p>
        {reviewer && (
          <p className="mt-1">
            <span className="font-semibold text-gray-900">Technique reviewed by {reviewer.name}</span>
            <span className="text-gray-500"> · {reviewer.role}</span>
          </p>
        )}
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        For educational practice at home only—not medical advice, diagnosis, or voice therapy. Stop if you
        feel pain or hoarseness. See our{' '}
        <Link to="/disclaimer" className="text-indigo-600 font-semibold hover:underline">
          disclaimer
        </Link>{' '}
        and{' '}
        <Link to="/about" className="text-indigo-600 font-semibold hover:underline">
          team
        </Link>
        .
      </p>
    </footer>
  );
};

export default TutorialDetailFooter;

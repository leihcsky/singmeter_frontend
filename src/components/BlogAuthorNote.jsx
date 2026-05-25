/**
 * Article footer byline — named author + team / policy links.
 */
import { Link } from 'react-router-dom';

const BlogAuthorNote = ({ author = 'SingMeter Team', authorRole }) => (
  <div className="mt-10 p-5 sm:p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
    <p className="text-sm text-indigo-900 leading-relaxed">
      <span className="font-semibold text-indigo-800">
        Written by {author}
        {authorRole ? ` · ${authorRole}` : ''}.
      </span>{' '}
      Reviewed for clarity and safety as part of the SingMeter editorial process—not medical advice.{' '}
      <Link to="/about" className="text-indigo-700 font-semibold hover:underline">
        Meet the team
      </Link>
      {' · '}
      <Link to="/editorial-standards" className="text-indigo-700 font-semibold hover:underline">
        Editorial standards
      </Link>
      {' · '}
      <Link to="/disclaimer" className="text-indigo-700 font-semibold hover:underline">
        Disclaimer
      </Link>
    </p>
  </div>
);

export default BlogAuthorNote;

/**
 * Short author note for blog articles — links to About / Editorial instead of repeating full team bio.
 */
import { Link } from 'react-router-dom';

const BlogAuthorNote = ({ author = 'SingMeter Team' }) => (
  <div className="mt-10 p-5 sm:p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
    <p className="text-sm text-indigo-900 leading-relaxed">
      <span className="font-semibold text-indigo-800">Written by {author}.</span>{' '}
      SingMeter publishes practical singing guides and free browser tools. We are a small team of singers, teachers, and
      engineers—not a medical provider.{' '}
      <Link to="/about" className="text-indigo-700 font-semibold hover:underline">
        About us
      </Link>
      {' · '}
      <Link to="/editorial-standards" className="text-indigo-700 font-semibold hover:underline">
        How we write &amp; review
      </Link>
      {' · '}
      <Link to="/disclaimer" className="text-indigo-700 font-semibold hover:underline">
        Disclaimer
      </Link>
    </p>
  </div>
);

export default BlogAuthorNote;

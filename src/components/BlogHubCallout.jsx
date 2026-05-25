import { Link } from 'react-router-dom';
import {
  VOCAL_RANGE_HUB_PATH,
  VOCAL_RANGE_HUB_TITLE,
  isVocalRangeHub,
  isVocalRangeSpoke,
} from '../data/blogHub';

const BlogHubCallout = ({ slug }) => {
  if (isVocalRangeHub(slug)) {
    return (
      <div className="mb-8 p-5 bg-indigo-50 border border-indigo-200 rounded-xl not-prose">
        <p className="text-sm font-semibold text-indigo-800 mb-1">Vocal range guide series</p>
        <p className="text-sm text-indigo-900 leading-relaxed">
          This is our main reference for voice types, chart reading, and typical ranges. Other articles in
          this series link here instead of repeating the same tables.
        </p>
      </div>
    );
  }

  if (!isVocalRangeSpoke(slug)) return null;

  return (
    <div className="mb-8 p-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl not-prose">
      <p className="text-sm text-indigo-900 leading-relaxed">
        <strong className="text-indigo-950">Part of our vocal range series.</strong> For the full chart and
        voice-type reference table, read the hub article first:{' '}
        <Link to={VOCAL_RANGE_HUB_PATH} className="font-semibold text-indigo-700 hover:underline">
          {VOCAL_RANGE_HUB_TITLE}
        </Link>
        . This page focuses on one topic only.
      </p>
    </div>
  );
};

export default BlogHubCallout;

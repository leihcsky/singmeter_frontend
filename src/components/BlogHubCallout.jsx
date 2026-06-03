import { Link } from 'react-router-dom';
import { getBlogCluster } from '../data/blogHub';

const BlogHubCallout = ({ slug }) => {
  const cluster = getBlogCluster(slug);
  if (!cluster) return null;

  if (cluster.role === 'hub') {
    return (
      <div className="mb-8 p-5 bg-indigo-50 border border-indigo-200 rounded-xl not-prose">
        <p className="text-sm font-semibold text-indigo-800 mb-1">{cluster.seriesLabel}</p>
        <p className="text-sm text-indigo-900 leading-relaxed">
          This is the main guide in the series. Related articles below go deeper on one topic each without
          repeating the same tables and exercises.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 p-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl not-prose">
      <p className="text-sm text-indigo-900 leading-relaxed">
        <strong className="text-indigo-950">Part of our {cluster.seriesLabel.toLowerCase()}.</strong> Start with
        the hub article:{' '}
        <Link to={cluster.hubPath} className="font-semibold text-indigo-700 hover:underline">
          {cluster.hubTitle}
        </Link>
        . This page covers one focused topic only.
      </p>
    </div>
  );
};

export default BlogHubCallout;

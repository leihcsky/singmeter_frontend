import { Link } from 'react-router-dom';
import { blogIndex } from '../blog';
import { getBlogCluster } from '../data/blogHub';

const BlogHubCallout = ({ slug }) => {
  const cluster = getBlogCluster(slug);
  if (!cluster) return null;

  const spokes = cluster.spokeSlugs
    .map((s) => blogIndex.find((a) => a.slug === s))
    .filter(Boolean);

  if (cluster.role === 'hub') {
    return (
      <div className="mb-8 p-5 bg-indigo-50 border border-indigo-200 rounded-xl not-prose">
        <p className="text-sm font-semibold text-indigo-800 mb-3">{cluster.seriesLabel}</p>
        {spokes.length > 0 && (
          <ul className="space-y-1.5 text-sm">
            {spokes.map((article) => (
              <li key={article.slug}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <p className="mb-8 text-sm text-gray-600 not-prose">
      Part of our {cluster.seriesLabel.toLowerCase()}.{' '}
      <Link to={cluster.hubPath} className="font-semibold text-indigo-600 hover:underline">
        {cluster.hubTitle}
      </Link>
    </p>
  );
};

export default BlogHubCallout;

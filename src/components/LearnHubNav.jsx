/**
 * Cross-links between learning hub pages (tutorials, resources, blog).
 */
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/tutorials', label: 'Practice tutorials', match: /^\/tutorials/ },
  { to: '/resources', label: 'Resources & reviews', match: /^\/resources/ },
  { to: '/blog', label: 'Blog guides', match: /^\/blog/ },
  { to: '/glossary', label: 'Glossary', match: /^\/glossary/ },
];

const LearnHubNav = ({ className = '' }) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={`flex flex-wrap gap-2 p-1.5 bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm ${className}`}
      aria-label="Learning hub"
    >
      {LINKS.map((item) => {
        const active = item.match.test(pathname);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              active ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default LearnHubNav;

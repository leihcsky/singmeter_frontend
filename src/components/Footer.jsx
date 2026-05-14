/**
 * Site-wide footer — multi-column navigation for tools, learning, company, and legal.
 */
import { Link } from 'react-router-dom';
import { getActiveTools } from '../config/tools';

const LEARN_LINKS = [
  { to: '/tutorials', label: 'Tutorials' },
  { to: '/resources', label: 'Resources' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

const linkClass =
  'text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-150';

/** Column label (not a heading — avoids extra H-levels in document outline) */
const navGroupLabelClass =
  'text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3';

/**
 * @param {'default' | 'muted'} [variant] — background tone
 * @param {boolean} [compact] — tighter spacing (e.g. embedded test UI)
 */
const Footer = ({ variant = 'default', compact = false }) => {
  const bg =
    variant === 'muted'
      ? 'bg-slate-50 border-slate-200/80'
      : 'bg-white border-gray-200';

  const tools = [...getActiveTools()].sort((a, b) => a.priority - b.priority);
  const year = new Date().getFullYear();

  const outerPy = compact ? 'py-8 sm:py-10' : 'py-12 sm:py-14';
  const topGap = compact ? 'mt-8 sm:mt-16' : 'mt-16';

  return (
    <footer className={`${bg} border-t ${topGap}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${outerPy}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-10 border-b border-gray-200/80">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg tracking-tight hover:text-indigo-600 transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-sm">
                S
              </span>
              SingMeter
            </Link>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-sm">
              Free browser tools for vocal range, pitch practice, ear training, and rhythm — privacy-first, no signup required.
            </p>
            <Link
              to="/vocal-range-test"
              className="inline-flex mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Start with Vocal Range Test →
            </Link>
          </div>

          {/* Tools */}
          <nav className="min-w-0" aria-label="Tools">
            <div className={navGroupLabelClass}>Tools</div>
            <ul className="space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link to={tool.path} className={linkClass}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Learn */}
          <nav className="min-w-0" aria-label="Learn">
            <div className={navGroupLabelClass}>Learn</div>
            <ul className="space-y-2.5">
              {LEARN_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="min-w-0" aria-label="Company">
            <div className={navGroupLabelClass}>Company</div>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="min-w-0" aria-label="Legal">
            <div className={navGroupLabelClass}>Legal</div>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
          <p>© {year} SingMeter. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/" className={`${linkClass} text-gray-500`}>
              Home
            </Link>
            <span className="hidden sm:inline text-gray-300" aria-hidden>
              |
            </span>
            <a
              href="/sitemap.xml"
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-150"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

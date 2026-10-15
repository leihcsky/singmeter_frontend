/**
 * Header Component - Responsive navigation with tools dropdown
 * Desktop: Shows tools in dropdown menu when 4+ tools
 * Mobile: Hamburger menu
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tools } from '../config/tools';
import { FLAGSHIP_TUTORIALS } from '../data/flagshipTutorials';

const Header = () => {
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toolIcons = {
    'vocal-range-test': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    'pitch-detector': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
      </svg>
    ),
    'tone-generator': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
    'metronome': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    'song-key-finder': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    )
  };

  const Icons = {
    Tools: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    Learn: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
    Blog: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
      </svg>
    ),
    Home: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    Tutorials: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  };

  const isGuidesActive = location.pathname === '/blog' || location.pathname.startsWith('/blog/');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg -m-2 p-2"
            aria-label="Return to home"
          >
            <img
              src="/logo-horizontal.svg"
              alt="SingMeter"
              className="h-16 sm:h-20 w-auto hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 font-medium transition group ${
                location.pathname === '/'
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Icons.Home className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
              <span>Home</span>
            </Link>

            <Link
              to="/blog"
              className={`flex items-center space-x-1 font-medium transition group ${
                isGuidesActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Icons.Blog className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
              <span>Guides</span>
            </Link>

            {/* Practice — flagship tutorials only */}
            <div
              className="relative"
              onMouseEnter={() => setShowPracticeDropdown(true)}
              onMouseLeave={() => setShowPracticeDropdown(false)}
            >
              <button
                onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition group"
              >
                <Icons.Learn className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
                <span>Practice</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showPracticeDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showPracticeDropdown && (
                <>
                  {/* Invisible bridge to prevent gap between button and dropdown */}
                  <div className="absolute left-0 top-full w-72 h-2" />
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                    <p className="px-3 pt-1.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Guided sessions · start here
                    </p>
                    <ol>
                      {FLAGSHIP_TUTORIALS.map((tutorial, index) => {
                        const path = `/tutorials/${tutorial.slug}`;
                        const active = location.pathname === path;
                        return (
                          <li key={tutorial.slug}>
                            <Link
                              to={path}
                              className={`group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition ${
                                active ? 'bg-indigo-50' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => setShowPracticeDropdown(false)}
                            >
                              <span
                                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                  active
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-indigo-50 text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white'
                                }`}
                              >
                                {index + 1}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-baseline justify-between gap-2">
                                  <span className={`text-sm font-semibold ${active ? 'text-indigo-700' : 'text-gray-900'}`}>
                                    {tutorial.navLabel}
                                  </span>
                                  <span className="text-[11px] text-gray-400 flex-shrink-0">{tutorial.duration}</span>
                                </span>
                                <span className="block text-xs text-gray-500 mt-0.5 truncate">{tutorial.navHint}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </>
              )}
            </div>

            {/* Tools Navigation - Always dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowToolsDropdown(true)}
              onMouseLeave={() => setShowToolsDropdown(false)}
            >
              <button
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition group"
              >
                <Icons.Tools className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
                <span>Tools</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showToolsDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showToolsDropdown && (
                <>
                  {/* Invisible bridge to prevent gap between button and dropdown */}
                  <div className="absolute left-0 top-full w-56 h-2" />
                  <div
                    className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                  {tools
                    .filter((tool) => !tool.hidden)
                    .sort((a, b) => a.priority - b.priority)
                    .map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition text-left ${
                          location.pathname === tool.path
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'hover:bg-gray-50 text-gray-800'
                        } ${tool.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                          if (tool.comingSoon) {
                            e.preventDefault();
                            return;
                          }
                          setShowToolsDropdown(false);
                        }}
                      >
                        <span className="flex-shrink-0">
                            {toolIcons[tool.id] || <span className="text-xl">{tool.icon}</span>}
                        </span>
                        <span className="flex-1 text-left font-medium">{tool.name}</span>
                        {tool.comingSoon && (
                          <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full flex-shrink-0">
                            Soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  location.pathname === '/'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Home className="w-5 h-5 flex-shrink-0 text-gray-500" />
                <span className="font-medium flex-1">Home</span>
              </Link>
              <Link
                to="/blog"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  isGuidesActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Blog className="w-5 h-5 flex-shrink-0 text-gray-500" />
                <span className="font-medium flex-1">Singing guides</span>
              </Link>

              {/* Practice Section */}
              <div className="flex items-center px-2 mt-4 mb-2 text-gray-500">
                <Icons.Learn className="w-4 h-4 mr-2" />
                <div className="text-xs font-semibold uppercase tracking-wider">
                    Practice
                </div>
              </div>
              {FLAGSHIP_TUTORIALS.map((tutorial, index) => {
                const path = `/tutorials/${tutorial.slug}`;
                const active = location.pathname === path;
                return (
                  <Link
                    key={tutorial.slug}
                    to={path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-medium flex-1">{tutorial.navLabel}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{tutorial.duration}</span>
                  </Link>
                );
              })}

              {/* Tools Section */}
              <div className="flex items-center px-2 mt-4 mb-2 text-gray-500">
                <Icons.Tools className="w-4 h-4 mr-2" />
                <div className="text-xs font-semibold uppercase tracking-wider">
                    Tools
                </div>
              </div>
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                    location.pathname === tool.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${tool.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex-shrink-0">
                    {toolIcons[tool.id] || <span className="text-xl">{tool.icon}</span>}
                  </span>
                  <span className="font-medium flex-1">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
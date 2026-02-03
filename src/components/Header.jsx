/**
 * Header Component - Responsive navigation with tools dropdown
 * Desktop: Shows tools in dropdown menu when 4+ tools
 * Mobile: Hamburger menu
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tools, getToolsByCategory } from '../config/tools';

const Header = () => {
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
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
    About: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
    ),
    Contact: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
      </svg>
    ),
    Tutorials: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    Resources: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    Glossary: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    FAQ: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    )
  };

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

            {/* Learn Navigation - Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowLearnDropdown(true)}
              onMouseLeave={() => setShowLearnDropdown(false)}
            >
              <button
                onClick={() => setShowLearnDropdown(!showLearnDropdown)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition group"
              >
                <Icons.Learn className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
                <span>Learn</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showLearnDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Learn Dropdown Menu */}
              {showLearnDropdown && (
                <>
                  {/* Invisible bridge to prevent gap between button and dropdown */}
                  <div className="absolute left-0 top-full w-56 h-2" />
                  <div
                    className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                  <Link
                    to="/tutorials"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition ${
                      location.pathname === '/tutorials'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <Icons.Tutorials className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                    <span className="font-medium">Tutorials</span>
                  </Link>
                  <Link
                    to="/resources"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition ${
                      location.pathname === '/resources'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <Icons.Resources className="w-5 h-5 flex-shrink-0 text-orange-500" />
                    <span className="font-medium">Resources</span>
                  </Link>
                  <Link
                    to="/glossary"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition ${
                      location.pathname === '/glossary'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <Icons.Glossary className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                    <span className="font-medium">Glossary</span>
                  </Link>
                  <Link
                    to="/faq"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition ${
                      location.pathname === '/faq'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <Icons.FAQ className="w-5 h-5 flex-shrink-0 text-blue-500" />
                    <span className="font-medium">FAQ</span>
                  </Link>
                  </div>
                </>
              )}
            </div>

            {/* Other Navigation Links */}
            <Link to="/blog" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 font-medium transition group">
              <Icons.Blog className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
              <span>Blog</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 font-medium transition group">
              <Icons.About className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 font-medium transition group">
              <Icons.Contact className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition" />
              <span>Contact</span>
            </Link>
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
              {/* Tools Section */}
              <div className="flex items-center px-2 mb-2 text-gray-500">
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

              {/* Learn Section */}
              <div className="flex items-center px-2 mt-4 mb-2 text-gray-500">
                <Icons.Learn className="w-4 h-4 mr-2" />
                <div className="text-xs font-semibold uppercase tracking-wider">
                    Learn
                </div>
              </div>
              <Link
                to="/tutorials"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  location.pathname === '/tutorials'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Tutorials className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                <span className="font-medium flex-1">Tutorials</span>
              </Link>
              <Link
                to="/resources"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  location.pathname === '/resources'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Resources className="w-5 h-5 flex-shrink-0 text-orange-500" />
                <span className="font-medium flex-1">Resources</span>
              </Link>
              <Link
                to="/glossary"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  location.pathname === '/glossary'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.Glossary className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span className="font-medium flex-1">Glossary</span>
              </Link>
              <Link
                to="/faq"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center space-x-3 px-2 py-2 rounded-lg transition ${
                  location.pathname === '/faq'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icons.FAQ className="w-5 h-5 flex-shrink-0 text-blue-500" />
                <span className="font-medium flex-1">FAQ</span>
              </Link>

              {/* Other Links */}
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mt-4 mb-2 border-t pt-4">
                More
              </div>
              <Link
                to="/blog"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <Icons.Blog className="w-5 h-5 flex-shrink-0 text-gray-500" />
                <span className="font-medium">Blog</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <Icons.About className="w-5 h-5 flex-shrink-0 text-gray-500" />
                <span className="font-medium">About</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <Icons.Contact className="w-5 h-5 flex-shrink-0 text-gray-500" />
                <span className="font-medium">Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
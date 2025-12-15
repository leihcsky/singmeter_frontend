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

  // Get tools grouped by category
  const toolsByCategory = getToolsByCategory();

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
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition"
              >
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
                    className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                  {tools
                    .filter((tool) => !tool.hidden)
                    .sort((a, b) => a.priority - b.priority)
                    .map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition text-left ${
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
                        <span className="text-lg flex-shrink-0">{tool.icon}</span>
                        <span className="flex-1 text-left">{tool.name}</span>
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
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition"
              >
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
                    className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition ${
                      location.pathname === '/tutorials'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Tutorials</span>
                  </Link>
                  <Link
                    to="/resources"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition ${
                      location.pathname === '/resources'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Resources</span>
                  </Link>
                  <Link
                    to="/glossary"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition ${
                      location.pathname === '/glossary'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Glossary</span>
                  </Link>
                  <Link
                    to="/faq"
                    className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition ${
                      location.pathname === '/faq'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => setShowLearnDropdown(false)}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>FAQ</span>
                  </Link>
                  </div>
                </>
              )}
            </div>

            {/* Other Navigation Links */}
            <Link to="/blog" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Contact
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
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                Tools
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
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-medium flex-1">{tool.name}</span>
                </Link>
              ))}

              {/* Learn Section */}
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mt-4 mb-2">
                Learn
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
                <span className="text-xl">📚</span>
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
                <span className="text-xl">📦</span>
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
                <span className="text-xl">📖</span>
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
                <span className="text-xl">❓</span>
                <span className="font-medium flex-1">FAQ</span>
              </Link>

              {/* Other Links */}
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mt-4 mb-2">
                More
              </div>
              <Link
                to="/blog"
                onClick={() => setShowMobileMenu(false)}
                className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Blog
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


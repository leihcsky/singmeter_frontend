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
            <div className="relative">
              <button
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                onMouseEnter={() => setShowToolsDropdown(true)}
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
                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  onMouseEnter={() => setShowToolsDropdown(true)}
                  onMouseLeave={() => setShowToolsDropdown(false)}
                >
                  {tools
                    .filter((tool) => !tool.hidden)
                    .sort((a, b) => a.priority - b.priority)
                    .map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className={`block px-4 py-2 text-sm rounded-lg transition ${
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
                        {tool.name}
                      </Link>
                    ))}
                </div>
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


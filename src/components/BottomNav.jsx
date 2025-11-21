/**
 * Bottom Navigation Component - Mobile-friendly tool switcher
 * Only shows on mobile devices (hidden on desktop)
 * Shows most popular tools + "More" button for additional tools
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tools } from '../config/tools';

const BottomNav = () => {
  const [showAllTools, setShowAllTools] = useState(false);
  const location = useLocation();

  // Use tools from config
  const allTools = tools;

  // Show top 3 tools in bottom nav, rest in "More" menu
  const maxBottomNavTools = 3;
  const bottomNavTools = allTools
    .filter(tool => !tool.comingSoon)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxBottomNavTools);
  
  const moreTools = allTools.slice(maxBottomNavTools);
  const hasMoreTools = moreTools.length > 0;

  // Check if current page is a tool page
  const isToolPage = allTools.some(tool => location.pathname === tool.path);

  // Don't show bottom nav on non-tool pages
  if (!isToolPage) return null;

  // Group tools by category for "More" menu
  const toolsByCategory = moreTools.reduce((acc, tool) => {
    const category = tool.category || 'Other Tools';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {});

  return (
    <>
      {/* Bottom Navigation Bar - Only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {/* Home Button */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-[70px]"
          >
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs font-medium text-gray-600">Home</span>
          </Link>

          {/* Tool Buttons */}
          {bottomNavTools.map((tool) => {
            const isActive = location.pathname === tool.path;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-[70px] ${
                  isActive
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl mb-1">{tool.icon}</span>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  {tool.shortName}
                </span>
              </Link>
            );
          })}

          {/* More Button (if there are more tools) */}
          {hasMoreTools && (
            <button
              onClick={() => setShowAllTools(true)}
              className="flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors hover:bg-gray-50 min-w-[70px]"
            >
              <span className="text-2xl mb-1">⋯</span>
              <span className="text-xs font-medium text-gray-600">More</span>
            </button>
          )}
        </div>
      </nav>

      {/* Full-screen Tools Menu - Only on mobile */}
      {showAllTools && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Tools</h2>
            <button
              onClick={() => setShowAllTools(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tools List */}
          <div className="px-4 py-6 space-y-6">
            {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={() => {
                        if (!tool.comingSoon) setShowAllTools(false);
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition ${
                        location.pathname === tool.path
                          ? 'bg-indigo-50 border-2 border-indigo-200'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                      } ${tool.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-3xl">{tool.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          location.pathname === tool.path ? 'text-indigo-600' : 'text-gray-900'
                        }`}>
                          {tool.name}
                        </div>
                      </div>
                      {tool.comingSoon && (
                        <span className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded-full font-medium">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default BottomNav;

/**
 * Result Screen - Display test results
 */

import { useState, useEffect, useRef } from 'react';

const ResultScreen = ({ result, onReset }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);
  
  // Voice type info
  const voiceTypeInfo = {
    'Bass': {
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: '🎻',
      description: 'Deep and powerful voice with rich, resonant tones',
      famous: 'Barry White, Johnny Cash'
    },
    'Baritone': {
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: '🎸',
      description: 'Warm and versatile voice with natural appeal',
      famous: 'Frank Sinatra, Elvis Presley'
    },
    'Tenor': {
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      icon: '🎺',
      description: 'Bright and soaring voice with clarity and power',
      famous: 'Freddie Mercury, Pavarotti'
    },
    'Alto': {
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      icon: '🎼',
      description: 'Rich and full-bodied voice with warmth',
      famous: 'Adele, Amy Winehouse'
    },
    'Mezzo-Soprano': {
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      icon: '🎵',
      description: 'Versatile voice blending warmth and brightness',
      famous: 'Beyoncé, Lady Gaga'
    },
    'Soprano': {
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      icon: '🦜',
      description: 'Crystal clear and agile voice with high range',
      famous: 'Mariah Carey, Ariana Grande'
    },
  };

  const info = voiceTypeInfo[result.voiceType] || voiceTypeInfo['Baritone'];
  const octaves = parseFloat(result.octaves);
  const isUnusualRange = octaves > 5;

  // Calculate visual range position (E2 to C6 as reference range)
  // E2 is the standard lowest note for Bass singers
  const minFreq = 82.41; // E2 (Bass lowest note)
  const maxFreq = 1046.50; // C6 (Soprano highest note)
  const lowestFreq = result.lowestFrequency;
  const highestFreq = result.highestFrequency;

  // Calculate percentage positions
  const startPercent = Math.max(0, Math.min(100, ((lowestFreq - minFreq) / (maxFreq - minFreq)) * 100));
  const endPercent = Math.max(0, Math.min(100, ((highestFreq - minFreq) / (maxFreq - minFreq)) * 100));
  const rangeWidth = endPercent - startPercent;

  const handleShare = (platform) => {
    const text = `I just tested my vocal range on SingMeter! 🎵\nRange: ${result.lowestNote} - ${result.highestNote} (${result.octaves} octaves)\nVoice Type: ${result.voiceType}`;
    const url = 'https://singmeter.com';
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${url}`);
        alert('Results copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-block animate-bounce mb-3 sm:mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 px-4">Test Complete! 🎉</h1>
        <p className="text-base sm:text-lg text-gray-600 px-4">Here's your unique vocal signature</p>
      </div>

      {/* Warning for unusual range */}
      {isUnusualRange && (
        <div className="mb-4 sm:mb-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4 mx-2 sm:mx-0">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-yellow-800 mb-1">Unusually Wide Range Detected</h3>
              <p className="text-xs sm:text-sm text-yellow-700">
                Your range ({octaves} octaves) is exceptionally wide. This might indicate background noise was detected.
                Try testing again in a quieter environment for more accurate results.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Result Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-4 sm:mb-6">
        {/* Voice Type Header */}
        <div className={`bg-gradient-to-r ${info.color} p-6 sm:p-8 text-white text-center`}>
          <div className="text-5xl sm:text-7xl mb-3 sm:mb-4">{info.icon}</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">{result.voiceType}</h2>
          <p className="text-base sm:text-lg opacity-90 px-2">{info.description}</p>
          <div className="mt-3 sm:mt-4 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <span className="text-xs sm:text-sm">Famous voices:</span>
            <span className="text-xs sm:text-sm font-semibold">{info.famous}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8">
          {/* Vocal Range */}
          <div className={`${info.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6`}>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Vocal Range</div>
            <div className={`text-xl sm:text-3xl font-bold ${info.textColor} mb-1`}>
              {result.lowestNote} - {result.highestNote}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {result.lowestFrequency.toFixed(1)} - {result.highestFrequency.toFixed(1)} Hz
            </div>
          </div>

          {/* Range Width */}
          <div className={`${info.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6`}>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Range Width</div>
            <div className={`text-xl sm:text-3xl font-bold ${info.textColor} mb-1`}>
              {result.octaves} octaves
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {result.semitones} semitones
            </div>
          </div>

          {/* Percentile */}
          <div className={`${info.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:col-span-2 md:col-span-1`}>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Comparison</div>
            <div className={`text-xl sm:text-3xl font-bold ${info.textColor} mb-1`}>
              {octaves < 2 ? 'Average' : octaves < 3 ? 'Good' : octaves < 4 ? 'Great' : 'Exceptional'}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {octaves < 2 ? '1-2 octaves' : octaves < 3 ? '2-3 octaves' : octaves < 4 ? '3-4 octaves' : '4+ octaves'}
            </div>
          </div>
        </div>

        {/* Visual Range Bar */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Your Vocal Range Visualization</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">
              The dark bar shows your tested range within the typical vocal range (E2-C6)
            </p>
          </div>

          {/* Full spectrum bar with reference markers */}
          <div className="relative h-12 sm:h-14 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-visible">
            {/* Reference markers (E2, C4, C6) */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-300"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gray-300"></div>

            {/* User's actual range (highlighted) */}
            <div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded shadow-lg transition-all duration-500"
              style={{
                left: `${startPercent}%`,
                width: `${rangeWidth}%`
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>

            {/* Start marker (lowest note) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 shadow-md z-10"
              style={{ left: `${startPercent}%` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>

            {/* End marker (highest note) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 shadow-md z-10"
              style={{ left: `${endPercent}%` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* User's range labels */}
          <div className="relative mt-3 sm:mt-4">
            <div className="flex items-center justify-between">
              <div className="text-left" style={{ marginLeft: `${startPercent}%` }}>
                <div className="text-xs sm:text-sm font-bold text-indigo-600">{result.lowestNote}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Lowest</div>
                <div className="text-[10px] text-gray-400">{result.lowestFrequency.toFixed(1)} Hz</div>
              </div>
              <div className="text-center">
                <div className="text-sm sm:text-base font-bold text-purple-600">{result.octaves} octaves</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Your Range</div>
                <div className="text-[10px] text-gray-400">{result.semitones} semitones</div>
              </div>
              <div className="text-right" style={{ marginRight: `${100 - endPercent}%` }}>
                <div className="text-xs sm:text-sm font-bold text-purple-600">{result.highestNote}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Highest</div>
                <div className="text-[10px] text-gray-400">{result.highestFrequency.toFixed(1)} Hz</div>
              </div>
            </div>
          </div>

          {/* Reference scale */}
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-1">
              <span>E2</span>
              <span>C4</span>
              <span>C6</span>
            </div>
            <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400">
              <span>82 Hz (Bass Low)</span>
              <span>262 Hz (Middle C)</span>
              <span>1046 Hz (Soprano High)</span>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-3 sm:mt-4 bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-2">
              <span className="text-lg flex-shrink-0">💡</span>
              <div className="text-[10px] sm:text-xs text-blue-800">
                <strong>How to read this:</strong> The gray background represents the typical vocal range (E2-C6),
                covering all standard voice types from Bass to Soprano.
                The colored bar shows your tested range from {result.lowestNote} ({result.lowestFrequency.toFixed(1)} Hz)
                to {result.highestNote} ({result.highestFrequency.toFixed(1)} Hz).
                Yellow markers indicate your lowest and highest notes.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-8 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-start">
            <button
              onClick={onReset}
              className="flex-1 sm:min-w-[200px] px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Test Again
            </button>

            <div className="relative flex-1 sm:flex-initial" ref={shareMenuRef}>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md transition-all duration-300"
              >
                Share Results 📤
              </button>

              {showShareMenu && (
                <div className="absolute left-0 sm:right-0 sm:left-auto bottom-full mb-2 w-full sm:w-56 bg-white rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-indigo-50 flex items-center space-x-2 sm:space-x-3 transition"
                  >
                    <span className="text-lg sm:text-xl">🐦</span>
                    <span className="text-sm sm:text-base font-medium">Share on Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-indigo-50 flex items-center space-x-2 sm:space-x-3 transition"
                  >
                    <span className="text-lg sm:text-xl">📘</span>
                    <span className="text-sm sm:text-base font-medium">Share on Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-indigo-50 flex items-center space-x-2 sm:space-x-3 transition"
                  >
                    <span className="text-lg sm:text-xl">📋</span>
                    <span className="text-sm sm:text-base font-medium">Copy to Clipboard</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 What's Next?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Practice Regularly</h4>
            <p className="text-sm text-gray-600">
              Your vocal range can expand with consistent practice and proper technique
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🎵 Choose Right Songs</h4>
            <p className="text-sm text-gray-600">
              Select songs that fit your range to sound your best and avoid strain
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">👨‍🏫 Consider Training</h4>
            <p className="text-sm text-gray-600">
              A vocal coach can help you expand your range safely and effectively
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🔄 Test Periodically</h4>
            <p className="text-sm text-gray-600">
              Track your progress by testing your range every few months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;


/**
 * Result Screen - Display test results
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PianoKeyboard from './PianoKeyboard';

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
  
  // Voice type info with detailed explanations
  const voiceTypeInfo = {
    'Bass': {
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: '🎻',
      description: 'Deep and powerful voice with rich, resonant tones',
      famous: 'Barry White, Johnny Cash',
      explanation: 'The lowest male voice type, known for its depth and power',
      typicalRange: 'E2 to E4',
      characteristics: 'Rich, warm, and commanding presence',
      bestFor: 'Blues, soul, opera bass roles',
      funFact: 'Only 2% of men are true basses!'
    },
    'Baritone': {
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: '🎸',
      description: 'Warm and versatile voice with natural appeal',
      famous: 'Frank Sinatra, Elvis Presley',
      explanation: 'The most common male voice type, balanced and versatile',
      typicalRange: 'A2 to A4',
      characteristics: 'Warm, smooth, and naturally appealing',
      bestFor: 'Pop, rock, jazz, musical theater',
      funFact: 'Most male pop stars are baritones!'
    },
    'Tenor': {
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      icon: '🎺',
      description: 'Bright and soaring voice with clarity and power',
      famous: 'Freddie Mercury, Pavarotti',
      explanation: 'The highest common male voice, prized for its brightness',
      typicalRange: 'C3 to C5',
      characteristics: 'Bright, powerful, and emotionally expressive',
      bestFor: 'Rock, opera, R&B, power ballads',
      funFact: 'Tenors often steal the show with high notes!'
    },
    'Alto': {
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      icon: '🎼',
      description: 'Rich and full-bodied voice with warmth',
      famous: 'Adele, Amy Winehouse',
      explanation: 'The lowest female voice type, rare and distinctive',
      typicalRange: 'F3 to F5',
      characteristics: 'Rich, warm, and soulful depth',
      bestFor: 'Soul, jazz, blues, folk',
      funFact: 'True altos are rare gems in the vocal world!'
    },
    'Mezzo-Soprano': {
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      icon: '🎵',
      description: 'Versatile voice blending warmth and brightness',
      famous: 'Beyoncé, Lady Gaga',
      explanation: 'The most common female voice, perfectly balanced',
      typicalRange: 'A3 to A5',
      characteristics: 'Versatile, expressive, and dynamic',
      bestFor: 'Pop, R&B, musical theater, opera',
      funFact: 'The Swiss Army knife of female voices!'
    },
    'Soprano': {
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      icon: '🦜',
      description: 'Crystal clear and agile voice with high range',
      famous: 'Mariah Carey, Ariana Grande',
      explanation: 'The highest female voice type, known for dazzling highs',
      typicalRange: 'C4 to C6',
      characteristics: 'Bright, agile, and crystalline clarity',
      bestFor: 'Pop, opera, classical, coloratura',
      funFact: 'Can hit notes that make dogs jealous! 🐕'
    },
  };

  const info = voiceTypeInfo[result.voiceType] || voiceTypeInfo['Baritone'];
  const octaves = parseFloat(result.octaves);
  const isUnusualRange = octaves > 5;

  // Famous singers with detailed vocal ranges
  const famousSingers = {
    // Male Singers
    'Freddie Mercury': { range: 'F2-F6', octaves: 4, type: 'Tenor', genre: 'Rock', overlap: 0 },
    'Johnny Cash': { range: 'E2-B4', octaves: 2.5, type: 'Bass/Baritone', genre: 'Country', overlap: 0 },
    'Bruno Mars': { range: 'A2-D6', octaves: 3.5, type: 'Tenor', genre: 'Pop', overlap: 0 },
    'Frank Sinatra': { range: 'A2-A4', octaves: 2, type: 'Baritone', genre: 'Jazz', overlap: 0 },
    'Elvis Presley': { range: 'A2-E5', octaves: 2.5, type: 'Baritone', genre: 'Rock', overlap: 0 },
    'Michael Jackson': { range: 'F#2-E6', octaves: 3.5, type: 'Tenor', genre: 'Pop', overlap: 0 },
    'Luciano Pavarotti': { range: 'C3-C5', octaves: 2, type: 'Tenor', genre: 'Opera', overlap: 0 },
    
    // Female Singers
    'Whitney Houston': { range: 'A2-C6', octaves: 3.3, type: 'Mezzo-Soprano', genre: 'R&B', overlap: 0 },
    'Ariana Grande': { range: 'D3-E7', octaves: 4.2, type: 'Soprano', genre: 'Pop', overlap: 0 },
    'Adele': { range: 'C3-F5', octaves: 2.5, type: 'Mezzo-Soprano', genre: 'Soul', overlap: 0 },
    'Mariah Carey': { range: 'F2-G7', octaves: 5, type: 'Soprano', genre: 'Pop', overlap: 0 },
    'Beyoncé': { range: 'A2-E6', octaves: 3.5, type: 'Mezzo-Soprano', genre: 'R&B', overlap: 0 },
    'Lady Gaga': { range: 'F3-G6', octaves: 3, type: 'Mezzo-Soprano', genre: 'Pop', overlap: 0 },
    'Celine Dion': { range: 'B2-C6', octaves: 3.3, type: 'Mezzo-Soprano', genre: 'Pop', overlap: 0 },
  };

  // Helper function to convert note to semitone number (C4 = 60)
  const noteToSemitone = (note) => {
    const noteMap = { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11 };
    const match = note.match(/([A-G]#?)(\d+)/);
    if (!match) return 0;
    const [, noteName, octave] = match;
    return noteMap[noteName] + (parseInt(octave) + 1) * 12;
  };

  // Calculate overlap between user range and famous singer range
  const calculateOverlap = (singerRange) => {
    const [singerLow, singerHigh] = singerRange.split('-').map(noteToSemitone);
    const userLow = noteToSemitone(result.lowestNote);
    const userHigh = noteToSemitone(result.highestNote);
    
    const overlapStart = Math.max(singerLow, userLow);
    const overlapEnd = Math.min(singerHigh, userHigh);
    const overlap = Math.max(0, overlapEnd - overlapStart);
    const userRange = userHigh - userLow;
    
    return userRange > 0 ? Math.round((overlap / userRange) * 100) : 0;
  };

  // Find similar singers
  const similarSingers = Object.entries(famousSingers)
    .map(([name, data]) => ({
      name,
      ...data,
      overlap: calculateOverlap(data.range)
    }))
    .filter(singer => {
      // Filter by same voice type or similar range
      const sameType = singer.type.includes(result.voiceType) || result.voiceType.includes(singer.type.split('/')[0]);
      const similarOctaves = Math.abs(singer.octaves - octaves) < 1.5;
      return sameType || (similarOctaves && singer.overlap > 20);
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 6); // Show top 6 similar singers

  const handleShare = (platform) => {
    // Generate fun, engaging share text based on voice type and range
    const octaves = parseFloat(result.octaves);
    const voiceEmoji = info.icon;

    // Create personalized, fun messages
    let shareText = '';

    // Add voice type specific opening
    const openings = {
      'Bass': `🎻 Just discovered I'm a Bass! My voice goes DEEP ${result.lowestNote} - ${result.highestNote}`,
      'Baritone': `🎸 Turns out I'm a Baritone! Vocal range: ${result.lowestNote} - ${result.highestNote}`,
      'Tenor': `🎺 I'm officially a Tenor! Hitting those high notes: ${result.lowestNote} - ${result.highestNote}`,
      'Alto': `🎼 Rare find: I'm an Alto! My soulful range: ${result.lowestNote} - ${result.highestNote}`,
      'Mezzo-Soprano': `🎵 I'm a Mezzo-Soprano! My versatile range: ${result.lowestNote} - ${result.highestNote}`,
      'Soprano': `🦜 Sky-high Soprano here! My range: ${result.lowestNote} - ${result.highestNote}`
    };

    shareText = openings[result.voiceType] || `${voiceEmoji} My vocal range: ${result.lowestNote} - ${result.highestNote}`;

    // Add range commentary
    if (octaves >= 4) {
      shareText += ` (${result.octaves} octaves - that's HUGE! 🤯)`;
    } else if (octaves >= 3) {
      shareText += ` (${result.octaves} octaves - pretty impressive! 🎉)`;
    } else {
      shareText += ` (${result.octaves} octaves)`;
    }

    // Add famous comparison
    shareText += `\n\nSame voice type as ${info.famous}! 🌟`;

    // Add call to action
    shareText += `\n\nDiscover YOUR voice on SingMeter! 🎤`;

    const url = 'https://www.singmeter.com';

    switch(platform) {
      case 'twitter':
        // Twitter has character limit, use shorter version
        const twitterText = `${voiceEmoji} Just tested my vocal range: ${result.lowestNote}-${result.highestNote} (${result.octaves} octaves)! I'm a ${result.voiceType} like ${info.famous.split(',')[0]}! 🎤 Test yours:`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${url}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n\n${url}`);
        alert('🎉 Results copied to clipboard! Share your vocal journey!');
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

        {/* Voice Type Explanation Card */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-8 border-t border-gray-100">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-start space-x-3 mb-4">
              <div className="text-2xl sm:text-3xl">{info.icon}</div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                  What is a {result.voiceType}?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {info.explanation}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Typical Range */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-base sm:text-lg">📊</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Typical Range</span>
                </div>
                <div className={`text-sm sm:text-base font-bold ${info.textColor}`}>
                  {info.typicalRange}
                </div>
              </div>

              {/* Characteristics */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-base sm:text-lg">✨</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Characteristics</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {info.characteristics}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-base sm:text-lg">🎵</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Best For</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {info.bestFor}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-base sm:text-lg">💡</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Fun Fact</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {info.funFact}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Piano Keyboard Visualization */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-8 border-t border-gray-100">
          <div className="mt-6 sm:mt-8">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">🎹</span>
                Your Range on Piano Keyboard
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                See your vocal range mapped to piano keys. Each key represents one semitone (half step) in music.
              </p>
            </div>

            {/* Piano Keyboard Component */}
            <PianoKeyboard
              lowestNote={result.lowestNote}
              highestNote={result.highestNote}
              lowestFreq={result.lowestFrequency}
              highestFreq={result.highestFrequency}
            />

            {/* Quick Stats */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-indigo-100">
                <div className="text-xs sm:text-sm text-indigo-600 font-medium mb-1">Lowest Note</div>
                <div className="text-lg sm:text-xl font-bold text-indigo-700">{result.lowestNote}</div>
                <div className="text-xs text-indigo-500">{result.lowestFrequency.toFixed(1)} Hz</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-purple-100">
                <div className="text-xs sm:text-sm text-purple-600 font-medium mb-1">Range Width</div>
                <div className="text-lg sm:text-xl font-bold text-purple-700">{result.octaves} octaves</div>
                <div className="text-xs text-purple-500">{result.semitones} semitones</div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-3 sm:p-4 border border-pink-100">
                <div className="text-xs sm:text-sm text-pink-600 font-medium mb-1">Highest Note</div>
                <div className="text-lg sm:text-xl font-bold text-pink-700">{result.highestNote}</div>
                <div className="text-xs text-pink-500">{result.highestFrequency.toFixed(1)} Hz</div>
              </div>
            </div>

            {/* Understanding Your Result */}
            <div className="mt-6 sm:mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Understanding Your Result</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">•</span>
                      <span>Your range spans <strong>{result.semitones} keys</strong> on a piano keyboard</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">•</span>
                      <span>
                        Middle C (C4) is {
                          result.lowestFrequency > 262 ? 'below' :
                          result.highestFrequency < 262 ? 'above' :
                          'within'
                        } your range
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">•</span>
                      <span>You can sing notes from <strong>{result.lowestNote}</strong> to <strong>{result.highestNote}</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">•</span>
                      <span>Try finding these notes on a piano or keyboard to hear your range!</span>
                    </li>
                  </ul>
                </div>
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

      {/* Famous Singers Comparison Section */}
      {similarSingers.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">🌟 Compare with Famous Singers</h3>
              <p className="text-sm sm:text-base text-gray-600">
                See how your vocal range compares to famous singers with similar voice types
              </p>
            </div>
            <span className="text-3xl sm:text-4xl">🎤</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {similarSingers.map((singer, index) => (
              <div
                key={singer.name}
                className="bg-white rounded-xl p-4 sm:p-5 border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{singer.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{singer.genre}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        {singer.type}
                      </span>
                      <span className="text-xs text-gray-600">
                        {singer.octaves} octaves
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-gray-700 mb-2">
                      Range: {singer.range}
                    </div>
                    {singer.overlap > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Range Overlap</span>
                          <span className="text-xs font-bold text-purple-600">{singer.overlap}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                            style={{ width: `${singer.overlap}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Note:</strong> These ranges are approximate and based on public analyses. 
                  What matters most is how you use your range musically, not just how wide it is.
                </p>
                <Link
                  to="/blog/famous-singers-vocal-ranges"
                  className="text-sm text-purple-600 hover:text-purple-700 font-semibold underline inline-flex items-center"
                >
                  Learn more about famous singers' vocal ranges →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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


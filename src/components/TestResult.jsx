/**
 * Test Result Display Component
 */

import { useState, useRef } from 'react';
import { saveTestResult } from '../utils/api';

const TestResult = ({ result, onReset }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const resultCardRef = useRef(null);

  // Voice type descriptions
  const voiceTypeDescriptions = {
    'Bass': {
      title: 'Bass',
      description: 'Your voice is deep and powerful, with a rich warmth like a cello',
      color: 'from-blue-600 to-blue-800',
      emoji: '🎻'
    },
    'Baritone': {
      title: 'Baritone',
      description: 'Your voice is warm and magnetic, full of captivating resonance',
      color: 'from-blue-500 to-purple-600',
      emoji: '🎸'
    },
    'Tenor': {
      title: 'Tenor',
      description: 'Your voice is bright and soaring, with trumpet-like clarity',
      color: 'from-purple-500 to-pink-600',
      emoji: '🎺'
    },
    'Alto': {
      title: 'Alto',
      description: 'Your voice is rich and full-bodied, elegantly alluring like fine wine',
      color: 'from-orange-500 to-red-600',
      emoji: '🎼'
    },
    'Mezzo-Soprano': {
      title: 'Mezzo-Soprano',
      description: 'Your voice is gentle yet powerful, blending warmth with brilliance',
      color: 'from-pink-500 to-rose-600',
      emoji: '🎵'
    },
    'Soprano': {
      title: 'Soprano',
      description: 'Your voice is crystal clear and bright, as agile as a songbird',
      color: 'from-rose-500 to-pink-600',
      emoji: '🦜'
    },
  };

  const voiceInfo = voiceTypeDescriptions[result.voiceType] || voiceTypeDescriptions['Baritone'];

  // Check if range is unusually wide (might indicate noise detection)
  const octaves = result.semitones / 12;
  const isUnusualRange = octaves > 5; // More than 5 octaves is very rare

  // Save result to backend
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveTestResult(result);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  // Share result
  const handleShare = () => {
    const shareText = `I tested my vocal range on SingMeter: ${result.lowestNote} - ${result.highestNote}, voice type: ${voiceInfo.title}! Test yours now!`;

    if (navigator.share) {
      navigator.share({
        title: 'SingMeter Vocal Range Test Result',
        text: shareText,
        url: window.location.href,
      }).catch(err => console.log('Share failed:', err));
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(shareText + '\n' + window.location.href)
        .then(() => alert('Result copied to clipboard!'))
        .catch(err => console.error('Copy failed:', err));
    }
  };

  // Download result image
  const handleDownload = async () => {
    // Can use html2canvas library to generate image
    // Simplified version: prompt user to screenshot
    alert('Please use your screenshot tool to save the result image');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Result card */}
        <div ref={resultCardRef} className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 Test Complete!</h1>
            <p className="text-gray-600">Here's your unique vocal signature</p>
          </div>

          {/* Warning for unusual range */}
          {isUnusualRange && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Unusually Wide Range Detected</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Your detected range ({octaves.toFixed(1)} octaves) is exceptionally wide. This might indicate:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Background noise was detected as low frequencies</li>
                      <li>Environmental sounds (AC, fans, traffic) were picked up</li>
                      <li>Test was performed in a noisy environment</li>
                    </ul>
                    <p className="mt-2 font-medium">💡 Tip: Try testing again in a quiet room for more accurate results.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Voice type card */}
          <div className={`bg-gradient-to-r ${voiceInfo.color} rounded-2xl p-8 text-white mb-8`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{voiceInfo.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">{voiceInfo.title}</h2>
              <p className="text-lg opacity-90">{result.voiceType}</p>
            </div>
          </div>

          {/* Vocal range info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Range */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Vocal Range</h3>
              <div className="text-3xl font-bold text-blue-600">
                {result.lowestNote} - {result.highestNote}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {result.lowestFrequency.toFixed(2)} Hz - {result.highestFrequency.toFixed(2)} Hz
              </div>
            </div>

            {/* Width */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Range Width</h3>
              <div className="text-3xl font-bold text-purple-600">
                {result.semitones} semitones
              </div>
              <div className="text-sm text-gray-500 mt-2">
                About {Math.floor(result.semitones / 12)} octave{Math.floor(result.semitones / 12) !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Voice description */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Voice Characteristics</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {voiceInfo.description}
            </p>
          </div>

          {/* Visual color band */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Range Visualization</h3>
            <div className="h-16 rounded-xl bg-gradient-to-r from-blue-500 via-green-500 to-red-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-semibold">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {result.lowestNote}
                </span>
                <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                  {result.highestNote}
                </span>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              💡 <strong>Pro Tip:</strong> This result reflects your current vocal range. With proper training, your range can expand even further!
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            📤 Share Result
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              saveSuccess
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {isSaving ? 'Saving...' : saveSuccess ? '✓ Saved' : '💾 Save Result'}
          </button>

          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 border-2 border-gray-200 transition-all"
          >
            📥 Download Image
          </button>

          <button
            onClick={onReset}
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 border-2 border-gray-200 transition-all"
          >
            🔄 Test Again
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>SingMeter - Discover Your Voice</p>
        </div>
      </div>
    </div>
  );
};

export default TestResult;


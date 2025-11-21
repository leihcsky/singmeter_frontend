/**
 * Unified Test Screen - Single-page test interface with side-by-side lowest/highest note testing
 */

import { useState } from 'react';
import PitchVisualizer from './PitchVisualizer';
import PianoSelector from './PianoSelector';
import { frequencyToNote } from '../utils/pitchDetector';

const UnifiedTestScreen = ({
  // Lowest note states
  lowestInputMode,
  lowestCountdown,
  lowestIsRecording,
  lowestPitch,
  lowestNote,
  lowestManualPitch,
  lowestCaptured,
  onLowestStart,
  onLowestReset,
  onLowestInputModeChange,
  onLowestManualPitchSelect,
  
  // Highest note states
  highestInputMode,
  highestCountdown,
  highestIsRecording,
  highestPitch,
  highestNote,
  highestManualPitch,
  highestCaptured,
  onHighestStart,
  onHighestReset,
  onHighestInputModeChange,
  onHighestManualPitchSelect,
  
  // Analysis
  onAnalyze,
  canAnalyze
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          📊 Vocal Range Test
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Sing or select your lowest and highest notes, then click analyze to see your results
        </p>
      </div>

      {/* Vertical stacked test areas */}
      <div className="space-y-6 mb-8">
        {/* Lowest Note Section */}
        <TestArea
          title="🎵 Lowest Note"
          subtitle=""
          noteType="lowest"
          gradient="from-blue-500 to-cyan-500"
          bgGradient="from-blue-50 to-cyan-50"
          inputMode={lowestInputMode}
          countdown={lowestCountdown}
          isRecording={lowestIsRecording}
          currentPitch={lowestPitch}
          currentNote={lowestNote}
          manualPitch={lowestManualPitch}
          captured={lowestCaptured}
          onStart={onLowestStart}
          onReset={onLowestReset}
          onInputModeChange={onLowestInputModeChange}
          onManualPitchSelect={onLowestManualPitchSelect}
        />

        {/* Highest Note Section */}
        <TestArea
          title="🎶 Highest Note"
          subtitle=""
          noteType="highest"
          gradient="from-purple-500 to-pink-500"
          bgGradient="from-purple-50 to-pink-50"
          inputMode={highestInputMode}
          countdown={highestCountdown}
          isRecording={highestIsRecording}
          currentPitch={highestPitch}
          currentNote={highestNote}
          manualPitch={highestManualPitch}
          captured={highestCaptured}
          onStart={onHighestStart}
          onReset={onHighestReset}
          onInputModeChange={onHighestInputModeChange}
          onManualPitchSelect={onHighestManualPitchSelect}
        />
      </div>

      {/* Analysis Button */}
      <div className="text-center mb-8">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className={`px-12 py-4 text-lg font-bold rounded-2xl shadow-lg transition-all ${
            canAnalyze
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAnalyze ? '🎯 Analyze My Range' : '⏳ Complete both tests first'}
        </button>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
        <p className="text-gray-700">
          💡 <strong>Tip:</strong> Sing at your most comfortable pitch, don't strain. Each note needs to be held for at least 3 seconds to be captured.
        </p>
      </div>
    </div>
  );
};

// Individual test area component
const TestArea = ({
  title,
  subtitle,
  noteType, // 'lowest' or 'highest'
  gradient,
  bgGradient,
  inputMode,
  countdown,
  isRecording,
  currentPitch,
  currentNote,
  manualPitch,
  captured,
  onStart,
  onReset,
  onInputModeChange,
  onManualPitchSelect
}) => {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-gray-200 transition`}>
      {/* Header and Controls - Horizontal layout for full width */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {/* Title */}
        <div className="text-center sm:text-left">
          <h2 className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onInputModeChange('sing')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              inputMode === 'sing'
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-white/50 text-gray-600 hover:bg-white/70'
            }`}
          >
            🎤 Sing
          </button>
          <button
            onClick={() => onInputModeChange('manual')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              inputMode === 'manual'
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-white/50 text-gray-600 hover:bg-white/70'
            }`}
          >
            🎹 Manual
          </button>
        </div>
      </div>

      {/* Status Display */}
      {captured && inputMode === 'sing' ? (
        // Captured state - only for Sing mode (centered)
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-green-600 text-4xl mb-2">✓</div>
            <div className="text-lg font-bold text-gray-900 mb-1">Captured</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {captured.note}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {captured.frequency.toFixed(2)} Hz
            </div>
            <button
              onClick={onReset}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              🔄 Retest
            </button>
          </div>
        </div>
      ) : inputMode === 'sing' ? (
        // Sing mode - centered
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6">
            {!isRecording && countdown === 0 ? (
              // Ready to start
              <div className="text-center">
                <button
                  onClick={onStart}
                  className={`px-8 py-3 bg-gradient-to-r ${gradient} text-white font-bold rounded-xl shadow-md hover:shadow-lg transition`}
                >
                  🎤 Start Test
                </button>
              </div>
            ) : countdown > 0 ? (
              // Countdown
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">{countdown}</div>
                <div className="text-sm text-gray-600">Get ready...</div>
              </div>
            ) : (
              // Recording
              <div className="text-center">
                <PitchVisualizer
                  currentPitch={currentPitch}
                  currentNote={currentNote}
                  isRecording={isRecording}
                />
                <div className="mt-3 text-sm text-gray-600">
                  🎵 Hold steady pitch for 3+ seconds
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Manual mode - full width for piano
        <div className="bg-white rounded-xl p-4">
          {/* Show selected note if captured or manual pitch selected */}
          {(captured || manualPitch) && (
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-gray-900">
                Selected: {captured ? captured.note : (manualPitch ? frequencyToNote(manualPitch).fullNote : '')}
              </div>
              {!captured && manualPitch && (
                <div className="text-sm text-gray-600">
                  {manualPitch.toFixed(2)} Hz
                </div>
              )}
            </div>
          )}

          <PianoSelector
            mode={noteType}
            selectedPitch={manualPitch}
            onSelect={onManualPitchSelect}
          />
          <div className="text-center mt-3 text-sm text-gray-600">
            {noteType === 'lowest'
              ? 'Click the lowest comfortable note you can sing'
              : 'Click the highest comfortable note you can sing'}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedTestScreen;


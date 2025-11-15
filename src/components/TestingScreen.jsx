/**
 * Testing Screen - Active test interface
 */

import { useState } from 'react';
import PitchVisualizer from './PitchVisualizer';
import PianoSelector from './PianoSelector';

const TestingScreen = ({
  currentStep,
  stepInfo,
  isRecording,
  countdown,
  currentPitch,
  currentNote,
  lowestPitch,
  highestPitch,
  onNext,
  onCancel,
  onPrevious,
  nextButtonText,
  inputMode,
  onInputModeChange,
  manualPitch,
  onManualPitchSelect
}) => {
  const steps = ['Lowest Note', 'Highest Note'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar - 紧凑版 */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center" style={{ flex: '1 1 0' }}>
              <div className="flex flex-col items-center" style={{ flex: '1 1 0' }}>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className={`text-[10px] sm:text-xs mt-1 font-medium text-center whitespace-nowrap ${
                  index === currentStep ? 'text-indigo-600 font-semibold' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{ flex: '0 0 30px', margin: '0 6px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Test Card - 紧凑版 */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Step Header - 紧凑版 */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 sm:p-4 text-white text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="text-2xl sm:text-3xl">{stepInfo.icon}</div>
            <div className="text-left">
              <h2 className="text-lg sm:text-xl font-bold">{stepInfo.title}</h2>
              <p className="text-xs sm:text-sm opacity-90">{stepInfo.instruction}</p>
            </div>
          </div>
        </div>

        {/* Input Mode Selection - 紧凑版 */}
        <div className="p-2 sm:p-3 border-b border-gray-200">
          <div className="flex gap-2">
            {/* Sing It Option */}
            <button
              onClick={() => onInputModeChange('sing')}
              className={`
                flex-1 p-2 sm:p-3 rounded-lg border-2 transition-all duration-200
                ${inputMode === 'sing'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
                }
              `}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl">🎤</span>
                <div className={`text-xs sm:text-sm font-semibold ${inputMode === 'sing' ? 'text-indigo-700' : 'text-gray-700'}`}>
                  Sing It
                </div>
                {inputMode === 'sing' && (
                  <svg className="w-3.5 h-3.5 text-indigo-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>

            {/* Select Manually Option */}
            <button
              onClick={() => onInputModeChange('manual')}
              className={`
                flex-1 p-2 sm:p-3 rounded-lg border-2 transition-all duration-200
                ${inputMode === 'manual'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
                }
              `}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl">🎹</span>
                <div className={`text-xs sm:text-sm font-semibold ${inputMode === 'manual' ? 'text-indigo-700' : 'text-gray-700'}`}>
                  Select Manually
                </div>
                {inputMode === 'manual' && (
                  <svg className="w-3.5 h-3.5 text-indigo-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Sing It Mode - 紧凑版 */}
        {inputMode === 'sing' && (
          <>
            {/* Countdown or Recording Indicator */}
            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
              {!isRecording && countdown > 0 ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-indigo-600">{countdown}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Get ready...</p>
                </div>
              ) : (
                <div className="text-center py-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-red-500 text-white rounded-full animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs sm:text-sm font-semibold">Recording...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pitch Visualizer */}
            {isRecording && (
              <div className="p-3 sm:p-4">
                <PitchVisualizer
                  currentPitch={currentPitch}
                  currentNote={currentNote}
                  lowestPitch={lowestPitch}
                  highestPitch={highestPitch}
                />
              </div>
            )}
          </>
        )}

        {/* Manual Selection Mode - 紧凑版 */}
        {inputMode === 'manual' && (
          <div className="p-3 sm:p-4">
            <PianoSelector
              mode={currentStep === 0 ? 'lowest' : 'highest'}
              selectedPitch={manualPitch}
              onSelect={onManualPitchSelect}
            />
          </div>
        )}

        {/* Instructions - 简化版，只在 Sing It 模式显示 */}
        {inputMode === 'sing' && (
          <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs text-gray-600">
                  <span className="font-semibold">Tip:</span> Sing a steady "Ahh" sound for 2-3 seconds in your comfortable range
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - 紧凑版 */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={onPrevious}
                className="px-3 py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}
            <button
              onClick={onCancel}
              className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={onNext}
              disabled={inputMode === 'sing' ? !isRecording : !manualPitch}
              className={`flex-[2] px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                (inputMode === 'sing' ? isRecording : manualPitch)
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {nextButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingScreen;


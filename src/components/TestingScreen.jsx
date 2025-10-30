/**
 * Testing Screen - Active test interface
 */

import PitchVisualizer from './PitchVisualizer';

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
  nextButtonText
}) => {
  const steps = ['Natural Voice', 'Lowest Note', 'Highest Note'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center mb-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center" style={{ flex: '1 1 0' }}>
              <div className="flex flex-col items-center" style={{ flex: '1 1 0' }}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-indigo-600 text-white ring-2 sm:ring-4 ring-indigo-200 animate-pulse-scale'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-center whitespace-nowrap ${
                  index === currentStep ? 'text-indigo-600 font-semibold' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 sm:h-1 rounded-full transition-all duration-500 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{ flex: '0 0 40px', margin: '0 8px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Test Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Step Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 sm:p-8 text-white text-center">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{stepInfo.icon}</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{stepInfo.title}</h2>
          <p className="text-base sm:text-xl opacity-90 mb-1 sm:mb-2">{stepInfo.instruction}</p>
          <p className="text-xs sm:text-sm opacity-75">{stepInfo.tip}</p>
        </div>

        {/* Countdown or Recording Indicator */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
          {!isRecording && countdown > 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-lg mb-3 sm:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-indigo-600">{countdown}</span>
              </div>
              <p className="text-base sm:text-lg text-gray-600">Get ready...</p>
            </div>
          ) : (
            <div className="text-center py-3 sm:py-4">
              <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-full animate-pulse">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                <span className="text-sm sm:text-base font-semibold">Recording...</span>
              </div>
            </div>
          )}
        </div>

        {/* Pitch Visualizer */}
        {isRecording && (
          <div className="p-4 sm:p-6">
            <PitchVisualizer
              currentPitch={currentPitch}
              currentNote={currentNote}
              lowestPitch={lowestPitch}
              highestPitch={highestPitch}
            />
          </div>
        )}

        {/* Instructions */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Tips for best results:</h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
                <li>• Sing a steady "Ahh" sound for 2-3 seconds</li>
                <li>• Stay in your comfortable range - don't strain</li>
                <li>• Keep the same volume throughout</li>
                <li>• Make sure you're in a quiet environment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {currentStep > 0 && (
              <button
                onClick={onPrevious}
                className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous Step</span>
                <span className="sm:hidden">Previous</span>
              </button>
            )}
            <button
              onClick={onCancel}
              className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition whitespace-nowrap"
            >
              <span className="hidden sm:inline">Cancel Test</span>
              <span className="sm:hidden">Cancel</span>
            </button>
            <button
              onClick={onNext}
              disabled={!isRecording}
              className={`w-full sm:flex-[1.5] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap ${
                isRecording
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {nextButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* Current Range Display */}
      {(lowestPitch || highestPitch) && (
        <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">Your Range So Far</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {lowestPitch && (
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="text-[10px] sm:text-xs text-blue-600 font-medium mb-1">Lowest</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-700">
                  {lowestPitch.toFixed(1)} Hz
                </div>
              </div>
            )}
            {highestPitch && (
              <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="text-[10px] sm:text-xs text-purple-600 font-medium mb-1">Highest</div>
                <div className="text-xl sm:text-2xl font-bold text-purple-700">
                  {highestPitch.toFixed(1)} Hz
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingScreen;


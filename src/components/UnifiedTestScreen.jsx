/**
 * Unified Test Screen - Single-page test interface with side-by-side lowest/highest note testing
 */

import PianoSelector from './PianoSelector';
import { frequencyToNote } from '../utils/pitchDetector';

const UnifiedTestScreen = ({
  // Lowest note states
  lowestInputMode,
  lowestCountdown,
  lowestIsRecording,
  lowestPitch,
  lowestNote,
  lowestVolume,
  lowestManualPitch,
  lowestCaptured,
  lowestDetectionTimeLeft,
  lowestDetectionError,
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
  highestVolume,
  highestManualPitch,
  highestCaptured,
  highestDetectionTimeLeft,
  highestDetectionError,
  onHighestStart,
  onHighestReset,
  onHighestInputModeChange,
  onHighestManualPitchSelect,
  
  // Analysis
  onAnalyze,
  canAnalyze
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Vocal Range Test
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Find your lowest and highest comfortable notes to discover your unique voice type.
        </p>
      </div>

      {/* Side-by-side test areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
        {/* Lowest Note Section */}
        <TestArea
          title="Lowest Note"
          description="Sing your lowest comfortable note"
          noteType="lowest"
          colorTheme="blue"
          icon="low"
          inputMode={lowestInputMode}
          countdown={lowestCountdown}
          isRecording={lowestIsRecording}
          currentPitch={lowestPitch}
          currentNote={lowestNote}
          volume={lowestVolume}
          manualPitch={lowestManualPitch}
          captured={lowestCaptured}
          detectionTimeLeft={lowestDetectionTimeLeft}
          detectionError={lowestDetectionError}
          onStart={onLowestStart}
          onReset={onLowestReset}
          onInputModeChange={onLowestInputModeChange}
          onManualPitchSelect={onLowestManualPitchSelect}
        />

        {/* Highest Note Section */}
        <TestArea
          title="Highest Note"
          description="Sing your highest comfortable note"
          noteType="highest"
          colorTheme="purple"
          icon="high"
          inputMode={highestInputMode}
          countdown={highestCountdown}
          isRecording={highestIsRecording}
          currentPitch={highestPitch}
          currentNote={highestNote}
          volume={highestVolume}
          manualPitch={highestManualPitch}
          captured={highestCaptured}
          detectionTimeLeft={highestDetectionTimeLeft}
          detectionError={highestDetectionError}
          onStart={onHighestStart}
          onReset={onHighestReset}
          onInputModeChange={onHighestInputModeChange}
          onManualPitchSelect={onHighestManualPitchSelect}
        />
      </div>

      {/* Analysis Button */}
      <div className="text-center mb-12">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className={`px-10 py-4 text-lg font-bold rounded-xl shadow-lg transition-all transform ${
            canAnalyze
              ? 'bg-gray-900 text-white hover:bg-black hover:scale-105 hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAnalyze ? 'Analyze Results' : 'Complete Both Tests to Analyze'}
        </button>
      </div>

      {/* Tips - Clean Design */}
      <div className="max-w-3xl mx-auto bg-blue-50/50 rounded-xl p-6 text-center border border-blue-100">
        <p className="text-blue-800 font-medium">
          Tip: Sing at a comfortable volume. Don't strain your voice.
        </p>
      </div>
    </div>
  );
};

// Individual test area component
const TestArea = ({
  title,
  description,
  noteType, // 'lowest' or 'highest'
  colorTheme, // 'blue' or 'purple'
  icon, // 'low' or 'high'
  inputMode,
  countdown,
  isRecording,
  currentPitch,
  currentNote,
  volume,
  manualPitch,
  captured,
  detectionTimeLeft,
  detectionError,
  onStart,
  onReset,
  onInputModeChange,
  onManualPitchSelect
}) => {
  const isBlue = colorTheme === 'blue';
  const activeColorClass = isBlue ? 'text-blue-600' : 'text-purple-600';
  const activeBgClass = isBlue ? 'bg-blue-600' : 'bg-purple-600';
  const activeBorderClass = isBlue ? 'border-blue-200' : 'border-purple-200';
  const lightBgClass = isBlue ? 'bg-blue-50' : 'bg-purple-50';
  const iconBgClass = isBlue ? 'bg-blue-100' : 'bg-purple-100';

  // Amplify volume for better visual feedback
  // Input volume is typically 0-100, but often stays low (0-20)
  // Use a non-linear scaling to make small sounds more visible
  const rawVolume = volume || 0;
  // Logarithmic-like scaling: rapid rise for low volumes, tapering off for high volumes
  // volume 1 -> ~20
  // volume 5 -> ~45
  // volume 10 -> ~63
  // volume 25 -> 100
  const displayVolume = Math.min(Math.sqrt(rawVolume) * 20, 100);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300 relative`}>
      {/* Decorative Background Blob */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${lightBgClass} rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none`}></div>

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white relative z-10">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${iconBgClass} flex items-center justify-center flex-shrink-0`}>
            {icon === 'low' ? (
              <svg className={`w-6 h-6 ${activeColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            ) : (
              <svg className={`w-6 h-6 ${activeColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
        
        {/* Input Mode Toggle - Compact */}
        <div className="flex bg-gray-100 p-1 rounded-lg self-start sm:self-center">
          <button
            onClick={() => onInputModeChange('sing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              inputMode === 'sing'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Mic
          </button>
          <button
            onClick={() => onInputModeChange('manual')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              inputMode === 'manual'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            Manual
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-center min-h-[340px]">
        {captured && inputMode === 'sing' ? (
          // Captured State
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto ${lightBgClass} rounded-full flex items-center justify-center mb-4`}>
              <svg className={`w-8 h-8 ${activeColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {captured.note}
            </div>
            <div className="text-sm text-gray-500 mb-6">
              {captured.frequency.toFixed(1)} Hz
            </div>
            <button
              onClick={onReset}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 underline decoration-gray-300 underline-offset-4"
            >
              Retest
            </button>
          </div>
        ) : inputMode === 'sing' ? (
          // Sing Mode
          <div className="w-full">
            {!isRecording && countdown === 0 ? (
              // Ready State
              <div className="text-center py-2">
                <div className="mb-8 space-y-3">
                  <div className="flex items-start space-x-3 text-sm text-gray-600 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full ${activeBgClass} text-white flex items-center justify-center text-xs font-bold mt-0.5`}>1</span>
                    <span>Click <strong>Start</strong> below</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm text-gray-600 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full ${activeBgClass} text-white flex items-center justify-center text-xs font-bold mt-0.5`}>2</span>
                    <span>Sing a steady <strong>{noteType === 'lowest' ? '"Ah" (Low)' : '"Ah" (High)'}</strong> for 3 seconds</span>
                  </div>
                </div>
                
                <button
                  onClick={onStart}
                  className={`w-full sm:w-auto px-8 py-3 ${activeBgClass} text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity flex items-center justify-center mx-auto space-x-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Start Detection</span>
                </button>
              </div>
            ) : countdown > 0 ? (
              // Countdown State
              <div className="text-center py-10">
                <div className="text-7xl font-black text-gray-900 mb-2 tabular-nums">{countdown}</div>
                <div className="text-gray-500 font-medium">Get Ready</div>
              </div>
            ) : (
              // Recording State
              <div className="text-center">
                {detectionError ? (
                  // Error State
                  <div className="py-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="text-gray-900 font-bold mb-2">Detection Failed</div>
                    <p className="text-sm text-gray-600 mb-4 px-4">{detectionError}</p>
                    <button
                      onClick={onReset}
                      className="text-sm font-semibold text-gray-900 hover:underline"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  // Active Recording - Enhanced Visualizer
                  <div className="flex flex-col items-center justify-center py-4">
                    {/* Dynamic Circular Visualizer */}
                    <div className="relative mb-6 mt-1 h-24 flex items-center justify-center">
                      {/* Outer Glow Ring (Atmosphere) */}
                      <div 
                        className={`absolute rounded-full ${activeBgClass}`}
                        style={{
                          width: `${80 + displayVolume * 1.2}px`, // Max ~200px
                          height: `${80 + displayVolume * 1.2}px`,
                          opacity: 0.1,
                          transition: 'all 0.1s ease-out'
                        }}
                      />
                      {/* Middle Pulse Ring */}
                      <div 
                        className={`absolute rounded-full ${activeBgClass}`}
                        style={{
                          width: `${60 + displayVolume * 0.8}px`, // Max ~140px
                          height: `${60 + displayVolume * 0.8}px`,
                          opacity: 0.2,
                          transition: 'all 0.1s ease-out'
                        }}
                      />
                      {/* Inner Core Ring */}
                      <div 
                        className={`absolute rounded-full ${activeBgClass}`}
                        style={{
                          width: `${50 + displayVolume * 0.4}px`, // Max ~90px
                          height: `${50 + displayVolume * 0.4}px`,
                          opacity: 0.3,
                          transition: 'all 0.05s ease-out'
                        }}
                      />
                      
                      {/* Microphone Icon Container */}
                      <div className={`relative w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 ${activeBorderClass} shadow-sm z-10 transition-colors duration-300`}>
                        <svg 
                          className={`w-6 h-6 ${activeColorClass} transition-transform duration-75`}
                          style={{ transform: `scale(${1 + displayVolume / 300})` }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>

                    {/* Note Display */}
                    <div className="flex flex-col items-center mb-3 min-h-[3.5rem]">
                      <div className={`text-2xl font-extrabold ${activeColorClass} mb-1 transition-all duration-100`}
                           style={{ transform: currentNote ? 'scale(1.1)' : 'scale(1)' }}>
                        {currentNote ? currentNote.fullNote : <span className="text-base text-gray-400 font-medium">Sing "Ahhh"...</span>}
                      </div>
                      <div className="text-xs font-mono text-gray-400">
                        {currentPitch ? `${Math.round(currentPitch)} Hz` : <span className="opacity-0">-</span>}
                      </div>
                    </div>

                    {/* Mini Volume Bar (Secondary Feedback) */}
                    <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full transition-all duration-75 ease-out ${activeBgClass}`}
                        style={{ 
                          width: `${displayVolume}%`,
                          opacity: 0.8
                        }}
                      />
                    </div>

                    <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      {detectionTimeLeft !== null ? `Time remaining: ${detectionTimeLeft}s` : 'Processing...'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Manual Mode
          <div className="w-full">
             {/* Show selected note if captured or manual pitch selected */}
             {(captured || manualPitch) && (
              <div className={`mb-4 p-3 ${lightBgClass} rounded-lg border ${activeBorderClass} text-center`}>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Selected</div>
                <div className="text-xl font-bold text-gray-900">
                  {captured ? captured.note : (manualPitch ? frequencyToNote(manualPitch).fullNote : '')}
                </div>
                {!captured && manualPitch && (
                  <div className="text-xs text-gray-500">
                    {manualPitch.toFixed(1)} Hz
                  </div>
                )}
              </div>
            )}

            <div className="overflow-hidden">
              <PianoSelector
                mode={noteType}
                selectedPitch={manualPitch}
                onSelect={onManualPitchSelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedTestScreen;


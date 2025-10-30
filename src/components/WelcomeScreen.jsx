/**
 * Welcome Screen - Hero section with CTA
 */

const WelcomeScreen = ({ onStart, error }) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8 px-2">
        <div className="inline-block mb-3 sm:mb-4">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium">
            ✨ Free • Fast • Accurate
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight px-2">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Your
          </span>
          <br />
          <span className="text-gray-900">Vocal Range</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-4">
          Find out your singing range and voice type in just 3 minutes
        </p>

        <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Professional vocal range test powered by advanced audio technology.
          No signup required. Works right in your browser.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <button
            onClick={onStart}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Start Your Test</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No signup • No download</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl mx-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl">🎯</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Accurate Results</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Advanced pitch detection technology analyzes your voice with professional-grade accuracy
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl">⚡</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Quick & Easy</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Complete your vocal range test in just 3 simple steps. Takes less than 3 minutes
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition sm:col-span-2 md:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl">🔒</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">100% Private</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Your voice data is processed locally in your browser. Nothing is recorded or stored
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Allow Microphone</h3>
            <p className="text-gray-600">
              Grant microphone access when prompted. We need it to analyze your voice
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sing 3 Notes</h3>
            <p className="text-gray-600">
              Follow the simple instructions to sing your natural, lowest, and highest notes
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get Results</h3>
            <p className="text-gray-600">
              Instantly see your vocal range, voice type, and detailed analysis
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <details className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              What is a vocal range test?
            </summary>
            <p className="mt-3 text-gray-600">
              A vocal range test measures the span between your lowest and highest singable notes. 
              It helps you understand your voice type (Bass, Tenor, Alto, Soprano, etc.) and vocal capabilities.
            </p>
          </details>

          <details className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Do I need any special equipment?
            </summary>
            <p className="mt-3 text-gray-600">
              No! Just a device with a microphone (computer, phone, or tablet) and a modern web browser. 
              For best results, use the test in a quiet environment.
            </p>
          </details>

          <details className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Is my voice data recorded or stored?
            </summary>
            <p className="mt-3 text-gray-600">
              Absolutely not! All voice analysis happens locally in your browser. 
              We don't record, store, or transmit your voice data anywhere. Your privacy is 100% protected.
            </p>
          </details>

          <details className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              How accurate is the test?
            </summary>
            <p className="mt-3 text-gray-600">
              Our test uses professional-grade pitch detection algorithms that are highly accurate. 
              However, results can vary based on your environment, microphone quality, and vocal technique.
            </p>
          </details>

          <details className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Can I take the test multiple times?
            </summary>
            <p className="mt-3 text-gray-600">
              Yes! Feel free to take the test as many times as you like. 
              Your vocal range can improve with practice and proper vocal training.
            </p>
          </details>
        </div>
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto prose prose-lg mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Vocal Range Testing
          </h2>
          <p className="text-gray-600 mb-4">
            Understanding your <strong>vocal range</strong> is essential for singers of all levels. 
            Whether you're a beginner exploring your voice or a professional vocalist refining your craft, 
            knowing your <strong>singing range</strong> helps you choose appropriate songs, identify your voice type, 
            and track your vocal development over time.
          </p>
          <p className="text-gray-600 mb-4">
            A <strong>vocal range test</strong> measures the distance between your lowest and highest singable notes, 
            typically expressed in octaves or semitones. Most people have a range of 1.5 to 2.5 octaves, 
            while trained singers often achieve 3 to 4 octaves or more.
          </p>
          <p className="text-gray-600">
            SingMeter's free online <strong>singing range test</strong> uses advanced Web Audio API technology 
            to accurately detect and analyze your vocal pitch in real-time. Our tool is trusted by thousands 
            of singers worldwide for its accuracy, ease of use, and instant results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;


/**
 * About Page
 */
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* 横版 Logo（与首页保持一致） */}
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
            <Link 
              to="/" 
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Test Your Range
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">About</li>
          </ol>
        </nav>

        {/* Page Content */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              About SingMeter
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is dedicated to making vocal range testing accessible to everyone. Whether you're a professional 
                singer, a choir member, a karaoke enthusiast, or just curious about your voice, we provide a free, 
                easy-to-use tool that helps you discover your vocal capabilities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Do</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our advanced pitch detection technology analyzes your voice in real-time to determine:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Your Vocal Range:</strong> The span from your lowest to highest singable notes</li>
                <li><strong>Your Voice Type:</strong> Classification as Bass, Baritone, Tenor, Alto, Mezzo-Soprano, or Soprano</li>
                <li><strong>Detailed Analysis:</strong> Insights into your vocal characteristics and capabilities</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter uses cutting-edge Web Audio API technology to analyze your voice directly in your browser. 
                Here's what makes us special:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Privacy First:</strong> All audio processing happens locally on your device - we never record or store your voice</li>
                <li><strong>Instant Results:</strong> Get your vocal range analysis in just 60 seconds</li>
                <li><strong>Professional Accuracy:</strong> Our algorithm is calibrated to provide reliable, professional-grade results</li>
                <li><strong>Free Forever:</strong> No sign-up, no credit card, no hidden fees</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Vocal Range Matters</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Understanding your vocal range is essential for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Song Selection:</strong> Choose songs that showcase your voice at its best</li>
                <li><strong>Vocal Training:</strong> Work with teachers to expand your range safely</li>
                <li><strong>Auditions:</strong> Know your voice type for choir, musical theater, or professional opportunities</li>
                <li><strong>Vocal Health:</strong> Avoid strain by staying within your comfortable range</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Technology</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is built with modern web technologies:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Web Audio API:</strong> For real-time audio processing</li>
                <li><strong>Advanced Pitch Detection:</strong> Using the Pitchy library for accurate frequency analysis</li>
                <li><strong>React:</strong> For a smooth, responsive user interface</li>
                <li><strong>Privacy-Focused Design:</strong> No server-side audio processing or storage</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who We Serve</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is designed for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Aspiring Singers:</strong> Discover your voice type and potential</li>
                <li><strong>Vocal Students:</strong> Track your progress and range development</li>
                <li><strong>Choir Members:</strong> Find your perfect vocal part</li>
                <li><strong>Music Teachers:</strong> A quick tool for student assessment</li>
                <li><strong>Karaoke Lovers:</strong> Find songs that fit your range</li>
                <li><strong>Curious Minds:</strong> Anyone who wants to learn about their voice</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are committed to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Accessibility:</strong> Keeping the service free and easy to use</li>
                <li><strong>Privacy:</strong> Never recording, storing, or sharing your audio data</li>
                <li><strong>Accuracy:</strong> Continuously improving our pitch detection algorithms</li>
                <li><strong>Education:</strong> Providing helpful resources about vocal health and technique</li>
                <li><strong>Innovation:</strong> Adding new features based on user feedback</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We love hearing from our users! Whether you have questions, feedback, or suggestions, please don't 
                hesitate to <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 underline">contact us</Link>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Join Our Community</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Thousands of singers worldwide use SingMeter to discover and develop their voices. Join our community 
                and start your vocal journey today!
              </p>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Voice?
          </h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Test your vocal range now and unlock your singing potential
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Start Your Test Now →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © 2025 SingMeter. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition">Blog</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition">Contact</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-indigo-600 transition">Privacy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-indigo-600 transition">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;


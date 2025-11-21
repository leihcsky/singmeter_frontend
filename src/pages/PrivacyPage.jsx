/**
 * Privacy Policy Page
 */
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

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
            <li className="text-gray-900 font-medium">Privacy Policy</li>
          </ol>
        </nav>

        {/* Page Content */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to SingMeter. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we handle your information when you use our vocal range testing service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Audio Data</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                When you use our vocal range test, we temporarily access your device's microphone to analyze your voice. 
                <strong> We do not record, store, or transmit your audio data.</strong> All pitch detection happens locally 
                in your browser, and no audio files are saved or sent to our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Data</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may collect anonymous usage statistics such as:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Browser type and version</li>
                <li>Device type (mobile, tablet, desktop)</li>
                <li>Pages visited and time spent on site</li>
                <li>General location (country/region level only)</li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This data is collected through Google Analytics and is used solely to improve our service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Provide and maintain our vocal range testing service</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Monitor and analyze technical performance</li>
                <li>Detect and prevent technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Microphone Access</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our service requires microphone access to detect your vocal pitch. When you start a test:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Your browser will ask for permission to access your microphone</li>
                <li>You can deny this permission at any time</li>
                <li>Audio processing happens entirely in your browser</li>
                <li>No audio data leaves your device</li>
                <li>Microphone access stops immediately when you close or leave the page</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Remember your preferences</li>
                <li>Understand how you use our service</li>
                <li>Serve relevant advertisements through Google AdSense</li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You can control cookies through your browser settings. Note that disabling cookies may affect 
                the functionality of our service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Google Analytics</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use Google Analytics to understand how visitors use our site. Google Analytics collects 
                information anonymously and reports website trends without identifying individual visitors.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Google AdSense</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use Google AdSense to display advertisements. Google may use cookies to serve ads based on 
                your prior visits to our website or other websites. You can opt out of personalized advertising 
                by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Google Ads Settings</a>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your data. However, 
                no method of transmission over the Internet is 100% secure. While we strive to protect your 
                information, we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Email: <a href="mailto:privacy@singmeter.com" className="text-indigo-600 hover:text-indigo-700 underline">privacy@singmeter.com</a>
              </p>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Test Your Vocal Range?
          </h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Discover your voice type in just 60 seconds with our free online tool
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

export default PrivacyPage;


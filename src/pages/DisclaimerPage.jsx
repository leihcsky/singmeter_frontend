/**
 * Disclaimer Page
 */
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const DisclaimerPage = () => {
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
            <li className="text-gray-900 font-medium">Disclaimer</li>
          </ol>
        </nav>

        {/* Page Content */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Disclaimer
            </h1>

            <p className="text-sm text-gray-500 mb-8">
              Last Updated: January 21, 2025
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">General Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The information provided by SingMeter ("we," "us," or "our") on https://www.singmeter.com (the "Site") 
                and through our vocal assessment tools is for general informational and educational purposes only. All 
                information on the Site is provided in good faith, however we make no representation or warranty of any 
                kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or 
                completeness of any information on the Site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Not Professional Medical or Vocal Advice</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Site and our tools are not intended to provide medical, vocal health, or professional singing advice. 
                The vocal range test, pitch detector, and other tools are designed for entertainment, educational, and 
                self-assessment purposes only. They should not be used as a substitute for professional vocal coaching, 
                medical advice, diagnosis, or treatment.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have concerns about your vocal health, experience pain while singing, or have persistent voice 
                problems, please consult with a qualified healthcare provider, speech-language pathologist, or certified 
                vocal coach before using our tools or following any suggestions found on the Site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Accuracy of Tools and Results</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                While we strive to provide accurate pitch detection and vocal range analysis, the results may vary based 
                on numerous factors including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Microphone quality and device specifications</li>
                <li>Environmental noise and acoustics</li>
                <li>User's vocal technique and health</li>
                <li>Browser compatibility and performance</li>
                <li>Internet connection stability</li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We do not guarantee that the vocal range test or pitch detector will be error-free, uninterrupted, or 
                provide perfectly accurate results. The tools are provided "as is" without any warranties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use at Your Own Risk</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as 
                a result of the use of the Site or our tools, or reliance on any information provided on the Site. Your 
                use of the Site and your reliance on any information on the Site is solely at your own risk.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <strong>Important:</strong> Do not strain your voice or attempt to sing notes that cause discomfort or 
                pain. Always warm up properly before testing your vocal range and stop immediately if you experience any 
                discomfort.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links Disclaimer</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Site may contain links to external websites that are not provided or maintained by or in any way 
                affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or 
                completeness of any information on these external websites.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Educational Content Disclaimer</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The blog articles, tips, and educational content on the Site are for informational purposes only and
                represent general guidance. Individual results may vary, and what works for one person may not work for
                another. Always consider your unique circumstances and consult with qualified professionals when needed.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Song Recommendations Disclaimer</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Song recommendations provided based on your vocal range are suggestions only. The suitability of any song
                depends on many factors beyond vocal range, including vocal technique, style, experience level, and
                personal preference. We do not guarantee that recommended songs will be appropriate or comfortable for you
                to sing.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advertising Disclaimer</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This Site may contain advertisements and affiliate links. We may receive compensation when you click on
                links to products or services. However, this does not influence our content, recommendations, or the
                operation of our tools. All opinions expressed are our own.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Disclaimer</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon
                posting to the Site. Your continued use of the Site following the posting of changes constitutes your
                acceptance of such changes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about this Disclaimer, please{' '}
                <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 underline">contact us</Link>.
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-indigo-600 transition">Disclaimer</Link>
              <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DisclaimerPage;



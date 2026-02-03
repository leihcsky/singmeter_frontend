/**
 * Terms of Service Page
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const TermsPage = () => {
	useEffect(() => {
		document.title = 'Terms of Service | SingMeter - Free Vocal Range Test & Pitch Detector';

		const setMetaTag = (name, content) => {
			let element = document.querySelector(`meta[name="${name}"]`);
			if (!element) {
				element = document.createElement('meta');
				element.setAttribute('name', name);
				document.head.appendChild(element);
			}
			element.setAttribute('content', content);
		};

		const setLinkTag = (rel, href) => {
			let element = document.querySelector(`link[rel="${rel}"]`);
			if (!element) {
				element = document.createElement('link');
				element.setAttribute('rel', rel);
				document.head.appendChild(element);
			}
			element.setAttribute('href', href);
		};

		setMetaTag(
			'description',
			'Review the SingMeter terms of service covering acceptable use, limitations of liability, microphone access, advertising and other legal information for our free vocal tools.'
		);
		setMetaTag(
			'keywords',
			'singmeter terms of service, terms and conditions, vocal range test terms, pitch detector terms, legal information'
		);
		setLinkTag('canonical', 'https://www.singmeter.com/terms');

		return () => {
			document.title = 'SingMeter';
		};
	}, []);

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
            <li className="text-gray-900 font-medium">Terms of Service</li>
          </ol>
        </nav>

        {/* Page Content */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                By accessing and using SingMeter ("the Service"), you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is a free online vocal range testing tool that uses your device's microphone to analyze your 
                singing voice and determine your vocal range. The Service provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Real-time pitch detection and analysis</li>
                <li>Voice type classification (Bass, Baritone, Tenor, Alto, Mezzo-Soprano, Soprano)</li>
                <li>Educational content about vocal ranges and singing</li>
                <li>Results sharing capabilities</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Eligibility</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You must be at least 13 years old to use this Service. By using the Service, you represent and warrant 
                that you meet this age requirement. If you are under 18, you should use the Service with parental guidance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Microphone Access and Privacy</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To use the vocal range test, you must grant microphone access to the Service. By granting this permission:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>You acknowledge that audio processing happens locally in your browser</li>
                <li>You understand that we do not record, store, or transmit your audio data</li>
                <li>You can revoke microphone access at any time through your browser settings</li>
                <li>You agree to use the Service in a quiet environment for accurate results</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You agree to use the Service only for lawful purposes. You must not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Attempt to interfere with or disrupt the Service</li>
                <li>Use automated systems to access the Service</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use the Service for any commercial purpose without permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Service, including its original content, features, and functionality, is owned by SingMeter and is 
                protected by international copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Copy, modify, or distribute the Service's code or content</li>
                <li>Use our trademarks or branding without permission</li>
                <li>Create derivative works based on the Service</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 
                We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>The results will be accurate or reliable</li>
                <li>Any errors will be corrected</li>
                <li>The Service will meet your specific requirements</li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <strong>Medical Disclaimer:</strong> The Service is for entertainment and educational purposes only. 
                It is not a substitute for professional vocal training or medical advice. If you experience vocal strain 
                or discomfort, consult a healthcare professional.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SINGMETER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Loss of profits, data, or use</li>
                <li>Vocal injury or strain</li>
                <li>Damage to devices or equipment</li>
                <li>Any other damages arising from use of the Service</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Indemnification</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You agree to indemnify and hold harmless SingMeter and its affiliates from any claims, damages, losses, 
                liabilities, and expenses arising from:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Third-Party Services</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Service may contain links to third-party websites or services. We are not responsible for the content, 
                privacy policies, or practices of third-party sites. We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Google Analytics:</strong> For usage statistics and analytics</li>
                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Advertising</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Service displays advertisements through Google AdSense. By using the Service, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Advertisements may be displayed before, during, or after using the Service</li>
                <li>We do not control the content of advertisements</li>
                <li>Clicking on advertisements is at your own risk</li>
                <li>You should not click on your own advertisements if you are a publisher</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to the Service</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
                We will not be liable to you or any third party for any modification, suspension, or discontinuation.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may update these Terms from time to time. We will notify you of significant changes by posting the 
                new Terms on this page and updating the "Last updated" date. Your continued use of the Service after 
                changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Governing Law</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Severability</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited 
                or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. Entire Agreement</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                These Terms constitute the entire agreement between you and SingMeter regarding the Service and supersede 
                all prior agreements and understandings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">17. Contact Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Email: <a href="mailto:legal@singmeter.com" className="text-indigo-600 hover:text-indigo-700 underline">legal@singmeter.com</a>
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
              © 2026 SingMeter. All rights reserved.
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

export default TermsPage;


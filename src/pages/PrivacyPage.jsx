/**
 * Privacy Policy Page
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage = () => {
	useEffect(() => {
		document.title = 'Privacy Policy | SingMeter - Free Online Vocal Tools';

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
			'Read the SingMeter privacy policy. Learn how we handle data, microphone access, cookies, analytics and Google AdSense when you use our vocal range test, pitch detector and educational blog.'
		);
		setMetaTag(
			'keywords',
			'singmeter privacy policy, data privacy, microphone access, cookies, google adsense, vocal range test privacy, pitch detector privacy'
		);
		setLinkTag('canonical', 'https://www.singmeter.com/privacy');

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
              Last updated: October 15, 2026
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to SingMeter. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we handle information when you use our free singing tools,
                practice guides, and related pages on singmeter.com.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Audio Data</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                When you use a tool that listens (such as the vocal range test or pitch detector), we temporarily access your device's microphone to analyze your voice. 
                <strong> We do not record, store, or transmit your audio data.</strong> All pitch detection happens locally 
                in your browser, and no audio files are saved or sent to our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Data</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We collect usage data such as:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Browser type and version</li>
                <li>Device type (mobile, tablet, desktop)</li>
                <li>Pages visited and time spent on site</li>
                <li>General location (country/region level only)</li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This data is collected through Google Analytics and Microsoft Clarity using cookies and similar identifiers.
                We look at it in aggregate to improve the site; it does not give us your name or contact details.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information You Send Us</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you use our contact form or email us, we receive your name, email address, and message. Contact form
                messages are delivered to our inbox through Web3Forms, a form-delivery service. We use this information only
                to reply to you and do not add you to a mailing list.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Data Stored in Your Browser</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                When you finish the vocal range test, your result is saved in your browser&apos;s local storage so Song Key
                Finder can suggest a comfortable key. It stays on your device and is not sent to us. You can remove it by
                clearing your browser&apos;s site data.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>Provide and maintain our guides, tutorials, and practice tools</li>
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
                We use Google Analytics to understand how visitors use our site. Google Analytics uses cookies to collect
                information such as pages visited, device type, and approximate location, and reports it to us in aggregate.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Google AdSense</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use Google AdSense to display advertisements. Third parties, including Google, may use cookies,
                web beacons, and similar technologies, and may collect or use IP addresses and other identifiers,
                to serve ads based on your prior visits to this site or other websites across the Internet.
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit
                to this site and/or other sites. You can opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Google Ads Settings</a>
                {' '}or by visiting{' '}
                <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">www.aboutads.info</a>.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To learn more about how Google collects and uses data when you use our site, see{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">How Google uses information from sites or apps that use our services</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Microsoft Clarity</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use Microsoft Clarity for session insights and heatmaps to improve how the site works for visitors.
                Clarity may collect usage data as described in{' '}
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Microsoft&apos;s Privacy Statement</a>.
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
                Email: <a href="mailto:contact@singmeter.com" className="text-indigo-600 hover:text-indigo-700 underline">contact@singmeter.com</a>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;


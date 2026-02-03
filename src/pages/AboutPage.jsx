/**
 * About Page
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AboutPage = () => {
	useEffect(() => {
		document.title = 'About SingMeter - Free Vocal Range Test & Pitch Detector Team';

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
			'Learn about SingMeter, the team behind the free online vocal range test, pitch detector, and vocal training blog. Our mission is to make accurate vocal tools and clear guidance accessible to every singer.'
		);
		setMetaTag(
			'keywords',
			'about singmeter, singmeter team, vocal range test team, pitch detector team, about singing tools, who made singmeter'
		);
		setLinkTag('canonical', 'https://www.singmeter.com/about');

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
                SingMeter is dedicated to making vocal training and assessment accessible to everyone. Whether you're a professional
                singer, a choir member, a karaoke enthusiast, or just curious about your voice, we provide free,
                easy-to-use tools that help you discover and improve your vocal capabilities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Tools</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter offers a comprehensive suite of vocal assessment and training tools:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Vocal Range Test:</strong> Discover your lowest and highest notes, identify your voice type (Bass, Baritone, Tenor, Alto, Mezzo-Soprano, Soprano), and get personalized song recommendations</li>
                <li><strong>Pitch Detector:</strong> Real-time pitch detection to help you practice singing in tune, see your notes instantly, and improve your pitch accuracy</li>
                <li><strong>Educational Resources:</strong> Expert articles, tips, and guides on vocal technique, range development, and song selection</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter uses cutting-edge Web Audio API technology to analyze your voice directly in your browser.
                Here's what makes us special:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Privacy First:</strong> All audio processing happens locally on your device - we never record or store your voice</li>
                <li><strong>Instant Results:</strong> Get real-time feedback and analysis as you sing</li>
                <li><strong>Professional Accuracy:</strong> Our algorithms are calibrated to provide reliable, professional-grade results</li>
                <li><strong>Free Forever:</strong> No sign-up, no credit card, no hidden fees - all tools are completely free</li>
                <li><strong>Works Everywhere:</strong> Use on any device with a microphone - desktop, laptop, tablet, or smartphone</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Use SingMeter</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our tools help you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Discover Your Voice:</strong> Learn your vocal range, voice type, and unique characteristics</li>
                <li><strong>Improve Pitch Accuracy:</strong> Practice singing in tune with real-time visual feedback</li>
                <li><strong>Choose Better Songs:</strong> Find songs that match your range and showcase your voice</li>
                <li><strong>Track Progress:</strong> Monitor your vocal development over time</li>
                <li><strong>Prepare for Auditions:</strong> Know your voice type for choir, musical theater, or professional opportunities</li>
                <li><strong>Protect Your Voice:</strong> Avoid strain by staying within your comfortable range</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Technology</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is built with modern web technologies:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Web Audio API:</strong> For real-time audio processing and analysis</li>
                <li><strong>Advanced Pitch Detection:</strong> Using the Pitchy library for accurate frequency analysis (±1 cent accuracy)</li>
                <li><strong>React 19:</strong> For a smooth, responsive, and modern user interface</li>
                <li><strong>Privacy-Focused Design:</strong> All processing happens in your browser - no server-side audio processing or storage</li>
                <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile devices</li>
              </ul>

	            	  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">SingMeter Team</h2>
	            	  <p className="text-gray-600 mb-4 leading-relaxed">
	            	    SingMeter started as a side project by a singer who is also a software developer. Today, the SingMeter Team brings
	            	    together a vocal enthusiast, a programmer, an audio engineer, and a vocal coach from a music conservatory.
	            	    We are not a big company - just a small group of people who love singing and technology, and we want to make
	            	    professional-quality vocal tools and clear, practical guidance available to more singers around the world.
	            	  </p>

	            	  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who We Serve</h2>
	            	  <p className="text-gray-600 mb-4 leading-relaxed">
	            	    SingMeter is designed for singers of all levels:
	            	  </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Aspiring Singers:</strong> Discover your voice type and potential</li>
                <li><strong>Vocal Students:</strong> Track your progress and improve pitch accuracy</li>
                <li><strong>Choir Members:</strong> Find your perfect vocal part and practice staying in tune</li>
                <li><strong>Music Teachers:</strong> Quick assessment tools for students</li>
                <li><strong>Karaoke Enthusiasts:</strong> Find songs that fit your range and practice before performing</li>
                <li><strong>Professional Singers:</strong> Warm up and maintain vocal health</li>
                <li><strong>Curious Minds:</strong> Anyone who wants to learn about their voice</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are committed to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Accessibility:</strong> Keeping all tools free and easy to use for everyone</li>
                <li><strong>Privacy:</strong> Never recording, storing, or sharing your audio data</li>
                <li><strong>Accuracy:</strong> Continuously improving our pitch detection and analysis algorithms</li>
                <li><strong>Education:</strong> Providing helpful resources about vocal health, technique, and development</li>
                <li><strong>Innovation:</strong> Adding new tools and features based on user feedback</li>
                <li><strong>Quality:</strong> Maintaining professional-grade accuracy and reliability</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We love hearing from our users! Whether you have questions, feedback, suggestions, or need support, please don't
                hesitate to <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 underline">contact us</Link>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Join Our Community</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Thousands of singers worldwide use SingMeter to discover and develop their voices. Join our community
                and start your vocal journey today - completely free, no sign-up required!
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
            Try our free vocal tools and unlock your singing potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vocal-range-test"
              className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Test Your Range →
            </Link>
            <Link
              to="/pitch-detector"
              className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Try Pitch Detector →
            </Link>
          </div>
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

export default AboutPage;


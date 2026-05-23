/**
 * About Page
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getActiveTools } from '../config/tools';

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
			'Learn about SingMeter: free vocal range test, pitch detector, metronome, tone generator, song key finder, practice tutorials, and editorial book reviews.'
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

  const tools = [...getActiveTools()].sort((a, b) => a.priority - b.priority);

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
                SingMeter exists for people who love singing. Whether you sing in a choir, at karaoke, in lessons, or just for
                yourself at home, we offer free, easy-to-use online tools and practical guides to help you explore your voice,
                hear yourself more clearly, and sing with a little more confidence.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Tools</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Five free browser tools—no install, no signup. Audio stays on your device:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <Link to={tool.path} className="text-indigo-600 font-semibold hover:underline">
                      {tool.name}
                    </Link>
                    : {tool.description}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Learning on SingMeter</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tools work best with structured practice—not random scrolling. We publish:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>
                  <Link to="/tutorials" className="text-indigo-600 font-semibold hover:underline">
                    Practice tutorials
                  </Link>
                  — step-by-step sessions that use our tools (start with the guided vocal range test)
                </li>
                <li>
                  <Link to="/blog" className="text-indigo-600 font-semibold hover:underline">
                    Blog guides
                  </Link>
                  — deeper articles on technique, range, and vocal health
                </li>
                <li>
                  <Link to="/resources#books" className="text-indigo-600 font-semibold hover:underline">
                    Book reviews &amp; curated resources
                  </Link>
                  — editorial reviews and vetted external picks
                </li>
                <li>
                  <Link to="/glossary" className="text-indigo-600 font-semibold hover:underline">
                    Vocal glossary
                  </Link>
                  — definitions for common singing terms
                </li>
              </ul>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                How we write and review content:{' '}
                <Link to="/editorial-standards" className="text-indigo-600 font-semibold hover:underline">
                  Editorial standards
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter uses cutting-edge Web Audio API technology to analyze your voice directly in your browser.
                Here's what makes us special:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li><strong>Privacy First:</strong> All audio processing happens locally on your device - we never record or store your voice</li>
                <li><strong>Instant Results:</strong> Get real-time feedback and analysis as you sing</li>
                <li><strong>Reliable feedback:</strong> Our algorithms are tuned to give you clear, dependable readings for practice at home</li>
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
                <li><strong>Prepare for groups &amp; shows:</strong> Know your voice type for choir, musical theater, or other singing situations</li>
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
	            	    SingMeter started as a side project by a singer who is also a software developer. Today, the SingMeter team brings
	            	    together a vocal enthusiast, a programmer, an audio engineer, and a vocal teacher from a music conservatory.
	            	    We are not a big company—just a small group who love singing and technology—and we want useful online tools and
	            	    straightforward guidance to be easy to find for anyone who enjoys singing.
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
                <li><strong>Anyone who sings often:</strong> Warm up, check pitch, and keep an eye on vocal comfort</li>
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
                <li><strong>Quality:</strong> Keeping our tools accurate, stable, and pleasant to use</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We love hearing from our users! Whether you have questions, feedback, suggestions, or need support, please don't
                hesitate to <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 underline">contact us</Link>.
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

      <Footer />
    </div>
  );
};

export default AboutPage;


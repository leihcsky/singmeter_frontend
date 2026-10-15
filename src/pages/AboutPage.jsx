/**
 * About Page
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamMemberCards from '../components/TeamMemberCards';

const AboutPage = () => {
	useEffect(() => {
		document.title = 'About SingMeter - Who Writes the Guides & Builds the Tools';

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
			'SingMeter is an independent project by Max Ray, a developer and singer who writes the singing guides and practice tutorials and builds the free browser tools.'
		);
		setMetaTag(
			'keywords',
			'about singmeter, who made singmeter, max ray singmeter, singing guides author, about singing tools'
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

            <div className="mb-10 pb-8 border-b border-gray-100 not-prose">
              <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed border-l-4 border-indigo-500 pl-5">
                <p>
                  &ldquo;I started practicing singing at home and at karaoke in late 2025, and kept hitting the same wall: I
                  didn&apos;t know my own range, so half the songs I picked sat too high or too low. I built the Vocal Range
                  Test to answer that for myself&mdash;and it&apos;s still the tool I open most.&rdquo;
                </p>
                <footer className="mt-3 text-base font-semibold text-gray-900">
                  &mdash; Max Ray, founder
                </footer>
              </blockquote>
              <figure className="mt-8">
                <img
                  src="/images/screenshots/vocal-range-test-result-bass.png"
                  alt="Max Ray's own Vocal Range Test result: Bass, F#2 to A3, 1.2 octaves (14 semitones)"
                  width={1228}
                  height={703}
                  loading="lazy"
                  className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                />
                <figcaption className="text-sm text-gray-500 mt-2 text-center">
                  My own result from the Vocal Range Test: F#2&ndash;A3, about 1.2 octaves, which the test labels Bass.
                </figcaption>
              </figure>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What we publish</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SingMeter is a small, independent site for people who practice singing at home—in a choir, at karaoke, in
                lessons, or just for themselves. Everything here is built around one path:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                <li>
                  <Link to="/blog" className="text-indigo-600 font-semibold hover:underline">
                    Singing guides
                  </Link>{' '}
                  explain pitch, range, technique, and vocal health in plain language.
                </li>
                <li>
                  <Link to="/tutorials" className="text-indigo-600 font-semibold hover:underline">
                    Practice tutorials
                  </Link>{' '}
                  turn those ideas into timed, step-by-step sessions.
                </li>
                <li>
                  Free browser tools—a vocal range test, pitch detector, tone generator, metronome, and song key
                  finder—give you a quick check while you practice.
                </li>
              </ul>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The tools run in your browser with no signup. Microphone audio is analyzed on your device and is never
                uploaded or stored by us.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who runs SingMeter</h2>
              <TeamMemberCards />

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How we write</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                I&apos;m still a learner myself, so guides are written from the learner&apos;s side: what I practice, what
                trusted sources such as the NIDCD, NHS, and Mayo Clinic say, and how to check your progress with the
                tools. Most health and technique guides list their sources at the end. I correct mistakes when readers point
                them out. The{' '}
                <Link to="/editorial-standards" className="text-indigo-600 font-semibold hover:underline">
                  editorial standards
                </Link>{' '}
                explain how articles are researched, reviewed, and updated.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in touch</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Questions, corrections, or feedback are welcome—please{' '}
                <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 underline">contact us</Link>.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

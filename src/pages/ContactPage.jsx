/**
 * Contact Page
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SUBJECT_LABELS = {
  general: 'General Inquiry',
  feedback: 'Feedback',
  bug: 'Report a Bug',
  feature: 'Feature Request',
  support: 'Technical Support',
  business: 'Business Inquiry',
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

	useEffect(() => {
		document.title = 'Contact SingMeter - Feedback, Support & Business Inquiries';

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
			'Contact the SingMeter team with questions, feedback, bug reports, feature requests or business inquiries about our free vocal range test, pitch detector and singing resources.'
		);
		setMetaTag(
			'keywords',
			'contact singmeter, singmeter support, singing tool feedback, pitch detector contact, vocal range test contact'
		);
		setLinkTag('canonical', 'https://www.singmeter.com/contact');

		return () => {
			document.title = 'SingMeter';
		};
	}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setSubmitError(
        'The contact form is not enabled here. Please email contact@singmeter.com — we read every message.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const subjectLine = `SingMeter — ${SUBJECT_LABELS[formData.subject] || formData.subject}`;
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: subjectLine,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: formData.name,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email contact@singmeter.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <li className="text-gray-900 font-medium">Contact</li>
          </ol>
        </nav>

        {/* Page Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                        {submitError}
                      </div>
                    )}
                    {import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ? (
                      <p className="text-xs text-gray-500">
                        Submissions are delivered to our inbox via a secure form service. You can still use the email addresses on the right if you prefer.
                      </p>
                    ) : (
                      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        The online form is not active on this deployment yet. Please email{' '}
                        <a href="mailto:contact@singmeter.com" className="font-semibold underline">
                          contact@singmeter.com
                        </a>{' '}
                        — messages there are forwarded to our team (ImprovMX).
                        {import.meta.env.DEV && (
                          <span className="block mt-2 text-amber-900/90 font-mono text-[11px]">
                            Dev: set VITE_WEB3FORMS_ACCESS_KEY in .env.local and restart the dev server.
                          </span>
                        )}
                      </p>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug">Report a Bug</option>
                        <option value="feature">Feature Request</option>
                        <option value="support">Technical Support</option>
                        <option value="business">Business Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:contact@singmeter.com" className="text-indigo-600 hover:text-indigo-700 underline">
                          contact@singmeter.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">We typically respond within 24-48 hours</p>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Support</h3>
                      <p className="text-gray-600">
                        <a href="mailto:support@singmeter.com" className="text-indigo-600 hover:text-indigo-700 underline">
                          support@singmeter.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">For technical issues and questions</p>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">FAQ</h3>
                      <p className="text-gray-600">
                        Check our <Link to="/blog" className="text-indigo-600 hover:text-indigo-700 underline">blog</Link> for 
                        common questions and helpful guides
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links (Optional) */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Stay updated with the latest features and vocal tips
                  </p>
                  <div className="flex space-x-4">
                    {/* Add social media links here if needed */}
                    {/* <p className="text-gray-500 text-sm italic">Coming soon...</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Haven't Tested Your Voice Yet?
          </h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Discover your vocal range in just 60 seconds
          </p>
          <Link
            to="/vocal-range-test"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Start Your Test Now →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;


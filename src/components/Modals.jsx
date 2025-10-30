/**
 * Modal Components - Privacy, Contact, About
 */

// Base Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Modal
export const PrivacyModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Privacy Policy">
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">1. Information We Collect</h4>
        <p className="text-gray-600 mb-4">
          SingMeter is designed with your privacy in mind. We do NOT collect, record, store, or transmit your voice data. 
          All voice analysis happens locally in your web browser using the Web Audio API.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h4>
        <p className="text-gray-600 mb-4">
          We may collect anonymous usage statistics (such as page views and test completions) through analytics services 
          to improve our service. This data is aggregated and does not identify individual users.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">3. Microphone Access</h4>
        <p className="text-gray-600 mb-4">
          Our application requires microphone access to analyze your voice. The audio is processed in real-time 
          in your browser and is never recorded, stored, or transmitted to our servers or any third party.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">4. Cookies and Tracking</h4>
        <p className="text-gray-600 mb-4">
          We may use cookies and similar tracking technologies to improve user experience and analyze site traffic. 
          You can control cookie preferences through your browser settings.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">5. Third-Party Services</h4>
        <p className="text-gray-600 mb-4">
          We may use third-party services such as Google Analytics and Google AdSense. These services may collect 
          information about your visit to our site. Please refer to their respective privacy policies for more information.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">6. Data Security</h4>
        <p className="text-gray-600 mb-4">
          Since we don't collect or store your voice data, there's no risk of your voice recordings being compromised. 
          All processing happens locally on your device.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">7. Children's Privacy</h4>
        <p className="text-gray-600 mb-4">
          Our service is not directed to children under 13. We do not knowingly collect personal information from children.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">8. Changes to This Policy</h4>
        <p className="text-gray-600 mb-4">
          We may update this privacy policy from time to time. We will notify users of any material changes by 
          posting the new policy on this page.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">9. Contact Us</h4>
        <p className="text-gray-600 mb-4">
          If you have questions about this privacy policy, please contact us through our contact form.
        </p>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h5 className="font-semibold text-green-800 mb-1">Your Privacy is Protected</h5>
              <p className="text-sm text-green-700">
                Your voice is never recorded or stored. All analysis happens locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Contact Modal
export const ContactModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Contact Us">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600">We'll get back to you as soon as possible.</p>
        </div>
      )}
    </Modal>
  );
};

// About Modal
export const AboutModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="About SingMeter">
      <div className="prose prose-sm max-w-none">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
            <span className="text-4xl">🎵</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">SingMeter</h3>
          <p className="text-gray-600">Professional Vocal Range Testing</p>
        </div>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">What is SingMeter?</h4>
        <p className="text-gray-600 mb-4">
          SingMeter is a free, professional-grade vocal range testing tool that helps singers of all levels 
          discover their vocal capabilities. Using advanced Web Audio API technology, we provide accurate 
          pitch detection and analysis right in your browser.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">How It Works</h4>
        <p className="text-gray-600 mb-4">
          Our application uses sophisticated pitch detection algorithms to analyze your voice in real-time. 
          By singing three simple notes (natural, lowest, and highest), we can accurately determine your 
          vocal range, identify your voice type, and provide detailed insights about your singing capabilities.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">Why Use SingMeter?</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
          <li><strong>No Signup Required:</strong> Start testing immediately</li>
          <li><strong>Privacy First:</strong> Your voice is never recorded or stored</li>
          <li><strong>Professional Accuracy:</strong> Advanced pitch detection technology</li>
          <li><strong>Instant Results:</strong> Get your results in seconds</li>
          <li><strong>Educational:</strong> Learn about your voice type and capabilities</li>
        </ul>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">Who Is It For?</h4>
        <p className="text-gray-600 mb-4">
          SingMeter is perfect for:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Aspiring singers wanting to understand their voice</li>
          <li>Vocal students tracking their progress</li>
          <li>Choir members finding their voice part</li>
          <li>Music teachers assessing students</li>
          <li>Anyone curious about their singing range</li>
        </ul>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">Technology</h4>
        <p className="text-gray-600 mb-4">
          Built with modern web technologies including React, Web Audio API, and advanced pitch detection 
          algorithms. All processing happens locally in your browser for maximum privacy and speed.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mt-6 rounded-r-lg">
          <p className="text-sm text-indigo-700">
            <strong>Our Mission:</strong> To make professional vocal range testing accessible to everyone, 
            helping singers worldwide discover and develop their unique voice.
          </p>
        </div>
      </div>
    </Modal>
  );
};

// Import useState for ContactModal
import { useState } from 'react';


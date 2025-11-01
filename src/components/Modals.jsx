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

// Terms of Service Modal
export const TermsModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Terms of Service">
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-600 mb-6">
          Welcome to SingMeter! By accessing or using our website and services, you agree to be bound by these Terms of Service.
          Please read them carefully before using our vocal range testing service.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h4>
        <p className="text-gray-600 mb-4">
          By accessing and using SingMeter ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement.
          If you do not agree to these terms, please do not use the Service.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">2. Description of Service</h4>
        <p className="text-gray-600 mb-4">
          SingMeter provides a free online vocal range testing tool that analyzes your voice using your device's microphone.
          The Service uses Web Audio API technology to detect pitch and determine your vocal range and voice type.
          All voice analysis is performed locally in your web browser.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">3. User Eligibility</h4>
        <p className="text-gray-600 mb-4">
          You must be at least 13 years old to use this Service. If you are under 18, you must have permission from a parent
          or legal guardian to use the Service. By using the Service, you represent and warrant that you meet these eligibility requirements.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">4. Microphone Access and Privacy</h4>
        <p className="text-gray-600 mb-4">
          The Service requires access to your device's microphone to analyze your voice. By granting microphone access, you acknowledge that:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
          <li>Your voice is processed in real-time in your browser</li>
          <li>No audio recordings are made, stored, or transmitted to our servers</li>
          <li>All voice analysis happens locally on your device</li>
          <li>You can revoke microphone access at any time through your browser settings</li>
        </ul>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">5. Acceptable Use</h4>
        <p className="text-gray-600 mb-4">
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
          <li>Use the Service in any way that violates any applicable law or regulation</li>
          <li>Attempt to interfere with, compromise, or disrupt the Service or servers</li>
          <li>Use any automated system or software to extract data from the Service</li>
          <li>Attempt to gain unauthorized access to any portion of the Service</li>
          <li>Use the Service to transmit any malicious code or harmful content</li>
          <li>Impersonate or attempt to impersonate SingMeter or any other person or entity</li>
        </ul>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">6. Intellectual Property Rights</h4>
        <p className="text-gray-600 mb-4">
          The Service and its original content, features, and functionality are owned by SingMeter and are protected by
          international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        <p className="text-gray-600 mb-4">
          You may not copy, modify, distribute, sell, or lease any part of our Service or included software, nor may you
          reverse engineer or attempt to extract the source code of that software, unless laws prohibit these restrictions
          or you have our written permission.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">7. Disclaimer of Warranties</h4>
        <p className="text-gray-600 mb-4">
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
          <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
          <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
          <li>Warranties regarding the accuracy, reliability, or completeness of test results</li>
        </ul>
        <p className="text-gray-600 mb-4">
          The vocal range test results are for informational and educational purposes only. They should not be considered
          as professional medical or vocal coaching advice.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">8. Limitation of Liability</h4>
        <p className="text-gray-600 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SINGMETER, ITS AFFILIATES, DIRECTORS, EMPLOYEES,
          OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT
          NOT LIMITED TO:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
          <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
          <li>Damages resulting from your access to or use of (or inability to access or use) the Service</li>
          <li>Damages resulting from any conduct or content of any third party on the Service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">9. Indemnification</h4>
        <p className="text-gray-600 mb-4">
          You agree to defend, indemnify, and hold harmless SingMeter and its affiliates, licensors, and service providers
          from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including
          reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">10. Third-Party Services</h4>
        <p className="text-gray-600 mb-4">
          The Service may contain links to third-party websites or services that are not owned or controlled by SingMeter.
          We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any
          third-party websites or services. You acknowledge and agree that SingMeter shall not be responsible or liable
          for any damage or loss caused by your use of any such third-party content or services.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">11. Advertising</h4>
        <p className="text-gray-600 mb-4">
          The Service may display advertisements from third-party advertising networks, including Google AdSense.
          These advertisements may use cookies and other tracking technologies to serve ads based on your browsing activity.
          We do not control the content of these advertisements or the practices of the advertisers.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">12. Changes to the Service</h4>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time,
          with or without notice, for any reason. We shall not be liable to you or any third party for any modification,
          suspension, or discontinuance of the Service.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">13. Changes to Terms</h4>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these Terms at any time. We will notify users of any material changes by
          posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service
          after any such changes constitutes your acceptance of the new Terms.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">14. Governing Law</h4>
        <p className="text-gray-600 mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the United States,
          without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms
          will be brought exclusively in the federal or state courts located in the United States.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">15. Severability</h4>
        <p className="text-gray-600 mb-4">
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions
          of these Terms will remain in effect. The invalid or unenforceable provision will be deemed modified to the
          extent necessary to make it valid and enforceable.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">16. Entire Agreement</h4>
        <p className="text-gray-600 mb-4">
          These Terms constitute the entire agreement between you and SingMeter regarding the use of the Service,
          superseding any prior agreements between you and SingMeter relating to your use of the Service.
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">17. Contact Information</h4>
        <p className="text-gray-600 mb-4">
          If you have any questions about these Terms of Service, please contact us through our contact form.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h5 className="font-semibold text-blue-800 mb-1">Important Notice</h5>
              <p className="text-sm text-blue-700">
                By using SingMeter, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Import useState for ContactModal
import { useState } from 'react';


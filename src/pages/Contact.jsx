import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      details: "+91 (555) 123-4567",
      description: "Available Mon-Fri, 9 AM - 6 PM IST"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      details: "support@realestate.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      details: "Hyderabad, Telangana, India",
      description: "Office hours: Mon-Fri 9 AM - 6 PM"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      details: "+91 (555) 987-6543",
      description: "Quick support & inquiries"
    }
  ];

  const faqItems = [
    {
      question: "What is your response time?",
      answer: "We typically respond to emails within 24 hours and WhatsApp messages within 2-4 hours during business hours."
    },
    {
      question: "Do you offer property consultations?",
      answer: "Yes! We offer free initial consultations to help you understand your real estate needs and find the perfect property."
    },
    {
      question: "What verification services do you provide?",
      answer: "We provide comprehensive legal verification, document validation, and government record checks for all properties."
    },
    {
      question: "How can I list my property?",
      answer: "Sign up as a seller, complete KYC verification, and use our simple property listing form to add your properties."
    },
    {
      question: "Are you available on weekends?",
      answer: "Yes, we have limited weekend support via email and WhatsApp for urgent inquiries."
    },
    {
      question: "Do you charge for initial consultation?",
      answer: "No, our initial consultation is completely free. We only charge for specific verification and premium services."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-soft to-white text-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-900 mb-8">
            Have questions about our services? Our expert team is here to help you find the perfect property or solution.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{method.details}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <p className="font-semibold text-green-800">Message Sent!</p>
                    <p className="text-sm text-green-700">Thank you for reaching out. We'll contact you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="+91 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Property inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full hardgreen hover:opacity-95 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className=''>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Business Hours</h3>
                <div className="space-y-3 hardorange p-6 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">Monday - Friday</p>
                      <p className="text-sm text-gray-600">9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">Saturday</p>
                      <p className="text-sm text-gray-600">10:00 AM - 4:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">Sunday</p>
                      <p className="text-sm text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full flex items-center justify-center transition">
                    <FaFacebook className="text-lg" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full flex items-center justify-center transition">
                    <FaTwitter className="text-lg" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full flex items-center justify-center transition">
                    <FaLinkedin className="text-lg" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-full flex items-center justify-center transition">
                    <FaWhatsapp className="text-lg" />
                  </a>
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2899.35390722865!2d78.385621!3d17.443851!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873dde7736fdeff1%3A0x88d3af212bf885bc!2sLevitica%20Technologies%20PVT%20LTD!5e1!3m2!1sen!2sin!4v1772191062705!5m2!1sen!2sin"
                  width="600"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 hardorange">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-800 group-open:bg-blue-50 transition flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
                </summary>
                <div className="px-6 py-4 bg-blue-50 text-gray-700 border-t border-blue-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

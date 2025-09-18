import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, Navigation } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Call us for immediate assistance',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@royalcars.co.in', 'support@royalcars.co.in'],
      description: 'Send us an email anytime',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: ['123 Business District', 'Mumbai, Maharashtra 400001'],
      description: 'Visit our main office',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: '24/7 emergency support available',
      color: 'from-rose-500 to-pink-500'
    }
  ];

  const offices = [
    {
      city: 'Patna',
      address: '123 Fraser Road, Patna, Bihar 800001',
      phone: '+91 98765 43210',
      email: 'patna@royalcars.co.in'
    },
    {
      city: 'Gaya',
      address: '456 Station Road, Gaya, Bihar 823001',
      phone: '+91 98765 43211',
      email: 'gaya@royalcars.co.in'
    },
    {
      city: 'Nalanda',
      address: '789 University Area, Nalanda, Bihar 803111',
      phone: '+91 98765 43212',
      email: 'nalanda@royalcars.co.in'
    }
  ];

  return (
    <>
      {/* Fullscreen gradient background */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-primary-100 via-purple-100 to-accent-100" style={{ zIndex: -999 }} />
      <div className="min-h-screen relative">
        {/* Hero Section */}
        <section className="relative py-24 mt-16 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-2xl z-0 rounded-3xl shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-6 text-primary-700 drop-shadow-lg"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Get In Touch
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-primary-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Have questions about our services? Need assistance with your booking? <br />
                We're here to help you 24/7 with dedicated customer support.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-2 bg-gradient-to-r from-primary-200 via-purple-200 to-accent-200 my-2 rounded-full opacity-60" />

        {/* Contact Info Cards */}
        <section className="py-20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group hover:scale-105 duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`bg-gradient-to-r ${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1 text-gray-600 mb-3">
                    {info.details.map((detail, i) => (
                      <div key={i} className="font-medium">{detail}</div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Quick Contact */}
        <section className="py-20 bg-gradient-to-br from-gray-50/80 to-purple-50/80 backdrop-blur-xl relative">
          {/* Floating background elements */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 bg-accent-300/20 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div 
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40 relative overflow-hidden" 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/50 -z-10" />
                
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </h2>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 mb-8 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  We'd love to hear from you! Drop us a message and we'll respond within 24 hours.
                </motion.p>
                
                {submitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Message Sent Successfully! 🎉
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-8 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Thank you for reaching out! Our team will get back to you within 24 hours.
                    </motion.p>
                    <motion.button
                      onClick={() => setSubmitted(false)}
                      className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="name" className="block text-sm font-semibold text-primary-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-100 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-primary-900 placeholder-primary-400"
                          placeholder="Enter your full name"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-100 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-primary-900 placeholder-primary-400"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label htmlFor="phone" className="block text-sm font-semibold text-primary-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-5 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-100 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-primary-900 placeholder-primary-400"
                          placeholder="+91 98765 43210"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label htmlFor="subject" className="block text-sm font-semibold text-primary-700 mb-3">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-100 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-primary-900"
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">🚗 Booking Inquiry</option>
                          <option value="support">🛠️ Customer Support</option>
                          <option value="partnership">🤝 Business Partnership</option>
                          <option value="feedback">💬 Feedback</option>
                          <option value="other">📋 Other</option>
                        </select>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <label htmlFor="message" className="block text-sm font-semibold text-primary-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-5 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-100 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-primary-900 placeholder-primary-400 resize-none"
                        placeholder="How can we help you? Please provide as much detail as possible..."
                      />
                    </motion.div>
                    
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-5 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                      whileHover={{ scale: loading ? 1 : 1.05 }}
                      whileTap={{ scale: loading ? 1 : 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          Sending Your Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
              {/* Quick Contact & FAQ */}
              <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                {/* Quick Contact */}
                <motion.div 
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-purple-50/50 -z-10" />
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-gradient-to-r from-accent-500 to-purple-500 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-accent-700 to-purple-600 bg-clip-text text-transparent">
                      Need Immediate Help?
                    </h3>
                  </motion.div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Call Now</div>
                        <div className="text-green-600 font-medium">+91 98765 43210</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Live Chat</div>
                        <div className="text-blue-600 font-medium">Available 24/7</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Headphones className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Emergency Support</div>
                        <div className="text-purple-600 font-medium">+91 98765 43211</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* FAQ */}
                <motion.div 
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/50 -z-10" />
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">
                      Frequently Asked
                    </h3>
                  </motion.div>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">What documents do I need to rent a car?</h4>
                      <p className="text-gray-600 text-sm">Valid driving license, government ID, and a credit/debit card for security deposit.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Can I cancel my booking?</h4>
                      <p className="text-gray-600 text-sm">Yes, free cancellation up to 24 hours before pickup time.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Is fuel included in the rental?</h4>
                      <p className="text-gray-600 text-sm">Fuel is provided at pickup and should be returned at the same level.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Do you offer delivery service?</h4>
                      <p className="text-gray-600 text-sm">Yes, we offer doorstep delivery and pickup in most cities.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-2 bg-gradient-to-r from-primary-200 via-purple-200 to-accent-200 my-2 rounded-full opacity-60" />

        {/* Office Locations */}
        <section className="py-20 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
                Our Locations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit us at any of our office locations or contact our local teams for personalized assistance.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors group hover:scale-105 duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-100 p-2 rounded-full group-hover:bg-primary-200 transition-colors">
                      <Navigation className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{office.email}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
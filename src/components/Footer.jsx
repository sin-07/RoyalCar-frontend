import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-12 mt-20 relative z-10 w-full min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 border-gray-700 border-b"
      >
        {/* Brand Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl font-bold text-primary-600 mb-3 sm:mb-4"
          >
            Royal Cars
          </motion.div>
          <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
            Premium car rental service offering luxury vehicles with exceptional customer experience. 
            Book your perfect ride today!
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <Facebook size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <Instagram size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <Twitter size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cars" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/cars?category=luxury" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                Luxury Cars
              </Link>
            </li>
            <li>
              <Link to="/cars?category=sedan" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                Sedan Cars
              </Link>
            </li>
            <li>
              <Link to="/cars?category=suv" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                SUV Cars
              </Link>
            </li>
            <li>
              <Link to="/owner/register" className="text-gray-300 hover:text-primary-400 transition-colors block py-1">
                List Your Car
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone size={14} className="text-primary-400 sm:w-4 sm:h-4" />
              <span className="text-gray-300">+91 9876543210</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Mail size={14} className="text-primary-400 sm:w-4 sm:h-4" />
              <span className="text-gray-300">info@royalcars.com</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <MapPin size={14} className="text-primary-400 sm:w-4 sm:h-4" />
              <span className="text-gray-300">Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4"
      >
        <p className="text-center sm:text-left text-xs sm:text-sm text-gray-300">
          © 2024 Royal Cars. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-6 text-xs justify-center">
          <Link to="/privacy-policy" className="text-gray-300 hover:text-primary-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-gray-300 hover:text-primary-400 transition-colors">
            Terms of Service
          </Link>
          <Link to="/cookie-policy" className="text-gray-300 hover:text-primary-400 transition-colors">
            Cookie Policy
          </Link>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
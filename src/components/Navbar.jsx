import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useApp } from '../context/AppContext'

const menuLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cars', path: '/cars' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { user, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full flex items-center justify-between px-6 md:px-10 lg:px-10 xl:px-10 py-4 text-gray-600 border-b border-gray-200 transition-all z-50 ${
        location.pathname === '/' ? 'bg-white' : 'bg-white'
      }`}
    >
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="text-2xl font-bold text-primary-600">
            Royal Cars
          </div>
        </motion.div>
      </Link>

      {/* Mobile menu backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-30"
          onClick={() => setOpen(false)}
          style={{ top: '73px' }}
        />
      )}

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[73px] max-sm:left-0 max-sm:border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-6 max-sm:pt-8 transition-all duration-300 max-sm:shadow-lg ${
          location.pathname === '/'
            ? 'max-sm:bg-white sm:bg-transparent'
            : 'max-sm:bg-white sm:bg-transparent'
        } ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}
        style={{
          zIndex: 40,
        }}
      >
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`relative py-2 px-1 transition-colors duration-200 font-medium ${
                location.pathname === link.path
                  ? 'text-primary-600'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* User Authentication Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => { setOpen(false); navigate('/login'); }}
                className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setOpen(false); navigate('/register'); }}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.div>
  )
}

export default Navbar
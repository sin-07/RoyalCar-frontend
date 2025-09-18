import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();
  
  // Get redirect information from location state
  const from = location.state?.from || '/';
  const bookingData = location.state?.bookingData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const success = await login(email, password);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Redirect back to available cars page with booking data if coming from booking
          if (from === '/available-cars' && bookingData) {
            navigate('/available-cars', { state: { bookingData } });
          } else {
            navigate(from);
          }
        }, 1200);
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Global fullscreen background - covers everything including footer */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-primary-100 via-purple-100 to-accent-100" style={{ zIndex: -999 }} />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated floating purple shapes */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ zIndex: -10 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float-delayed"
          style={{ zIndex: -10 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 relative z-10 border border-white/40"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl font-extrabold text-center text-primary-700 mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sign In to <span className="text-primary-600">Royal Cars</span>
          </motion.h2>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-green-600 bg-green-50 border border-green-200 rounded px-6 py-3 shadow-lg text-lg font-semibold animate-fade-in text-center">
                Successfully logged in!
              </div>
            </motion.div>
          )}
          {error && <motion.div className="mb-4 text-red-600 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
          <form onSubmit={handleSubmit} className="space-y-7">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-2">
                <button type="button" className="text-primary-600 hover:underline text-sm font-medium" onClick={() => setShowForgot(true)}>
                  Forgot password?
                </button>
              </div>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
            >
              {loading ? (
                <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> Signing in...</span>
              ) : 'Sign In'}
            </motion.button>
          </form>
          <motion.div className="mt-7 text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:underline font-medium">Sign Up</Link>
          </motion.div>

          {/* Forgot Password Popup */}
          {showForgot && (
            <motion.div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl" onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}>&times;</button>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Reset Password</h3>
                {forgotMsg && <div className={`mb-3 text-center ${forgotMsg.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>{forgotMsg}</div>}
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
                <button
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
                  disabled={forgotLoading}
                  onClick={async () => {
                    setForgotLoading(true);
                    setForgotMsg('');
                    try {
                      const res = await axios.post('/api/auth/send-otp', { email: forgotEmail });
                      if (res.data.success) {
                        setForgotMsg('OTP sent! Redirecting...');
                        setTimeout(() => {
                          setShowForgot(false);
                          setForgotMsg('');
                          setForgotEmail('');
                          navigate(`/otp?email=${encodeURIComponent(forgotEmail)}`);
                        }, 1200);
                      } else {
                        setForgotMsg(res.data.message || 'Failed to send OTP.');
                      }
                    } catch (error) {
                      setForgotMsg(error.response?.data?.message || 'Failed to send OTP.');
                    } finally {
                      setForgotLoading(false);
                    }
                  }}
                >
                  {forgotLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
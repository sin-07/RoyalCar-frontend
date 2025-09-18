import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SuccessPopup from '../../components/SuccessPopup';


export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Step 1: Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup/send-otp', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      setSuccess('OTP sent to your email. Please check your inbox.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup/verify-otp', {
        email: form.email,
        otp
      });
      setLoading(false);
      setShowSuccessPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or expired.');
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    setTimeout(() => navigate('/login'), 500);
  };

  return (
    <>
      {/* Global fullscreen background - covers everything including footer */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-primary-100 via-purple-100 to-accent-100" style={{ zIndex: -999 }} />
      
  <div className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24">
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
        <div className="flex-1 w-full flex items-center justify-center z-10">
        <motion.div
          className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 relative border border-white/40"
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
            Create Your Account
          </motion.h2>
          {error && <motion.div className="mb-4 text-red-600 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
          {success && <motion.div className="mb-4 text-green-600 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{success}</motion.div>}
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-7">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-5 py-4 border border-primary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-100 text-primary-900 font-semibold shadow-md placeholder-primary-300 transition-all duration-300"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoFocus
                  placeholder="Enter your name"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-5 py-4 border border-primary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-100 text-primary-900 font-semibold shadow-md placeholder-primary-300 transition-all duration-300"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-5 py-4 border border-primary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-100 text-primary-900 font-semibold shadow-md placeholder-primary-300 transition-all duration-300"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-5 py-4 border border-primary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-100 text-primary-900 font-semibold shadow-md placeholder-primary-300 transition-all duration-300"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> Sending OTP...</span>
                ) : 'Send OTP & Register'}
              </motion.button>
            </form>
          ) : (
            <div className="space-y-7">
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Verify Your Email</h3>
                <p className="text-sm text-gray-600">We've sent a 6-digit code to</p>
                <p className="text-primary-600 font-semibold">{form.email}</p>
              </motion.div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 0 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-gray-700 mb-4 font-semibold text-center">Enter 6-Digit Code</label>
                  <div className="flex justify-center mb-4">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      maxLength={6}
            className="w-full max-w-xs px-6 py-5 border border-primary-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100 text-primary-900 font-bold shadow-lg tracking-[0.5em] text-center text-2xl placeholder-primary-300 transition-all duration-300"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      autoFocus
                      pattern="[0-9]{6}"
                      inputMode="numeric"
                      placeholder="••••••"
                      style={{ letterSpacing: '0.5em', paddingLeft: '1.5rem' }}
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-sm text-gray-500">
                      Check your email inbox for the verification code
                    </div>
                    <div className="text-xs text-gray-400">
                      Code expires in 10 minutes
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline transition-colors"
                      onClick={() => {
                        setStep(1);
                        setOtp('');
                        setError('');
                        setSuccess('');
                      }}
                    >
                      Didn't receive the code? Send again
                    </button>
                  </div>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
                  disabled={loading || otp.length !== 6}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: loading ? 1 : 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> 
                      Verifying OTP...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>🔓</span>
                      Verify & Complete Registration
                    </span>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                    setError('');
                    setSuccess('');
                  }}
                  className="w-full text-gray-600 hover:text-gray-800 py-2 rounded-lg font-medium transition-colors text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ← Back to Registration Form
                </motion.button>
              </form>
            </div>
          )}
          <motion.div className="mt-7 text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:underline font-medium">Sign In</Link>
          </motion.div>
        </motion.div>

        {/* Success Popup */}
        <SuccessPopup
          isOpen={showSuccessPopup}
          onClose={handlePopupClose}
          title="🎉 Email Verified Successfully!"
          message="Welcome to Royal Cars! Your account has been created successfully. You'll now be redirected to the login page to start your premium car rental journey."
          autoClose={true}
          autoCloseDelay={4000}
        />
        </div>
      </div>
    </>
  );
}
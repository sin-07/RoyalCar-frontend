import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const SuccessPopup = ({ isOpen, onClose, title, message, autoClose = true, autoCloseDelay = 3000 }) => {
  // Auto close functionality
  if (autoClose && isOpen) {
    setTimeout(() => {
      onClose();
    }, autoCloseDelay);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-white/20">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
                
                {/* Success Icon */}
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3
                  className="text-white text-xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {title}
                </motion.h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.p
                  className="text-gray-600 text-center leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {message}
                </motion.p>

                {/* Progress bar for auto-close */}
                {autoClose && (
                  <motion.div
                    className="w-full bg-gray-200 rounded-full h-1 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: autoCloseDelay / 1000, ease: "linear" }}
                    />
                  </motion.div>
                )}

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Continue
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;
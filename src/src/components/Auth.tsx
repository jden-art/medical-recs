import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Loader2 } from 'lucide-react';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<'input' | 'verifying'>('input');
  const [aadhaar, setAadhaar] = useState('');

  const handleVerify = () => {
    if (aadhaar.length !== 12) return;
    setStep('verifying');
    setTimeout(() => {
      onLoginSuccess();
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="frosted-panel w-full max-w-md p-10 rounded-[40px] relative z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 'input' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#0A84FF]/10 text-[#0A84FF] rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Secure Access</h2>
                <p className="text-[#94A3B8] mb-8">Enter your 12-digit Aadhaar number to access your secure medical portal.</p>
                
                <input
                  type="text"
                  maxLength={12}
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                  placeholder="0000 0000 0000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-2xl tracking-[0.2em] text-center focus:outline-none focus:border-[#0A84FF] transition-colors mb-8"
                />

                <button
                  disabled={aadhaar.length !== 12}
                  onClick={handleVerify}
                  className="btn-primary w-full py-4 text-lg"
                >
                  Verify Identity
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-[#0A84FF] border-t-transparent rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-[#0A84FF] animate-pulse" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Verifying Credentials</h2>
                <p className="text-[#94A3B8]">Establishing a secure connection to UIDAI...</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Auth;

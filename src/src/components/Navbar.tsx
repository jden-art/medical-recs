import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn, onLogout }) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl"
    >
      <div className="frosted-panel rounded-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0A84FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight">AarogyaScribe</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {['Platform', 'Security', 'Network'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="relative px-4 py-2 text-sm font-medium hover:text-white transition-colors group"
            >
              <span className="relative z-10">{item}</span>
              <motion.div 
                className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100"
                layoutId="nav-hover"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            </a>
          ))}
        </div>

        <div>
          {isLoggedIn ? (
            <button onClick={onLogout} className="btn-ghost text-sm font-semibold">Sign Out</button>
          ) : (
            <button onClick={onLoginClick} className="btn-primary text-sm">Access Portal</button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

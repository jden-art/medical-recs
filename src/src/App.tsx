import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Grain from './components/Grain';
import WorldMap from './components/WorldMap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Transition effect for logging in
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Add a slight delay for transition effect
    setTimeout(() => {
        setShowDashboard(true);
    }, 500);
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setTimeout(() => {
        setIsLoggedIn(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen">
      <Grain />
      <WorldMap />
      
      <Navbar 
        onLoginClick={() => setIsAuthOpen(true)} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero />
            <Features />
            <HowItWorks />
            
            <section className="py-32 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold mb-8">Ready to take control of your health data?</h2>
                <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="btn-primary text-xl px-12 py-5"
                >
                    Get Started with AarogyaScribe
                </button>
            </section>

            <footer className="py-20 px-6 border-t border-white/5 text-center text-sm text-[#94A3B8]">
                <p>&copy; 2026 AarogyaScribe Ecosystem. All rights reserved. Secure biometric authentication required.</p>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>

      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;

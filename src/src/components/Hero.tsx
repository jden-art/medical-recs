import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-4xl"
      >
        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          The Future of Medical Records is <span className="text-[#0A84FF]">Unified.</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
        >
          A seamless, secure, and intelligent ecosystem for your health data. 
          Experience the standard in modern healthcare management.
        </motion.p>
      </motion.div>

      {/* Abstract 3D shape element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center"
      >
        <div className="relative w-[600px] h-[600px]">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/20 to-transparent blur-3xl opacity-50"
          />
          <motion.div
             animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1],
              borderRadius: ["50% 50% 20% 80% / 25% 80% 20% 75%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%"]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 bg-gradient-to-tr from-[#30D158]/10 to-transparent blur-3xl opacity-30"
          />
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium text-[#94A3B8]">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-[#0A84FF] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;

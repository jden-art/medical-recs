import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Fingerprint, FileText, Share2 } from 'lucide-react';

const steps = [
  {
    title: "Biometric Verification",
    description: "Your identity is your key. We use advanced biometric hashing to secure your portal access without ever storing sensitive personal data.",
    visual: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[#0A84FF]/20 blur-3xl rounded-full" 
        />
        <Fingerprint className="w-32 h-32 text-[#0A84FF]" />
        <motion.div 
          animate={{ y: [-40, 40, -40] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-1 bg-[#0A84FF]/50 shadow-[0_0_20px_#0A84FF]"
        />
      </div>
    )
  },
  {
    title: "Document Ingestion",
    description: "Simply upload any medical document. Our AI scans, OCRs, and categorizes the data into your unified health timeline automatically.",
    visual: (
      <div className="relative w-64 h-64 flex flex-col items-center justify-center gap-4">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
            className="w-32 h-12 frosted-panel rounded-lg flex items-center px-4 gap-3"
          >
            <FileText className="w-5 h-5 text-[#0A84FF]" />
            <div className="h-2 w-16 bg-[#94A3B8]/20 rounded-full" />
          </motion.div>
        ))}
      </div>
    )
  },
  {
    title: "AI Processing",
    description: "Complex lab results are transformed into understandable trends and actionable insights, helping you and your doctor make better decisions.",
    visual: (
      <div className="relative w-64 h-64">
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-[#0A84FF]/30 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Share2 className="w-20 h-20 text-[#0A84FF]" />
          </div>
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#0A84FF] rounded-full blur-[2px]"
              animate={{ 
                x: Math.cos(i * Math.PI / 2) * 100, 
                y: Math.sin(i * Math.PI / 2) * 100,
                opacity: [0.2, 1, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              style={{ left: 'calc(50% - 8px)', top: 'calc(50% - 8px)' }}
            />
          ))}
      </div>
    )
  }
];

const Step = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="h-screen flex items-center">
      <div className="max-w-md">
        <motion.span 
          animate={{ opacity: isInView ? 1 : 0.3 }}
          className="text-[#0A84FF] font-bold text-sm tracking-widest uppercase mb-4 block"
        >
          Step 0{index + 1}
        </motion.span>
        <motion.h3 
          animate={{ opacity: isInView ? 1 : 0.3, y: isInView ? 0 : 20 }}
          className="text-4xl font-bold mb-6"
        >
          {step.title}
        </motion.h3>
        <motion.p 
          animate={{ opacity: isInView ? 1 : 0.3, y: isInView ? 0 : 20 }}
          className="text-lg text-[#94A3B8] leading-relaxed"
        >
          {step.description}
        </motion.p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll-telling visual logic is handled within the VisualWrapper components
  // which react to the scrollYProgress of this container.
  
  return (
    <section ref={containerRef} className="relative px-6 max-w-7xl mx-auto flex">
      {/* Left Column: Text Content */}
      <div className="w-1/2">
        {steps.map((step, index) => (
          <Step key={index} step={step} index={index} />
        ))}
      </div>

      {/* Right Column: Sticky Visuals */}
      <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center">
        <div className="frosted-panel w-[500px] h-[500px] rounded-[40px] flex items-center justify-center overflow-hidden">
           {steps.map((step, index) => {
             // We can't easily use hooks inside map, but we can use the transform value or simplified logic
             return (
               <VisualWrapper key={index} index={index} scrollYProgress={scrollYProgress}>
                 {step.visual}
               </VisualWrapper>
             )
           })}
        </div>
      </div>
    </section>
  );
};

const VisualWrapper = ({ children, index, scrollYProgress }: { children: React.ReactNode, index: number, scrollYProgress: any }) => {
  const opacity = useTransform(
    scrollYProgress, 
    [index * 0.33, index * 0.33 + 0.15, (index + 1) * 0.33 - 0.15, (index + 1) * 0.33], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [index * 0.33, index * 0.33 + 0.15],
    [0.8, 1]
  );

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
}

export default HowItWorks;

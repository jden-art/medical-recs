import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Activity, Globe, Lock, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Biometric Security",
    description: "Multi-layered authentication ensuring only you have access to your most sensitive medical records."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Retrieval",
    description: "Access your entire medical history in seconds, whether you're at a local clinic or across the globe."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Health Insights",
    description: "Advanced AI analysis providing clear summaries and early detection markers from your lab results."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Network",
    description: "Seamlessly share records with thousands of participating hospitals and insurance providers worldwide."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Privacy",
    description: "Zero-knowledge architecture means your data is encrypted locally before it ever reaches our servers."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Processing",
    description: "Our proprietary models intelligently categorize and tag your documents for effortless organization."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3)" }}
            className="frosted-panel p-8 rounded-3xl group cursor-default transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#0A84FF]/10 text-[#0A84FF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-[#94A3B8] leading-relaxed mb-6">
              {feature.description}
            </p>
            <a href="#" className="inline-flex items-center text-sm font-semibold text-[#0A84FF] opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <span className="ml-2">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;

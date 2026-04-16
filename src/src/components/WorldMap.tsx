import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const WorldMap: React.FC = () => {
  const dots = useMemo(() => {
    const points: { x: number; y: number; size: number }[] = [];
    
    const addCluster = (baseX: number, baseY: number, width: number, height: number, density: number, probability = 0.4) => {
      for (let x = 0; x < width; x += density) {
        for (let y = 0; y < height; y += density) {
          if (Math.random() > probability) {
            points.push({
              x: baseX + x + (Math.random() * 1.5),
              y: baseY + y + (Math.random() * 1.5),
              size: Math.random() * 1.2 + 0.4
            });
          }
        }
      }
    };

    // More detailed clusters for a better "world" feel
    // North America
    addCluster(12, 22, 20, 15, 2.2, 0.3);
    addCluster(15, 37, 8, 5, 2.2, 0.4); // Central America
    // South America
    addCluster(28, 48, 12, 20, 2.2, 0.3);
    // Europe
    addCluster(46, 20, 12, 10, 2.0, 0.2);
    // Africa
    addCluster(45, 35, 18, 25, 2.2, 0.3);
    // Asia
    addCluster(58, 15, 32, 30, 2.2, 0.2);
    addCluster(60, 45, 10, 8, 2.2, 0.4); // SE Asia
    // Oceania
    addCluster(80, 58, 12, 10, 2.2, 0.3);
    // Greenland
    addCluster(35, 12, 8, 5, 3, 0.5);
    
    return points;
  }, []);

  const connections = useMemo(() => {
    // Select some random dots to connect
    const lines = [];
    for (let i = 0; i < 15; i++) {
      const start = dots[Math.floor(Math.random() * dots.length)];
      const end = dots[Math.floor(Math.random() * dots.length)];
      if (start && end) {
        lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
      }
    }
    return lines;
  }, [dots]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="activeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#30D158" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#30D158" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Subtle grid lines */}
        <g stroke="rgba(255,255,255,0.02)" strokeWidth="0.03">
          {[...Array(20)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} />
          ))}
        </g>

        {connections.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#0A84FF"
            strokeWidth="0.08"
            strokeOpacity="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.15, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}

        {dots.map((dot, i) => {
          const isActive = i % 25 === 0; // Every 25th dot is an "active node"
          return (
            <motion.circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={isActive ? dot.size * 0.25 : dot.size * 0.12}
              fill={isActive ? "url(#activeGradient)" : "url(#dotGradient)"}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? [0.2, 0.8, 0.2] : [0.05, 0.25, 0.05],
                scale: isActive ? [1, 1.5, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: (isActive ? 2 : 4) + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>
      
      {/* Dark vignette to focus content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1d2129] opacity-60" />
    </div>
  );
};

export default WorldMap;

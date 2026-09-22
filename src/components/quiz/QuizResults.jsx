import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const QuizResults = ({ answers }) => {
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate analyzing profile
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[#16C784]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#16C784] animate-spin"></div>
            <div className="absolute inset-0 animate-pulse-slow-centered rounded-full bg-[#16C784]/10 blur-xl"></div>
          </div>
          <h2 className="text-2xl font-bold text-center tracking-wide mb-2 animate-pulse">
            Analyzing Your Profile
          </h2>
          <p className="text-[#A8B3AA] text-sm text-center">
            Building your custom clinical stack protocol...
          </p>
        </motion.div>
      </div>
    );
  }

  // Derive some dynamic text based on answers
  const topConcern = answers['concern'] || 'Low Energy & Fatigue';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-2xl"
      >
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-[#BFA46A]/20 relative overflow-hidden">
          {/* Subtle glow effect behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#BFA46A]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight liquid-reveal-accent">
            Your Protocol is Ready
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto">
            Based on your responses—especially your concern with <strong className="text-white">"{topConcern}"</strong>—we’ve determined that the T-CORE 30-Day Clinical System is the optimal fit for your physiology.
          </p>

          <div className="bg-black/50 border border-white/5 rounded-2xl p-6 mb-10 text-left space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-3">What You Can Expect:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#16C784] mt-1">✔</span>
                <span className="text-gray-300">Restoration of baseline energy rhythms within 14 days.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#16C784] mt-1">✔</span>
                <span className="text-gray-300">Improved physical recovery and muscle maintenance support.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#16C784] mt-1">✔</span>
                <span className="text-gray-300">Decreased afternoon brain fog and better stress resilience.</span>
              </li>
            </ul>
          </div>

          <Link 
            to="/products/t-core" 
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-[#F4F6F2] text-black font-bold text-lg rounded-full btn-sweep hover:scale-105 transition-transform duration-300"
          >
            GET T-CORE NOW
          </Link>
          
          <p className="mt-6 text-sm text-[#A8B3AA]">
            Backed by our 90-Day Clinical Guarantee.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResults;

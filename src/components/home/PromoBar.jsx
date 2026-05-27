import React, { useState, useEffect } from 'react';
import { ShieldAlert, Timer, ArrowRight } from 'lucide-react';

const PromoBar = () => {
  const options = [
    "Founder Launch Access — First Batch Release Now Live.",
    "Limited Launch Access — Built for Men Who Expect More From Themselves.",
    "Early Access Pricing — Premium Male Vitality Support for Modern Men.",
    "Founder Batch Release — Premium Daily Performance Support."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // rolling 15-minute high-conversion countdown timer
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
        setFade(true);
      }, 500);
    }, 5500);

    return () => clearInterval(interval);
  }, [options.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 900; // Reset rolling timer to maintain continuous high conversion
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="bg-biomen-dark border-b border-biomen-green/30 text-biomen-white py-2.5 px-4 text-center font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 relative z-50">
      
      {/* Dynamic Announcement Option */}
      <span className="flex items-center gap-2">
        <ShieldAlert size={14} className="text-biomen-accent animate-pulse shrink-0" />
        <span className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {options[currentIndex]}
        </span>
      </span>

      {/* Ticking Countdown and CTA */}
      <div className="flex items-center gap-3 bg-biomen-green/40 px-3 py-1 rounded-full border border-biomen-accent/15">
        <span className="flex items-center gap-1.5 text-biomen-accent">
          <Timer size={13} className="animate-spin-slow" />
          <span>Expires In: <span className="font-mono font-black text-biomen-mint">{formatTime(timeLeft)}</span></span>
        </span>
        <span className="text-white/20">|</span>
        <a 
          href="#pricing" 
          className="text-biomen-copper hover:text-biomen-mint underline underline-offset-2 flex items-center gap-1 font-black transition-colors"
        >
          Grab Discount Now <ArrowRight size={12} className="animate-bounce-horizontal" />
        </a>
      </div>
    </div>
  );
};

export default PromoBar;

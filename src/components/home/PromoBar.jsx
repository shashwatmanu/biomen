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

  // rolling 15-minute high-conversion countdown timer using localStorage to prevent reload reset
  const [timeLeft, setTimeLeft] = useState(900);

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
    // Get or create expiry timestamp
    let expiry = localStorage.getItem('promo_expiry');
    const now = Date.now();

    if (!expiry || parseInt(expiry, 10) < now) {
      // If no expiry or it has already passed, set new 15 minutes from now
      const newExpiry = now + 15 * 60 * 1000;
      localStorage.setItem('promo_expiry', newExpiry.toString());
      expiry = newExpiry.toString();
    }

    const targetTime = parseInt(expiry, 10);
    setTimeLeft(Math.max(0, Math.floor((targetTime - Date.now()) / 1000)));

    const timer = setInterval(() => {
      const currentNow = Date.now();
      const difference = Math.floor((targetTime - currentNow) / 1000);

      if (difference <= 0) {
        // Roll over to next 15 minutes when expired
        const newExpiry = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('promo_expiry', newExpiry.toString());
        setTimeLeft(900);
        // Refresh page or trigger state update by changing target
        window.location.reload();
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="bg-biomen-dark border-b border-biomen-green/30 text-biomen-white py-2.5 lg:py-1.5 px-4 text-center font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 relative z-50">
      
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
          href="/products/t-core" 
          className="text-biomen-copper hover:text-biomen-mint underline underline-offset-2 flex items-center gap-1 font-black transition-colors"
        >
          Grab Discount Now <ArrowRight size={12} className="animate-bounce-horizontal" />
        </a>
      </div>
    </div>
  );
};

export default PromoBar;

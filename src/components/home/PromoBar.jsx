import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

const PromoBar = () => {
  const options = [
    "Founder Launch Access — First Batch Release Now Live.",
    "Limited Launch Access — Built for Men Who Expect More From Themselves.",
    "Early Access Pricing — Premium Male Vitality Support for Modern Men.",
    "Founder Batch Release — Premium Daily Performance Support."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
        setFade(true);
      }, 500); // match transition time
    }, 4500);

    return () => clearInterval(interval);
  }, [options.length]);

  return (
    <div className="bg-emerald-500 text-black py-2.5 px-4 text-center font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-colors duration-300">
      <span className="flex items-center gap-2">
        <ShieldAlert size={14} className="animate-pulse" />
      </span>
      <span className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {options[currentIndex]}
      </span>
    </div>
  );
};

export default PromoBar;

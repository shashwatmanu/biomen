import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'IGNITION', num: '01' },
  { id: 'formula', label: 'FORMULA', num: '02' },
  { id: 'depletion', label: 'CRISIS', num: '03' },
  { id: 'solution', label: 'SOLUTION', num: '04' },
  { id: 'timeline', label: 'TIMELINE', num: '05' },
  { id: 'pricing', label: 'SYSTEMS', num: '06' },
  { id: 'faq', label: 'SUPPORT', num: '07' }
];

const ScrollProgressIndicator = () => {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -45% 0px', // Trigger when section occupies the active middle band
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] hidden lg:flex flex-col items-end gap-5 select-none pointer-events-none">
      <div className="relative flex flex-col items-center gap-4 py-2">
        {/* Symmetrical timeline indicator track line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 -translate-x-1/2 z-0" />
        
        {sections.map((sec, idx) => {
          const isActive = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full outline-none group cursor-pointer pointer-events-auto"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Floating label slideout */}
              <span className="absolute right-9 bg-black/85 backdrop-blur-md border border-white/10 py-1.5 px-3 rounded-full text-[9px] font-black tracking-widest text-white uppercase opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#16C784]">{sec.num}</span>
                <span className="text-white/40">/</span>
                <span>{sec.label}</span>
              </span>

              {/* Dot indicator node */}
              <div 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-3.5 h-3.5 bg-[#16C784] shadow-[0_0_12px_#16C784]' 
                    : 'w-2 h-2 bg-white/20 group-hover:bg-white/50 group-hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TransformationGallery = () => {
  const shifts = [
    {
      user: "Amit R. (34)",
      label: "+28% Energy Index",
      focus: "Stamina & Drive",
      quote: "After 60 days of consistent morning T-CORE, the afternoon crash is completely gone. Gym recovery feels like it did in my 20s.",
      image: "/amit.webp"
    },
    {
      user: "Vikram S. (41)",
      label: "+34% Recovery Speed",
      focus: "Cortisol & Stress",
      quote: "Managing a startup was destroying my sleep and focus. T-CORE balanced my daily baseline. My focus is locked all day.",
      image: "/vikram.webp"
    },
    {
      user: "Rohan M. (29)",
      label: "Optimized Baseline",
      focus: "Peak Stamina",
      quote: "The transparency is why I chose Biomen. Knowing exactly what goes into my body changed my athletic performance completely.",
      image: "/rohan.webp"
    },
    {
      user: "Kabir D. (38)",
      label: "+22% Sleep Quality",
      focus: "Daily Resilience",
      quote: "Vegetarian capsules, clean Ayurvedic sourcing, and a real clinical formula. Highly recommend to any modern active man.",
      image: "/kabir.webp"
    }
  ];

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((centerY - y) / centerY) * 4.5;
    const rotateYVal = ((x - centerX) / centerX) * 4.5;
    e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
    e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 md:px-20 bg-biomen-green" id="transformations">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-1.5 block">
              90-DAY PROTOCOL RESULT
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-serif tracking-tight text-white mb-2 uppercase">The Shift is Real</h2>
            <p className="text-gray-300 text-sm lg:text-base font-semibold">See the difference 90 days of consistent biological support can make.</p>
          </div>
          <Link to="/reviews" className="shrink-0 text-biomen-accent font-black uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2 text-xs">
            See all stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shifts.map((shift, i) => (
            <div 
              key={i} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative p-[1.5px] rounded-[2rem] overflow-hidden transition-all duration-500 bg-white/5 shadow-2xl group/gallery-spotlight cursor-pointer"
              style={{
                transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
                transition: 'transform 0.2s ease-out, background 0.3s ease'
              }}
            >
              {/* Spotlight border glow layer */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/gallery-spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0 rounded-[2rem]"
                style={{
                  background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.4), transparent 85%)`
                }}
              />
              
              {/* Inner card container */}
              <div className="relative w-full h-full rounded-[1.9rem] bg-gradient-to-br from-[#06110C] to-black/90 overflow-hidden z-10 flex flex-col justify-between">
                <div className="aspect-square bg-black/45 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={shift.image} 
                    alt={shift.user}
                    className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.1] group-hover/gallery-spotlight:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.75)_80%)]" />
                  
                  {/* Metric Overlay Shift badge */}
                  <div className="absolute top-4 left-4 bg-black/85 border border-[#16C784]/30 px-3 py-1 rounded-xl backdrop-blur-md shadow-md z-20">
                    <span className="text-[9px] font-black tracking-widest text-[#16C784] uppercase">{shift.label}</span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 z-20 flex justify-between items-end">
                    <div>
                      <div className="text-white font-black text-base uppercase tracking-wider">{shift.user}</div>
                      <div className="text-[#A8B3AA] text-[9px] font-black uppercase tracking-widest mt-0.5">Active Routine</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-black/30">
                  <p className="text-xs sm:text-[13px] text-gray-400 italic mb-4 leading-relaxed font-medium min-h-[80px]">
                    "{shift.quote}"
                  </p>
                  <div className="text-[9.5px] font-black uppercase tracking-wider text-biomen-copper bg-[#D85A1F]/10 border border-[#D85A1F]/20 px-2.5 py-1 rounded-md inline-block">
                    Focus: {shift.focus}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationGallery;

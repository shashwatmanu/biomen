import React, { useRef } from 'react';
import { Zap, Activity, Compass, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SolutionGrid = () => {
  const containerRef = useRef(null);

  const mechanisms = [
    { 
      icon: <Zap className="text-[#D85A1F] shrink-0" size={24} />, 
      title: "SKYROCKET ENERGY & STAMINA", 
      desc: "Supports masculine drive, physical capacity, and high-intensity performance stamina.",
      poweredBy: "TONGKAT ALI + FENUGREEK"
    },
    { 
      icon: <Activity className="text-[#D85A1F] shrink-0" size={24} />, 
      title: "SUPPORT MALE VITALITY", 
      desc: "Encourages recovery, stress resilience, and keeps your daily baseline baseline optimized.",
      poweredBy: "SHILAJIT + ASHWAGANDHA"
    },
    { 
      icon: <Compass className="text-[#D85A1F] shrink-0" size={24} />, 
      title: "AMPLIFY ABSORPTION & EFFICIENCY", 
      desc: "Enhances nutrient absorption and maximizes ingredient biological bioavailability.",
      poweredBy: "BLACK PEPPER EXTRACT"
    }
  ];

  useGSAP(() => {
    gsap.from(".solution-fade-up", {
      y: 25,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative pt-[120px] pb-6 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 lg:h-[calc(100vh-100px)] lg:min-h-[650px] flex flex-col justify-between" 
      id="solution"
    >
      {/* Intense physical orange spotlight glow behind the hand-held bottle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D85A1F]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] bg-biomen-green/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Left-aligned Premium Editorial Copy (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 text-left solution-fade-up">
            
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#16C784] mb-1 block">
                THE SYSTEM? T-CORE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-white">
                THE SOLUTION? <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">T-CORE</span>
              </h2>
            </div>
            
            <p className="text-biomen-muted text-sm lg:text-base leading-relaxed max-w-xl font-medium">
              Maintaining a balanced vitality baseline is pivotal for contributing to an overall sense of well-being. Supporting our body's natural baseline function can help us men:
            </p>

            {/* Completely Clean, Borderless List (No generic card backgrounds or cold gradients) */}
            <div className="flex flex-col gap-5 pt-2">
              {mechanisms.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="shrink-0 bg-[#D85A1F]/10 p-2 rounded-lg border border-[#D85A1F]/20 text-[#D85A1F] mt-1 transition-transform group-hover:scale-105">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black tracking-wider text-white flex flex-wrap items-center gap-x-3">
                      {item.title}
                      <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] font-black tracking-wider text-biomen-accent uppercase font-sans">
                        {item.poweredBy}
                      </span>
                    </h3>
                    <p className="text-biomen-muted text-xs lg:text-sm leading-relaxed font-semibold max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Physical Supplement Bottle & Button (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center solution-fade-up relative">
            
            {/* Real HD physical supplement mockup replacing 3D */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[320px] lg:max-w-[350px] shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black/40 p-1 hover:border-[#D85A1F]/30 transition-colors duration-300">
              <img 
                src="/hand_holding_canister.png" 
                alt="T-CORE Luxury physical bottle" 
                className="w-full h-full object-cover rounded-[1.25rem] scale-102 hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            {/* Centered Massive CTA under image */}
            <a 
              href="/products/t-core"
              className="mt-6 bg-[#D85A1F] hover:bg-[#b94a17] text-white w-full max-w-[320px] py-4.5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.35)] flex items-center justify-center gap-2 hover:scale-[1.02] duration-300 relative z-20"
            >
              START YOUR 90-DAY SYSTEM <ArrowRight size={16} />
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionGrid;

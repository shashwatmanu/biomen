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
      className="relative py-20 lg:py-24 px-4 sm:px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col justify-between" 
      id="solution"
    >
      {/* Hand Holding Canister Full-Bleed Bleeding Background - Set correct green capsules jar asset! */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/solutionport.svg" 
          alt="T-CORE daily vitality solution Mobile" 
          className="block lg:hidden w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] animate-fade-in"
        />
        <img 
          src="/solutionland.svg" 
          alt="T-CORE daily vitality solution Desktop" 
          className="hidden lg:block w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] animate-fade-in"
        />
        {/* Sleek deep botanical gradients to guarantee high-contrast text readability without washing out the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030705]/50 via-transparent to-[#030705]/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030705] via-[#030705]/45 to-transparent lg:from-[#030705] lg:via-[#030705]/55 lg:to-transparent z-10" />
      </div>

      {/* Intense physical orange spotlight glow behind the hand-held bottle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D85A1F]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] bg-biomen-green/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Centered Section Header for both mobile & desktop */}
        <div className="text-center max-w-3xl mx-auto mb-12 solution-fade-up">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#16C784] mb-2 block">
            THE SYSTEM? T-CORE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-white uppercase">
            THE SOLUTION? <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">T-CORE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Left-aligned Premium Editorial Copy (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 text-left solution-fade-up order-2 lg:order-1">
            <p className="text-biomen-muted text-sm lg:text-base leading-relaxed max-w-xl font-medium px-2 lg:px-0">
              Maintaining a balanced vitality baseline is pivotal for contributing to an overall sense of well-being. Supporting our body's natural baseline function can help us men:
            </p>

            {/* Completely Clean, Borderless List wrapped inside a premium, ultra-soft glass card on mobile to let the bright background show through beautifully */}
            <div className="flex flex-col gap-5 pt-2 bg-black/30 lg:bg-transparent backdrop-blur-[3px] lg:backdrop-blur-none p-5 lg:p-0 rounded-2xl border border-white/5 lg:border-none shadow-xl lg:shadow-none">
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

          {/* Right Column: Spacing placeholder on desktop so background canister is fully visible (lg:col-span-5) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center solution-fade-up relative order-1 lg:order-2 pointer-events-none">
            
            {/* Completely empty, invisible spacing block that mirrors the space of the canister box */}
            <div className="w-full aspect-square max-w-[350px] lg:max-w-[400px] shrink-0" />
            
            {/* Centered Massive CTA under space - Desktop only (Interactive, pointer events enabled) */}
            <a 
              href="/products/t-core"
              className="mt-6 bg-[#D85A1F] hover:bg-[#b94a17] text-white w-full max-w-[300px] py-[22px] px-12 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 hover:scale-[1.03] duration-300 pointer-events-auto relative z-20"
            >
              START YOUR 90-DAY SYSTEM <ArrowRight size={16} />
            </a>

          </div>

        </div>

        {/* Centered Massive CTA under grid - Mobile only */}
        <div className="block lg:hidden w-full pt-8 solution-fade-up px-2">
          <a 
            href="/products/t-core"
            className="bg-[#D85A1F] hover:bg-[#b94a17] text-white w-full py-[22px] px-8 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 relative z-20"
          >
            START YOUR 90-DAY SYSTEM <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SolutionGrid;

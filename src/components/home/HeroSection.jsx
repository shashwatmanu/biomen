import React, { useRef } from 'react';
import { ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const bgRef = useRef(null);
  const canisterRef = useRef(null);

  useGSAP(() => {
    // Parallax scrolling on jungle background
    gsap.to(bgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Floating visual animation on product canister
    gsap.fromTo(canisterRef.current, 
      { y: 0 },
      {
        y: -15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }
    );
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden bg-biomen-dark pt-[176px] md:pt-[144px] pb-20">
      
      {/* Premium Technical Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #16C784 1px, transparent 1px), linear-gradient(to bottom, #16C784 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      {/* Background Layer with contrast control and mild blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/hero_bg_final.png" 
          alt="Biomen Labs T-CORE Backdrop" 
          className="absolute top-0 left-0 w-full h-[115%] object-cover opacity-25 filter blur-[1px] brightness-[0.6]"
        />
        {/* Deep black gradient behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-biomen-dark via-biomen-dark/95 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-biomen-dark z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
        
        {/* Left: Headline & Manifesto */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#16C784] bg-[#052E22]/60 px-4 py-2 rounded-full border border-[#0FA36B]/30 backdrop-blur-md shadow-2xl">
              BIOMEN LABS | PREMIUM MASCULINE SYSTEMS
            </span>
          </div>

          {/* Headline - Split white/green split for premium feel */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-biomen-white uppercase">
            DAILY VITALITY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">FOR THE MODERN INDIAN MAN</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-biomen-muted max-w-2xl font-medium leading-relaxed">
            T-CORE is a premium herbal formula built to support energy, drive, recovery, resilience, and daily masculine performance through consistency.
          </p>

          {/* Luxury Support Strip */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-xs font-black uppercase tracking-widest text-[#7FE7B3]/90 pt-2">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16C784]"></span> Transparent Formula
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16C784]"></span> Premium Extracts
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16C784]"></span> Vegetarian Capsules
            </span>
            <span className="flex items-center gap-1.5 bg-[#052E22]/30 border border-[#0FA36B]/20 px-3.5 py-2 rounded-xl text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA46A]"></span> Made in India
            </span>
          </div>
          
          {/* CTAs with copper branding */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#pricing" 
              className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.35)] flex items-center justify-center gap-3 hover:scale-[1.02] duration-300"
            >
              Start Your 90-Day System <ArrowRight size={24} />
            </a>
            <a 
              href="#formula" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-md flex items-center justify-center text-lg hover:scale-[1.02] duration-300"
            >
              Explore T-CORE
            </a>
          </div>

          {/* Micro-trust line */}
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2.5 pt-4">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16C784]"></span>
            No proprietary blends. No cheap filler formulas. No loud promises.
          </p>
        </div>

        {/* Right: Premium Canister Visual pop with Soft Rim Light */}
        <div className="lg:col-span-5 hidden lg:flex justify-center relative">
          
          {/* Premium Glowing Backlight Orbs */}
          <div className="absolute top-[10%] left-[20%] w-80 h-96 bg-[#0FA36B]/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute top-[20%] right-[10%] w-72 h-96 bg-[#D85A1F]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />

          {/* Product canister framing card with dark border frame */}
          <div 
            ref={canisterRef} 
            className="relative z-25 max-w-[340px] drop-shadow-[0_45px_90px_rgba(0,0,0,0.95)] filter brightness-[1.25] contrast-[1.15] p-3 rounded-[3rem] border border-white/10 bg-[#06110C]/60 backdrop-blur-sm"
          >
            {/* Canister Image with soft internal border shadow */}
            <div className="rounded-[2.5rem] overflow-hidden border border-white/5 relative">
              <img 
                src="/tcore_canister.jpg" 
                alt="T-CORE Canister Pack" 
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* Interactive Float Badge */}
            <div className="absolute -top-6 -right-6 bg-[#06110C]/90 border border-[#0FA36B]/40 rounded-2xl p-4 backdrop-blur-md shadow-2xl flex items-center gap-2">
              <Sparkles size={16} className="text-[#BFA46A] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F4F6F2]">Premium Glass Bottle Inside</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

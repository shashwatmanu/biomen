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

    // Subtle floating visual animation on product canister to make it desirable
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
    <section className="hero-section relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden bg-biomen-dark pt-32 pb-20">
      
      {/* Background Layer with contrast control and mild blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/hero_bg_final.png" 
          alt="Biomen Labs T-CORE Backdrop" 
          className="absolute top-0 left-0 w-full h-[115%] object-cover opacity-35 filter blur-[1px] brightness-[0.7]"
        />
        {/* Deep black gradient behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-biomen-dark via-biomen-dark/95 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-biomen-dark z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left: Headline & Manifesto */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-biomen-accent bg-biomen-accent/10 px-4 py-1.5 rounded-full border border-biomen-accent/20">
              BIOMEN LABS | Premium Masculine Wellness
            </span>
          </div>

          {/* Headline - Split white/green split for premium feel */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-biomen-white uppercase">
            DAILY VITALITY <br />
            <span className="text-biomen-accent">FOR THE MODERN INDIAN MAN</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-biomen-muted max-w-2xl font-medium leading-relaxed">
            T-CORE is a premium herbal formula built to support energy, drive, recovery, resilience, and daily masculine performance through consistency.
          </p>

          {/* Support Strip */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-wider text-biomen-mint/80 border-l-2 border-biomen-accent pl-4">
            <span>Transparent Formula</span>
            <span className="text-white/10">|</span>
            <span>Premium Herbal Extracts</span>
            <span className="text-white/10">|</span>
            <span>Vegetarian Capsules</span>
            <span className="text-white/10">|</span>
            <span>Glass Bottle Packaging</span>
            <span className="text-white/10">|</span>
            <span className="text-biomen-white font-black underline decoration-biomen-accent decoration-2">Made in India</span>
          </div>
          
          {/* CTAs with copper branding */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#pricing" 
              className="bg-biomen-copper hover:bg-biomen-copper/90 text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.35)] flex items-center justify-center gap-3 hover:scale-[1.02]"
            >
              Start Your 90-Day System <ArrowRight size={24} />
            </a>
            <a 
              href="#formula" 
              className="border border-white/25 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center text-lg hover:scale-[1.02]"
            >
              Explore T-Core
            </a>
          </div>

          {/* Micro-trust line */}
          <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-biomen-accent"></span>
            No proprietary blends. No cheap filler formulas. No loud promises.
          </p>
        </div>

        {/* Right: Premium Canister Visual pop with Soft Rim Light */}
        <div className="lg:col-span-5 hidden lg:flex justify-center relative">
          
          {/* Soft rim-light glow behind product */}
          <div className="absolute top-[10%] left-[20%] w-80 h-96 bg-biomen-accent/10 rounded-full blur-[90px] pointer-events-none mix-blend-screen animate-pulse" />
          
          {/* Soft copper/amber rim-light on the right edge of product */}
          <div className="absolute top-[20%] right-[10%] w-72 h-96 bg-biomen-copper/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

          {/* Product tube layer with increased brightness */}
          <div 
            ref={canisterRef} 
            className="relative z-25 max-w-[360px] drop-shadow-[0_35px_70px_rgba(0,0,0,0.85)] filter brightness-[1.22] contrast-[1.12]"
          >
            {/* Real product canister visual display */}
            <img 
              src="/tcore_canister.jpg" 
              alt="T-CORE Canister Pack" 
              className="w-full h-auto object-contain rounded-[2.5rem] border border-white/10" 
            />
            
            {/* Interactive Badge */}
            <div className="absolute -top-6 -right-6 bg-[#0c1e18]/90 border border-biomen-accent/30 rounded-2xl p-4 backdrop-blur-md shadow-lg flex items-center gap-2">
              <Sparkles size={16} className="text-biomen-gold animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-wider text-biomen-white">Premium Glass Interior</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { ArrowRight, Star, Shield } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const textRef = React.useRef(null);
  const badgeRef = React.useRef(null);

  useGSAP(() => {
    // Elegant entrance animation
    gsap.from(textRef.current?.children || [], {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
    gsap.from(badgeRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <section className="hero-section relative w-full min-h-[90vh] lg:min-h-[880px] xl:min-h-[920px] flex flex-col justify-between px-6 md:px-20 overflow-hidden bg-[#030705] pt-[140px] lg:pt-[160px] pb-10" id="hero">

      {/* Full-Bleed Background Image with Premium Seamless Blending Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero_mossy_ingredients.jpg?v=2"
          alt="T-CORE Luxury Vitality"
          className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.04]"
          style={{
            objectPosition: 'center 1%',
            imageRendering: '-webkit-optimize-contrast',
            transform: 'translateZ(0)'
          }}
        />
        {/* Competitor-inspired ultra-smooth, wide horizontal gradient mask */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#030705] via-[#030705]/95 to-transparent z-10" />
        {/* Mobile vertical gradient overlay for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent lg:hidden z-10" />
      </div>

      {/* Floating Luxury Stamp Sticker Badge */}
      <div
        ref={badgeRef}
        className="hidden lg:flex absolute right-[13%] top-[37%] z-20 select-none animate-bounce-slow"
      >
        <div className="relative w-32 h-32 rounded-full border border-dashed border-[#16C784]/40 bg-[#030705]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
          <div className="text-[#16C784] font-black text-[9px] uppercase tracking-widest mb-0.5">100% PURE</div>
          <div className="text-white font-serif italic text-sm font-medium">Ayurvedic</div>
          <div className="text-[#A8B3AA] font-black text-[8px] uppercase tracking-wider mt-0.5">&bull; transparent &bull;</div>
          <div className="absolute -top-1 -right-1 bg-[#D85A1F] text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            GLASS JAR
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Clean Solid Editorial Text Canvas with Dark Backdrop contrast block */}
          <div ref={textRef} className="lg:col-span-8 xl:col-span-7 space-y-6 text-left relative max-w-2xl bg-black/45 lg:bg-transparent p-7 lg:p-0 rounded-[2rem] border border-white/5 lg:border-none backdrop-blur-md lg:backdrop-blur-none">

            {/* Verified Rating Badge */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#D85A1F]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A8B3AA]">
                4.9/5 RATING &bull; OVER 3,900 VERIFIED EXPERIENCES
              </span>
            </div>

            {/* Headline - Split white/green for luxury serif editorial feel */}
            <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-normal font-serif tracking-tight leading-[1.05] text-white uppercase">
              Daily Vitality for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-medium">Modern</span> <br />
              Indian Man
            </h1>

            {/* Subheadline - Premium editorial authority */}
            <p className="text-lg lg:text-xl text-[#A8B3AA] font-medium leading-relaxed max-w-xl">
              T-CORE is a premium, clinical-grade daily vitality system built to support energy, drive, and post-workout recovery. Packaged in a collectible glass jar.
            </p>

            {/* Luxury Support Strip */}
            <div className="flex flex-wrap gap-2 pt-1 text-[9px] font-black uppercase tracking-widest text-[#7FE7B3]/90">
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1 h-1 rounded-full bg-[#16C784]"></span> Transparent Dosing
              </span>
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1 h-1 rounded-full bg-[#16C784]"></span> Vegetarian Capsules
              </span>
              <span className="flex items-center gap-1 bg-[#052E22]/75 border border-[#0FA36B]/25 px-3.5 py-2 rounded-lg text-white backdrop-blur-sm">
                <span className="w-1 h-1 rounded-full bg-[#BFA46A]"></span> Made in India
              </span>
            </div>

            {/* Thicker, Highly Prominent Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/products/t-core"
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-11 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 hover:scale-[1.03] duration-300 w-full sm:w-auto"
              >
                UNLOCK YOUR SYSTEM <ArrowRight size={16} />
              </a>
              <a
                href="/products/t-core"
                className="border-2 border-white/20 text-white px-11 py-5 rounded-full font-black hover:bg-white/5 hover:border-white/40 hover:scale-[1.03] transition-all backdrop-blur-md flex items-center justify-center text-sm duration-300 w-full sm:w-auto"
              >
                Explore T-CORE Science
              </a>
            </div>

            {/* Risk-Free Micro-trust Line */}
            <div className="flex items-center gap-2 text-[9px] text-[#A8B3AA] font-black uppercase tracking-wider pt-2">
              <Shield size={12} className="text-[#16C784] shrink-0" />
              <span>TRY IT FOR 90 DAYS. HIGHER VITALITY OR YOUR MONEY BACK.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Featured In Logos Trust Strip (Identical to competitor's embedded layout) */}
      <div className="max-w-7xl mx-auto w-full relative z-20 border-t border-white/5 pt-5 mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-black tracking-widest text-[#A8B3AA] lg:block hidden">
        <div className="flex items-center gap-6">
          <span className="text-[#A8B3AA]/40 font-black uppercase tracking-[0.2em]">FEATURED IN</span>
          <div className="flex items-center gap-x-12 opacity-35 grayscale">
            <span className="text-xs font-serif font-bold italic text-white">Men's Health</span>
            <span className="text-base font-serif font-black tracking-tighter text-white">GQ</span>
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-white">Forbes</span>
            <span className="text-xs font-sans font-black uppercase tracking-tighter text-white">Esquire</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

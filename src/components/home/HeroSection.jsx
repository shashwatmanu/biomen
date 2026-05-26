import React, { useRef } from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const bgRef = useRef(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden bg-black pt-32 pb-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/hero_bg_final.png" 
          alt="Biomen Labs T-CORE" 
          className="absolute top-[5%] left-0 w-full h-[110%] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
      </div>
      
      <div className="relative z-30 max-w-4xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            BIOMEN LABS | Premium Masculine Wellness
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-6 leading-[0.95] text-white uppercase">
          The Indian Man <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Was Built For More.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl font-medium leading-relaxed">
          T-Core is a premium herbal vitality system designed to support energy, recovery, resilience, masculine performance, and daily consistency for ambitious modern men.
        </p>

        {/* Support Strip under subheadline */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-wider text-emerald-300/80 mb-10 max-w-3xl border-l-2 border-emerald-500 pl-4">
          <span>Transparent Formula</span>
          <span className="text-white/20">|</span>
          <span>Premium Herbal Extracts</span>
          <span className="text-white/20">|</span>
          <span>Vegetarian Capsules</span>
          <span className="text-white/20">|</span>
          <span>Glass Bottle Packaging</span>
          <span className="text-white/20">|</span>
          <span className="text-white font-black underline decoration-emerald-500 decoration-2">Made in India</span>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="#pricing" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3">
            Start Your 90-Day System <ArrowRight size={24} />
          </a>
          <a href="#formula" className="border border-white/25 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center text-lg">
            Explore T-Core
          </a>
        </div>

        {/* Micro-trust line */}
        <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-10 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          No proprietary blends. No cheap filler formulas. No loud promises.
        </p>

        {/* Hero Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Full transparency</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> No steroids</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> No proprietary blends</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> 90-Day Guarantee</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Made in India</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Lab-tested batch</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

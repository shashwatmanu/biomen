import React, { useRef } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TrustBadges = () => {
  const containerRef = useRef(null);

  const pillars = [
    "Clear Dosages",
    "No Hidden Blends",
    "Premium Herbal Extracts",
    "Batch-Tested Quality",
    "Vegetarian Capsules",
    "Glass Bottle Packaging",
    "Made in India",
    "90-Day Daily System"
  ];

  useGSAP(() => {
    // Elegant fade-up animation on scroll
    gsap.from(".trust-fade-up", {
      y: 35,
      opacity: 0,
      duration: 1.0,
      stagger: 0.2,
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
      className="py-24 px-6 md:px-20 bg-biomen-dark border-y border-white/5 relative overflow-hidden" 
      id="trust-architecture"
    >
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-biomen-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Distrust / The Problem */}
          <div className="lg:col-span-7 flex flex-col justify-between trust-fade-up">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-copper bg-biomen-copper/10 px-4 py-1.5 rounded-full border border-biomen-copper/20 inline-block mb-4">
                The Supplements Crisis
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase text-biomen-white mb-8 tracking-tight leading-tight">
                Tired of supplements that promise more <br className="hidden sm:block"/> but don’t help you feel more consistent?
              </h2>
              
              {/* Distrust Point Box */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] space-y-4">
                <p className="text-biomen-copper font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <AlertCircle size={15} /> WHY MOST MEN DON’T TRUST SUPPLEMENTS
                </p>
                
                {/* 5 warning bullets with copper alert icon rather than YouTube X */}
                <ul className="space-y-3 font-semibold text-sm md:text-base text-biomen-white">
                  {[
                    "Low energy through the day",
                    "Poor recovery",
                    "Stress-heavy lifestyle",
                    "Weak consistency",
                    "Overhyped formulas with unclear dosing"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-biomen-copper/10 border border-biomen-copper/25 flex items-center justify-center text-biomen-copper font-black text-xs">
                        !
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Answer banner link */}
            <div className="mt-8 border-l-4 border-biomen-accent pl-6 py-2">
              <p className="font-black text-biomen-white text-xl uppercase tracking-wider mb-2">T-CORE IS THE ANSWER TO?</p>
              <p className="text-biomen-muted text-sm md:text-base leading-relaxed font-semibold">
                T-CORE gives men a clear daily system for vitality, recovery, and resilience. A focused 5-ingredient formula with clear dosages and premium herbal extracts.
              </p>
            </div>
          </div>

          {/* Right Side: What makes T-Core different (8 Pillars) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#052E22]/30 to-transparent border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between trust-fade-up relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-biomen-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent mb-8 pb-4 border-b border-white/10 flex items-center gap-2">
                <ShieldCheck className="text-biomen-accent" size={16} /> What makes T-Core different
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5 hover:border-biomen-accent/30 transition-all duration-300">
                    <CheckCircle2 size={16} className="text-biomen-accent shrink-0" />
                    <span className="text-[11px] md:text-xs font-black uppercase tracking-wider text-biomen-white leading-tight">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note with green background */}
            <div className="mt-8 bg-biomen-green/40 border border-biomen-accent/10 p-5 rounded-2xl">
              <p className="text-xs text-biomen-white font-black uppercase tracking-widest leading-relaxed">
                📢 No confusion. No hidden blends. No loud promises. <br className="hidden sm:block" />
                <span className="text-biomen-accent">Just a daily system built for men who take performance seriously.</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

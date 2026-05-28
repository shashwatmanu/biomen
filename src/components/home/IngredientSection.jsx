import React, { useRef } from 'react';
import { ShieldCheck, Leaf, FlaskConical, Beaker, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ingredients = [
  { 
    name: "Shilajit Extract", 
    dose: "500 mg", 
    purpose: "A mineral-rich Himalayan resin traditionally valued for vitality, stamina, mineral support, and foundational masculine wellness.",
    image: "/ingredients/shilajit.png"
  },
  { 
    name: "Tongkat Ali Extract", 
    dose: "300 mg", 
    purpose: "A modern herbal performance ingredient selected to support masculine drive, vitality, and physical performance rhythm.",
    image: "/ingredients/tongkat_ali.png"
  },
  { 
    name: "Ashwagandha Extract", 
    dose: "300 mg", 
    purpose: "An adaptogenic extract used to support stress resilience, recovery, calmer energy, and daily consistency.",
    image: "/ingredients/ashwagandha.png"
  },
  { 
    name: "Fenugreek Extract", 
    dose: "490 mg", 
    purpose: "Included at a meaningful dose to support male vitality, confidence, and physical performance support.",
    image: "/ingredients/fenugreek.png"
  },
  { 
    name: "Black Pepper Extract", 
    dose: "10 mg", 
    purpose: "Supports nutrient absorption and improves formula efficiency.",
    image: "/ingredients/black_pepper.png"
  }
];

const IngredientSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Beautiful stagger fade-in scroll animation
    gsap.from(".ingredient-fade-up", {
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
      id="formula"
    >
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-biomen-green/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header Block */}
        <div className="text-center mb-4 lg:mb-2 max-w-3xl mx-auto ingredient-fade-up">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent mb-0.5 block">
            Transparent Dosing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-normal font-serif tracking-tight text-biomen-white mb-1">
            The Formula, Fully Transparent
          </h2>
          <p className="text-biomen-muted font-medium text-sm lg:text-base leading-relaxed">
            Five purposeful herbal extracts. Clear daily dosages. No hidden blends, no filler-heavy complexity.
          </p>
        </div>

        {/* Solid elegant grid container (no gradients) */}
        <div className="bg-[#052E22]/20 rounded-[20px] p-6 lg:p-4 border border-biomen-green/20 shadow-2xl mb-4 lg:mb-2.5 ingredient-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center">
            {ingredients.map((item, i) => (
              <div 
                key={i} 
                className="group relative rounded-[1.5rem] overflow-hidden border border-white/5 hover:border-biomen-accent/30 transition-all duration-300 bg-black/40 p-5 lg:p-4 flex flex-col items-center text-center justify-between min-h-[220px] lg:min-h-[240px]"
              >
                {/* Visual circle image container using preexisting asset */}
                <div className="relative w-16 h-16 lg:w-18 lg:h-18 shrink-0 rounded-full border border-white/10 overflow-hidden flex flex-col justify-center items-center bg-black/80 shadow-2xl p-2 group-hover:border-biomen-accent/30 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-4/5 h-4/5 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                  <span className="absolute bottom-1 bg-biomen-accent text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    {item.dose}
                  </span>
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-start">
                  <h3 className="text-base lg:text-sm font-black text-biomen-white leading-tight mb-1.5 group-hover:text-biomen-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] lg:text-xs text-biomen-muted leading-relaxed font-semibold">
                    {item.purpose}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Elegant compact serving info row (Replaced the bulky card) */}
        <div className="max-w-4xl mx-auto text-center mb-4 lg:mb-2.5 ingredient-fade-up">
          <div className="text-biomen-accent font-black uppercase tracking-[0.2em] text-xs lg:text-sm">
            1,600mg Active Ingredients Per Serving &bull; 2 Vegetarian Capsules Daily &bull; 60 Capsules (30-Day Supply)
          </div>
        </div>

        {/* High-conversion CTA Link to PDP */}
        <div className="text-center mb-4 lg:mb-1.5 ingredient-fade-up">
          <a 
            href="/products/t-core" 
            onClick={(e) => {
              if (window.location.pathname.includes('/products/t-core')) {
                e.preventDefault();
                document.getElementById('buybox')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-[#D85A1F] hover:bg-[#b94a17] text-white px-10 py-4.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] hover:scale-[1.02] duration-300"
          >
            Start Your 90-Day System
          </a>
        </div>

        {/* Footer Trust Strip */}
        <div className="mt-2 border-t border-white/5 pt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] font-black tracking-widest text-[#A8B3AA] uppercase ingredient-fade-up">
          <div className="flex items-center gap-1"><MapPin size={10} className="text-biomen-accent"/> Made in a cGMP Facility</div>
          <div className="flex items-center gap-1"><Leaf size={10} className="text-biomen-accent"/> Non-GMO</div>
          <div className="flex items-center gap-1"><Beaker size={10} className="text-biomen-accent"/> Third Party Tested</div>
          <div className="flex items-center gap-1"><ShieldCheck size={10} className="text-biomen-accent"/> Hormone-Free</div>
          <div className="flex items-center gap-1"><MapPin size={10} className="text-biomen-accent"/> Made in India</div>
          <div className="flex items-center gap-1"><Leaf size={10} className="text-biomen-accent"/> Vegetarian Capsules</div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSection;

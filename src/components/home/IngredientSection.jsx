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
      y: 35,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
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
      className="py-24 px-4 md:px-8 bg-biomen-dark relative border-t border-white/5" 
      id="formula"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-biomen-green/10 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto ingredient-fade-up">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent mb-4 block">
            Transparent Dosing
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase text-biomen-white">
            The Formula, <br className="hidden sm:block" /> Fully Transparent
          </h2>
          <p className="text-biomen-muted font-medium text-base md:text-lg leading-relaxed mb-6">
            Five purposeful herbal extracts. Clear daily dosages. No hidden blends, no filler-heavy complexity.
          </p>
          
          {/* Exact Trust Line */}
          <div className="inline-block bg-biomen-green/40 border border-biomen-accent/15 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-biomen-accent">
            No hidden blends | Clear daily serving | Premium herbal extracts
          </div>
        </div>

        {/* Dynamic centered Grid Container displaying preexisting visual assets */}
        <div className="bg-gradient-to-b from-biomen-green/30 to-black/80 rounded-[40px] p-6 md:p-10 border border-biomen-green/20 shadow-2xl mb-12 ingredient-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
            {ingredients.map((item, i) => (
              <div 
                key={i} 
                className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-biomen-accent/50 transition-all duration-300 bg-black/40 p-6 flex flex-col items-center text-center justify-between min-h-[360px]"
              >
                {/* Visual circle image container using preexisting asset */}
                <div className="relative w-28 h-28 shrink-0 rounded-full border border-white/10 overflow-hidden flex flex-col justify-center items-center bg-black/80 shadow-2xl p-4 group-hover:border-biomen-accent/50 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-4/5 h-4/5 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                  <span className="absolute bottom-2 bg-biomen-accent text-black text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    {item.dose}
                  </span>
                </div>

                <div className="mt-6 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg md:text-xl font-black text-biomen-white leading-tight mb-3 group-hover:text-biomen-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-biomen-muted leading-relaxed font-semibold">
                    {item.purpose}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Total Serving Box */}
        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 text-center shadow-2xl mb-16 ingredient-fade-up">
          <div className="text-biomen-accent font-black uppercase tracking-[0.2em] text-lg mb-2">
            1,600mg Active Ingredients Per Daily Serving
          </div>
          <div className="text-xs text-biomen-muted font-bold uppercase tracking-widest leading-relaxed">
            2 vegetarian capsules daily | 60 capsules per bottle | 30-day supply
          </div>
        </div>

        {/* Footer Trust Strip */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm font-bold tracking-widest text-biomen-white uppercase ingredient-fade-up">
          <div className="flex items-center gap-2"><MapPin size={18} className="text-biomen-accent"/> Made in a cGMP Facility</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-biomen-accent"/> Non-GMO</div>
          <div className="flex items-center gap-2"><Beaker size={18} className="text-biomen-accent"/> Third Party Tested</div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-biomen-accent"/> Hormone-Free</div>
          <div className="flex items-center gap-2"><MapPin size={18} className="text-biomen-accent"/> Made in India</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-biomen-accent"/> Vegetarian Capsules</div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSection;

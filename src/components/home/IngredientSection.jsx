import React from 'react';
import { ShieldCheck, Leaf, FlaskConical, Beaker, MapPin } from 'lucide-react';

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
  return (
    <section className="py-24 px-4 md:px-8 bg-black relative" id="formula">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            The Formula
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase text-white">
            The Formula, <br className="hidden sm:block" /> Fully Transparent
          </h2>
          <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed mb-6">
            T-Core contains five purposeful herbal ingredients selected to support male vitality, resilience, recovery, daily performance, and long-term consistency.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-black uppercase tracking-widest text-emerald-300">
            <span>✓ No ingredient clutter</span>
            <span className="text-white/20">•</span>
            <span>✓ No hidden blends</span>
            <span className="text-white/20">•</span>
            <span>✓ No filler-heavy complexity</span>
          </div>
        </div>

        {/* Grid Container - Premium Visual Cards using original assets */}
        <div className="bg-gradient-to-b from-emerald-900/30 to-black/80 rounded-[40px] p-6 md:p-10 border border-emerald-900/30 shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
            {ingredients.map((item, i) => (
              <div 
                key={i} 
                className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300 bg-black/40 p-6 flex flex-col items-center text-center justify-between min-h-[360px]"
              >
                {/* Visual circle image container using preexisting asset */}
                <div className="relative w-28 h-28 shrink-0 rounded-full border border-white/10 overflow-hidden flex flex-col justify-center items-center bg-black/80 shadow-2xl p-4 group-hover:border-emerald-500/50 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-4/5 h-4/5 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                  <span className="absolute bottom-2 bg-emerald-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    {item.dose}
                  </span>
                </div>

                <div className="mt-6 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg md:text-xl font-black text-white leading-tight mb-3 group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                    {item.purpose}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Serving Size and Total Active Ingredients Info */}
        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-lg mb-16">
          <div className="text-emerald-400 font-black uppercase tracking-[0.2em] text-sm mb-2">
            Total Active Ingredients Per Daily Serving: 1,600mg
          </div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            2 vegetarian capsules daily | 60 capsules per bottle | 30-day supply
          </div>
        </div>

        {/* Footer Trust Strip */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm font-bold tracking-widest text-white uppercase">
          <div className="flex items-center gap-2"><MapPin size={18} className="text-emerald-500"/> Made in a cGMP Facility</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-emerald-500"/> Non-GMO</div>
          <div className="flex items-center gap-2"><Beaker size={18} className="text-emerald-500"/> Third Party Tested</div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500"/> Hormone-Free</div>
          <div className="flex items-center gap-2"><MapPin size={18} className="text-emerald-500"/> Made in India</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-emerald-500"/> Vegetarian Capsules</div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSection;

import React from 'react';
import { ShieldCheck, Leaf, FlaskConical, Beaker, MapPin } from 'lucide-react';

const ingredients = [
  { 
    name: "Tongkat Ali", 
    dose: "800 mg", 
    purpose: "Boosts testosterone, enhances libido, improves fertility & supports muscle growth",
    image: "/ingredients/tongkat_ali.png"
  },
  { 
    name: "Shilajit", 
    dose: "250 mg", 
    purpose: "Improves fertility and boosts testosterone levels",
    image: "/ingredients/shilajit.png"
  },
  { 
    name: "Vitamin K1 & K2", 
    dose: "100 mcg", 
    purpose: "Supports bone health and density, improves mood, and encourages T production",
    image: "/ingredients/vitamin_k.png"
  },
  { 
    name: "Vitamin D", 
    dose: "600 IU", 
    purpose: "Essential for maintaining cellular health and helping regulate testosterone",
    image: "/ingredients/vitamin_d.png"
  },
  { 
    name: "Zinc", 
    dose: "30 mg", 
    purpose: "An essential trace mineral that plays a role in testosterone metabolism and immune function",
    image: "/ingredients/zinc.png"
  },
  { 
    name: "Taurine", 
    dose: "200 mg", 
    purpose: "Reduces oxidative stress, improves blood flow, and supports increased testosterone levels",
    image: "/ingredients/taurine.png"
  },
  { 
    name: "Fenugreek", 
    dose: "250 mg", 
    purpose: "Supports testosterone production, DHT levels, and male vitality",
    image: "/ingredients/fenugreek.png"
  },
  { 
    name: "Boron", 
    dose: "4 mg", 
    purpose: "Trace mineral with the potential to increase free T and regulate estrogen levels",
    image: "/ingredients/boron.png"
  }
];

const IngredientSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-black relative" id="formula">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase text-white">
            8 INGREDIENTS IN 1 <br className="hidden md:block"/> POWERFUL FORMULA
          </h2>
          <p className="text-orange-500 font-bold tracking-widest uppercase md:text-lg">
            CLINICALLY DOSED <span className="text-white px-2">+</span> EFFECTIVE
          </p>
        </div>

        {/* Grid Container */}
        <div className="bg-gradient-to-b from-emerald-900/30 to-black/80 rounded-[40px] p-6 md:p-10 border border-emerald-900/30 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ingredients.map((item, i) => (
              <div key={i} className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-colors bg-black/40 min-h-[220px] md:min-h-0 md:h-auto flex flex-col justify-center">
                
                {/* Mobile/Tablet: Full Background Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 lg:hidden group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay for mobile text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 lg:hidden" />

                {/* Desktop Layout (lg+) */}
                <div className="hidden lg:flex p-6 items-start gap-4 h-full relative z-10">
                  <div className="relative w-24 h-24 shrink-0 rounded-full border border-white/20 overflow-hidden flex flex-col justify-end items-center pb-2 bg-black shadow-inner">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">{item.dose}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">{item.name}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">{item.purpose}</p>
                  </div>
                </div>

                {/* Mobile/Tablet Layout (<lg) */}
                <div className="flex lg:hidden flex-col items-center justify-center p-6 text-center relative z-10 h-full">
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider mb-4">
                    {item.dose}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">{item.name}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">{item.purpose}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer Trust Strip */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm font-bold tracking-widest text-white uppercase">
          <div className="flex items-center gap-2"><MapPin size={18} className="text-emerald-500"/> MADE IN A CGMP FACILITY</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-emerald-500"/> NON-GMO</div>
          <div className="flex items-center gap-2"><Beaker size={18} className="text-emerald-500"/> THIRD PARTY TESTED</div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500"/> HORMONE-FREE</div>
          <div className="flex items-center gap-2"><MapPin size={18} className="text-emerald-500"/> MADE IN USA</div>
          <div className="flex items-center gap-2"><Leaf size={18} className="text-emerald-500"/> VEGAN</div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSection;

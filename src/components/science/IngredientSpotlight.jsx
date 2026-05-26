import React, { useState } from 'react';
import { Star, ShieldAlert, Award, Compass, HeartPulse, Zap } from 'lucide-react';

const ingredientsData = [
  { 
    id: 1,
    name: "Shilajit Extract", 
    dose: "500 mg", 
    role: "Foundational Vitality",
    image: "/ingredients/shilajit.png",
    summary: "A mineral-rich Himalayan resin traditionally valued for vitality, stamina, mineral support, and foundational masculine wellness. Rich in fulvic acid, it enhances cellular energy and daily performance.",
    benefits: ["Supports cellular energy (ATP)", "Replenishes essential trace minerals", "Supports stamina and endurance"]
  },
  { 
    id: 2,
    name: "Tongkat Ali Extract", 
    dose: "300 mg", 
    role: "Masculine Drive",
    image: "/ingredients/tongkat_ali.png",
    summary: "A modern herbal performance ingredient selected to support masculine drive, vitality, and physical performance rhythm. Helps maintain optimal baseline hormones and physical momentum.",
    benefits: ["Supports free testosterone rhythm", "Enhances masculine drive & libido", "Reduces physical and mental fatigue"]
  },
  { 
    id: 3,
    name: "Ashwagandha Extract", 
    dose: "300 mg", 
    role: "Stress Resilience",
    image: "/ingredients/ashwagandha.png",
    summary: "An adaptogenic extract used to support stress resilience, recovery, calmer energy, and daily consistency. Helps modulate cortisol to prevent performance burnout.",
    benefits: ["Modulates cortisol (stress hormone)", "Supports stress resilience & energy", "Enhances muscle recovery and sleep"]
  },
  { 
    id: 4,
    name: "Fenugreek Extract", 
    dose: "490 mg", 
    role: "Male Vitality",
    image: "/ingredients/fenugreek.png",
    summary: "Included at a meaningful dose to support male vitality, confidence, and physical performance support. Promotes peak biological rhythm and sustained drive.",
    benefits: ["Maintains healthy hormonal balance", "Supports masculine confidence", "Aids in daily strength and stamina"]
  },
  { 
    id: 5,
    name: "Black Pepper Extract", 
    dose: "10 mg", 
    role: "Formula Efficiency",
    image: "/ingredients/black_pepper.png",
    summary: "Supports nutrient absorption and improves formula efficiency. Ensures that all active herbal compounds are directed and absorbed completely by the body.",
    benefits: ["Supercharges nutrient absorption", "Improves total formula efficiency", "Enhances bioavailability of herbs"]
  }
];

const IngredientSpotlight = () => {
  const [activeId, setActiveId] = useState(1);
  const activeIngredient = ingredientsData.find(i => i.id === activeId);

  return (
    <section className="py-32 px-6 md:px-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block mb-4">
            Spotlight
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white">The Science of <br/><span className="text-emerald-500">The Stack</span></h2>
          <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto">Click an ingredient to explore its biological function and clinical dosage.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Navigation List */}
          <div className="lg:w-1/3 flex flex-col gap-3 w-full">
            {ingredientsData.map((ing) => (
              <button
                key={ing.id}
                onClick={() => setActiveId(ing.id)}
                className={`group flex items-center justify-between p-5 rounded-3xl border transition-all text-left ${
                  activeId === ing.id 
                    ? 'bg-emerald-600 border-emerald-600 shadow-[0_0_30px_rgba(5,150,105,0.3)]' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg ${activeId === ing.id ? 'bg-black/20 text-white' : 'bg-black/40 text-emerald-500'}`}>
                    {ing.id}
                  </div>
                  <div>
                    <div className={`font-black uppercase tracking-wider text-sm ${activeId === ing.id ? 'text-white' : 'text-gray-200'}`}>{ing.name}</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${activeId === ing.id ? 'text-white/60' : 'text-emerald-500/80'}`}>
                      {ing.dose}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Spotlight Detail */}
          <div className="lg:w-2/3 w-full bg-gradient-to-br from-white/5 to-transparent p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center min-h-[500px]">
            {/* Huge Number Background - Moved and Fixed Visibility */}
            <div className="absolute -left-10 -top-10 text-[25rem] font-black text-white/[0.03] pointer-events-none leading-none select-none z-0">
              {activeIngredient.id}
            </div>
            
            {/* Image Showcase */}
            <div className="w-full md:w-1/2 aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-black/40 flex items-center justify-center p-6">
              <img 
                src={activeIngredient.image} 
                alt={activeIngredient.name} 
                className="w-3/4 h-3/4 object-contain transition-transform duration-1000 group-hover:scale-110 opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 md:w-1/2">
              <div className="inline-block bg-emerald-500/20 text-emerald-400 px-5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-500/30">
                {activeIngredient.role}
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tighter leading-none">
                {activeIngredient.name}
              </h3>
              <div className="text-2xl font-black text-orange-500 mb-8 tracking-tighter">
                {activeIngredient.dose}
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-10 font-medium">
                {activeIngredient.summary}
              </p>
              
              <div className="space-y-3">
                {activeIngredient.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] shrink-0"></div>
                    <span className="text-sm font-bold text-gray-300 uppercase tracking-wide">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientSpotlight;

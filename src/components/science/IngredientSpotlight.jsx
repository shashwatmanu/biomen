import React, { useState } from 'react';
import { Star, ShieldAlert, Award, Compass, HeartPulse, Zap, Check } from 'lucide-react';

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
    <section className="relative pt-[120px] pb-16 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5" id="spotlight">
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-biomen-green/10 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#16C784] mb-1.5 block">
            FORMULATION SPOTLIGHT
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-white">
            The Science of <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">The Stack</span>
          </h2>
          <p className="text-biomen-muted text-sm lg:text-base font-semibold max-w-2xl mx-auto pt-2 leading-relaxed">
            Click an ingredient to explore its biological function and clinical dosage.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Vertical Navigation Tabs (lg:w-1/3) */}
          <div className="lg:w-1/3 flex flex-col gap-3.5 w-full">
            {ingredientsData.map((ing) => {
              const isActive = activeId === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => setActiveId(ing.id)}
                  className={`group flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#052E22]/30 border-[#16C784] shadow-[0_0_30px_rgba(22,199,132,0.15)] scale-102 text-white' 
                      : 'bg-black/40 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase transition-colors ${
                      isActive ? 'bg-[#16C784]/20 text-[#16C784]' : 'bg-black/50 text-[#A8B3AA]'
                    }`}>
                      0{ing.id}
                    </div>
                    <div>
                      <div className="font-black uppercase tracking-wider text-xs lg:text-sm text-white group-hover:text-biomen-accent transition-colors">{ing.name}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#D85A1F] mt-0.5">
                        {ing.dose} CLINICAL DOSE
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Spotlight Detailed Specifications (lg:w-2/3) */}
          <div className="lg:w-2/3 w-full bg-black/40 border border-white/5 p-8 lg:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center min-h-[460px]">
            {/* Massive background watermark number */}
            <div className="absolute -left-6 -top-10 text-[20rem] font-black text-white/[0.02] pointer-events-none leading-none select-none z-0">
              {activeIngredient.id}
            </div>
            
            {/* Raw Ingredient image box */}
            <div className="w-full md:w-1/2 aspect-square max-w-[240px] shrink-0 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-4 bg-black/85 shadow-2xl relative z-10">
              <img 
                src={activeIngredient.image} 
                alt={activeIngredient.name} 
                className="w-4/5 h-4/5 object-contain opacity-85 hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="relative z-10 md:w-1/2 text-left space-y-4">
              <div className="inline-block bg-[#052E22]/50 border border-[#0FA36B]/25 text-[#16C784] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {activeIngredient.role}
              </div>
              
              <h3 className="text-3xl font-black text-white uppercase tracking-wider">
                {activeIngredient.name}
              </h3>
              
              <div className="text-2xl font-black text-[#D85A1F] uppercase tracking-tighter">
                {activeIngredient.dose} CLINICAL DOSE
              </div>
              
              <p className="text-biomen-muted text-sm leading-relaxed font-semibold">
                {activeIngredient.summary}
              </p>
              
              {/* Key Clinical Benefits */}
              <div className="space-y-2 pt-2">
                {activeIngredient.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-[#16C784] shrink-0 mt-0.5"><Check size={14} strokeWidth={3} /></span>
                    <span className="text-xs font-black text-white uppercase tracking-wider">{benefit}</span>
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

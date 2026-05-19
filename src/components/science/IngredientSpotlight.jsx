import React, { useState } from 'react';

const ingredientsData = [
  { 
    id: 1,
    name: "Tongkat Ali Extract", 
    dose: "800 mg", 
    role: "The Driver",
    image: "/ingredients/tongkat_ali.png",
    summary: "Known scientifically as Eurycoma longifolia, this adaptogen has been shown to support healthy free testosterone levels by helping to unbind it from SHBG (Sex Hormone-Binding Globulin).",
    benefits: ["Supports free testosterone", "Enhances libido and drive", "Reduces cortisol (stress hormone)"]
  },
  { 
    id: 2,
    name: "Shilajit (Purified)", 
    dose: "250 mg", 
    role: "The Optimizer",
    image: "/ingredients/shilajit.png",
    summary: "A mineral-rich resin packed with fulvic acid. Shilajit acts at the cellular level to enhance mitochondrial function and ATP production, giving you clean, sustained energy.",
    benefits: ["Enhances cellular energy (ATP)", "Replenishes essential trace minerals", "Supports stamina and endurance"]
  },
  { 
    id: 3,
    name: "Fenugreek Seed Extract", 
    dose: "250 mg", 
    role: "The Balancer",
    image: "/ingredients/fenugreek.png",
    summary: "Fenugreek contains compounds called furostanolic saponins, which are believed to help block the enzymes that convert testosterone into estrogen, maintaining a healthy hormonal ratio.",
    benefits: ["Maintains healthy T-levels", "Supports metabolic health", "Aids in fat metabolism"]
  },
  { 
    id: 4,
    name: "Taurine", 
    dose: "200 mg", 
    role: "The Hydrator",
    image: "/ingredients/taurine.png",
    summary: "An amino acid crucial for cellular hydration and cardiovascular function. It protects cells against oxidative stress during intense physical exertion.",
    benefits: ["Supports cellular hydration", "Reduces oxidative stress", "Enhances muscular endurance"]
  },
  { 
    id: 5,
    name: "Zinc Citrate", 
    dose: "30 mg", 
    role: "The Builder",
    image: "/ingredients/zinc.png",
    summary: "Zinc is a fundamental mineral required for testosterone production. We use Zinc Citrate for high bioavailability, ensuring your body gets the raw materials it needs.",
    benefits: ["Essential for T-production", "Supports immune function", "Aids in protein synthesis"]
  },
  { 
    id: 6,
    name: "Boron Citrate", 
    dose: "4 mg", 
    role: "The Freer",
    image: "/ingredients/boron.png",
    summary: "A trace mineral that plays a crucial role in reducing SHBG levels, which in turn increases the amount of free, active testosterone available in your bloodstream.",
    benefits: ["Decreases SHBG levels", "Increases free testosterone", "Supports bone health"]
  },
  { 
    id: 7,
    name: "Vitamin D3", 
    dose: "600 IU", 
    role: "The Foundation",
    image: "/ingredients/vitamin_d.png",
    summary: "Often considered a prohormone rather than a vitamin, adequate D3 levels are strongly correlated with healthy testosterone production and immune resilience.",
    benefits: ["Acts as a hormonal precursor", "Supports immune system", "Enhances mood"]
  },
  { 
    id: 8,
    name: "Vitamin K1 + K2", 
    dose: "100 IU", 
    role: "The Director",
    image: "/ingredients/vitamin_k.png",
    summary: "Works synergistically with Vitamin D3 to ensure calcium is directed into the bones rather than accumulating in the arteries, supporting cardiovascular health.",
    benefits: ["Synergistic with Vitamin D3", "Supports cardiovascular health", "Directs calcium to bones"]
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
          <div className="lg:w-2/3 w-full bg-gradient-to-br from-white/5 to-transparent p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
            {/* Huge Number Background - Moved and Fixed Visibility */}
            <div className="absolute -left-10 -top-10 text-[25rem] font-black text-white/[0.03] pointer-events-none leading-none select-none z-0">
              {activeIngredient.id}
            </div>
            
            {/* Image Showcase */}
            <div className="w-full md:w-1/2 aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img 
                src={activeIngredient.image} 
                alt={activeIngredient.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

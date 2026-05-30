import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left'); // 'left' | 'right'
  const autoPlayTimerRef = useRef(null);

  // Touch Swipe Refs
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const activeIngredient = ingredientsData.find(i => i.id === activeId);

  const selectIngredient = (id) => {
    if (id === activeId) return;
    setSlideDirection(id > activeId ? 'left' : 'right');
    setActiveId(id);
  };

  const nextIngredient = () => {
    setSlideDirection('left');
    setActiveId((prev) => (prev % ingredientsData.length) + 1);
  };

  const prevIngredient = () => {
    setSlideDirection('right');
    setActiveId((prev) => (prev === 1 ? ingredientsData.length : prev - 1));
  };

  // Handle Swipe Gesture Events
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const swipeThreshold = 40; // Pixels required to trigger navigation
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        nextIngredient();
      } else {
        prevIngredient();
      }
    }

    // Reset
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  // Handle Autoplay for Mobile Carousel
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextIngredient();
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isHovered, activeId]);

  // Dynamic sliding animations using GSAP
  useGSAP(() => {
    const isLeft = slideDirection === 'left';
    const startX = isLeft ? 50 : -50;

    gsap.fromTo(".spotlight-card-animate",
      { opacity: 0.1, x: startX, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [activeId] });

  return (
    <section 
      ref={containerRef}
      className="relative pt-[120px] pb-16 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5" 
      id="spotlight"
    >
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#16C784]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#16C784] mb-1.5 block">
            FORMULATION SPOTLIGHT
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-white">
            The Science of <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">The Stack</span>
          </h2>
          <p className="text-[#A8B3AA] text-sm lg:text-base font-semibold max-w-2xl mx-auto pt-2 leading-relaxed">
            Click or swipe to explore biological functions and clinical dosages.
          </p>
        </div>

        {/* Desktop Layout: side-by-side tabs list + detail card (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Vertical Navigation Tabs (lg:w-1/3) */}
          <div className="lg:w-1/3 flex flex-col gap-3.5 w-full">
            {ingredientsData.map((ing) => {
              const isActive = activeId === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => selectIngredient(ing.id)}
                  className={`group flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
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
                      <div className="font-black uppercase tracking-wider text-xs lg:text-sm text-white group-hover:text-[#16C784] transition-colors">{ing.name}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#D85A1F] mt-0.5">
                        {ing.dose} CLINICAL DOSE
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Spotlight Detailed Specifications with Background Bleed (lg:w-2/3) - Exactly same size (h-[520px]) */}
          <div className="lg:w-2/3 w-full bg-black/40 border border-white/5 p-8 lg:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col justify-between h-[520px]">
            {/* Bleed Background Image (z-0) */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] spotlight-card-animate">
              <img 
                src={activeIngredient.image} 
                alt={activeIngredient.name} 
                className="w-full h-full object-cover opacity-[0.55] filter brightness-[0.6] contrast-[1.1] scale-110" 
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,5,0.25)_0%,rgba(3,7,5,0.98)_85%)]" />
            </div>

            {/* Massive watermark number on top of image, behind text (z-10) */}
            <div className="absolute -left-4 -top-8 text-[18rem] lg:text-[22rem] font-black text-white/[0.09] pointer-events-none leading-none select-none z-10 spotlight-card-animate">
              0{activeIngredient.id}
            </div>

            {/* Content Container (z-20) */}
            <div className="relative z-20 w-full text-left flex flex-col justify-between h-full spotlight-card-animate">
              <div className="space-y-4">
                <div className="inline-block bg-[#052E22]/60 border border-[#0FA36B]/30 text-[#16C784] px-4.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em]">
                  {activeIngredient.role}
                </div>
                
                <h3 className="text-4xl font-normal font-serif text-white uppercase tracking-tight">
                  {activeIngredient.name}
                </h3>
                
                <div className="text-2xl font-black text-[#D85A1F] uppercase tracking-tighter">
                  {activeIngredient.dose} CLINICAL DOSE
                </div>
                
                <p className="text-[#A8B3AA] text-sm lg:text-[15px] leading-relaxed font-semibold max-w-xl">
                  {activeIngredient.summary}
                </p>
              </div>
              
              {/* Key Clinical Benefits at the bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5">
                {activeIngredient.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-[#16C784] shrink-0 mt-0.5"><Check size={14} strokeWidth={3} /></span>
                    <span className="text-[11px] font-black text-white uppercase tracking-wider leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Mobile/Tablet Layout: Premium Auto-playing & Controlled Carousel (Hidden on Desktop) - Exactly same size (h-[520px]) */}
        <div 
          className="lg:hidden w-full relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Carousel Card with Swipe Actions */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full bg-black/40 border border-white/5 p-6 xs:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between h-[520px] transition-all duration-500 cursor-grab active:cursor-grabbing"
          >
            {/* Bleed Background Image (z-0) */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] spotlight-card-animate">
              <img 
                src={activeIngredient.image} 
                alt={activeIngredient.name} 
                className="w-full h-full object-cover opacity-[0.50] filter brightness-[0.55] contrast-[1.1] scale-110" 
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,5,0.25)_0%,rgba(3,7,5,0.98)_85%)]" />
            </div>

            {/* Watermark on top of image, behind text (z-10) */}
            <div className="absolute -left-4 -top-6 text-[15rem] font-black text-white/[0.08] pointer-events-none leading-none select-none z-10 spotlight-card-animate">
              0{activeIngredient.id}
            </div>

            {/* Content Container (z-20) */}
            <div className="relative z-20 w-full flex-1 flex flex-col justify-between h-full spotlight-card-animate">
              <div className="text-center space-y-3.5">
                <div className="inline-block bg-[#052E22]/60 border border-[#0FA36B]/30 text-[#16C784] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] mt-1">
                  {activeIngredient.role}
                </div>
                
                <h3 className="text-3xl font-normal font-serif text-white uppercase tracking-tight">
                  {activeIngredient.name}
                </h3>
                
                <div className="text-base font-black text-[#D85A1F] uppercase tracking-wider">
                  {activeIngredient.dose} CLINICAL DOSE
                </div>
                
                <p className="text-[#A8B3AA] text-[13.5px] leading-relaxed font-semibold max-w-md mx-auto">
                  {activeIngredient.summary}
                </p>
              </div>

              {/* Key Clinical Benefits */}
              <div className="space-y-2 pt-4 text-left w-full max-w-md mx-auto">
                {activeIngredient.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-[#16C784] shrink-0 mt-0.5"><Check size={13} strokeWidth={3} /></span>
                    <span className="text-[11px] font-black text-white uppercase tracking-wider">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls Overlayed underneath card */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button
              onClick={prevIngredient}
              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#16C784] hover:border-[#16C784]/40 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Previous ingredient"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dynamic dots progress */}
            <div className="flex items-center gap-2">
              {ingredientsData.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => selectIngredient(ing.id)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeId === ing.id ? 'w-6 bg-[#16C784]' : 'w-1.5 bg-white/20'}`}
                  aria-label={`Go to slide ${ing.id}`}
                />
              ))}
            </div>

            <button
              onClick={nextIngredient}
              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#16C784] hover:border-[#16C784]/40 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Next ingredient"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSpotlight;

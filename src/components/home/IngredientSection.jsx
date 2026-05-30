import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Leaf, Beaker, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ingredients = [
  {
    id: 0,
    name: "Shilajit Extract",
    label: "SHILAJIT",
    dose: "500 mg",
    purpose: "A mineral-rich Himalayan resin traditionally valued for vitality, stamina, mineral support, and foundational masculine wellness.",
    image: "/ingredients/shilajit.png"
  },
  {
    id: 1,
    name: "Tongkat Ali Extract",
    label: "TONGKAT ALI",
    dose: "300 mg",
    purpose: "A modern herbal performance ingredient selected to support masculine drive, vitality, and physical performance rhythm.",
    image: "/ingredients/tongkat_ali.png"
  },
  {
    id: 2,
    name: "Ashwagandha Extract",
    label: "ASHWAGANDHA",
    dose: "300 mg",
    purpose: "An adaptogenic extract used to support stress resilience, recovery, calmer energy, and daily consistency.",
    image: "/ingredients/ashwagandha.png"
  },
  {
    id: 3,
    name: "Fenugreek Extract",
    label: "FENUGREEK",
    dose: "490 mg",
    purpose: "Included at a meaningful dose to support male vitality, confidence, and physical performance support.",
    image: "/ingredients/fenugreek.png"
  },
  {
    id: 4,
    name: "Black Pepper Extract",
    label: "BLACK PEPPER",
    dose: "10 mg",
    purpose: "Supports nutrient absorption and improves formula efficiency.",
    image: "/ingredients/black_pepper.png"
  }
];

const IngredientSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left'); // 'left' | 'right'
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef(null);

  const radius = 210;
  const centerX = 240;
  const centerY = 260; // Shift center down to prevent bottom clipping

  const getCoords = (index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    return {
      x: Math.round(centerX + radius * Math.cos(angle)),
      y: Math.round(centerY + radius * Math.sin(angle))
    };
  };

  const activeIng = ingredients[activeIndex];
  const activeCoords = getCoords(activeIndex);
  const nodePositions = ingredients.map((_, i) => getCoords(i));

  const selectIngredient = (index) => {
    if (index === activeIndex) return;
    setSlideDirection(index > activeIndex ? 'left' : 'right');
    setActiveIndex(index);
  };

  const nextIngredient = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev + 1) % ingredients.length);
  };

  const prevIngredient = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev - 1 + ingredients.length) % ingredients.length);
  };

  // Handle Autoplay Carousel
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
  }, [isHovered, activeIndex]);

  useGSAP(() => {
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

  const rotationTweenRef = useRef(null);
  const nodeRotationTweenRef = useRef(null);

  useGSAP(() => {
    // Clockwise rotation of the main orbit ring (contains logo and nodes) - active on all devices!
    const rTween = gsap.to(".logo-orbit-ring", {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
      transformOrigin: "240px 260px"
    });

    // Counter-clockwise rotation of the node buttons to keep them upright (Ferris wheel effect!)
    const nrTween = gsap.to(".ingredient-node-btn", {
      rotation: -360,
      duration: 40,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    rotationTweenRef.current = rTween;
    nodeRotationTweenRef.current = nrTween;
  }, { scope: containerRef });

  // Handle Logo scale-up pulse and slowdown when hovered
  useGSAP(() => {
    if (window.innerWidth < 1024) return; // Skip hover speed-down interactions on mobile
    if (!rotationTweenRef.current || !nodeRotationTweenRef.current) return; // safety check!

    if (isHovered) {
      gsap.to(".logo-rotating-backdrop", {
        scale: 1.03,
        opacity: 0.95,
        duration: 0.5,
        ease: "power2.out"
      });
      // Smoothly slow down the infinite rotation speed (to 70% speed)
      gsap.to(rotationTweenRef.current, { timeScale: 0.70, duration: 0.8, ease: "power1.out" });
      gsap.to(nodeRotationTweenRef.current, { timeScale: 0.70, duration: 0.8, ease: "power1.out" });
    } else {
      gsap.to(".logo-rotating-backdrop", {
        scale: 1.0,
        opacity: 0.80,
        duration: 0.5,
        ease: "power2.out"
      });
      // Smoothly restore normal rotation speed
      gsap.to(rotationTweenRef.current, { timeScale: 1.0, duration: 0.8, ease: "power1.out" });
      gsap.to(nodeRotationTweenRef.current, { timeScale: 1.0, duration: 0.8, ease: "power1.out" });
    }
  }, [isHovered]);

  useGSAP(() => {
    // Carousel sliding animation inside the central circular display panel
    const isLeft = slideDirection === 'left';
    const startX = isLeft ? 50 : -50;

    // Transition in
    gsap.fromTo(".central-panel-content",
      { opacity: 0, x: startX, scale: 0.94 },
      { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 lg:min-h-[920px] flex flex-col justify-between"
      id="formula"
    >
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#16C784]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">

        {/* Header Block */}
        <div className="text-center mb-6 lg:mb-2 max-w-3xl mx-auto ingredient-fade-up">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-0.5 block">
            Transparent Dosing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.5rem] font-normal font-serif tracking-tight text-white mb-1">
            The Formula, Fully Transparent
          </h2>
          <p className="text-[#A8B3AA] font-medium text-sm lg:text-base leading-relaxed">
            Five purposeful herbal extracts. Clear daily dosages. Tap or hover an ingredient to explore its biological profile.
          </p>
        </div>

        {/* Responsive Circular Layout for ALL screen sizes */}
        <div className="flex items-center justify-center relative w-full h-[360px] xs:h-[400px] sm:h-[460px] lg:h-[520px] overflow-hidden my-auto ingredient-fade-up">

          <div className="scale-[0.62] xs:scale-[0.72] sm:scale-[0.85] lg:scale-100 origin-center absolute flex items-center justify-center w-[480px] h-[520px]">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-[480px] h-[520px]"
            >

              {/* Central circular display panel (STATIONARY - sibling to the rotating ring, so it doesn't spin!) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/10 flex flex-col justify-center items-center bg-black shadow-2xl relative z-10 backdrop-blur-md overflow-hidden">

                {/* Active ingredient background photo with smooth hardware-accelerated cross-fade */}
                {ingredients.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-full transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-90 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                      }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.15]"
                    />
                    {/* Dark radial vignette overlay gradient to ensure high readability while keeping the photo rich */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.85)_75%)]" />
                  </div>
                ))}

                {/* Glowing inner shadow overlay */}
                <div className="absolute inset-0 rounded-full bg-radial-gradient from-transparent to-[#16C784]/10 pointer-events-none z-10" />

                {/* Manual navigation Chevron buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevIngredient(); }}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#16C784] hover:bg-black/90 hover:border-[#16C784]/40 hover:scale-105 active:scale-95 transition-all duration-200 z-30 outline-none cursor-pointer"
                  aria-label="Previous ingredient"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextIngredient(); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#16C784] hover:bg-black/90 hover:border-[#16C784]/40 hover:scale-105 active:scale-95 transition-all duration-200 z-30 outline-none cursor-pointer"
                  aria-label="Next ingredient"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Central carousel slide content (Enhanced mobile font sizing) */}
                <div className="w-[190px] h-[190px] flex flex-col items-center justify-center text-center relative z-20 select-none">
                  <div className="central-panel-content flex flex-col items-center justify-center space-y-2">
                    <h3 className="text-[17px] lg:text-sm font-black text-white leading-tight uppercase tracking-wider filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {activeIng.name}
                    </h3>
                    <span className="text-[11px] lg:text-[9px] font-black uppercase tracking-widest text-[#D85A1F] bg-[#D85A1F]/20 border border-[#D85A1F]/30 px-2.5 py-0.5 rounded-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {activeIng.dose} Dose
                    </span>
                    <p className="text-[12.5px] lg:text-[10px] text-[#A8B3AA] leading-relaxed font-semibold max-w-[170px] mt-0.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {activeIng.purpose}
                    </p>
                  </div>
                </div>

                {/* Elegant dynamic progress dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  {ingredients.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); selectIngredient(i); }}
                      className={`h-1 rounded-full transition-all duration-300 outline-none cursor-pointer ${activeIndex === i ? 'w-4.5 bg-[#16C784]' : 'w-1 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Infinite Rotating Orbit Ring Container (LOGO, GLOWING LINE, NODES spinning together!) */}
              <div className="absolute inset-0 w-full h-full logo-orbit-ring z-0">

                {/* Rotating Logo symbol precisely aligning with the orbit ring path at 656px width/height */}
                <div className="absolute top-[260px] left-[240px] -translate-x-1/2 -translate-y-1/2 w-[656px] h-[656px] pointer-events-none flex items-center justify-center">
                  <img
                    src="/logo/logo_white_symbol.png"
                    alt="Rotating Logo Backdrop"
                    className="w-full h-full object-contain logo-rotating-backdrop origin-center opacity-[0.80] filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  />
                </div>

                {/* SVG Connecting Background with connecting glowing line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 520" fill="none">
                  {/* Connecting glowing line from center to active ingredient node */}
                  <line
                    x1="240"
                    y1="260"
                    x2={activeCoords.x}
                    y2={activeCoords.y}
                    stroke="#16C784"
                    strokeWidth="2.5"
                    strokeOpacity="0.45"
                    className="filter drop-shadow-[0_0_6px_rgba(22,199,132,0.5)]"
                  />
                </svg>

                {/* Mathematically mapped ingredient node buttons */}
                {ingredients.map((item, i) => {
                  const pos = nodePositions[i];
                  const isNodeActive = activeIndex === i;
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => selectIngredient(i)}
                      onClick={() => selectIngredient(i)}
                      className="absolute z-20 group outline-none cursor-pointer ingredient-node-btn origin-center"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className={`w-20 h-20 rounded-full border-2 bg-black flex items-center justify-center transition-all duration-300 ${isNodeActive ? 'border-[#16C784] scale-110 shadow-[0_0_25px_rgba(22,199,132,0.4)]' : 'border-white/10 hover:border-white/40 hover:scale-105'} overflow-hidden`}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover animate-pulse-slow" />
                      </div>
                      <span className="absolute top-[88px] left-1/2 -translate-x-1/2 text-[9px] font-black tracking-widest text-[#A8B3AA] uppercase bg-black/70 border border-white/5 px-2.5 py-0.5 rounded shadow whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {item.label}
                      </span>
                    </button>
                  );
                })}

              </div>

            </div>
          </div>

        </div>

        {/* Elegant compact serving info row */}
        <div className="max-w-4xl mx-auto text-center mb-4 lg:mb-2.5 ingredient-fade-up">
          <div className="text-[#16C784] font-black uppercase tracking-[0.2em] text-xs lg:text-sm">
            1,600mg Active Ingredients Per Serving &bull; 2 Vegetarian Capsules Daily &bull; 60 Capsules (30-Day Supply)
          </div>
        </div>

        {/* High-conversion CTA Link to Science Page */}
        <div className="text-center mb-4 lg:mb-1.5 ingredient-fade-up">
          <a
            href="/science"
            className="inline-flex items-center gap-3 bg-[#D85A1F] hover:bg-[#b94a17] text-white px-11 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] hover:scale-[1.03] duration-300"
          >
            Explore T-CORE Science
          </a>
        </div>

        {/* Footer Trust Strip */}
        <div className="mt-2 border-t border-white/5 pt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] font-black tracking-widest text-[#A8B3AA] uppercase ingredient-fade-up">
          <div className="flex items-center gap-1"><MapPin size={10} className="text-[#16C784]" /> Made in a cGMP Facility</div>
          <div className="flex items-center gap-1"><Leaf size={10} className="text-[#16C784]" /> Non-GMO</div>
          <div className="flex items-center gap-1"><Beaker size={10} className="text-[#16C784]" /> Third Party Tested</div>
          <div className="flex items-center gap-1"><ShieldCheck size={10} className="text-[#16C784]" /> Hormone-Free</div>
          <div className="flex items-center gap-1"><MapPin size={10} className="text-[#16C784]" /> Made in India</div>
          <div className="flex items-center gap-1"><Leaf size={10} className="text-[#16C784]" /> Vegetarian Capsules</div>
        </div>

      </div>
    </section>
  );
};

export default IngredientSection;

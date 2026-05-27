import React, { Suspense, lazy, useRef } from 'react';
import { Zap, Activity, ArrowRight, Compass } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import useCartStore from '../../store/useCartStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Lazy load 3D components for performance
const Canvas = lazy(() => import('@react-three/fiber').then(m => ({ default: m.Canvas })));
const PerspectiveCamera = lazy(() => import('@react-three/drei').then(m => ({ default: m.PerspectiveCamera })));
const Float = lazy(() => import('@react-three/drei').then(m => ({ default: m.Float })));
const ProductModel = lazy(() => import('../ProductModel').then(m => ({ default: m.ProductModel })));
const Scene = lazy(() => import('../Scene').then(m => ({ default: m.Scene })));

const SolutionGrid = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const containerRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const mechanisms = [
    { 
      icon: <Zap className="text-biomen-accent" size={28} strokeWidth={2} />, 
      label: "Mechanism 1",
      title: "IGNITE", 
      desc: "Supports masculine drive, vitality, and daily performance rhythm.",
      poweredBy: "TONGKAT ALI + FENUGREEK"
    },
    { 
      icon: <Activity className="text-biomen-accent" size={28} strokeWidth={2} />, 
      label: "Mechanism 2",
      title: "RESTORE", 
      desc: "Supports energy, recovery, stress resilience, and a steadier daily baseline.",
      poweredBy: "SHILAJIT + ASHWAGANDHA"
    },
    { 
      icon: <Compass className="text-biomen-accent" size={28} strokeWidth={2} />, 
      label: "Mechanism 3",
      title: "AMPLIFY", 
      desc: "Supports nutrient absorption and ingredient bioavailability.",
      poweredBy: "BLACK PEPPER EXTRACT"
    }
  ];

  useGSAP(() => {
    // Smooth fade up slide inside the formulation system
    gsap.from(".solution-fade-up", {
      y: 40,
      opacity: 0,
      duration: 0.9,
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
      className="py-24 px-6 md:px-12 bg-biomen-dark text-biomen-white relative overflow-hidden border-t border-white/5" 
      id="solution"
    >
      {/* Visual background glow elements */}
      <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-biomen-green/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-biomen-green/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 relative z-10 max-w-4xl mx-auto solution-fade-up">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-accent/10 px-4 py-1.5 rounded-full border border-biomen-accent/20 inline-block mb-4">
            FORMULATION APPROACH
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">
            A 3-Part System <br className="hidden sm:block"/> for Daily Male Performance
          </h2>
          <p className="text-biomen-muted text-base md:text-lg leading-relaxed font-semibold">
            T-CORE is built around three core functions of male vitality: drive, recovery, and absorption. Each ingredient has a clear role. Nothing is added without purpose.
          </p>
        </div>
        
        {/* Responsive Grid: Image on top for Mobile, 3D Model on right for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Mobile Image (Shows only on <lg) */}
          <div className="lg:hidden flex justify-center mb-8 relative solution-fade-up">
            <div className="absolute inset-0 bg-biomen-green/30 blur-[100px] rounded-full" />
            <img 
              src="/tcore_canister.jpg" 
              alt="T-CORE Canister" 
              className="w-3/4 max-w-[300px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10"
            />
          </div>

          {/* Left: Mechanisms List */}
          <div className="lg:col-span-7 bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-sm order-2 lg:order-1 solution-fade-up">
            <div className="flex flex-col gap-8">
              {mechanisms.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group cursor-default border-b border-white/5 last:border-0 pb-6 last:pb-0">
                  <div className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110 bg-biomen-accent/15 p-3 rounded-full border border-biomen-accent/20">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent mb-1 block">
                      {item.label}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider mb-2 text-biomen-white">{item.title}</h3>
                    <p className="text-biomen-muted font-medium mb-3 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    <div className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-biomen-mint">
                      KEY INGREDIENTS: <span className="text-biomen-white font-black">{item.poweredBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Line Copy */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center lg:text-left">
              <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-accent/10 px-6 py-3.5 rounded-full inline-block border border-biomen-accent/15">
                Three functions. Five ingredients. One disciplined daily system.
              </p>
            </div>
          </div>

          {/* Right: Desktop 3D Model + Button (Shows on lg+) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center order-1 lg:order-2 relative h-[600px] solution-fade-up">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Product rim light overlays configured in hero will pop here too */}
              <div className="absolute inset-0 bg-biomen-accent/5 blur-[120px] rounded-full" />
              
              {/* Only render 3D when in view and lazy loaded */}
              {inView && (
                <Suspense fallback={<div className="text-biomen-accent font-black animate-pulse uppercase tracking-widest text-xs">Optimizing View...</div>}>
                  <Canvas shadows gl={{ antialias: true, alpha: true }} className="w-full h-full">
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                    <Scene>
                      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <ProductModel 
                          position={[0, -1, 0]} 
                          rotation={[0, -Math.PI * 0.15, 0]} 
                          scale={[1.1, 1.1, 1.1]}
                        />
                      </Float>
                    </Scene>
                  </Canvas>
                </Suspense>
              )}
            </div>
            
            {/* CTA in copper */}
            <button 
              onClick={() => addToCart({
                id: 'tcore-3-bottles',
                title: 'T-CORE Full Reset System (3 Bottles)',
                price: 3999,
                quantity: 1,
                isSubscription: false,
                image: '/tcore_canister.jpg'
              })}
              className="mt-8 bg-biomen-copper hover:bg-biomen-copper/90 text-white w-full max-w-sm py-5 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.3)] flex items-center justify-center gap-3 hover:scale-105 relative z-20"
            >
              Start Your 90-Day System <ArrowRight size={24} />
            </button>
          </div>

          {/* Mobile Button (Shows only on <lg) */}
          <div className="lg:hidden flex justify-center order-3 mt-4 solution-fade-up">
            <button 
              onClick={() => addToCart({
                id: 'tcore-3-bottles',
                title: 'T-CORE Full Reset System (3 Bottles)',
                price: 3999,
                quantity: 1,
                isSubscription: false,
                image: '/tcore_canister.jpg'
              })}
              className="bg-biomen-copper hover:bg-biomen-copper/90 text-white w-full py-5 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.3)] flex items-center justify-center gap-3"
            >
              Start Your 90-Day System <ArrowRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionGrid;

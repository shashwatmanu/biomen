import React, { Suspense, lazy } from 'react';
import { Zap, Activity, Plus, Sun, ArrowUpCircle, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import useCartStore from '../../store/useCartStore';

// Lazy load 3D components for performance
const Canvas = lazy(() => import('@react-three/fiber').then(m => ({ default: m.Canvas })));
const PerspectiveCamera = lazy(() => import('@react-three/drei').then(m => ({ default: m.PerspectiveCamera })));
const Float = lazy(() => import('@react-three/drei').then(m => ({ default: m.Float })));
const ProductModel = lazy(() => import('../ProductModel').then(m => ({ default: m.ProductModel })));
const Scene = lazy(() => import('../Scene').then(m => ({ default: m.Scene })));

const SolutionGrid = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const benefits = [
    { 
      icon: <Zap className="text-orange-600" size={24} strokeWidth={3} />, 
      title: "SKYROCKET ENERGY & STAMINA", 
      desc: "Increase energy & athletic performance" 
    },
    { 
      icon: <Activity className="text-orange-600" size={24} strokeWidth={3} />, 
      title: "SUPPORT MALE VITALITY", 
      desc: "Amplify passionate energy" 
    },
    { 
      icon: <Plus className="text-orange-600" size={24} strokeWidth={3} />, 
      title: "ENHANCE PRODUCTIVITY & FOCUS", 
      desc: "Stay sharp & focused all day" 
    },
    { 
      icon: <Sun className="text-orange-600" size={24} strokeWidth={3} />, 
      title: "SUPERCHARGE STRENGTH", 
      desc: "Build & maintain lean muscle mass" 
    },
    { 
      icon: <ArrowUpCircle className="text-orange-600" size={24} strokeWidth={3} />, 
      title: "IMPROVE RECOVERY", 
      desc: "Optimize sleep & muscle recovery" 
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white relative overflow-hidden" id="solution" ref={ref}>
      {/* Background glow for Mars Men style */}
      <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">
            THE SOLUTION? T-CORE <span className="text-orange-500">●</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-medium">
            Maintaining balanced testosterone levels is pivotal for contributing to an overall sense of well-being. Encouraging our body's natural hormonal function can help us men:
          </p>
        </div>
        
        {/* Responsive Grid: Image on top for Mobile, 3D Model on right for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Mobile Image (Shows only on <lg) */}
          <div className="lg:hidden flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-emerald-900/30 blur-[100px] rounded-full" />
            <img 
              src="/tcore_canister.jpg" 
              alt="T-CORE Canister" 
              className="w-3/4 max-w-[300px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10"
            />
          </div>

          {/* Left: Benefits List */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-sm order-2 lg:order-1">
            <div className="flex flex-col gap-8">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group cursor-default">
                  <div className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wider mb-1">{item.title}</h3>
                    <p className="text-gray-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Desktop 3D Model + Button (Shows on lg+) */}
          <div className="hidden lg:flex flex-col items-center justify-center order-1 lg:order-2 relative h-[600px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-900/10 blur-[120px] rounded-full" />
              
              {/* Only render 3D when in view and lazy loaded */}
              {inView && (
                <Suspense fallback={<div className="text-emerald-500 font-black animate-pulse uppercase tracking-widest">Optimizing View...</div>}>
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
            
            <button 
              onClick={() => addToCart({
                id: 'tcore-launch-kit',
                title: 'T-CORE Launch Kit',
                price: 1499,
                quantity: 1,
                isSubscription: true,
                image: '/tcore_canister.jpg'
              })}
              className="mt-8 bg-orange-600 hover:bg-orange-500 text-white w-full max-w-sm py-5 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3 hover:scale-105 relative z-20"
            >
              TRY IT NOW <ArrowRight size={24} />
            </button>
          </div>

          {/* Mobile Button (Shows only on <lg) */}
          <div className="lg:hidden flex justify-center order-3 mt-4">
            <button 
              onClick={() => addToCart({
                id: 'tcore-launch-kit',
                title: 'T-CORE Launch Kit',
                price: 1499,
                quantity: 1,
                isSubscription: true,
                image: '/tcore_canister.jpg'
              })}
              className="bg-orange-600 hover:bg-orange-500 text-white w-full py-5 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3"
            >
              TRY IT NOW <ArrowRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionGrid;

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { ScienceProductModel } from './ScienceProductModel';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Floating bio-molecular green background particles for rich depth
const MolecularBackgroundParticles = () => {
  const pointsRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Extremely slow premium rotation sways
      pointsRef.current.rotation.y = t * 0.02;
      pointsRef.current.rotation.x = t * 0.01;
    }
  });

  const count = 45;
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Spawn particles behind the product in a loose cloud
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 4.0;
      const z = -2.0 - Math.random() * 3.5;
      arr.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 5.5,
        z
      );
    }
    return new Float32Array(arr);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#16C784" 
        size={0.07} 
        sizeAttenuation={true} 
        transparent={true} 
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
};

const ScienceHero = () => {
  const textContainerRef = useRef(null);

  // Elegant load-in animations using GSAP
  useGSAP(() => {
    if (!textContainerRef.current) return;
    
    const children = textContainerRef.current.children;
    gsap.from(children, {
      y: 25,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "power4.out"
    });
  }, { scope: textContainerRef });

  return (
    <section className="pt-[140px] lg:pt-[170px] pb-24 px-6 md:px-20 bg-[#030705] relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Background radial and gradient glows for a botanical feel */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#052E22]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#0FA36B]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle digital coordinates background grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(22,199,132,0.2) 1.5px, transparent 0)', 
          backgroundSize: '48px 48px' 
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: High-end Editorial Copy with Staggered Entrance */}
          <div ref={textContainerRef} className="lg:col-span-7 xl:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 bg-[#052E22]/60 border border-[#16C784]/35 text-[#16C784] px-4.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(22,199,132,0.12)]">
              <Sparkles size={12} className="text-[#16C784] animate-pulse" />
              FORMULATION &amp; MECHANISM
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-[4.4rem] font-normal font-serif tracking-tight leading-[1.05] text-[#F4F6F2] uppercase">
                The Science Behind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-semibold">T-CORE</span>
              </h1>
              <p className="text-lg text-[#A8B3AA] font-medium leading-relaxed max-w-xl">
                T-CORE is not a magic solution. It is a precise, clinically calibrated biological system designed to support natural testosterone production, regulate cortisol, and restore the foundation of male vitality.
              </p>
            </div>

            {/* Premium Award-Style Editorial Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="group relative glass-panel p-5 rounded-2xl border border-[#16C784]/15 bg-gradient-to-br from-[#052E22]/20 via-[#030705]/45 to-transparent hover:border-[#16C784]/40 hover:scale-[1.03] transition-all duration-500 cursor-pointer">
                {/* Decorative neon indicator dot */}
                <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#16C784]/30 group-hover:bg-[#16C784] transition-all duration-300" />
                <span className="text-3xl md:text-4xl font-normal font-serif text-[#16C784] group-hover:text-white transition-colors">8</span>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#A8B3AA] mt-2 block leading-snug">
                  Active Botanicals
                </span>
              </div>
              
              <div className="group relative glass-panel p-5 rounded-2xl border border-[#16C784]/15 bg-gradient-to-br from-[#052E22]/20 via-[#030705]/45 to-transparent hover:border-[#16C784]/40 hover:scale-[1.03] transition-all duration-500 cursor-pointer">
                <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#16C784]/30 group-hover:bg-[#16C784] transition-all duration-300" />
                <span className="text-3xl md:text-4xl font-normal font-serif text-[#16C784] group-hover:text-white transition-colors">100%</span>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#A8B3AA] mt-2 block leading-snug">
                  Transparent Dosing
                </span>
              </div>
              
              <div className="group relative glass-panel p-5 rounded-2xl border border-[#16C784]/15 bg-gradient-to-br from-[#052E22]/20 via-[#030705]/45 to-transparent hover:border-[#16C784]/40 hover:scale-[1.03] transition-all duration-500 cursor-pointer">
                <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#16C784]/30 group-hover:bg-[#16C784] transition-all duration-300" />
                <span className="text-3xl md:text-4xl font-normal font-serif text-[#16C784] group-hover:text-white transition-colors">0%</span>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#A8B3AA] mt-2 block leading-snug">
                  Synthetic Fillers
                </span>
              </div>
            </div>

            {/* Premium Highlights List */}
            <div className="space-y-4.5 pt-5 border-t border-white/10">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-[#16C784] mt-0.5 shrink-0" />
                <p className="text-sm text-[#A8B3AA] font-semibold leading-relaxed">
                  <span className="text-[#F4F6F2]">Synergistic Botanical Stack</span> engineered to optimize cortisol-to-testosterone balance.
                </p>
              </div>
              <div className="flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-[#16C784] mt-0.5 shrink-0" />
                <p className="text-sm text-[#A8B3AA] font-semibold leading-relaxed">
                  <span className="text-[#F4F6F2]">Clinically Calibrated Dosages</span> verified by double-blind, human clinical trials.
                </p>
              </div>
              <div className="flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-[#16C784] mt-0.5 shrink-0" />
                <p className="text-sm text-[#A8B3AA] font-semibold leading-relaxed">
                  <span className="text-[#F4F6F2]">100% Label Integrity</span> &mdash; zero proprietary blends, so you know exactly what goes into your body.
                </p>
              </div>
            </div>

            {/* Micro-trust security strip */}
            <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-[#A8B3AA] uppercase pt-2">
              <ShieldCheck size={13} className="text-[#16C784]" />
              <span>Tested for Purity &bull; ISO Certified Facilities &bull; Vegetarian Safe</span>
            </div>

            {/* Smooth Anchor CTA */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#16C784] hover:text-[#7FE7B3] transition-colors group cursor-pointer"
              >
                DIVE INTO THE STACKS
                <span className="transform group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Canvas Container */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] w-full">
            {/* Elegant glowing backdrop behind the cylinder */}
            <div className="absolute inset-0 max-w-[420px] max-h-[420px] mx-auto my-auto rounded-full bg-gradient-to-tr from-[#052E22]/30 to-[#0fa36b]/5 border border-white/[0.03] blur-[50px] pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Suspense 
                fallback={
                  <div className="flex flex-col items-center justify-center h-full w-full py-20 z-20">
                    <div className="w-10 h-10 rounded-full border-2 border-[#16C784]/20 border-t-[#16C784] animate-spin"></div>
                    <span className="text-[9px] font-black tracking-widest text-[#A8B3AA] uppercase mt-3">
                      LOADING 3D ENVIRONMENT
                    </span>
                  </div>
                }
              >
                <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
                  {/* Lower ambient light for deep shadows */}
                  <ambientLight intensity={0.45} />
                  
                  {/* Master Key Light (Front-Right) to make golden text and label shine */}
                  <directionalLight position={[8, 4, 6]} intensity={2.2} color="#ffffff" castShadow />
                  
                  {/* Cinematic Back-Left Rim Light to cast a gorgeous green edge sheen */}
                  <directionalLight position={[-8, 6, -6]} intensity={3.8} color="#7FE7B3" />
                  
                  {/* Soft Fill Light to soften dark front sways */}
                  <directionalLight position={[-6, -4, 2]} intensity={0.65} color="#ffffff" />
                  
                  {/* Direct spotlight focusing on visual center */}
                  <spotLight position={[0, 10, 0]} intensity={2.5} angle={0.25} penumbra={1} castShadow />

                  {/* Botanical Forest reflections */}
                  <Environment preset="forest" />

                  {/* Slowly drifting molecular particle cloud in the background */}
                  <MolecularBackgroundParticles />

                  {/* Stout and perfectly-proportioned 3D cylinder packaging */}
                  <ScienceProductModel scale={[0.85, 0.85, 0.85]} position={[0, 0, 0]} />

                  {/* Ground shadows anchoring the floating product */}
                  <ContactShadows 
                    position={[0, -2.0, 0]} 
                    opacity={0.65} 
                    scale={6.5} 
                    blur={1.5} 
                    far={3.0} 
                    color="#052e22" 
                  />

                  {/* Post-processing compose line */}
                  <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.3} radius={0.3} />
                    <Vignette eskil={false} offset={0.1} darkness={1.15} />
                    <SMAA />
                  </EffectComposer>
                </Canvas>
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScienceHero;



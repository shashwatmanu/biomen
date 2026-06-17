import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { ScienceProductModel } from './ScienceProductModel';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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


const MetricCard = ({ value, label }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    if (window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((centerY - y) / centerY) * 6;
      const rotateYVal = ((x - centerX) / centerX) * 6;
      e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
      e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-[1.5px] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer bg-white/5 group/spotlight flex flex-col h-full"
      style={{
        transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        transition: 'transform 0.2s ease-out, background 0.3s ease'
      }}
    >
      {/* Spotlight border glow layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
        }}
      />
      
      {/* Inner Card content wrapper */}
      <div className="w-full h-full rounded-[14px] p-5 bg-[#030705]/95 flex flex-col justify-between text-left relative z-10 transition-colors duration-500 overflow-hidden flex-1 min-h-[110px]">
        {/* Background inner glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.07), transparent 80%)`
          }}
        />
        <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#16C784]/30 group-hover/spotlight:bg-[#16C784] transition-all duration-300 z-10" />
        <span className="text-3.5xl md:text-4xl font-normal font-serif text-[#16C784] group-hover/spotlight:text-white transition-colors relative z-10">{value}</span>
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#A8B3AA] mt-2 block leading-snug relative z-10">
          {label}
        </span>
      </div>
    </div>
  );
};

// Premium Award-Style Editorial Metrics helper component
const MetricsGrid = ({ className }) => (
  <div className={`grid grid-cols-3 gap-4 w-full max-w-lg relative z-20 ${className}`}>
    <MetricCard value="8" label="Active Botanicals" />
    <MetricCard value="100%" label="Transparent Dosing" />
    <MetricCard value="0%" label="Synthetic Fillers" />
  </div>
);

const ScienceHero = () => {
  const textContainerRef = useRef(null);

  // Elegant load-in animations using GSAP
  useGSAP(() => {
    if (!textContainerRef.current) return;

    const targets = textContainerRef.current.querySelectorAll(':scope > *:not(.hidden)');
    gsap.from(targets, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.fromTo(".integrity-shine-sweep", 
      { xPercent: -100 },
      { 
        xPercent: 100,
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0.6,
        scrollTrigger: {
          trigger: ".integrity-shine-sweep",
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: textContainerRef });

  return (
    <section className="pt-[140px] lg:pt-[170px] pb-12 lg:pb-24 px-6 md:px-20 bg-[#030705] relative overflow-hidden min-h-[92vh] flex items-start">
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
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Mobile Headline (Only visible on mobile/tablet screens - order-1) */}
          <div className="block lg:hidden space-y-4 text-left w-full order-1">
            <div className="inline-flex items-center gap-2.5 bg-[#052E22]/60 border border-[#16C784]/35 text-[#16C784] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(22,199,132,0.12)]">
              <Sparkles size={12} className="text-[#16C784] animate-pulse" />
              FORMULATION &amp; MECHANISM
            </div>
            <h1 className="text-4xl md:text-5xl font-normal font-serif tracking-tight leading-[1.05] text-[#F4F6F2] uppercase">
              The Science Behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-semibold">T-CORE</span>
            </h1>
          </div>

          {/* Right Column: 3D Canvas Container (order-2 on mobile, order-2 on desktop) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-center justify-start relative w-full order-2 lg:order-2 touch-pan-y select-none lg:-mt-18">
            {/* Elegant glowing backdrop behind the cylinder */}
            <div className="absolute top-[60px] inset-x-0 max-w-[420px] max-h-[420px] mx-auto rounded-full bg-gradient-to-tr from-[#052E22]/30 to-[#0fa36b]/5 border border-white/[0.03] blur-[50px] pointer-events-none" />

            <div className="w-full h-[360px] sm:h-[420px] lg:h-[520px] relative touch-pan-y select-none">
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
                    position={[0, -2.7, 0]}
                    opacity={0.65}
                    scale={6.5}
                    blur={1.5}
                    far={3.0}
                    color="#052e22"
                  />

                  {/* Post-processing compose line */}
                  <EffectComposer disableNormalPass>
                    <Bloom font-size="sm" luminanceThreshold={1.2} mipmapBlur intensity={0.3} radius={0.3} />
                    <Vignette eskil={false} offset={0.1} darkness={1.15} />
                    <SMAA />
                  </EffectComposer>
                </Canvas>
              </Suspense>
            </div>

            {/* Premium Award-Style Editorial Metrics (Desktop only) */}
            <MetricsGrid className="hidden lg:grid mt-8" />
          </div>

          {/* Left Column: High-end Editorial Copy with Staggered Entrance (order-3 on mobile, order-1 on desktop) */}
          <div ref={textContainerRef} className="lg:col-span-7 xl:col-span-6 space-y-5 text-left order-3 lg:order-1 w-full">
            {/* Desktop Headline (Only visible on desktop view) */}
            <div className="hidden lg:block space-y-4">
              <div className="inline-flex items-center gap-2.5 bg-[#052E22]/60 border border-[#16C784]/35 text-[#16C784] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(22,199,132,0.12)]">
                <Sparkles size={12} className="text-[#16C784] animate-pulse" />
                FORMULATION &amp; MECHANISM
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.4rem] font-normal font-serif tracking-tight leading-[1.05] text-[#F4F6F2] uppercase">
                The Science Behind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-semibold">T-CORE</span>
              </h1>
            </div>

            <div className="relative overflow-hidden p-6 rounded-2xl border border-[#16C784]/30 bg-gradient-to-r from-[#052E22]/50 to-[#0C4A36]/30 shadow-[0_0_25px_rgba(22,199,132,0.12)] max-w-xl group hover:border-[#16C784]/50 transition-all duration-500">
              {/* Pulsing glow background effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,199,132,0.06)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Metallic shine sweep overlay */}
              <div className="integrity-shine-sweep absolute inset-y-0 left-0 w-[150%] pointer-events-none z-10 bg-gradient-to-r from-transparent via-[#16C784]/20 to-transparent -translate-x-full -skew-x-12" />

              <p className="text-[15px] sm:text-base md:text-[17px] text-[#A8B3AA] font-semibold leading-relaxed relative z-10">
                <span className="text-[#16C784] font-black tracking-widest block mb-2 text-xs uppercase">Integrity Notice</span>
                <span className="font-bold text-white drop-shadow-[0_0_6px_rgba(22,199,132,0.35)]">T-CORE is not a magic solution.</span> It is a precise, clinically calibrated biological system designed to support natural testosterone production, regulate cortisol, and restore the foundation of male vitality.
              </p>
            </div>

            {/* Premium Award-Style Editorial Metrics (Mobile only, placed below Integrity Notice) */}
            <MetricsGrid className="lg:hidden mt-6" />

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

        </div>
      </div>
    </section>
  );
};

export default ScienceHero;



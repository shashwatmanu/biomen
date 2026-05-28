import React from 'react';
import { ArrowRight, Star, Shield } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const textRef = React.useRef(null);

  useGSAP(() => {
    // Elegant text entrance animation
    gsap.from(textRef.current?.children || [], {
      y: 25,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="hero-section relative min-h-screen lg:min-h-[750px] flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-[#030705] pt-[130px] lg:pt-[150px] pb-12">
      
      {/* Editorial Background Image with full vibrant brightness */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero_mossy_ingredients.jpg" 
          alt="T-CORE Luxury Vitality" 
          className="w-full h-full object-cover object-right lg:object-center filter brightness-[1.15] contrast-[1.05] scale-100"
        />
        {/* Mobile vertical overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:hidden z-10" />
        
        {/* Soft left-aligned shadow overlay behind the text to ensure 100% readability */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Clean Solid Editorial Text Canvas */}
          <div ref={textRef} className="lg:col-span-8 xl:col-span-7 space-y-6 text-left relative max-w-3xl">
            
            {/* Verified Rating Badge */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#D85A1F]">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#A8B3AA]">
                4.9/5 RATING &bull; OVER 3,900 VERIFIED EXPERIENCES
              </span>
            </div>
 
            {/* Headline - Split white/green for luxury serif editorial feel */}
            <h1 className="text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.5rem] font-normal font-serif tracking-tight leading-[1.05] text-biomen-white">
              Daily Vitality for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-medium">Modern</span> <br />
              Indian Man
            </h1>
            
            {/* Subheadline - Premium editorial authority */}
            <p className="text-xl lg:text-2xl text-biomen-white font-medium leading-relaxed max-w-2xl drop-shadow-sm">
              T-CORE is a premium, clinical-grade daily vitality system built to support energy, drive, and post-workout recovery. Packaged in a collectible glass jar inside.
            </p>
 
            {/* Luxury Support Strip */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-black uppercase tracking-widest text-[#7FE7B3]/90">
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1 rounded-full bg-[#16C784]"></span> Transparent Dosing
              </span>
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1 rounded-full bg-[#16C784]"></span> Vegetarian Capsules
              </span>
              <span className="flex items-center gap-1 bg-[#052E22]/75 border border-[#0FA36B]/25 px-3.5 py-2 rounded-lg text-white backdrop-blur-sm">
                <span className="w-1 rounded-full bg-[#BFA46A]"></span> Made in India
              </span>
            </div>
            
            {/* CTAs with copper branding routing to PDP */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="/products/t-core" 
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.35)] flex items-center justify-center gap-2 hover:scale-[1.02] duration-300 w-full sm:w-auto"
              >
                UNLOCK YOUR SYSTEM <ArrowRight size={16} />
              </a>
              <a 
                href="/products/t-core" 
                className="border border-white/20 text-white px-10 py-5 rounded-full font-black hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-md flex items-center justify-center text-sm hover:scale-[1.02] duration-300 w-full sm:w-auto"
              >
                Explore T-CORE Science
              </a>
            </div>
 
            {/* Risk-Free Micro-trust Line */}
            <div className="flex items-center gap-2 text-[10px] text-[#A8B3AA] font-black uppercase tracking-wider pt-2">
              <Shield size={13} className="text-[#16C784] shrink-0" />
              <span>TRY IT FOR 90 DAYS. HIGHER VITALITY OR YOUR MONEY BACK.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

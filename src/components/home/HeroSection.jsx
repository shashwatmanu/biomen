import React, { useRef } from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const bgRef = useRef(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="hero-section relative h-screen min-h-[700px] flex items-center px-6 md:px-20 overflow-hidden bg-black pt-32">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/hero_bg_final.png" 
          alt="Biomen Labs T-CORE" 
          className="absolute top-[5%] left-0 w-full h-[110%] object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
      </div>
      
      <div className="relative z-30 max-w-2xl">
        {/* Review Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-gray-300">3,794 Verified Reviews</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-6 leading-[0.9] text-white uppercase">
          Daily Biological <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Support for Men.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-lg font-medium leading-relaxed">
          The most potent & natural testosterone stack on Earth. 8 powerful ingredients in one daily formula.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href="/products/t-core" className="bg-orange-600 text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3">
            Start Daily Support <ArrowRight size={24} />
          </a>
          <a href="#formula" className="border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center text-lg">
            See the Formula
          </a>
        </div>

        {/* Hero Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Full transparency</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> No steroids</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> No proprietary blends</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> 90-Day Guarantee</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Made in India</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Lab-tested batch</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

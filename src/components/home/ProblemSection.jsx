import React, { useRef } from 'react';
import { ShieldAlert, TrendingDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProblemSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".infographic-fade-up", {
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

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-24 px-4 sm:px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col justify-between" 
      id="depletion"
    >
      {/* Editorial seamless background image with high physical contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/declineport.svg" 
          alt="Decline of Vitality Silhouette Mobile" 
          className="block lg:hidden w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02] scale-100"
        />
        <img 
          src="/declineland.svg" 
          alt="Decline of Vitality Silhouette Desktop" 
          className="hidden lg:block w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02] scale-100"
        />
        {/* Soft, professional gradient overlays that keep text readable while letting the SVG art shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Centered Section Header for both mobile & desktop */}
        <div className="text-center max-w-3xl mx-auto mb-12 infographic-fade-up">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-biomen-copper bg-biomen-copper/10 px-4 py-2 rounded-full border border-biomen-copper/20 mb-4">
            <ShieldAlert size={14} /> The Modern Male Epidemic
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-biomen-white uppercase">
            The Decline of <span className="text-biomen-copper italic font-serif">Vitality</span>: <br className="hidden md:block"/>
            A Modern Epidemic
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: High-Impact Infographic Editorial Copy (lg:col-span-6) - Stacks second on mobile */}
          <div className="lg:col-span-6 space-y-5 text-left infographic-fade-up order-2 lg:order-1">
            <div className="space-y-4 text-sm lg:text-base text-biomen-muted font-medium leading-relaxed max-w-xl">
              <p>
                <strong className="text-biomen-white font-bold">Biological baseline levels</strong> in men have been dropping steadily, declining by over 1% every single year since 1980. Low sleep, daily stress, toxic environments, and digital overload are slowly draining natural hormone output.
              </p>
              <p>
                <strong className="text-biomen-white font-bold">The Impact:</strong> This drop doesn't cause immediate collapse. Instead, it manifests as a gradual drain—manifesting as flatter energy, sluggish gym recovery, persistent brain fog, and a feeling of operating below your true potential.
              </p>
              <p>
                <strong className="text-biomen-accent font-black">The Solution:</strong> T-CORE addresses this drop adaptogenically. By regulating cortisol, encouraging cellular baseline energy, and delivering active clinical extracts daily, T-CORE helps you support natural production and reclaim your edge.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="pt-2">
              <a 
                href="/products/t-core" 
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-12 py-[22px] rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center lg:inline-flex gap-2 hover:scale-[1.03] duration-300 w-full sm:w-auto"
              >
                UNLOCK YOUR SYSTEM <TrendingDown className="rotate-[270deg]" size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Custom SVG-based Infographic Chart (lg:col-span-6) - Stacks first on mobile */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center items-center bg-black/40 border border-white/5 rounded-3xl p-4 sm:p-6 lg:p-5 shadow-2xl backdrop-blur-md infographic-fade-up relative overflow-hidden group max-w-[480px] lg:max-w-full mx-auto order-1 lg:order-2">
            
            {/* Soft inner physical glow */}
            <div className="absolute -top-1/4 -right-1/4 w-40 h-40 bg-[#D85A1F]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="w-full flex justify-between items-center mb-4">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A8B3AA] mb-0.5">BIOMEN ANALYTICS</h3>
                <h4 className="text-base font-black uppercase tracking-wider text-biomen-white">VITALITY PROFILE BY AGE</h4>
              </div>
              <span className="text-[9px] font-black text-biomen-copper bg-[#D85A1F]/10 border border-biomen-copper/20 px-3 py-1 rounded-full uppercase tracking-wider">
                1980 vs Present
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative w-full aspect-[4/3] bg-black/75 border border-white/5 rounded-2xl p-4 shadow-inner flex flex-col justify-between">
              
              <svg className="w-full h-full" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                {/* Bounding box for Shaded Normal Range */}
                <rect x="50" y="120" width="400" height="70" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
                <text x="440" y="180" fill="white" fillOpacity="0.15" fontSize="9" fontWeight="900" textAnchor="end" letterSpacing="0.15em">NORMAL RANGE</text>

                {/* Grid Lines */}
                <line x1="50" y1="50" x2="450" y2="50" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="120" x2="450" y2="120" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="190" x2="450" y2="190" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="260" x2="450" y2="260" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Axes */}
                <line x1="50" y1="40" x2="50" y2="280" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                <line x1="50" y1="280" x2="470" y2="280" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />

                {/* Y-Axis labels */}
                <text x="25" y="54" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">800</text>
                <text x="25" y="124" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">700</text>
                <text x="25" y="194" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">600</text>
                <text x="25" y="264" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">500</text>
                
                {/* Vertical Y-Axis Title */}
                <text x="-160" y="12" fill="#D85A1F" fontSize="9" fontWeight="900" letterSpacing="0.25em" transform="rotate(-90)" textAnchor="middle" className="uppercase font-sans">
                  TOTAL TESTOSTERONE
                </text>

                {/* X-Axis labels */}
                <text x="50" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">10</text>
                <text x="100" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">20</text>
                <text x="150" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">30</text>
                <text x="200" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">40</text>
                <text x="250" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">50</text>
                <text x="300" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">60</text>
                <text x="350" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">70</text>
                <text x="400" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">80</text>
                <text x="450" y="300" fill="#A8B3AA" fontSize="10" fontWeight="900" textAnchor="middle">90</text>
                
                {/* X-Axis Title */}
                <text x="250" y="325" fill="#D85A1F" fontSize="9" fontWeight="900" letterSpacing="0.25em" textAnchor="middle" className="uppercase font-sans">
                  AGE
                </text>

                {/* Normal Decline Line */}
                <path d="M 50 260 L 100 110 Q 200 160 300 190 T 450 206" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" />
                <circle cx="450" cy="206" r="5" fill="white" stroke="#000" strokeWidth="2" />
                
                {/* Labeled Line Callout */}
                <text x="360" y="222" fill="white" fillOpacity="0.5" fontSize="8" fontWeight="900" letterSpacing="0.1em" textAnchor="middle">
                  NORMAL DECLINE
                </text>

                {/* With T-CORE */}
                <path d="M 50 260 L 100 110 C 180 100, 300 95, 450 90" fill="none" stroke="#16C784" strokeWidth="4.5" className="filter drop-shadow-[0_0_10px_rgba(22,199,132,0.6)]" />
                <circle cx="450" cy="90" r="6" fill="#16C784" stroke="#7FE7B3" strokeWidth="2" className="animate-ping" style={{ transformOrigin: '450px 90px' }} />
                <circle cx="450" cy="90" r="4" fill="#030705" stroke="#16C784" strokeWidth="2.5" />
                
                {/* Labeled T-CORE Line Callout */}
                <text x="360" y="76" fill="#16C784" fontSize="9" fontWeight="900" letterSpacing="0.15em" textAnchor="middle" className="font-sans">
                  WITH T-CORE
                </text>
              </svg>

              {/* Glowing canister badge inside the chart */}
              <div className="absolute right-8 top-16 bg-[#052E22] border border-[#16C784]/30 rounded-xl p-2 flex items-center gap-2 shadow-2xl backdrop-blur-md max-w-[130px] animate-bounce-slow">
                <img src="/logo/logo_white_symbol.png" alt="T-CORE badge" className="w-4 h-4 object-contain" />
                <div>
                  <div className="text-[7.5px] font-black text-[#16C784] uppercase tracking-wider">T-CORE ACTIVE</div>
                  <div className="text-[6.5px] text-[#A8B3AA] font-black uppercase tracking-widest">Sustained Baseline</div>
                </div>
              </div>

            </div>

            {/* Micro Explainer below chart */}
            <div className="w-full mt-4 bg-[#052E22]/30 border border-[#16C784]/20 p-3 rounded-xl text-center">
              <p className="text-[11px] text-[#7FE7B3] font-black uppercase tracking-wider leading-relaxed">
                🎯 Over 90 Days, T-CORE helps support steady natural output rather than a steep drop.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

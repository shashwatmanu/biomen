import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ComparisonTable = () => {
  const containerRef = React.useRef(null);

  const rows = [
    { feature: "APPROACH", us: "Biological Optimization", trt: "Hormone Replacement", generic: "Instant 'Boost' Claims", isUsCheck: true, isTrtCheck: false, isGenericCheck: false },
    { feature: "CONVENIENCE", us: "Daily Capsules", trt: "Injections / Creams", generic: "Daily Capsules", isUsCheck: true, isTrtCheck: false, isGenericCheck: true },
    { feature: "NATURAL PRODUCTION", us: "Supports Body's Synthesis", trt: "Shuts Down Production", generic: "Often Ineffective", isUsCheck: true, isTrtCheck: false, isGenericCheck: false },
    { feature: "SIDE EFFECTS", us: "No Severe Side Effects", trt: "High Risk (Injections)", generic: "Variable / Unknown", isUsCheck: true, isTrtCheck: false, isGenericCheck: false },
    { feature: "MONITORING", us: "None Required", trt: "Frequent Bloodwork", generic: "None Required", isUsCheck: true, isTrtCheck: false, isGenericCheck: true },
    { feature: "CLINICAL DOSES", us: "Fully Transparent Yes", trt: "Prescription Based", generic: "Proprietary Blends", isUsCheck: true, isTrtCheck: true, isGenericCheck: false },
    { feature: "REVERSIBILITY", us: "100% Reversible", trt: "Lifelong Commitment", generic: "100% Reversible", isUsCheck: true, isTrtCheck: false, isGenericCheck: true },
    { feature: "THIRD-PARTY TESTED", us: "Yes, Every Batch", trt: "Regulated Pharma", generic: "Rarely Tested", isUsCheck: true, isTrtCheck: true, isGenericCheck: false }
  ];

  useGSAP(() => {
    // Delay initialization to wait for route transition scroll-reset (window.scrollTo(0,0))
    const timer = setTimeout(() => {
      gsap.fromTo(".compare-cell",
        {
          opacity: 0,
          y: 12
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: (index) => {
            const rowIndex = Math.floor(index / 3);
            const colIndex = index % 3;
            // Reveal T-CORE (colIndex 0) first, then TRT, then Generic, then pause before next row
            return rowIndex * 0.9 + colIndex * 0.22;
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".compare-cell",
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative pt-14 lg:pt-[120px] pb-12 lg:pb-16 px-3 xs:px-4 md:px-20 overflow-hidden bg-biomen-bg-primary border-t border-biomen-text-primary/5" 
      id="comparison"
    >
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-biomen-green/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-biomen-accent mb-1.5 block">
            THE BIOMEN DIFFERENCE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-biomen-text-primary">
            T-CORE VS. <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">OTHERS</span>
          </h2>
        </div>

        {/* Highlighted D2C Comparison Table */}
        <div className="bg-biomen-bg-primary/40 rounded-2xl md:rounded-3xl overflow-hidden border border-biomen-text-primary/10 overflow-x-auto md:overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse min-w-0">
            <thead>
              <tr className="bg-biomen-bg-primary/90 border-b border-biomen-text-primary/10 uppercase tracking-widest text-biomen-text-secondary">
                <th className="p-3 py-4 md:p-5 font-black w-[22%] md:w-[28%] text-left text-[10px] md:text-[11px] text-biomen-text-secondary tracking-widest">PARAMETER</th>
                {/* Highlighted T-CORE Column Header with Gradient Title */}
                <th className="p-3 py-4 md:p-5 text-center w-[28%] md:w-[26%] bg-biomen-surface/60 border-x border-biomen-accent/20 relative">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative w-6 h-6 md:w-8 md:h-8 overflow-hidden bg-biomen-text-primary/5 border border-biomen-text-primary/10 rounded-full flex items-center justify-center p-0.5 shadow-md shrink-0">
                      <img 
                        src="/logo/logo_white_symbol.webp" 
                        alt="BIOMEN Symbol" 
                        className="w-full h-full object-contain animate-[spin_12s_linear_infinite]"
                      />
                    </div>
                    <span className="inline-block text-[11px] md:text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] drop-shadow-[0_0_12px_rgba(22,199,132,0.2)] whitespace-nowrap">T-CORE</span>
                  </div>
                </th>
                <th className="p-3 py-4 md:p-5 font-black text-center w-[25%] md:w-[23%] text-[10px] md:text-[11px] text-biomen-text-primary/50 tracking-widest">TRT</th>
                <th className="p-3 py-4 md:p-5 font-black text-center w-[25%] md:w-[23%] text-wrap text-[10px] md:text-[11px] text-biomen-text-primary/50 tracking-widest">GENERIC BOOSTERS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-biomen-text-primary/5 hover:bg-biomen-text-primary/[0.02] transition-colors">
                  {/* Parameter column */}
                  <td className="p-2 py-3.5 xs:p-3 md:p-5 font-bold md:font-black text-biomen-text-secondary text-[8px] xs:text-[9px] md:text-xs tracking-wide uppercase leading-tight">{row.feature}</td>
                  
                  {/* Highlighted T-CORE Column Cells */}
                  <td className="compare-cell p-2 py-3.5 xs:p-3 md:p-5 text-center bg-biomen-surface/30 border-x border-biomen-accent/20 text-biomen-text-primary font-bold md:font-black text-[9px] xs:text-xs md:text-sm">
                    <div className="flex flex-col items-center justify-center gap-0.5 md:gap-1">
                      <span className="text-biomen-accent"><Check className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} /></span>
                      <span className="text-[7.5px] xs:text-[9px] md:text-xs font-black tracking-wide text-biomen-text-primary leading-tight">{row.us}</span>
                    </div>
                  </td>
                  
                  {/* TRT cells - Dynamic red/green vibe based on values */}
                  <td className={`compare-cell p-2 py-3.5 xs:p-3 md:p-5 text-center text-[9px] xs:text-xs md:text-sm ${
                    row.isTrtCheck 
                      ? "bg-biomen-surface/15 border-x border-biomen-accent/10" 
                      : "bg-[#2E0B05]/30 border-x border-red-500/10"
                  }`}>
                    <div className="flex flex-col items-center justify-center gap-0.5 md:gap-1">
                      <span className={row.isTrtCheck ? "text-biomen-accent" : "text-red-500"} >
                        {row.isTrtCheck ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} /> : <X className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />}
                      </span>
                      <span className={`text-[7.5px] xs:text-[9px] md:text-[10px] font-black uppercase tracking-wide leading-tight ${
                        row.isTrtCheck ? "text-biomen-text-primary" : "text-biomen-text-primary"
                      }`}>{row.trt}</span>
                    </div>
                  </td>
                  
                  {/* Generic Boosters cells - Dynamic red/green vibe based on values */}
                  <td className={`compare-cell p-2 py-3.5 xs:p-3 md:p-5 text-center text-[9px] xs:text-xs md:text-sm ${
                    row.isGenericCheck 
                      ? "bg-biomen-surface/10 border-x border-biomen-accent/5" 
                      : "bg-[#2E0B05]/20 border-x border-red-500/5"
                  }`}>
                    <div className="flex flex-col items-center justify-center gap-0.5 md:gap-1">
                      <span className={row.isGenericCheck ? "text-biomen-accent/90" : "text-red-500/90"}>
                        {row.isGenericCheck ? <Check className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} /> : <X className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />}
                      </span>
                      <span className={`text-[7.5px] xs:text-[9px] md:text-[10px] font-black uppercase tracking-wide leading-tight ${
                        row.isGenericCheck ? "text-biomen-text-primary" : "text-biomen-text-primary"
                      }`}>{row.generic}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default ComparisonTable;

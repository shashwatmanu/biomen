import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

const ComparisonTable = () => {
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

  return (
    <section className="relative pt-[120px] pb-16 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5" id="comparison">
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-biomen-green/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#16C784] mb-1.5 block">
            THE BIOMEN DIFFERENCE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-normal font-serif tracking-tight leading-[1.05] text-white">
            T-CORE VS. <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">OTHERS</span>
          </h2>
        </div>

        {/* Highlighted D2C Comparison Table */}
        <div className="bg-black/40 rounded-3xl overflow-hidden border border-white/10 overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-black/80 text-[10px] font-black uppercase tracking-widest text-[#A8B3AA]">
                <th className="p-5 font-bold w-[28%] text-left">PARAMETER</th>
                {/* Highlighted T-CORE Column Header */}
                <th className="p-5 font-black text-center w-[26%] bg-[#052E22]/60 border-x border-[#16C784]/20 text-[#16C784] relative">
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} /> T-CORE
                  </div>
                </th>
                <th className="p-5 font-bold text-center w-[23%]">TRT</th>
                <th className="p-5 font-bold text-center w-[23%]">GENERIC BOOSTERS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  {/* Parameter column */}
                  <td className="p-5 font-black text-[#A8B3AA] text-[10px] lg:text-xs tracking-wider uppercase">{row.feature}</td>
                  
                  {/* Highlighted T-CORE Column Cells */}
                  <td className="p-5 text-center bg-[#052E22]/30 border-x border-[#16C784]/20 text-white font-black text-xs lg:text-sm">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-[#16C784]"><Check size={16} strokeWidth={3} /></span>
                      <span className="text-[10px] lg:text-xs font-black tracking-wide text-white">{row.us}</span>
                    </div>
                  </td>
                  
                  {/* TRT cells */}
                  <td className="p-5 text-center text-gray-400 text-xs lg:text-sm">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className={row.isTrtCheck ? "text-emerald-500/70" : "text-[#D85A1F]"} >
                        {row.isTrtCheck ? <Check size={15} /> : <X size={15} />}
                      </span>
                      <span className="text-[9px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{row.trt}</span>
                    </div>
                  </td>
                  
                  {/* Generic Boosters cells */}
                  <td className="p-5 text-center text-gray-500 text-xs lg:text-sm">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className={row.isGenericCheck ? "text-emerald-500/50" : "text-gray-600"}>
                        {row.isGenericCheck ? <Check size={14} /> : <X size={14} />}
                      </span>
                      <span className="text-[9px] lg:text-[10px] text-gray-600 font-bold uppercase tracking-wider">{row.generic}</span>
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

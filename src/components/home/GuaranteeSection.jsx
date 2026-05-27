import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#030705] border-t border-white/5 relative overflow-hidden text-center" id="guarantee">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#052E22]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col items-center">
        <div className="bg-[#052E22] p-4 rounded-full border border-[#0FA36B]/30 text-[#16C784] mb-6 shadow-xl">
          <ShieldCheck size={48} />
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-2">
          BIOMEN LABS GUARANTEE
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-[#F4F6F2] mb-6 tracking-tight leading-none">
          The 90-Day Confidence Promise
        </h2>
        
        <div className="space-y-6 text-[#A8B3AA] font-medium text-base md:text-lg leading-relaxed max-w-2xl">
          <p>
            T-CORE is built for consistent daily use, not short-term stimulation. Complete the 90-day system and give the formula the time it was designed for.
          </p>
          
          <div className="bg-black/30 border border-white/5 p-8 rounded-2xl text-center space-y-4 my-8">
            <p className="text-[#F4F6F2] font-semibold text-base">
              If after completing the 90-day system you do not feel satisfied with your T-CORE routine, contact us. We’ll help make it right.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest text-[#F4F6F2] pt-4">
              <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 py-3.5 px-2 rounded-xl">
                Energy Support
              </div>
              <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 py-3.5 px-2 rounded-xl">
                Recovery Support
              </div>
              <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 py-3.5 px-2 rounded-xl">
                Resilience Support
              </div>
              <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 py-3.5 px-2 rounded-xl">
                Daily Vitality
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#A8B3AA] font-black uppercase tracking-[0.2em] mt-2 mb-8">
          🛡️ Built to reduce purchase risk. Designed to reward consistency.
        </p>

        <div className="mb-8">
          <a 
            href="/products/t-core" 
            onClick={(e) => {
              if (window.location.pathname.includes('/products/t-core')) {
                e.preventDefault();
                document.getElementById('buybox')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-[#D85A1F] hover:bg-[#b94a17] text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] hover:scale-[1.02] duration-300"
          >
            Start Your Risk-Free Trial
          </a>
        </div>

        <a 
          href="#terms" 
          className="text-[10px] font-black uppercase tracking-widest text-[#BFA46A] hover:text-white transition-colors underline underline-offset-4"
        >
          View Guarantee Terms
        </a>
      </div>
    </section>
  );
};

export default GuaranteeSection;

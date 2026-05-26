import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black border-t border-white/5 relative overflow-hidden text-center" id="guarantee">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col items-center">
        <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 text-emerald-400 mb-6 animate-pulse">
          <ShieldCheck size={48} />
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
          BIOMEN Labs Guarantee
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">
          The 90-Day Confidence Promise
        </h2>
        
        <div className="space-y-6 text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-2xl">
          <p>
            We believe wellness products should earn trust through consistency&mdash;not pressure. Use T-Core daily as directed and give the system the time it was designed for.
          </p>
          <div className="border-y border-white/10 py-6 my-6 text-left">
            <p className="text-white font-bold text-center mb-4">
              If after a full 90-day routine you do not feel that T-Core meaningfully supported your:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-black uppercase tracking-widest text-emerald-300 text-center">
              <li className="bg-white/5 border border-white/10 p-3 rounded-xl">⚡ Energy</li>
              <li className="bg-white/5 border border-white/10 p-3 rounded-xl">⚡ Recovery</li>
              <li className="bg-white/5 border border-white/10 p-3 rounded-xl">⚡ Resilience</li>
              <li className="bg-white/5 border border-white/10 p-3 rounded-xl">⚡ Daily Vitality</li>
            </ul>
            <p className="text-white font-bold text-center mt-4">
              we will make it right.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mt-6 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          🛡️ Because trust should feel visible&mdash;not risky.
        </p>
      </div>
    </section>
  );
};

export default GuaranteeSection;

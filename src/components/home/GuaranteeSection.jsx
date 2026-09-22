import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-bg-primary border-t border-biomen-text-primary/5 relative overflow-hidden text-center" id="guarantee">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-biomen-surface/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-b from-white/5 to-transparent border border-biomen-text-primary/10 rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col items-center">
        <div className="bg-biomen-surface p-4 rounded-full border border-[#0FA36B]/30 text-biomen-accent mb-6 shadow-xl">
          <ShieldCheck size={48} />
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent mb-2">
          BIOMEN LABS GUARANTEE
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-biomen-text-primary mb-6 tracking-tight leading-none">
          The 90-Day Confidence Promise
        </h2>
        
        <div className="space-y-6 text-biomen-text-secondary font-medium text-base md:text-lg leading-relaxed max-w-2xl">
          <p>
            T-CORE is built for consistent daily use, not short-term stimulation. Complete the 90-day system and give the formula the time it was designed for.
          </p>
          
          <div className="bg-biomen-bg-primary/30 border border-biomen-text-primary/5 p-8 rounded-2xl text-center space-y-4 my-8">
            <p className="text-biomen-text-primary font-semibold text-base">
              If after completing the 90-day system you do not feel satisfied with your T-CORE routine, contact us. We’ll help make it right.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,199,132,0.3)] aspect-square border border-[#0FA36B]/20 transition-transform duration-300 hover:scale-105">
                <img src="/guarantee/energy_support_icon.jpg" alt="Energy Support" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,199,132,0.3)] aspect-square border border-[#0FA36B]/20 transition-transform duration-300 hover:scale-105">
                <img src="/guarantee/recovery_support_icon.jpg" alt="Recovery Support" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,199,132,0.3)] aspect-square border border-[#0FA36B]/20 transition-transform duration-300 hover:scale-105">
                <img src="/guarantee/resilience_support_icon.jpg" alt="Resilience Support" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,199,132,0.3)] aspect-square border border-[#0FA36B]/20 transition-transform duration-300 hover:scale-105">
                <img src="/guarantee/daily_vitality_icon.jpg" alt="Daily Vitality" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-biomen-text-secondary font-black uppercase tracking-[0.2em] mt-2 mb-8">
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
            className="inline-flex items-center gap-3 bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] hover:scale-[1.02] duration-300"
          >
            Start Your Risk-Free Trial
          </a>
        </div>

        <a 
          href="#terms" 
          className="text-[10px] font-black uppercase tracking-widest text-biomen-gold hover:text-biomen-text-primary transition-colors underline underline-offset-4"
        >
          View Guarantee Terms
        </a>
      </div>
    </section>
  );
};

export default GuaranteeSection;

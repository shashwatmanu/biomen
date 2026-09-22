import React from 'react';
import { ArrowRight, RefreshCcw, TrendingUp, HeartPulse } from 'lucide-react';

const ConsistencySection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-bg-primary relative border-t border-biomen-text-primary/5 overflow-hidden" id="consistency">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-biomen-surface/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side Copy */}
        <div className="w-full md:w-1/2">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block mb-4">
            Daily Discipline
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-biomen-text-primary mb-6 leading-none">Biology Requires Consistency</h2>
          <div className="space-y-6 text-biomen-text-secondary text-base md:text-lg leading-relaxed font-medium mb-8">
            <p>
              Male energy and resilience levels naturally decline by about 1% every year after age 30. Compounded with modern stressors, maintaining vitality requires an ongoing commitment.
            </p>
            <p>
              T-CORE is not a quick fix that you cycle on and off. It is a daily biological support system designed for long-term consistency. Continued daily supplementation yields compounding results over time.
            </p>
            <p className="text-biomen-accent font-bold">
              Protect your baseline. Don't drop off after the first bottle.
            </p>
          </div>
          <a href="#pricing" className="bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(216,90,31,0.2)] flex items-center justify-center gap-2 hover:scale-[1.02] w-fit">
            Start Your Protocol <ArrowRight size={16} />
          </a>
        </div>
        
        {/* Right Side Icons */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-6 rounded-2xl flex items-center gap-4 hover:border-[#0FA36B]/40 transition-all duration-300">
            <div className="bg-biomen-surface p-3 rounded-xl text-biomen-accent border border-[#0FA36B]/20">
              <RefreshCcw size={24} />
            </div>
            <div>
              <div className="font-bold text-biomen-text-primary mb-1">Ongoing Replenishment</div>
              <div className="text-sm text-biomen-text-secondary">Daily stress taxes your masculine drive and recovery baseline.</div>
            </div>
          </div>
          
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-6 rounded-2xl flex items-center gap-4 ml-0 md:ml-8 hover:border-[#0FA36B]/40 transition-all duration-300">
            <div className="bg-biomen-surface p-3 rounded-xl text-biomen-accent border border-[#0FA36B]/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="font-bold text-biomen-text-primary mb-1">Compounding Adaptogens</div>
              <div className="text-sm text-biomen-text-secondary">Ingredients like Shilajit and Ashwagandha build up in the system over weeks.</div>
            </div>
          </div>
          
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-6 rounded-2xl flex items-center gap-4 ml-0 md:ml-16 hover:border-[#0FA36B]/40 transition-all duration-300">
            <div className="bg-biomen-surface p-3 rounded-xl text-biomen-accent border border-[#0FA36B]/20">
              <HeartPulse size={24} />
            </div>
            <div>
              <div className="font-bold text-biomen-text-primary mb-1">Metabolic Baseline</div>
              <div className="text-sm text-biomen-text-secondary">Long-term use stabilizes cortisol and supports consistent performance.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConsistencySection;

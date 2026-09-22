import React from 'react';
import { Leaf, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

const WhyTCore = () => {
  const blocks = [
    {
      icon: <Leaf className="text-[#0FA36B]" size={24} />,
      title: "Premium Herbal Performance Support",
      desc: "Focused herbal extracts selected for male vitality, recovery, and daily resilience."
    },
    {
      icon: <Calendar className="text-[#0FA36B]" size={24} />,
      title: "Built for Daily Routine",
      desc: "Two capsules daily. Simple enough to stay consistent with."
    },
    {
      icon: <ShieldCheck className="text-[#0FA36B]" size={24} />,
      title: "Transparent, Purposeful Formulation",
      desc: "Five active ingredients. Clear dosages. No hidden blends."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-bg-primary border-y border-biomen-text-primary/5 relative overflow-hidden" id="why-tcore">
      {/* Visual background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-biomen-surface/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-biomen-emerald/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: Brand Copy & Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block w-fit">
              OUR FORMULATION PHILOSOPHY
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-biomen-text-primary leading-[1.1]">
              Built to Support <br className="hidden sm:block" /> Your Daily Baseline
            </h2>
            
            <div className="space-y-6 text-biomen-text-secondary text-lg leading-relaxed font-medium">
              <p>
                Most men do not need louder supplements. They need a daily system that supports better recovery, steadier energy, stronger resilience, and more consistent performance.
              </p>
              
              <p>
                T-CORE was built to support that foundation with clear dosages, premium herbal extracts, and disciplined daily use.
              </p>

              <div className="border-l-2 border-[#0FA36B] pl-6 space-y-4 my-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-biomen-text-primary font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-biomen-accent"></span>
                    Better recovery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-biomen-accent"></span>
                    Steadier energy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-biomen-accent"></span>
                    Stronger resilience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-biomen-accent"></span>
                    More consistent performance
                  </li>
                </ul>
              </div>

              <div className="border-t border-biomen-text-primary/5 pt-6 space-y-6">
                <p className="text-biomen-text-primary font-black text-xl tracking-tight">
                  Not extremes. <span className="text-biomen-gold">Just a stronger daily foundation.</span>
                </p>
                
                <a 
                  href="/products/t-core"
                  className="bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(216,90,31,0.2)] flex items-center justify-center gap-2 hover:scale-[1.02] w-fit"
                >
                  Explore T-CORE System <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Sub-blocks Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {blocks.map((block, i) => (
              <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-biomen-text-primary/10 hover:border-[#0FA36B]/50 p-8 rounded-3xl transition-all duration-300 shadow-xl flex items-start gap-6 group">
                <div className="bg-biomen-surface p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#0FA36B]/20 text-biomen-accent">
                  {block.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-black text-biomen-text-primary uppercase tracking-wider group-hover:text-biomen-accent transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-sm text-biomen-text-secondary font-medium leading-relaxed">
                    {block.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyTCore;

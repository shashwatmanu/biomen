import React from 'react';
import { Leaf, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';

const WhyTCore = () => {
  const blocks = [
    {
      icon: <Leaf className="text-emerald-400" size={24} />,
      title: "Premium Herbal Performance Support",
      desc: "Carefully sourced natural botanical extracts, selected for clinical relevance and daily physical resilience."
    },
    {
      icon: <Calendar className="text-emerald-400" size={24} />,
      title: "Built for Daily Routine",
      desc: "Formulated specifically for the modern lifestyle, supporting easy habit formation and consistent daily wellness."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: "Transparent, Purposeful Formulation",
      desc: "Zero hidden proprietary blends. We believe in providing exact amounts so you can trust exactly what you put in your body."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#060c09] border-y border-white/5 relative overflow-hidden" id="why-tcore">
      {/* Visual background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-950/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Brand Copy & Manifesto */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block">
              Our Formulation Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              Why T-Core <br className="hidden sm:block" /> Exists
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-medium">
              <div className="border-l-2 border-emerald-500/50 pl-6 space-y-4">
                <p className="font-bold text-white text-xl">
                  Most men do not need louder supplements.
                </p>
                <p>
                  They need:
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400 font-semibold mb-4">
                  <li className="flex items-center gap-2">✓ Better recovery</li>
                  <li className="flex items-center gap-2">✓ Steadier energy</li>
                  <li className="flex items-center gap-2">✓ Stronger resilience</li>
                  <li className="flex items-center gap-2">✓ More consistent performance</li>
                </ul>
                <p className="text-emerald-300 font-bold">
                  T-Core was built to support that foundation.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500/30 pl-6 space-y-4">
                <p className="font-bold text-white text-xl">
                  This is not about extremes.
                </p>
                <p>
                  It is about:
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400 font-semibold">
                  <li className="flex items-center gap-2">⚡ Operating sharper</li>
                  <li className="flex items-center gap-2">⚡ Recovering better</li>
                  <li className="flex items-center gap-2">⚡ Feeling stronger</li>
                  <li className="flex items-center gap-2">⚡ Building a better baseline</li>
                </ul>
                <p className="text-white text-base">
                  through disciplined consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Sub-blocks Grid */}
          <div className="lg:col-span-6 space-y-6">
            {blocks.map((block, i) => (
              <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-emerald-500/40 p-8 rounded-3xl transition-all duration-300 shadow-xl flex items-start gap-6 group">
                <div className="bg-emerald-500/10 p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20 text-emerald-400">
                  {block.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
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

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

const TrustBadges = () => {
  const pillars = [
    "Transparent Ingredient Dosing",
    "Premium Herbal Extracts",
    "No Proprietary Blends",
    "Vegetarian Capsules",
    "Glass Bottle Packaging",
    "Made in India",
    "Batch-Tested Quality",
    "Designed for Daily Use"
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#060c09] border-y border-white/5" id="trust-architecture">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Body Copy & Emotive Positioning */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight uppercase text-white leading-tight">
              Built for Men Who <br />
              <span className="text-emerald-400">Expect More</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 text-orange-500">
                  <AlertTriangle size={14} /> The Problem with Supplements
                </p>
                <p className="font-semibold text-white mb-2">BIOMEN LABS was built for ambitious men who are tired of:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300 font-medium">
                  <li className="flex items-center gap-2">❌ Underdosed formulas</li>
                  <li className="flex items-center gap-2">❌ Fake hype</li>
                  <li className="flex items-center gap-2">❌ Hidden blends</li>
                  <li className="flex items-center gap-2">❌ Low-trust supplement brands</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-500 pl-6 space-y-4">
                <p className="font-bold text-white text-xl">T-Core is our answer:</p>
                <p className="text-gray-300 font-medium">
                  A premium daily male vitality system built around purposeful ingredients, transparent dosing, and a formulation philosophy designed for long-term consistency.
                </p>
              </div>
            </div>

            {/* Optional Small Note */}
            <div className="mt-10 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl flex items-center gap-3">
              <Sparkles className="text-emerald-400 shrink-0" size={18} />
              <p className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                A premium product should feel: <span className="text-emerald-300">easy to understand, easy to trust, and worth staying consistent with.</span>
              </p>
            </div>
          </div>

          {/* Right Side: 8 Pillars Grid */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 pb-4 border-b border-white/10 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={16} /> BIOMEN Labs Trust Pillars
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-[11px] md:text-xs font-black uppercase tracking-wider text-white leading-tight">{pillar}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

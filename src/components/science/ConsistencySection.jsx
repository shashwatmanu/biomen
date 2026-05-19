import React from 'react';
import { ArrowRight, RefreshCcw, TrendingUp, HeartPulse } from 'lucide-react';

const ConsistencySection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-green">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Biology Requires Consistency</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-8">
            <p>
              Male testosterone levels naturally decline by about 1% every year after age 30. Compounded with modern stressors, maintaining vitality requires an ongoing commitment.
            </p>
            <p>
              T-CORE is not a quick fix that you cycle on and off. It is a daily biological support system designed for long-term use. Continued supplementation, combined with resistance training, quality nutrition, and deep sleep, yields compounding results over time.
            </p>
            <p className="text-white font-bold">
              Protect your baseline. Don't drop off after the first bottle.
            </p>
          </div>
          <a href="/products/t-core" className="bg-biomen-accent text-biomen-green px-8 py-4 rounded-full font-bold hover:brightness-110 transition-colors flex items-center justify-center gap-2 shadow-2xl">
            Start Your Protocol <ArrowRight size={20} />
          </a>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="bg-black/40 p-3 rounded-xl text-biomen-accent">
              <RefreshCcw size={24} />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Ongoing Replenishment</div>
              <div className="text-sm text-gray-400">Daily stress depletes essential minerals like Zinc.</div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 ml-0 md:ml-8">
            <div className="bg-black/40 p-3 rounded-xl text-biomen-accent">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Compounding Adaptogens</div>
              <div className="text-sm text-gray-400">Ingredients like Tongkat Ali build up in the system over weeks.</div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 ml-0 md:ml-16">
            <div className="bg-black/40 p-3 rounded-xl text-biomen-accent">
              <HeartPulse size={24} />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Metabolic Baseline</div>
              <div className="text-sm text-gray-400">Long-term use stabilizes cortisol and supports recovery.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsistencySection;

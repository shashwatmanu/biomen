import React from 'react';
import { Activity } from 'lucide-react';

const MechanismSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black/20" id="mechanism">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-full border-4 border-emerald-500/20 flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse"></div>
            <div className="text-center relative z-10">
              <Activity size={48} className="text-emerald-400 mx-auto mb-4" />
              <div className="font-bold text-xl mb-2 text-white">Biological Synergy</div>
              <div className="text-xs uppercase tracking-widest text-gray-400">Natural Synthesis</div>
            </div>
            
            {/* Abstract orbit dots */}
            <div className="absolute top-0 w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            Natural Optimization
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase text-white">Working With Your Body, Not Against It.</h2>
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-medium">
            <p>
              Many products flood the system with synthetic compounds, causing temporary spikes followed by inevitable crashes. 
            </p>
            <p>
              T-CORE takes a different approach. The formula is designed to support your body’s natural pathways for drive, recovery, and stress resilience. By providing the exact premium herbal extracts and adaptogens your biology requires, T-CORE helps restore your baseline from the inside out.
            </p>
            <p className="text-white font-medium border-l-2 border-emerald-500 pl-4 py-1">
              Users report sustained, clean energy, improved morning drive, and faster recovery times without the jitters or hormone suppression associated with aggressive alternatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MechanismSection;

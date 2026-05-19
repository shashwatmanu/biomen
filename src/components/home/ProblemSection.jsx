import React from 'react';
import { Battery, Zap, ShieldAlert, Activity, RefreshCcw } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    { icon: <Battery size={24} />, title: "Low Energy" },
    { icon: <Zap size={24} />, title: "Low Drive" },
    { icon: <ShieldAlert size={24} />, title: "High Stress" },
    { icon: <Activity size={24} />, title: "Poor Recovery" },
    { icon: <RefreshCcw size={24} />, title: "Inconsistent Routine" }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0a100d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Modern Men Are Running Below Baseline</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Long work hours, stress, poor sleep, alcohol, low sunlight, weak nutrition, and inconsistent routines can affect how men feel every day. T-CORE is built for men who want daily support for energy, drive, recovery, and internal balance.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {problems.map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:bg-white/10 hover:border-biomen-accent/50 transition-all">
              <div className="text-biomen-accent">{item.icon}</div>
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

import React from 'react';
import { Battery, Zap, ShieldAlert, Sparkles, Brain, CloudRain, Flame } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    { icon: <Battery size={24} />, title: "Low Energy" },
    { icon: <Flame size={24} />, title: "Poor Recovery" },
    { icon: <ShieldAlert size={24} />, title: "Elevated Stress" },
    { icon: <Brain size={24} />, title: "Brain Fog" },
    { icon: <CloudRain size={24} />, title: "Burnout Drift" },
    { icon: <Zap size={24} />, title: "Inconsistent Performance" }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black/60 relative overflow-hidden" id="depletion">
      {/* Subtle backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-4 block">
            The Modern Male Depletion Problem
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-white">
            Modern Men Are Running <br className="hidden sm:block"/> Below Baseline
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Left Column: Depletion List */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 rounded-[2rem] relative h-full">
            <div className="space-y-6 text-gray-300 font-medium text-base md:text-lg leading-relaxed">
              <p>
                Long work hours. Poor sleep. Constant stress. Digital overload. Weak recovery. Low sunlight. Endless stimulation.
              </p>
              <p className="text-white font-bold">
                Modern life quietly drains performance from men over time. Not enough to stop them completely—but enough to leave them feeling:
              </p>
              <ul className="space-y-2 border-l-2 border-red-500/50 pl-6 text-sm">
                <li className="flex items-center gap-2">⚡ Flatter</li>
                <li className="flex items-center gap-2">⚡ Slower</li>
                <li className="flex items-center gap-2">⚡ Less focused</li>
                <li className="flex items-center gap-2">⚡ Less driven</li>
                <li className="flex items-center gap-2">⚡ And less consistent than they should be.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Gradual Decline List */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 rounded-[2rem] relative h-full">
            <div className="space-y-6 text-gray-300 font-medium text-base md:text-lg leading-relaxed">
              <p className="text-white font-bold text-xl">
                For many men, the problem is not collapse.
              </p>
              <p>
                It is gradual decline:
              </p>
              <ul className="space-y-2 border-l-2 border-emerald-500/50 pl-6 text-sm">
                <li className="flex items-center gap-2">🌱 Weaker recovery</li>
                <li className="flex items-center gap-2">🌱 Lower morning energy</li>
                <li className="flex items-center gap-2">🌱 Inconsistent workouts</li>
                <li className="flex items-center gap-2">🌱 Reduced resilience</li>
                <li className="flex items-center gap-2">🌱 Mental fatigue</li>
                <li className="flex items-center gap-2">🌱 And the feeling of operating below their true baseline.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {problems.map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-red-500/40 hover:from-white/10 transition-all duration-300 group">
              <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300 bg-red-500/10 p-3 rounded-full border border-red-500/20">{item.icon}</div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">{item.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;

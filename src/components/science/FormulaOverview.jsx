import React from 'react';
import { Flame, Compass, HelpCircle, Network, FlaskConical, Target, ShieldCheck, Zap, Activity } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "IGNITE",
    icon: <Zap size={24} />,
    desc: "Supports masculine drive, vitality, performance rhythm, and physical momentum. Encourages foundational cellular output.",
    poweredBy: "Tongkat Ali + Fenugreek",
    image: "/ingredients/tongkat_ali.png"
  },
  {
    id: 2,
    title: "RESTORE",
    icon: <Activity size={24} />,
    desc: "Supports energy, recovery, stress resilience, and a steadier daily baseline. Keeps adaptogenic levels active and balanced.",
    poweredBy: "Shilajit + Ashwagandha",
    image: "/ingredients/shilajit.png"
  },
  {
    id: 3,
    title: "AMPLIFY",
    icon: <Compass size={24} />,
    desc: "Supports nutrient absorption and overall formula efficiency. Bioavailability booster designed for direct compound uptake.",
    poweredBy: "Black Pepper Extract",
    image: "/ingredients/black_pepper.png"
  }
];

const FormulaOverview = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-black relative border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block mb-4">
            Mechanisms
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-white">
            The 3-Step <br/> <span className="text-emerald-500">Mechanism</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
            T-Core addresses hormonal health through a precise biological system designed to support natural production, regulate stress, and optimize delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="group relative bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden min-h-[480px] flex flex-col justify-end p-10 hover:border-emerald-500/50 transition-all shadow-2xl">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 bg-black/40 flex items-center justify-center p-8">
                <img src={step.image} alt={step.title} className="w-1/2 h-1/2 object-contain opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
              </div>

              {/* Huge Number - Fixed Position */}
              <div className="absolute top-8 left-10 text-[10rem] font-black text-white/5 leading-none select-none pointer-events-none group-hover:text-emerald-500/10 transition-colors">
                {step.id}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-[1.5rem] flex items-center justify-center text-emerald-400 mb-8 shadow-xl">
                  {step.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 block">
                  Powered by {step.poweredBy}
                </span>
                <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormulaOverview;

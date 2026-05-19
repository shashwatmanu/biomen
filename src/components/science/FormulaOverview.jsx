import React from 'react';
import { Network, FlaskConical, Target } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Produce",
    icon: <Network size={24} />,
    desc: "Foundational minerals like Zinc and Boron provide the raw materials necessary for the body's natural synthesis of testosterone and other key androgens.",
    image: "/ingredients/zinc.png"
  },
  {
    id: 2,
    title: "Protect",
    icon: <FlaskConical size={24} />,
    desc: "Adaptogens like Tongkat Ali and Shilajit help modulate cortisol (the stress hormone), protecting your free testosterone from being bound or destroyed.",
    image: "/ingredients/shilajit.png"
  },
  {
    id: 3,
    title: "Optimize",
    icon: <Target size={24} />,
    desc: "Compounds like Taurine and Vitamin K2 ensure that cellular hydration and cardiovascular health are optimized, allowing the hormones to be delivered efficiently.",
    image: "/ingredients/taurine.png"
  }
];

const FormulaOverview = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-black relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-white">
            The 3-Step <br/> <span className="text-emerald-500">Mechanism</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            T-CORE addresses hormonal health through a precise biological system designed to support natural production, regulate stress, and optimize delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="group relative bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden min-h-[450px] flex flex-col justify-end p-10 hover:border-emerald-500/50 transition-all shadow-2xl">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
              </div>

              {/* Huge Number - Fixed Position */}
              <div className="absolute top-8 left-10 text-[10rem] font-black text-white/5 leading-none select-none pointer-events-none group-hover:text-emerald-500/10 transition-colors">
                {step.id}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-[1.5rem] flex items-center justify-center text-emerald-500 mb-8 shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">
                  {step.id}. {step.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-medium">
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

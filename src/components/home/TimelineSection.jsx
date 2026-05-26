import React from 'react';
import { CalendarRange, ShieldAlert, Sparkles, Anchor, Compass, Award } from 'lucide-react';

const TimelineSection = () => {
  const milestones = [
    { 
      stage: "Stage 1",
      day: "Days 1–30", 
      title: "ROOT", 
      icon: <Anchor size={24} />,
      desc: "Supports foundational rhythm, reduced crashes, improved routine consistency, and a steadier baseline." 
    },
    { 
      stage: "Stage 2",
      day: "Days 31–60", 
      title: "RISE", 
      icon: <Compass size={24} />,
      desc: "Supports improved recovery, stronger momentum, steadier energy, and better daily performance rhythm." 
    },
    { 
      stage: "Stage 3",
      day: "Days 61–90", 
      title: "REIGN", 
      icon: <Award size={24} />,
      desc: "Supports sustained vitality, stronger resilience, sharper consistency, and long-term performance support." 
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black" id="timeline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            The Transformation System
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase text-white">
            The 90-Day Shift
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
            T-Core is designed as a long-term system&mdash;not a short-term stimulant. The real transformation happens when consistency compounds.
          </p>
        </div>
        
        <div className="relative mb-16">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[2px] bg-emerald-500/20 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {milestones.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative group hover:border-emerald-500/40 transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
                  {item.stage}
                </span>
                
                <div className="w-20 h-20 rounded-full bg-[#060c09] border-4 border-emerald-500 flex flex-col items-center justify-center text-emerald-400 font-black text-xs mb-6 shadow-2xl relative transition-transform duration-300 group-hover:scale-110">
                  <div className="mb-0.5 text-emerald-500/80">{item.icon}</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono">{item.day}</div>
                </div>
                
                <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed font-medium text-sm max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Support Line */}
        <div className="text-center max-w-xl mx-auto bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
          <p className="text-xs md:text-sm text-emerald-300 font-bold uppercase tracking-wider leading-relaxed">
            📢 The men who get the most from T-Core treat it like a discipline&mdash;<span className="text-white font-black underline decoration-emerald-500">not a one-bottle experiment.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

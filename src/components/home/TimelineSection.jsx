import React from 'react';
import { CalendarRange, ShieldAlert, Sparkles, Anchor, Compass, Award } from 'lucide-react';

const TimelineSection = () => {
  const milestones = [
    { 
      stage: "Stage 1",
      day: "Days 1–30", 
      title: "Build the Base", 
      icon: <Anchor size={24} />,
      desc: "Supports routine consistency, foundational energy, and a steadier daily rhythm." 
    },
    { 
      stage: "Stage 2",
      day: "Days 31–60", 
      title: "Find Rhythm", 
      icon: <Compass size={24} />,
      desc: "Supports recovery, resilience, and more consistent daily performance." 
    },
    { 
      stage: "Stage 3",
      day: "Days 61–90", 
      title: "Lock It In", 
      icon: <Award size={24} />,
      desc: "Supports long-term vitality, discipline, and a stronger daily baseline." 
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#030705]" id="timeline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#16C784] mb-4 block">
            THE DAILY CONSISTENCY SYSTEM
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase text-[#F4F6F2]">
            The 90-Day System
          </h2>
          <p className="text-[#A8B3AA] text-base md:text-lg leading-relaxed font-medium">
            T-CORE is built for consistent daily use, not short-term stimulation. The real benefit comes from disciplined use over time.
          </p>
        </div>
        
        <div className="relative mb-16">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[2px] bg-[#0FA36B]/20 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {milestones.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative group hover:border-[#0FA36B]/50 transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] bg-[#052E22] px-3 py-1 rounded-full border border-[#0FA36B]/20 mb-4">
                  {item.stage}
                </span>
                
                <div className="w-20 h-20 rounded-full bg-[#030705] border-4 border-[#0FA36B] flex flex-col items-center justify-center text-[#16C784] font-black text-xs mb-6 shadow-2xl relative transition-transform duration-300 group-hover:scale-110">
                  <div className="mb-0.5 text-[#16C784]">{item.icon}</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono">{item.day}</div>
                </div>
                
                <h3 className="text-2xl font-black mb-3 text-[#F4F6F2] uppercase tracking-wider">{item.title}</h3>
                <p className="text-[#A8B3AA] leading-relaxed font-medium text-sm max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Support Lines */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto items-stretch justify-center">
          <div className="flex-1 bg-[#052E22]/30 border border-[#0FA36B]/20 p-6 rounded-3xl flex items-center justify-center text-center">
            <p className="text-sm text-[#F4F6F2] font-semibold leading-relaxed">
              Men who get the most from T-CORE treat it like a daily discipline, <span className="text-[#16C784] font-black">not a one-bottle experiment.</span>
            </p>
          </div>
          
          <div className="flex-1 bg-[#D85A1F]/10 border border-[#D85A1F]/30 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#D85A1F] bg-[#D85A1F]/10 px-3 py-0.5 rounded-full border border-[#D85A1F]/20 mb-1">
              RECOMENDED PROTOCOL
            </span>
            <p className="text-base text-[#F4F6F2] font-black tracking-tight">
              Best used for 90 days. 3 bottles recommended.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

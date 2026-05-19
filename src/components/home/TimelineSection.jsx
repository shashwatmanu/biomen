import React from 'react';

const TimelineSection = () => {
  const milestones = [
    { day: "Day 7", title: "Foundation", desc: "Initial cellular hydration and foundational mineral replenishment begins. Users often report a subtle shift in morning energy." },
    { day: "Day 30", title: "Momentum", desc: "Adaptogens and herbal extracts reach active levels. Improvements in sustained energy, drive, and stress resilience become noticeable." },
    { day: "Day 90+", title: "Optimization", desc: "Full systemic support. Consistent hormonal balance, peak recovery, and optimal daily vitality are established." }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-green">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Biological Optimization is a Process</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            T-CORE is not instant-magic. It is a systematic daily habit designed to rebuild your baseline over time.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {milestones.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#0a100d] border-4 border-biomen-accent flex items-center justify-center text-biomen-accent font-black text-xl mb-6 shadow-2xl">
                  {item.day}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

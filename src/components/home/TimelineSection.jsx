import React, { useState, useEffect, useRef } from 'react';
import { Award, ArrowRight, Zap, Flame, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TimelineSection = ({ title }) => {
  const containerRef = useRef(null);
  const [activeDay, setActiveDay] = useState(7);

  const timelineData = {
    7: {
      label: "IGNITION",
      icon: <Flame className="text-[#EF4444]" size={28} />,
      color: "#EF4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.3)",
      bullets: [
        "Shilajit feeds active biological output baseline",
        "Tongkat Ali supports masculine performance rhythm",
        "Daily energy feels steadier, robust, and highly persistent",
        "Workouts feel intense, focused, and powerful again"
      ]
    },
    30: {
      label: "SPARK",
      icon: <Zap className="text-[#FFC01E]" size={28} />,
      color: "#FFC01E",
      bgColor: "rgba(255, 192, 30, 0.1)",
      borderColor: "rgba(255, 192, 30, 0.3)",
      bullets: [
        "Ashwagandha actively modulates daily cortisol & stress levels",
        "Bioavailability booster enhances total nutrient absorption",
        "Body feels lighter, highly recovered, and naturally energized",
        "Post-workout recovery and muscle repair speed up significantly"
      ]
    },
    90: {
      label: "LIFTOFF",
      icon: <Rocket className="text-[#16C784]" size={28} />,
      color: "#16C784",
      bgColor: "rgba(22, 199, 132, 0.1)",
      borderColor: "rgba(22, 199, 132, 0.3)",
      bullets: [
        "All 8 premium extracts work in complete synergy like a tuned engine",
        "Masculine biological baseline is optimized completely",
        "Consistent rapid recovery is now your natural default standard",
        "Operating daily at your absolute peak vitality index"
      ]
    }
  };

  const days = [7, 30, 90];
  const activeIndex = days.indexOf(activeDay);
  const current = timelineData[activeDay];

  // Automated Carousel Cycling logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay((prev) => {
        const nextIndex = (days.indexOf(prev) + 1) % days.length;
        return days[nextIndex];
      });
    }, 4500); // Cycles stages every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Smooth transition for active elements
    gsap.fromTo(".active-timeline-indicator", 
      { scale: 0.95, opacity: 0.85 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeDay]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-28 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col gap-12 lg:gap-16" 
      id="timeline"
    >
      {/* Seamless tactical background image with deep sunset warmth overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/workout_guarantee_bg.png" 
          alt="BIOMEN Discipline" 
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:from-black/90 lg:via-black/70 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Interactive Progress Node Tracker */}
        <div className="w-full max-w-2xl mx-auto mb-3 lg:mb-1">
          <div className="relative flex justify-between items-center w-full">
            {/* Symmetrical timeline connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
            <div 
              className={`absolute top-1/2 left-0 h-[2px] -translate-y-1/2 z-0 transition-all duration-500 ${
                activeDay === 7 
                  ? "bg-[#EF4444]" 
                  : activeDay === 30 
                    ? "bg-gradient-to-r from-[#EF4444] to-[#FFC01E]" 
                    : "bg-gradient-to-r from-[#EF4444] via-[#FFC01E] to-[#16C784]"
              }`} 
              style={{ width: activeDay === 7 ? "0%" : activeDay === 30 ? "50%" : "100%" }}
            />

            {days.map((day) => {
              const isActive = activeDay === day;
              const dayData = timelineData[day];
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className="relative z-10 flex flex-col items-center group outline-none"
                >
                  {/* Glowing Node Button */}
                  <div 
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black transition-all duration-300 shadow-xl ${
                      isActive 
                        ? "bg-black border-white scale-110 text-white shadow-black/80" 
                        : "bg-black/85 border-white/20 text-[#A8B3AA] hover:border-white/50 group-hover:scale-105"
                    }`}
                    style={{ 
                      borderColor: isActive ? dayData.color : "",
                      boxShadow: isActive ? `0 0 15px ${dayData.color}80` : ""
                    }}
                  >
                    {day}
                  </div>
                  <span 
                    className={`text-[9px] font-black uppercase tracking-widest mt-2 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-[#A8B3AA]"
                    }`}
                    style={{ color: isActive ? dayData.color : "" }}
                  >
                    {dayData.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliding Cards Track Wrapper */}
        <div className="w-full overflow-hidden py-3 lg:py-5 relative z-10 my-auto">
          <div 
            className="timeline-track" 
            style={{ '--active-index': activeIndex }}
          >
            {days.map((day, idx) => {
              const isActive = activeDay === day;
              const card = timelineData[day];
              return (
                <div
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`w-[290px] xs:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 bg-black/80 border p-6 lg:p-7 rounded-[2rem] relative flex flex-col justify-between backdrop-blur-md transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'opacity-100 scale-100 shadow-2xl z-20 active-timeline-indicator' 
                      : 'opacity-45 scale-90 z-10 hover:opacity-65 border-white/5'
                  }`}
                  style={{ 
                    borderColor: isActive ? card.color : 'rgba(255,255,255,0.05)',
                    boxShadow: isActive ? `0 0 40px ${card.bgColor}` : 'none',
                    marginRight: idx < 2 ? 'var(--card-gap)' : '0px'
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span 
                        className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{ backgroundColor: card.bgColor, color: card.color }}
                      >
                        STAGE 0{idx + 1} &bull; DAY {day}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.15em] text-white">
                        {card.icon} {card.label}
                      </span>
                    </div>
                    
                    <ul className="space-y-3 text-left pl-1">
                      {card.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs lg:text-[13px] text-[#A8B3AA] font-semibold leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: card.color }} />
                          <span className="text-gray-300">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Optimized Guarantee Showcase with safe layout constraints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#052E22]/10 border border-white/10 rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 relative overflow-hidden backdrop-blur-md max-w-5xl mx-auto shadow-2xl w-full mb-3">
          
          {/* Left: Headline & Description */}
          <div className="lg:col-span-8 space-y-3.5 text-left relative z-20">
            <h2 className="text-2xl lg:text-[2.2rem] font-normal font-serif tracking-tight leading-none text-white uppercase">
              Optimize Masculine <br/> Baseline in 90 Days
            </h2>
            <p className="text-xs md:text-sm lg:text-[14px] text-[#A8B3AA] leading-relaxed font-semibold max-w-2xl">
              Try T-CORE completely risk-free for 90 days. If you do not experience a substantial upgrade in energy, daily baseline focus, and post-workout recovery, we will refund you in full. No questions asked.
            </p>
            
            {/* Thicker and more prominent CTA Button */}
            <div className="pt-1.5">
              <a 
                href="/products/t-core" 
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-11 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center lg:inline-flex gap-2 hover:scale-[1.03] duration-300 w-full sm:w-auto"
              >
                UNLOCK YOUR SYSTEM TODAY <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: Guarantee Circular Badge */}
          <div className="lg:col-span-4 flex items-center justify-center relative z-20">
            <div className="relative w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-full bg-black/60 border-4 border-biomen-copper shadow-[0_0_40px_rgba(216,90,31,0.2)] p-2">
              <div className="text-center flex flex-col items-center justify-center space-y-0.5">
                <Award size={20} className="text-[#D85A1F] animate-pulse mb-0.5" />
                <span className="text-[9px] font-black text-white uppercase tracking-wider block">100% VITALITY</span>
                <span className="text-[7.5px] font-black text-[#16C784] uppercase tracking-widest block">GUARANTEE</span>
                <span className="text-[6px] text-[#A8B3AA] font-black uppercase tracking-wider block">90 Days Support</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TimelineSection;

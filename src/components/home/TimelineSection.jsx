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

  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automated Carousel Cycling logic (Increased to 8s, stops at Day 90)
  useEffect(() => {
    if (!hasIntersected) return;

    const interval = setInterval(() => {
      setActiveDay((prev) => {
        const nextIndex = days.indexOf(prev) + 1;
        if (nextIndex < days.length) {
          return days[nextIndex];
        } else {
          clearInterval(interval);
          return prev; // Stops at Day 90 without wrapping back to Day 7
        }
      });
    }, 8000); // Cycles stages every 8.0 seconds for optimal readability
    return () => clearInterval(interval);
  }, [hasIntersected]);

  useGSAP(() => {
    // Smooth transition for active elements
    gsap.fromTo(".active-timeline-indicator", 
      { scale: 0.95, opacity: 0.85 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [activeDay] });

  useGSAP(() => {
    if (!hasIntersected) return;
    if (containerRef.current) {
      gsap.fromTo(".timeline-parallax-bg",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [hasIntersected] });

  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((centerY - y) / centerY) * 4;
    const rotateYVal = ((x - centerX) / centerX) * 4;
    e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
    e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };



  return (
    <section 
      ref={containerRef}
      className="relative pt-12 pb-0 lg:pt-16 lg:pb-0 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col gap-6 lg:gap-8" 
      id="timeline"
    >
      <style>{`
        @keyframes fire-flicker {
          0%, 100% { opacity: 0.5; filter: blur(15px); }
          50% { opacity: 0.8; filter: blur(10px); }
        }
        @keyframes float-up {
          0% { transform: translateY(20px) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
        }
        @keyframes electric-arc {
          0%, 100% { opacity: 0; }
          1%, 3%, 5% { opacity: 0.6; filter: drop-shadow(0 0 4px #FFC01E); }
          2%, 4% { opacity: 0.2; }
          6% { opacity: 0; }
        }
        @keyframes thruster-flame {
          0%, 100% { opacity: 0.7; transform: translateY(0) scaleY(1); }
          50% { opacity: 1; transform: translateY(5px) scaleY(1.3); filter: brightness(1.2); }
        }
        @keyframes thrust-trail {
          0% { transform: translateY(-10px) scaleY(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(40px) scaleY(1.5); opacity: 0; }
        }
      `}</style>

      {/* Seamless tactical background image with deep sunset warmth overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/workout_guarantee_bg.webp" 
          alt="BIOMEN Discipline" 
          className="timeline-parallax-bg absolute inset-0 w-full h-[130%] object-cover object-center filter brightness-[0.35] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:from-black/90 lg:via-black/70 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Top Block: Padded and Centered Node Tracker */}
      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 md:px-20">
        {/* Interactive Progress Node Tracker */}
        <div className="w-full max-w-2xl mx-auto mb-3 lg:mb-1">
          <div className="relative flex justify-between items-center w-full">
            {/* Symmetrical timeline connecting line: Nested precisely inside absolute wrapper offset by 24px (node radius) to prevent bleeding outside the nodes */}
            <div className="absolute top-1/2 left-[24px] right-[24px] h-[2px] bg-white/10 -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-[24px] right-[24px] h-[2px] -translate-y-1/2 z-0">
              <div 
                className={`h-full transition-all duration-500 ${
                  activeDay === 7 
                    ? "bg-[#EF4444]" 
                    : activeDay === 30 
                      ? "bg-gradient-to-r from-[#EF4444] to-[#FFC01E]" 
                      : "bg-gradient-to-r from-[#EF4444] via-[#FFC01E] to-[#16C784]"
                }`} 
                style={{ width: activeDay === 7 ? "0%" : activeDay === 30 ? "50%" : "100%" }}
              />
            </div>

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
      </div>

      {/* Middle Block: Full-Bleed Slider Track (100% Viewport width for mathematically perfect centering) */}
      <div className="w-full overflow-hidden py-3 lg:py-5 relative z-10 my-auto">
        <div 
          className="timeline-track" 
          style={{ 
            transform: `translateX(calc(50vw - (var(--card-width) / 2) - (${activeIndex} * (var(--card-width) + var(--card-gap)))))`
          }}
        >
          {days.map((day, idx) => {
            const isActive = activeDay === day;
            const card = timelineData[day];
            return (
              <div
                key={day}
                onClick={() => setActiveDay(day)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`w-[82vw] sm:w-[330px] md:w-[360px] lg:w-[380px] shrink-0 p-[1.5px] rounded-[2rem] relative flex flex-col backdrop-blur-md transition-all duration-500 cursor-pointer group/timeline-spotlight ${
                  isActive 
                    ? 'opacity-100 scale-100 shadow-2xl z-20 active-timeline-indicator' 
                    : 'opacity-45 scale-90 z-10 hover:opacity-65'
                }`}
                style={{ 
                  transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
                  transition: 'transform 0.2s ease-out, opacity 0.5s ease, scale 0.5s ease',
                  background: isActive ? card.color : 'rgba(255,255,255,0.05)',
                  boxShadow: isActive ? `0 0 40px ${card.bgColor}` : 'none',
                  marginRight: idx < 2 ? 'var(--card-gap)' : '0px'
                }}
              >
                {/* Spotlight border glow layer */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/timeline-spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0 rounded-[2rem]"
                  style={{
                    background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${card.color}, transparent 85%)`
                  }}
                />

                <div className="relative w-full h-full rounded-[1.9rem] bg-black/90 py-5 px-6 flex flex-col justify-between z-10 overflow-hidden">
                  
                  {/* --- CUSTOM CARD ANIMATIONS (INSIDE CARD) --- */}
                  {isActive && day === 7 && (
                    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
                      {/* Whole card subtle fire glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 via-orange-500/10 to-transparent" style={{ animation: 'fire-flicker 2.5s ease-in-out infinite' }} />
                      {/* Floating fire embers */}
                      <div className="absolute left-[20%] bottom-[-10px] w-1 h-1 bg-orange-400 rounded-full blur-[1px]" style={{ animation: 'float-up 3s linear infinite' }} />
                      <div className="absolute left-[50%] bottom-[-10px] w-1.5 h-1.5 bg-red-400 rounded-full blur-[1px]" style={{ animation: 'float-up 4s linear infinite 1s' }} />
                      <div className="absolute left-[80%] bottom-[-10px] w-1 h-1 bg-yellow-400 rounded-full blur-[1px]" style={{ animation: 'float-up 2.5s linear infinite 0.5s' }} />
                      <div className="absolute left-[35%] bottom-[-10px] w-2 h-2 bg-orange-500 rounded-full blur-[2px]" style={{ animation: 'float-up 3.5s linear infinite 1.5s' }} />
                    </div>
                  )}
                  
                  {isActive && day === 30 && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      {/* SVG Static Electricity Arcs */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points="0,15 12,22 25,12 38,28 50,18" fill="none" stroke="#FFC01E" strokeWidth="0.3" className="opacity-0" style={{ animation: 'electric-arc 3s infinite' }} />
                        <polyline points="100,55 88,48 75,58 62,42 50,52" fill="none" stroke="#FFC01E" strokeWidth="0.4" className="opacity-0" style={{ animation: 'electric-arc 2.5s infinite 0.7s' }} />
                        <polyline points="25,100 32,88 22,75 38,62 25,50" fill="none" stroke="#FFC01E" strokeWidth="0.3" className="opacity-0" style={{ animation: 'electric-arc 4s infinite 1.2s' }} />
                        <polyline points="80,0 72,12 82,25 68,38 80,50" fill="none" stroke="#FFC01E" strokeWidth="0.4" className="opacity-0" style={{ animation: 'electric-arc 2.1s infinite 0.3s' }} />
                        <polyline points="40,20 48,32 38,45 52,58 40,70" fill="none" stroke="#FFC01E" strokeWidth="0.5" className="opacity-0" style={{ animation: 'electric-arc 3.5s infinite 1.8s' }} />
                      </svg>
                    </div>
                  )}

                  {isActive && day === 90 && (
                    <div className="absolute inset-x-0 -bottom-8 h-32 z-0 pointer-events-none flex flex-col items-center justify-end overflow-visible">
                      {/* Downward Exhaust Trails */}
                      <div className="absolute bottom-4 flex justify-center gap-2 w-full">
                        <div className="w-[3px] h-10 bg-gradient-to-b from-white via-yellow-300 to-transparent blur-[1px] rounded-full" style={{ animation: 'thrust-trail 0.5s linear infinite' }} />
                        <div className="w-[4px] h-12 bg-gradient-to-b from-white via-orange-400 to-transparent blur-[1px] rounded-full" style={{ animation: 'thrust-trail 0.4s linear infinite 0.2s' }} />
                        <div className="w-[2px] h-8 bg-gradient-to-b from-white via-yellow-400 to-transparent blur-[1px] rounded-full" style={{ animation: 'thrust-trail 0.6s linear infinite 0.1s' }} />
                        <div className="w-[3px] h-10 bg-gradient-to-b from-white via-orange-300 to-transparent blur-[1px] rounded-full" style={{ animation: 'thrust-trail 0.45s linear infinite 0.3s' }} />
                        <div className="w-[4px] h-14 bg-gradient-to-b from-white via-yellow-200 to-transparent blur-[1px] rounded-full" style={{ animation: 'thrust-trail 0.55s linear infinite 0.15s' }} />
                      </div>
                    </div>
                  )}
                  {/* ------------------------------------------- */}

                  <div className="space-y-3 relative z-20">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
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
                    
                    <ul className="space-y-2 text-left pl-1">
                      {card.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs lg:text-[13px] text-[#A8B3AA] font-semibold leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: card.color }} />
                          <span className="text-gray-300">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Block: Padded and Centered Guarantee Showcase */}
      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 md:px-20 mb-3">
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative p-[1.5px] rounded-[1.5rem] lg:rounded-[2rem] max-w-5xl mx-auto shadow-2xl w-full group/guarantee-spotlight"
          style={{
            transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
            transition: 'transform 0.2s ease-out, background 0.3s ease',
            background: 'rgba(255,255,255,0.05)'
          }}
        >
          {/* Spotlight border glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/guarantee-spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0 rounded-[1.5rem] lg:rounded-[2rem]"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(216, 90, 31, 0.45), transparent 85%)`
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#052E22]/10 rounded-[1.4rem] lg:rounded-[1.9rem] p-6 lg:p-8 relative overflow-hidden backdrop-blur-md z-10">
            {/* Left: Headline & Description */}
            <div className="lg:col-span-8 space-y-3.5 text-left relative z-20">
              <h2 className="text-2xl lg:text-[2.2rem] font-normal font-serif tracking-tight leading-none text-white uppercase">
                Optimize Masculine <br/> Baseline in 90 Days
              </h2>
              <p className="text-xs md:text-sm lg:text-[14px] text-[#A8B3AA] leading-relaxed font-semibold max-w-2xl">
                Try T-CORE completely risk-free for 90 days. If you do not experience a substantial upgrade in energy, daily baseline focus, and post-workout recovery, we will refund you in full. No questions asked.
              </p>
              
              {/* Thicker and more prominent CTA Button */}
              <div className="pt-1.5 flex justify-center sm:justify-start">
                <a 
                  href="/products/t-core" 
                  className="btn-sweep bg-[#D85A1F] hover:bg-[#b94a17] text-white px-12 py-[22px] rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 hover:scale-[1.03] duration-300 w-full sm:w-auto"
                >
                  UNLOCK YOUR SYSTEM TODAY <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: Massive Guarantee Circular Sticker-Like Badge (Zero Rotation) */}
            <div className="lg:col-span-4 flex items-center justify-center relative z-20 mt-4 lg:mt-0">
              <div className="relative w-48 h-48 lg:w-60 lg:h-60 flex items-center justify-center rounded-full bg-gradient-to-br from-[#052e22] to-[#020504] border-[6px] border-[#D85A1F] shadow-[10px_10px_35px_rgba(0,0,0,0.85)] p-5 transition-transform duration-300 hover:scale-105 select-none rotate-0">
                {/* Inner dashed accent circle */}
                <div className="absolute inset-2.5 rounded-full border border-dashed border-[#D85A1F]/30 pointer-events-none" />
                
                <div className="text-center flex flex-col items-center justify-center space-y-1.5">
                  <Award size={40} className="text-[#D85A1F] animate-pulse mb-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  <span className="text-[12px] lg:text-[15px] font-black text-white uppercase tracking-wider block leading-none">100% VITALITY</span>
                  <span className="text-[10px] lg:text-[12px] font-black text-[#16C784] uppercase tracking-widest block bg-[#16C784]/15 px-3 py-1 rounded border border-[#16C784]/25 mt-0.5">GUARANTEE</span>
                  <span className="text-[8px] lg:text-[9.5px] text-[#A8B3AA] font-black uppercase tracking-wider block mt-0.5">90 Days Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

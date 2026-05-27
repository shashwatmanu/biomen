import React, { useRef } from 'react';
import { Battery, ShieldAlert, Sparkles, Brain, Flame, Activity, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProblemSection = () => {
  const containerRef = useRef(null);

  const problems = [
    { icon: <Battery size={22} />, title: "Low Energy" },
    { icon: <Flame size={22} />, title: "Poor Recovery" },
    { icon: <ShieldAlert size={22} />, title: "High Stress" },
    { icon: <Brain size={22} />, title: "Brain Fog" },
    { icon: <Activity size={22} />, title: "Low Drive" },
    { icon: <CheckCircle size={22} />, title: "Inconsistent Performance" }
  ];

  useGSAP(() => {
    // Scroll animation for card entrance
    gsap.from(".problem-fade-up", {
      y: 40,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 md:px-20 bg-biomen-dark relative overflow-hidden border-t border-white/5" 
      id="depletion"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-biomen-copper/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 problem-fade-up">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-copper mb-4 block">
            The Modern Male Depletion Problem
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-biomen-white">
            Modern Life Is Draining <br className="hidden sm:block"/> Men Below Baseline
          </h2>
        </div>

        {/* Mismatched Cards aligned to equal heights using items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Depletion List (Cause + Feeling) */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 rounded-[2rem] relative flex flex-col justify-between problem-fade-up h-full">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-biomen-copper flex items-center gap-1.5">
                <ShieldAlert size={12} /> The Enemy: Modern Lifestyle
              </span>
              <p className="text-biomen-white font-medium text-base md:text-lg leading-relaxed">
                Long work hours. Poor sleep. Constant stress. Low sunlight. Digital overload.
              </p>
              <p className="text-biomen-white font-bold leading-relaxed">
                Modern life slowly drains male performance. Not enough to stop you completely, but enough to make you feel:
              </p>
              
              {/* Minimal Check/Pulse Icons - No sprout gardening icons */}
              <ul className="space-y-3.5 pl-2">
                {[
                  "Flatter",
                  "Slower",
                  "Less focused",
                  "Less driven",
                  "Less consistent"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base font-bold uppercase tracking-wider text-biomen-muted">
                    <span className="w-2 h-2 rounded-full bg-biomen-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Gradual Decline List (Symptoms + T-CORE link) */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 rounded-[2rem] relative flex flex-col justify-between problem-fade-up h-full">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-biomen-accent flex items-center gap-1.5">
                <Activity size={12} /> The Result: Gradual Decline
              </span>
              <p className="text-biomen-white font-bold text-xl leading-relaxed">
                For many men, the problem is not collapse.
              </p>
              <p className="text-biomen-muted text-base md:text-lg leading-relaxed">
                It is gradual decline:
              </p>
              
              {/* Pulse check items */}
              <ul className="space-y-3 pl-2">
                {[
                  "Weaker recovery",
                  "Lower morning energy",
                  "Inconsistent workouts",
                  "Reduced resilience",
                  "Mental fatigue",
                  "And the feeling of operating below their true baseline."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base font-semibold text-biomen-white">
                    <CheckCircle size={14} className="text-biomen-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crucial Conversion Link to T-Core */}
            <div className="mt-8 pt-6 border-t border-white/10 bg-biomen-green/20 p-4 rounded-xl border border-biomen-accent/15 text-center lg:text-left">
              <p className="text-biomen-accent font-black text-sm uppercase tracking-wider">
                🎯 That is the gap T-CORE is built to support.
              </p>
            </div>
          </div>

        </div>

        {/* 6 Bottom Cards: Precise titles and Copper Accents */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 problem-fade-up">
          {problems.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-biomen-copper/50 hover:from-white/10 transition-all duration-300 group"
            >
              <div className="text-biomen-copper mb-4 group-hover:scale-110 transition-transform duration-300 bg-biomen-copper/10 p-3 rounded-full border border-biomen-copper/15">
                {item.icon}
              </div>
              <h3 className="text-xs font-black uppercase tracking-wider text-biomen-white">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* High-conversion CTA Link to PDP */}
        <div className="mt-16 text-center problem-fade-up">
          <a 
            href="/products/t-core" 
            onClick={(e) => {
              if (window.location.pathname.includes('/products/t-core')) {
                e.preventDefault();
                document.getElementById('buybox')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-[#D85A1F] hover:bg-[#b94a17] text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] hover:scale-[1.02] duration-300"
          >
            Start Your 90-Day System
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;

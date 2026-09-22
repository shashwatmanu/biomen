import React from 'react';

const FounderStory = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-bg-primary border-t border-biomen-text-primary/5 relative overflow-hidden" id="about">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-biomen-surface/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-biomen-emerald/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Product Lifestyle Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group aspect-[4/5] rounded-[2.5rem] border border-biomen-text-primary/10 overflow-hidden bg-biomen-bg-secondary shadow-2xl flex items-center justify-center">
              <img 
                src="/tcore_jar.jpg" 
                alt="T-CORE Product Lifestyle" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030705]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-3 py-1 rounded-full border border-[#0FA36B]/20">
                  PRODUCT LIFESTYLE
                </span>
                <div className="font-black text-biomen-text-primary text-xl uppercase tracking-wider mt-3">T-CORE Daily Jar</div>
                <div className="text-biomen-text-secondary text-xs font-semibold mt-1">Built for Daily Baseline Support</div>
              </div>
            </div>
          </div>

          {/* Right Side: Copy & Mission */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block mb-4">
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-biomen-text-primary leading-tight">
                Why We Built BIOMEN
              </h2>
            </div>
            
            <div className="space-y-6 text-biomen-text-secondary text-base md:text-lg leading-relaxed font-medium">
              <p>
                Modern men are expected to perform every day, but stress, poor sleep, low sunlight, and long work hours quietly drain energy, recovery, and consistency.
              </p>
              <p>
                BIOMEN LABS was built to create premium daily systems for men who want to operate better without hype, guesswork, or low-quality shortcuts.
              </p>
              <p>
                T-CORE is our first step: a transparent herbal vitality formula built around discipline, clarity, and long-term consistency.
              </p>

              <div className="pt-2">
                <a 
                  href="/products/t-core"
                  onClick={(e) => {
                    if (window.location.pathname.includes('/products/t-core')) {
                      e.preventDefault();
                      document.getElementById('buybox')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-3 bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary px-8 py-[18px] rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(216,90,31,0.2)] hover:scale-[1.02] duration-300"
                >
                  Start Your 90-Day System
                </a>
              </div>
            </div>

            {/* Brand Belief Statement Box */}
            <div className="bg-biomen-surface/30 border border-[#0FA36B]/20 p-8 rounded-3xl relative shadow-md mt-6">
              <span className="absolute -top-3 left-6 bg-biomen-copper text-biomen-text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                BRAND BELIEF
              </span>
              <p className="text-biomen-text-primary font-black italic text-lg leading-relaxed pt-2">
                &ldquo;No hype. No hidden blends. Just serious daily support for men who treat performance like a discipline.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderStory;

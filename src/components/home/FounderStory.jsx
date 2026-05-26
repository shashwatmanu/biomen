import React from 'react';

const FounderStory = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black/40 border-t border-white/5 relative overflow-hidden" id="about">
      <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* Left Side: Founder Image Placeholder */}
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] bg-gradient-to-b from-white/5 to-black rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl group hover:border-emerald-500/30 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-xs uppercase tracking-widest text-center px-4">
              [Founder Portrait]
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-bold text-white text-lg">BIOMEN Founders</div>
              <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mt-1">Disciplined Vitality</div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Quote */}
        <div className="w-full md:w-2/3 space-y-6">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Why BIOMEN Exists
          </h2>
          
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-medium">
            <p>
              BIOMEN LABS was created for men who are trying to move forward in life—but feel like modern stress is quietly taxing their energy, recovery, and consistency.
            </p>
            <p>
              We were tired of fake hype, underdosed formulas, aggressive marketing, and low-trust supplement brands. So we built something different: a premium daily vitality system designed for ambitious Indian men who want to operate better—without compromising trust.
            </p>
            <p>
              T-Core is the first step toward that vision: a masculine wellness system built around discipline, clarity, consistency, and long-term performance support.
            </p>
            
            {/* Founder Quote */}
            <div className="bg-[#060c09] border border-emerald-500/20 p-6 rounded-2xl relative shadow-md mt-6">
              <span className="absolute -top-3 left-6 bg-emerald-500 text-black text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                Founding Philosophy
              </span>
              <p className="text-white font-black italic text-lg leading-relaxed pt-2">
                &ldquo;We&rsquo;re building BIOMEN for men who want to operate at a higher level&mdash;without hype, without guesswork, and without low-quality shortcuts.&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderStory;

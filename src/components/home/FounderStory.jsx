import React from 'react';

const FounderStory = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black/20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-sm uppercase tracking-widest">
              [Founder Portrait]
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <div className="font-bold text-lg">Founder</div>
              <div className="text-biomen-accent text-sm font-black uppercase tracking-widest">Biomen Labs</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Why BIOMEN Exists</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              BIOMEN LABS was created for men who do not want loud promises, fake aggression, or shortcut supplements. 
            </p>
            <p>
              The supplement industry is broken—filled with proprietary blends, under-dosed ingredients, and gym-bro marketing. We wanted something clinical, transparent, and built for daily life, not just the weight room.
            </p>
            <p className="text-white font-bold italic border-l-4 border-biomen-accent pl-6 py-2 my-8">
              "The goal is simple: build daily biological support systems for Indian men. T-CORE is the foundation."
            </p>
            <p>
              We believe in transparency. No proprietary blends, no hidden fillers, and every batch tested. Because what you put into your body dictates what you get out of it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;

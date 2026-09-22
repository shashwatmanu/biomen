import React from 'react';

const PressStrip = () => {
  return (
    <div className="bg-black py-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Featured In & Trusted By</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-serif font-bold italic">Men's Health</div>
          <div className="text-2xl font-serif font-black tracking-tighter">GQ</div>
          <div className="text-xl font-serif font-bold uppercase tracking-widest">Forbes</div>
          <div className="text-xl font-sans font-black uppercase tracking-tighter">Esquire</div>
        </div>
      </div>
    </div>
  );
};

export default PressStrip;

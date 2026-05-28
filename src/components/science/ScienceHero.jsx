import React from 'react';

const ScienceHero = () => {
  return (
    <section className="pt-[120px] lg:pt-[100px] pb-16 px-6 md:px-20 bg-black/40 relative overflow-hidden text-center min-h-[50vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-biomen-green/90 to-[#0a100d] z-10"></div>
        {/* Abstract molecular pattern placeholder */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(194,240,194,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block bg-biomen-accent/10 border border-biomen-accent/30 text-biomen-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Formulation & Mechanism
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          The Science Behind <span className="text-biomen-silver">T-CORE</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          T-CORE is not magic. It is a precise biological system designed to support natural testosterone production, regulate cortisol, and restore the foundation of male vitality.
        </p>
      </div>
    </section>
  );
};

export default ScienceHero;

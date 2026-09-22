import React from 'react';
import { Shield } from 'lucide-react';

const PackagingSection = () => {
  const highlights = [
    "Premium Outer Tube",
    "Glass Bottle Interior",
    "Matte Soft-Touch Finish",
    "Shelf-Worthy Design",
    "Premium Unboxing Experience"
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-bg-primary relative overflow-hidden border-t border-biomen-text-primary/5" id="packaging">
      {/* Visual background glows */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-biomen-surface/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-biomen-emerald/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Mockup / Premium Representation */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-biomen-text-primary/10 bg-biomen-bg-secondary p-6 text-center shadow-2xl min-h-[480px] flex flex-col justify-between items-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0FA36B]/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Product Canister Image */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-biomen-text-primary/5 relative bg-biomen-bg-primary/40 flex items-center justify-center">
                <img 
                  src="/tcore_canister.jpg" 
                  alt="T-CORE Premium Packaging" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              <div className="space-y-2 mt-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-3 py-1 rounded-full border border-[#0FA36B]/20">
                  PREMIUM PACKAGING
                </span>
                <h3 className="text-2xl font-black text-biomen-text-primary uppercase tracking-wider mt-2">
                  The T-CORE Glass Bottle
                </h3>
                <p className="text-xs text-biomen-text-secondary max-w-xs mx-auto mt-2 leading-relaxed">
                  A premium glass bottle designed to protect ingredient quality and elevate the daily ritual.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-biomen-accent bg-biomen-surface px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block">
              PREMIUM RITUAL
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-biomen-text-primary leading-[1.1]">
              Premium Packaging. <br className="hidden sm:block" /> Built to Last.
            </h2>
            
            <div className="space-y-6 text-biomen-text-secondary text-lg leading-relaxed font-medium">
              <p>
                T-CORE is housed in a premium outer tube with a glass bottle inside, designed to feel solid, tactile, and worth keeping from the moment it arrives.
              </p>
              
              <div className="bg-biomen-surface/30 border border-[#0FA36B]/20 p-6 rounded-3xl space-y-4">
                <p className="text-sm font-black uppercase tracking-wider text-biomen-gold">
                  Because a serious daily system should feel premium before the first capsule.
                </p>
                
                <ul className="space-y-3 text-sm text-biomen-text-primary font-semibold">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-biomen-copper"></span>
                    Collectible
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-biomen-copper"></span>
                    Giftable
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-biomen-copper"></span>
                    Built for daily shelf presence
                  </li>
                </ul>
              </div>
            </div>

            {/* Packaging Highlights List */}
            <div className="pt-6 border-t border-biomen-text-primary/10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-biomen-text-secondary mb-4">
                PACKAGING HIGHLIGHTS
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {highlights.map((highlight, i) => (
                  <span key={i} className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-biomen-text-primary hover:border-[#0FA36B]/40 hover:bg-biomen-surface/30 transition-all">
                    {highlight}
                  </span>
                ))}
              </div>

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

        </div>
      </div>
    </section>
  );
};

export default PackagingSection;

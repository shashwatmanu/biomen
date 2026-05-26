import React from 'react';
import { Package, ShieldCheck, HelpCircle, Star, Heart } from 'lucide-react';

const PackagingSection = () => {
  const highlights = [
    "Premium Outer Tube",
    "Glass Bottle Interior",
    "Matte Soft-Touch Finish",
    "Elevated Shelf Presence",
    "Amazing Unboxing Experience"
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black relative overflow-hidden border-t border-white/5" id="packaging">
      {/* Visual background glows */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-950/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Mockup / Premium Representation */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-emerald-950/20 to-black p-8 text-center shadow-2xl min-h-[400px] flex flex-col justify-center items-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
              
              <Package size={80} className="text-emerald-400 mb-6 animate-pulse" />
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Collectible Design
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mt-2">The Biomen Launch Jar</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto mt-2 leading-relaxed">
                  Engineered with ultraviolet-filtering glass and an airtight seal to protect active botanicals and preserve clinical potency.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block">
              Premium Ritual
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              Packaging That Feels <br className="hidden sm:block" /> Worth Keeping
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-medium">
              <p>
                T-Core is not packaged like a commodity supplement. 
                Each bottle is housed inside a premium outer tube and paired with a glass bottle interior—designed to feel elevated, tactile, and intentional from the moment it arrives.
              </p>
              <div className="border-l-4 border-emerald-500 pl-6 space-y-4">
                <p className="font-bold text-white text-xl">
                  Because premium products should feel:
                </p>
                <ul className="space-y-2 text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  <li className="flex items-center gap-2">🎁 Collectible</li>
                  <li className="flex items-center gap-2">🎁 Giftable</li>
                  <li className="flex items-center gap-2">🎁 And worthy of becoming part of your daily space.</li>
                </ul>
              </div>
            </div>

            {/* Packaging Highlights List */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Packaging Highlights</h3>
              <div className="flex flex-wrap gap-3">
                {highlights.map((highlight, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:border-emerald-500/40 transition-colors">
                    ✨ {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PackagingSection;

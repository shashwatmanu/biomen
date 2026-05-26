import React from 'react';
import useCartStore from '../../store/useCartStore';
import { Star, ShieldCheck } from 'lucide-react';

const BundleSelector = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const bundles = [
    { 
      id: 'tcore-1-bottle',
      name: "1 Bottle | 30 Days", 
      title: "Entry System",
      supply: "30 Day Supply", 
      priceText: "₹1,499", 
      price: 1499,
      savings: "", 
      best: false,
      desc: "For first-time customers beginning their T-Core routine."
    },
    { 
      id: 'tcore-3-bottles',
      name: "3 Bottles | 90 Days", 
      title: "Full Reset System",
      supply: "90 Day Supply", 
      priceText: "₹3,999", 
      price: 3999,
      savings: "Save ₹500 + Free Shipping", 
      best: true,
      desc: "Recommended for men who want to properly evaluate long-term energy, recovery, and vitality support."
    },
    { 
      id: 'tcore-2-bottles',
      name: "2 Bottles | 60 Days", 
      title: "Consistency System",
      supply: "60 Day Supply", 
      priceText: "₹2,799", 
      price: 2799,
      savings: "Save ₹200", 
      best: false,
      desc: "Built for men developing a real performance routine."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#060c09] border-t border-white/5 relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            Pricing Protocols
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-white">
            Choose Your System
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
            T-Core works best when taken consistently. Most men should evaluate a daily vitality system over <span className="text-emerald-400 font-bold">30</span>, <span className="text-emerald-400 font-bold">60</span>, and ideally <span className="text-emerald-400 font-bold">90 days</span>.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {bundles.map((bundle, i) => (
            <div 
              key={i} 
              className={`relative bg-gradient-to-b from-white/5 to-transparent border rounded-[2.5rem] p-10 flex flex-col justify-between text-center transition-all duration-300 ${
                bundle.best 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/50 md:scale-105 z-10 bg-[#0a1410] shadow-2xl' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {bundle.best && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-6 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Recommended Protocol
                </span>
              )}
              
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                  {bundle.name}
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-4">{bundle.title}</h3>
                <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8 min-h-[48px]">
                  {bundle.desc}
                </p>
              </div>

              <div>
                <div className="text-5xl font-black text-white mb-2">{bundle.priceText}</div>
                <div className="h-6 mb-8">
                  {bundle.savings && (
                    <div className="text-emerald-400 text-xs font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                      {bundle.savings}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => addToCart({
                    id: bundle.id,
                    title: `T-CORE ${bundle.title} (${bundle.name})`,
                    price: bundle.price,
                    quantity: 1,
                    isSubscription: false,
                    image: '/tcore_canister.jpg'
                  })}
                  className={`block w-full py-4.5 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                    bundle.best 
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-950/20 hover:scale-[1.02]' 
                      : 'bg-white/10 text-white hover:bg-white/25 hover:scale-[1.02]'
                  }`}
                >
                  Select Protocol
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Microcopy */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            Subscribe and save on every delivery. Built for long-term consistency.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BundleSelector;

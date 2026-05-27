import React, { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import { Star, ShieldCheck, Check } from 'lucide-react';

const BundleSelector = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isSubscription, setIsSubscription] = useState(false);

  const bundles = [
    { 
      id: 'tcore-1-bottle',
      name: "1 Bottle | 30 Days", 
      title: "Entry System",
      supply: "30 Day Supply", 
      mrp: 3000,
      price: 1499,
      subPrice: 1274, // 15% extra off
      best: false,
      desc: "For first-time customers beginning their T-CORE routine."
    },
    { 
      id: 'tcore-3-bottles',
      name: "3 Bottles | 90 Days", 
      title: "Full Reset System",
      supply: "90 Day Supply", 
      mrp: 9000,
      price: 3999,
      subPrice: 3399,
      best: true,
      desc: "Recommended for men who want to properly evaluate long-term energy, recovery, and vitality support."
    },
    { 
      id: 'tcore-2-bottles',
      name: "2 Bottles | 60 Days", 
      title: "Consistency System",
      supply: "60 Day Supply", 
      mrp: 6000,
      price: 2799,
      subPrice: 2379,
      best: false,
      desc: "Built for men developing a real performance routine."
    }
  ];

  const handlePurchase = (bundle) => {
    const finalPrice = isSubscription ? bundle.subPrice : bundle.price;
    addToCart({
      id: bundle.id,
      title: `T-CORE ${bundle.title} (${bundle.name}) ${isSubscription ? '[Auto-Pay Subscription]' : ''}`,
      price: finalPrice,
      quantity: 1,
      isSubscription: isSubscription,
      image: '/tcore_canister.jpg'
    });
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#030705] border-t border-white/5 relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#052E22]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#16C784] mb-4 block">
            PRICING PROTOCOLS
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-[#F4F6F2]">
            Choose Your System
          </h2>
          <p className="text-[#A8B3AA] text-base md:text-lg leading-relaxed font-medium">
            T-CORE works best when taken consistently. Most men should evaluate a daily vitality system over <span className="text-[#16C784] font-bold">30</span>, <span className="text-[#16C784] font-bold">60</span>, and ideally <span className="text-[#16C784] font-bold">90 days</span>.
          </p>
        </div>

        {/* Subscription / One-time Toggle Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#06110C] border border-[#0FA36B]/20 p-1.5 rounded-full flex gap-2 shadow-2xl relative">
            <button 
              onClick={() => setIsSubscription(false)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${!isSubscription ? 'bg-[#0FA36B] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
            >
              One-Time Purchase
            </button>
            <button 
              onClick={() => setIsSubscription(true)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${isSubscription ? 'bg-[#D85A1F] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
            >
              Auto-Pay Subscription <span className="bg-black/30 text-[9px] text-[#7FE7B3] px-2 py-0.5 rounded-full border border-white/5 font-black uppercase shrink-0">-15% Extra</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {bundles.map((bundle, i) => {
            const currentPrice = isSubscription ? bundle.subPrice : bundle.price;
            const savingsPercent = Math.round(((bundle.mrp - currentPrice) / bundle.mrp) * 100);

            return (
              <div 
                key={i} 
                className={`relative bg-gradient-to-b from-white/5 to-transparent border rounded-[2.5rem] p-10 flex flex-col justify-between text-center transition-all duration-300 ${
                  bundle.best 
                    ? 'border-[#0FA36B] ring-2 ring-[#0FA36B]/30 md:scale-105 z-10 bg-[#052E22]/20 shadow-2xl' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {bundle.best && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0FA36B] text-[#F4F6F2] px-6 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> Recommended Protocol
                  </span>
                )}
                
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-2">
                    {bundle.name}
                  </div>
                  <h3 className="text-3xl font-black text-[#F4F6F2] uppercase mb-4">{bundle.title}</h3>
                  <p className="text-[#A8B3AA] text-sm font-medium leading-relaxed mb-8 min-h-[48px]">
                    {bundle.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider line-through mb-1">
                      MRP ₹{bundle.mrp.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-5xl font-black text-[#F4F6F2]">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-8 mb-8">
                    <div className="text-[#16C784] text-xs font-black uppercase tracking-widest bg-[#052E22] px-3 py-1 rounded-full border border-[#0FA36B]/20 inline-block">
                      Save {savingsPercent}% (₹{(bundle.mrp - currentPrice).toLocaleString('en-IN')} Off)
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(bundle)}
                    className={`block w-full py-4.5 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-[1.02] ${
                      bundle.best 
                        ? 'bg-[#D85A1F] text-[#F4F6F2] hover:bg-[#b94a17] shadow-xl shadow-[#D85A1F]/10' 
                        : 'bg-white/10 text-[#F4F6F2] hover:bg-white/20'
                    }`}
                  >
                    Select Protocol
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Microcopy & Explainer */}
        <div className="max-w-3xl mx-auto bg-[#06110C] border border-[#0FA36B]/20 p-8 rounded-[2rem] text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#16C784]" />
            <h3 className="text-base font-black text-[#F4F6F2] uppercase tracking-wider">
              Explore Our Auto-Pay Subscription Model
            </h3>
          </div>
          
          <p className="text-sm text-[#A8B3AA] leading-relaxed mb-6 font-medium">
            Keep your momentum active without remembering to reorder. Set up safe recurring auto-pay with one-click cancellation. Subscriptions unlock an <strong>extra 15% discount</strong> on every bottle and qualify for complimentary shipping forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-xs font-black uppercase tracking-wider text-[#F4F6F2]">
            <span className="flex items-center justify-center gap-1.5 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
              <Check size={14} className="text-[#16C784]" /> Extra 15% Off
            </span>
            <span className="flex items-center justify-center gap-1.5 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
              <Check size={14} className="text-[#16C784]" /> Cancel Anytime
            </span>
            <span className="flex items-center justify-center gap-1.5 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
              <Check size={14} className="text-[#16C784]" /> Free Express Shipping
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BundleSelector;

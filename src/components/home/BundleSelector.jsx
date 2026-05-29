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
    window.location.href = '/products/t-core';
  };

  return (
    <section className="relative pt-[120px] pb-6 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 lg:h-[calc(100vh-100px)] lg:min-h-[650px] flex flex-col justify-between" id="pricing">
      {/* Background spotlights (ambient glows, not digital gradients) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-biomen-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-4 lg:mb-2.5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-0.5 block">
            PRICING PROTOCOLS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal font-serif tracking-tight text-[#F4F6F2]">
            Choose Your System
          </h2>
          <p className="text-[#A8B3AA] text-xs lg:text-sm font-semibold">
            T-CORE works best when taken consistently. Evaluate a system over <span className="text-[#16C784] font-bold">30</span>, <span className="text-[#16C784] font-bold">60</span>, and ideally <span className="text-[#16C784] font-bold">90 days</span>.
          </p>
        </div>

        {/* Subscription / One-time Toggle Selector */}
        <div className="flex justify-center mb-4 lg:mb-3">
          <div className="bg-[#06110C] border border-[#0FA36B]/20 p-1 rounded-full flex gap-1 shadow-2xl relative">
            <button 
              onClick={() => setIsSubscription(false)}
              className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${!isSubscription ? 'bg-[#0FA36B] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
            >
              One-Time Purchase
            </button>
            <button 
              onClick={() => setIsSubscription(true)}
              className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${isSubscription ? 'bg-[#D85A1F] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
            >
              Auto-Pay Subscription <span className="bg-black/30 text-[8px] text-[#7FE7B3] px-2 py-0.5 rounded-full border border-white/5 font-black uppercase shrink-0">-15% Off</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Solid bg, no digital gradients) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4 items-stretch mb-4 lg:mb-2.5">
          {bundles.map((bundle, i) => {
            const currentPrice = isSubscription ? bundle.subPrice : bundle.price;
            const savingsPercent = Math.round(((bundle.mrp - currentPrice) / bundle.mrp) * 100);

            return (
              <div 
                key={i} 
                className={`relative bg-black/40 border rounded-[1.5rem] p-5 lg:p-4 flex flex-col justify-between text-center transition-all duration-300 ${
                  bundle.best 
                    ? 'border-[#0FA36B] ring-2 ring-[#0FA36B]/30 md:scale-102 z-10 bg-[#052E22]/10 shadow-2xl' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {bundle.best && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0FA36B] text-[#F4F6F2] px-4 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Recommended Protocol
                  </span>
                )}
                
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-0.5">
                    {bundle.name}
                  </div>
                  <h3 className="text-xl lg:text-lg font-black text-[#F4F6F2] uppercase mb-0.5">{bundle.title}</h3>
                  <p className="text-[#A8B3AA] text-[11px] font-semibold leading-relaxed mb-3 min-h-[32px] lg:min-h-[22px]">
                    {bundle.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-col items-center justify-center mb-2">
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider line-through mb-0.5">
                      MRP ₹{bundle.mrp.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-2.5xl lg:text-2xl font-black text-[#F4F6F2]">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-[#16C784] text-[9px] font-black uppercase tracking-widest bg-[#052E22] px-2 py-0.5 rounded-full border border-[#0FA36B]/20 inline-block">
                      Save {savingsPercent}% (₹{(bundle.mrp - currentPrice).toLocaleString('en-IN')} Off)
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(bundle)}
                    className={`block w-full py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-[1.03] ${
                      bundle.best 
                        ? 'bg-[#D85A1F] text-[#F4F6F2] hover:bg-[#b94a17] shadow-xl shadow-[#D85A1F]/20' 
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

        {/* Subscription Microcopy & Explainer (Highly compact, solid bg) */}
        <div className="max-w-3xl mx-auto bg-[#06110C]/60 border border-[#0FA36B]/20 p-4 lg:p-3 rounded-[1.5rem] text-center w-full">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <ShieldCheck size={16} className="text-[#16C784]" />
            <h3 className="text-xs font-black text-[#F4F6F2] uppercase tracking-wider">
              Explore Our Auto-Pay Subscription Model
            </h3>
          </div>
          
          <p className="text-[11px] text-[#A8B3AA] leading-relaxed mb-3 font-semibold">
            Keep your momentum active. Set up recurring auto-pay with one-click cancellation. Subscriptions unlock an <strong>extra 15% discount</strong> and qualifying express shipping forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center text-[9px] font-black uppercase tracking-wider text-[#F4F6F2]">
            <span className="flex items-center justify-center gap-1 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
              <Check size={10} className="text-[#16C784]" /> Extra 15% Off
            </span>
            <span className="flex items-center justify-center gap-1 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
              <Check size={10} className="text-[#16C784]" /> Cancel Anytime
            </span>
            <span className="flex items-center justify-center gap-1 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
              <Check size={10} className="text-[#16C784]" /> Free Express Shipping
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BundleSelector;

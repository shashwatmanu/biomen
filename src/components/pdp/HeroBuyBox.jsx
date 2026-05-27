import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCcw, ArrowRight } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const HeroBuyBox = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [activeImage, setActiveImage] = useState('/tcore_canister.jpg');

  const images = [
    { id: 'canister', url: '/tcore_canister.jpg', label: 'Launch Kit' },
    { id: 'jar', url: '/tcore_jar.jpg', label: 'Supply' },
  ];

  return (
    <section className="pt-[176px] md:pt-[144px] pb-24 px-6 md:px-20 bg-black min-h-screen flex items-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 w-full items-center">
        
        {/* Left: Huge Typography & Buy Box (Takes up 7 cols) */}
        <div className="flex flex-col justify-center lg:col-span-7 order-2 lg:order-1 pt-8 lg:pt-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Founder Batch Release
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-6 leading-[0.95] text-white uppercase">
            The Indian Man <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Was Built For More.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed font-medium max-w-2xl">
            T-Core is a premium herbal vitality system designed to support energy, recovery, resilience, masculine performance, and daily consistency for ambitious modern men.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-8 max-w-2xl border-l-2 border-emerald-500 pl-4">
            <span>Transparent Formula</span>
            <span>•</span>
            <span>Premium Herbal Extracts</span>
            <span>•</span>
            <span>Vegetarian Capsules</span>
            <span>•</span>
            <span className="text-white font-black underline">Made in India</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 max-w-2xl">
            <button 
              onClick={() => addToCart({
                id: 'tcore-3-bottles',
                title: 'T-CORE Full Reset System (3 Bottles)',
                price: 3999,
                quantity: 1,
                isSubscription: false,
                image: activeImage
              })}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white py-5 px-10 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] flex items-center justify-center gap-3 hover:scale-[1.02]"
            >
              Start Your 90-Day System <ArrowRight size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500">
            <ShieldCheck size={20} className="text-emerald-500" />
            No proprietary blends. No cheap filler formulas. No loud promises.
          </div>
        </div>
 
        {/* Right: Product Image Gallery (Takes up 5 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-5 order-1 lg:order-2">
          {/* Main Showcase */}
          <div className="aspect-[4/5] bg-gradient-to-b from-white/5 to-transparent rounded-[40px] overflow-hidden relative flex items-center justify-center border border-white/10 mt-8 lg:mt-24 group shadow-2xl p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <img 
              src={activeImage} 
              alt="T-CORE Product" 
              className="relative z-20 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:scale-105" 
            />
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-4 px-4">
            {images.map((img) => (
              <div 
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`aspect-square rounded-2xl border transition-all cursor-pointer overflow-hidden relative flex items-center justify-center p-4 bg-white/5 ${activeImage === img.url ? 'border-emerald-500 scale-105 shadow-lg' : 'border-white/10 hover:border-emerald-500/50'}`}
              >
                <img src={img.url} className={`w-3/4 h-3/4 object-contain ${activeImage === img.url ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Trust Banner at the bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md py-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-16 text-gray-500 font-black tracking-[0.3em] text-xs uppercase">
          <span>Featured In</span>
          <span className="text-2xl font-black text-gray-400 tracking-tighter italic">GQ</span>
          <span className="text-2xl font-black text-gray-400 tracking-tighter italic">Men's Health</span>
          <span className="text-2xl font-black text-gray-400 tracking-tighter italic">Forbes</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBuyBox;

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
    <section className="pt-48 pb-24 px-6 md:px-20 bg-black min-h-screen flex items-center relative overflow-hidden">
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
            <a href="#reviews" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors">
              3,794 REVIEWS
            </a>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-6 leading-[0.9] text-white uppercase">
            THE MOST <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">POTENT & NATURAL</span> <br/>
            TESTOSTERONE STACK ON EARTH
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed font-medium max-w-2xl">
            8 powerful ingredients packed into one daily male-vitality supplement.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 max-w-2xl">
            <button 
              onClick={() => addToCart({
                id: 'tcore-launch-kit',
                title: 'T-CORE Launch Kit',
                price: 1499,
                quantity: 1,
                isSubscription: true,
                image: activeImage
              })}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white py-5 px-10 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] flex items-center justify-center gap-3 hover:scale-[1.02]"
            >
              UNLOCK YOUR POWER TODAY <ArrowRight size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-400">
            <ShieldCheck size={20} className="text-emerald-500" />
            TRY IT FOR 90 DAYS. HIGHER T OR YOUR MONEY BACK.
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
          <div className="grid grid-cols-4 gap-4 px-4">
            {images.map((img) => (
              <div 
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`aspect-square rounded-2xl border transition-all cursor-pointer overflow-hidden relative ${activeImage === img.url ? 'border-emerald-500 scale-105 shadow-lg' : 'border-white/10 hover:border-emerald-500/50'}`}
              >
                <img src={img.url} className={`w-full h-full object-cover ${activeImage === img.url ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            ))}
            <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/50 cursor-pointer flex items-center justify-center transition-colors text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Label
            </div>
            <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/50 cursor-pointer flex items-center justify-center transition-colors text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Results
            </div>
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

// Quick CheckCircle component
const CheckCircle2 = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const OfferRecap = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black/40 border-y border-white/5">
      <div className="max-w-3xl mx-auto bg-biomen-green border border-biomen-accent/30 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(194,240,194,0.05)]">
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-tight">The Launch Kit Summary</h2>
        
        <div className="space-y-4 mb-8 border-b border-white/10 pb-8">
          <div className="flex justify-between items-center text-lg">
            <div className="flex items-center gap-3 font-bold">
              <Check size={20} className="text-biomen-accent" /> T-CORE (90-Day System)
            </div>
            <div className="text-gray-400">₹9,000</div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <div className="flex items-center gap-3 font-medium text-gray-300">
              <Check size={20} className="text-biomen-accent" /> 90-Day Protocol E-Book
            </div>
            <div className="text-gray-400">₹2,500</div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <div className="flex items-center gap-3 font-medium text-gray-300">
              <Check size={20} className="text-biomen-accent" /> Lifetime App Access
            </div>
            <div className="text-gray-400">₹5,000</div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <div className="flex items-center gap-3 font-medium text-gray-300">
              <Check size={20} className="text-biomen-accent" /> Chance to Win iPhone 17 Pro
            </div>
            <div className="text-gray-400">Priceless</div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Total Value: <span className="line-through">₹16,500</span></div>
            <div className="text-4xl font-black text-white">Today: <span className="text-biomen-accent">₹3,999</span></div>
          </div>
          <div className="text-right">
            <div className="bg-white/10 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Save ₹12,501
            </div>
          </div>
        </div>

        <button 
          onClick={() => document.getElementById('buybox')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-biomen-accent text-biomen-green py-5 rounded-full font-black text-lg uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_30px_rgba(194,240,194,0.2)] flex items-center justify-center gap-2 cursor-pointer"
        >
          Secure My Kit <ArrowRight size={20} />
        </button>
        <p className="text-center text-xs text-gray-500 mt-4 uppercase tracking-widest font-bold">
          90-Day Money Back Guarantee
        </p>
      </div>
    </section>
  );
};

export default OfferRecap;

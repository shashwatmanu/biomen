import React from 'react';
import { Star, ThumbsUp, Filter, Search, ChevronDown, BadgeCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FullReviewsWidget = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black border-t border-white/5" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white">Clinical Feedback <br/><span className="text-emerald-500">& Reviews</span></h2>
            <div className="flex items-center gap-4">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-2xl font-black tracking-tight text-white">4.9/5 RATING</span>
            </div>
          </div>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)]">
            Write a Review
          </button>
        </div>
        
        {/* Review Summary Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 border-b border-white/10 pb-16">
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <div className="text-7xl font-black text-white mb-2 leading-none">4.9</div>
            <div className="text-sm text-gray-500 font-black uppercase tracking-widest">Based on 3,794 reviews</div>
          </div>
          
          <div className="md:col-span-4 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-4">
                <div className="text-[10px] text-gray-500 font-black w-4">{star}</div>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-emerald-500 rounded-full ${star === 5 ? 'w-[92%]' : star === 4 ? 'w-[6%]' : star === 3 ? 'w-[1%]' : 'w-[0.5%]'}`}></div>
                </div>
                <div className="text-[10px] text-gray-500 font-black w-8 text-right">{star === 5 ? '92%' : star === 4 ? '6%' : '1%'}</div>
              </div>
            ))}
          </div>

          <div className="md:col-span-5 bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BadgeCheck size={80} />
            </div>
            <h4 className="font-black mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500">
               AI Summary
            </h4>
            <p className="text-gray-400 leading-relaxed italic font-medium">
              "Users consistently report significant improvements in sustained energy levels, elimination of afternoon crashes, and enhanced daily drive within 3-4 weeks. Many note the high quality of the packaging and appreciate the transparency of the dosages."
            </p>
          </div>
        </div>

        {/* Review List - Preview of 3 */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-10 rounded-[2.5rem] hover:border-emerald-500/50 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="font-black text-white uppercase tracking-wider">Alexander R.</div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                      <BadgeCheck size={14} /> Verified Buyer
                    </div>
                  </div>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">OCTOBER 12, 2026</div>
              </div>
              
              <h4 className="font-black text-2xl mb-4 text-white uppercase tracking-tight italic">"Exactly what I needed for my routine."</h4>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                "I was skeptical at first because the market is flooded with garbage. But the transparency here won me over. I'm on week 6 and the difference in my mental clarity and drive is undeniable. Will be subscribing."
              </p>
              
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                  <ThumbsUp size={16} /> Helpful (24)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            to="/reviews" 
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] text-white hover:bg-emerald-600 hover:text-black hover:border-emerald-600 transition-all group"
          >
            Load More Reviews <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FullReviewsWidget;


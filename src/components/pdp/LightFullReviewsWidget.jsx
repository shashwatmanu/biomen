import React from 'react';
import { Star, ThumbsUp, Filter, Search, ChevronDown, BadgeCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LightFullReviewsWidget = () => {
  return (
    <section className="pt-0 pb-24 px-6 md:px-20 bg-[#FCFDFD] border-t border-black/5" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-gray-900">Clinical Feedback <br className="hidden md:block" /><span className="text-emerald-700">& Reviews</span></h2>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">4.1/5 RATING</span>
            </div>
          </div>
          <button className="hidden bg-orange-600 text-gray-900 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)]">
            
          </button>
        </div>
        
        {/* Review Summary Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 border-b border-black/10 pb-16">
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <div className="text-7xl font-black text-gray-900 mb-2 leading-none">4.1</div>
            <div className="text-sm text-gray-500 font-black uppercase tracking-widest">Based on 500 reviews</div>
          </div>
          
          <div className="md:col-span-4 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-4">
                <div className="text-[10px] text-gray-500 font-black w-4">{star}</div>
                <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-emerald-500 rounded-full ${star === 5 ? 'w-[92%]' : star === 4 ? 'w-[6%]' : star === 3 ? 'w-[1%]' : 'w-[0.5%]'}`}></div>
                </div>
                <div className="text-[10px] text-gray-500 font-black w-8 text-right">{star === 5 ? '92%' : star === 4 ? '6%' : '1%'}</div>
              </div>
            ))}
          </div>

          <div className="hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BadgeCheck size={80} />
            </div>
            <h4 className="font-black mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700">
               AI Summary
            </h4>
            <p className="text-gray-500 leading-relaxed italic font-medium">
              "Users consistently report significant improvements in sustained energy levels, elimination of afternoon crashes, and enhanced daily drive within 3-4 weeks. Many note the high quality of the packaging and appreciate the transparency of the dosages."
            </p>
          </div>
        </div>

        {/* Review List - Preview of 3 */}
        <div className="space-y-8">
          {[
            {name: 'Karan S.', headline: 'Exactly what I needed for my routine.', date: 'OCTOBER 12, 2026', text: "I was skeptical at first because the market is flooded with garbage. But the transparency here won me over. I'm on week 6 and the difference in my mental clarity and drive is undeniable. Will be subscribing."},
            {name: 'Aditya P.', headline: 'Noticeable difference in stamina.', date: 'OCTOBER 5, 2026', text: "I've tried a few other testosterone boosters before, but this one feels different. It's smoother. I don't get the jitters, just a steady stream of energy throughout the day."},
            {name: 'Rajeev M.', headline: 'Clean formulation, no fillers.', date: 'SEPTEMBER 28, 2026', text: "As someone who researches every ingredient, I appreciate the transparency. The clinical dosages actually make a difference. My recovery after workouts is significantly faster now."}
          ].map((review, i) => (
            <div key={i} className="bg-gradient-to-b from-white/5 to-transparent border border-black/10 p-10 rounded-[2.5rem] hover:border-emerald-500/50 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="font-black text-gray-900 uppercase tracking-wider">{review.name}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                      <BadgeCheck size={14} /> Verified Buyer
                    </div>
                  </div>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{review.date}</div>
              </div>
              
              <h4 className="font-black text-2xl mb-4 text-gray-900 uppercase tracking-tight italic">"{review.headline}"</h4>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
                  <ThumbsUp size={16} /> Helpful (24)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            to="/reviews" 
            className="inline-flex items-center gap-3 bg-black/5 border border-black/10 px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] text-gray-900 hover:bg-emerald-600 hover:text-black hover:border-emerald-600 transition-all group"
          >
            Load More Reviews <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LightFullReviewsWidget;


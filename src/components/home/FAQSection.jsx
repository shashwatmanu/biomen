import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { 
    q: "What is T-Core?", 
    a: "T-Core is a premium daily male vitality system designed to support energy, resilience, recovery, and masculine performance." 
  },
  { 
    q: "Is T-Core a testosterone booster?", 
    a: "T-Core is not positioned as a hormone treatment or pharmaceutical testosterone product. It is a herbal vitality system designed to support masculine wellness and daily performance." 
  },
  { 
    q: "Does it contain steroids?", 
    a: "No. T-Core is built without steroids and without proprietary blends." 
  },
  { 
    q: "How should I take it?", 
    a: "Take 2 vegetarian capsules daily, ideally with a meal and as part of a consistent routine." 
  },
  { 
    q: "How long should I use it?", 
    a: "T-Core works best when evaluated over a 60–90 day consistency window." 
  },
  { 
    q: "Is it only for gym users?", 
    a: "No. T-Core is built for modern men balancing work, stress, fitness, recovery, and daily performance." 
  },
  { 
    q: "Is it vegetarian?", 
    a: "Yes. T-Core uses vegetarian capsules." 
  },
  { 
    q: "Where is it made?", 
    a: "T-Core is manufactured in India through licensed production partners." 
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-24 px-4 sm:px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col justify-between" id="faq">
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header */}
        <div className="text-center mb-10 lg:mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-0.5 block">
            Help Desk
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal font-serif tracking-tight text-white mb-0.5">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-xs lg:text-sm font-semibold">
            Everything you need to know before starting T-Core.
          </p>
        </div>

        {/* Accordions in 2 independent columns on desktop to prevent stretch bugs */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 my-auto w-full max-w-5xl mx-auto items-start">
          {/* Left Column (Even Indexes) */}
          <div className="flex flex-col gap-4 lg:gap-5 w-full">
            {faqs.map((faq, i) => {
              if (i % 2 !== 0) return null;
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-[#16C784]/60 bg-[#0a100d] shadow-lg shadow-black/40' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button 
                    className="w-full flex justify-between items-center text-left p-6 lg:p-7 outline-none group"
                    onClick={() => toggleFAQ(i)}
                  >
                    <span className="font-black text-base md:text-lg text-white group-hover:text-[#16C784] transition-colors pr-4 uppercase tracking-wide">
                      {i + 1}. {faq.q}
                    </span>
                    <span className="shrink-0 bg-white/5 p-2 rounded-full border border-white/10 text-[#16C784] group-hover:bg-[#16C784]/10 transition-colors">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-48 border-t border-white/5' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 lg:p-7 bg-black/25 text-[#A8B3AA] text-sm lg:text-[15px] leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (Odd Indexes) */}
          <div className="flex flex-col gap-4 lg:gap-5 w-full">
            {faqs.map((faq, i) => {
              if (i % 2 === 0) return null;
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-[#16C784]/60 bg-[#0a100d] shadow-lg shadow-black/40' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button 
                    className="w-full flex justify-between items-center text-left p-6 lg:p-7 outline-none group"
                    onClick={() => toggleFAQ(i)}
                  >
                    <span className="font-black text-base md:text-lg text-white group-hover:text-[#16C784] transition-colors pr-4 uppercase tracking-wide">
                      {i + 1}. {faq.q}
                    </span>
                    <span className="shrink-0 bg-white/5 p-2 rounded-full border border-white/10 text-[#16C784] group-hover:bg-[#16C784]/10 transition-colors">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-48 border-t border-white/5' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 lg:p-7 bg-black/25 text-[#A8B3AA] text-sm lg:text-[15px] leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

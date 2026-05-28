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
    <section className="relative pt-[120px] pb-8 px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 lg:h-[calc(100vh-100px)] lg:min-h-[580px] flex flex-col justify-between" id="faq">
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header */}
        <div className="text-center mb-6 lg:mb-3">
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

        {/* Accordions in 2 columns on desktop with items-start alignment to prevent stretch bug */}
        <div className="space-y-2.5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-start my-auto w-full max-w-5xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#16C784]/60 bg-[#0a100d] shadow-lg shadow-black/40' : 'hover:border-white/20'
                }`}
              >
                <button 
                  className="w-full flex justify-between items-center text-left p-5 lg:p-4 outline-none group"
                  onClick={() => toggleFAQ(i)}
                >
                  <span className="font-black text-sm lg:text-base text-white group-hover:text-emerald-400 transition-colors pr-4 uppercase tracking-wide">
                    {i + 1}. {faq.q}
                  </span>
                  <span className="shrink-0 bg-white/5 p-1.5 rounded-full border border-white/10 text-emerald-400 group-hover:bg-[#16C784]/10 transition-colors">
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
                
                {/* Answer drawer */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-48 border-t border-white/5' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 lg:p-4 bg-black/20 text-biomen-muted text-xs lg:text-[13px] leading-relaxed font-semibold">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

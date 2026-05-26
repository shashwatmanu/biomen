import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
    <section className="py-24 px-6 md:px-20 bg-black border-t border-white/5" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block mb-4">
            Help Desk
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-bold uppercase tracking-wider">
            Everything you need to know before starting T-Core.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-emerald-500/40 bg-[#0a100d]' : 'hover:border-white/20'
                }`}
              >
                <button 
                  className="w-full flex justify-between items-center text-left p-6 outline-none"
                  onClick={() => toggleFAQ(i)}
                >
                  <span className="font-bold text-base md:text-lg text-white group-hover:text-emerald-400 transition-colors pr-6">
                    {i + 1}. {faq.q}
                  </span>
                  <span className="shrink-0 bg-white/5 p-2 rounded-full border border-white/10 text-emerald-400">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                
                {/* Answer drawer */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-white/5' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-gray-300 text-sm md:text-base font-medium leading-relaxed bg-black/20">
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

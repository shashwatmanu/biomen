import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import Footer from '../components/shared/Footer';

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black min-h-screen text-white pt-48">
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <div className="text-center mb-24">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block mb-4">
            Protocol Support
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            Protocol <br/> <span className="text-emerald-500">FAQ</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Everything you need to know before starting T-Core.
          </p>
        </div>

        <div className="space-y-4 mb-32">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-white/5 border rounded-[1.5rem] transition-all overflow-hidden ${
                  isOpen ? 'border-emerald-500 bg-[#0a100d] shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(i)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <span className="font-bold text-lg text-white">
                    {i + 1}. {faq.q}
                  </span>
                  <span className="shrink-0 bg-white/5 p-2 rounded-full border border-white/10 text-emerald-400">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
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
      <Footer />
    </div>
  );
};

export default FAQ;

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import Footer from '../components/shared/Footer';

const faqData = [
  {
    category: "The Protocol",
    questions: [
      {
        q: "How should I take T-CORE?",
        a: "Take one serving (2 tablets) daily with a meal, preferably in the morning. Consistency is key to biological optimization."
      },
      {
        q: "How long before I see results?",
        a: "While some notice improved energy and focus within days, clinical dosages typically reach peak effectiveness after 4-6 weeks of consistent use."
      },
      {
        q: "Do I need to cycle T-CORE?",
        a: "Since T-CORE contains only natural biological supporters and no synthetic hormones, cycling is not required. However, some users prefer to take 1 week off every 12 weeks."
      }
    ]
  },
  {
    category: "Ingredients & Safety",
    questions: [
      {
        q: "Are there any side effects?",
        a: "T-CORE is made from natural, clinical-grade ingredients and is generally well-tolerated. Always consult with a physician before starting any new supplement protocol."
      },
      {
        q: "Is T-CORE vegan/non-GMO?",
        a: "Yes. Our formula is 100% vegan, non-GMO, and free from gluten, soy, and synthetic fillers."
      },
      {
        q: "Can I take this with other supplements?",
        a: "T-CORE is designed to be a complete male vitality stack, but it can be taken with a multivitamin or protein. Avoid taking other testosterone boosters simultaneously."
      }
    ]
  },
  {
    category: "Shipping & Support",
    questions: [
      {
        q: "How does the 90-day guarantee work?",
        a: "If you don't feel a measurable difference in your vitality or T-levels after 90 days of consistent use, we will refund your order in full. No questions asked."
      },
      {
        q: "Where do you ship?",
        a: "We currently ship throughout India and the USA. International shipping is expanding soon."
      }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState("0-0");

  return (
    <div className="bg-black min-h-screen text-white pt-48">
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            Protocol <br/> <span className="text-emerald-500">FAQ</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Everything you need to know about optimizing your vitality with T-CORE.
          </p>
        </div>

        <div className="space-y-16 mb-32">
          {faqData.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 border-l-2 border-emerald-500 pl-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={qIdx} 
                      className={`bg-white/5 border rounded-[1.5rem] transition-all overflow-hidden ${isOpen ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/10 hover:border-white/20'}`}
                    >
                      <button 
                        onClick={() => setOpenIndex(isOpen ? "" : id)}
                        className="w-full p-6 flex justify-between items-center text-left"
                      >
                        <span className="font-bold text-lg">{item.q}</span>
                        {isOpen ? <Minus size={20} className="text-emerald-500" /> : <Plus size={20} className="text-gray-500" />}
                      </button>
                      <div className={`transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 p-6 pt-0 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-400 font-medium leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;

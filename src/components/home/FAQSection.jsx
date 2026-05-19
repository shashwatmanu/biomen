import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "Is T-CORE a testosterone booster?", a: "T-CORE is a men’s vitality formula designed to support hormonal health, energy, drive, recovery, and daily performance. It is not a steroid, medicine, or instant testosterone booster." },
  { q: "How long does it take to work?", a: "Most daily supplements work best with consistent use. T-CORE should be used as part of an 8-12 week routine." },
  { q: "Does it contain steroids?", a: "No. T-CORE does not contain steroids." },
  { q: "Is it safe for daily use?", a: "T-CORE is designed for adult men. Anyone with a medical condition or taking medication should consult a healthcare professional before use." },
  { q: "When should I take it?", a: "Take it daily as directed on the pack, preferably with a meal." },
  { q: "Can I take it with protein or creatine?", a: "Generally, T-CORE can fit into a normal supplement routine. If you are taking multiple supplements or medication, consult a healthcare professional." },
  { q: "Is this only for gym users?", a: "No. T-CORE is for men looking for daily vitality, energy, drive, and recovery support." },
  { q: "Is it vegetarian?", a: "Yes, it uses vegetarian capsules." },
  { q: "Where is it manufactured?", a: "T-CORE is manufactured in a certified facility in India." },
  { q: "Is the product tested?", a: "Yes, every batch undergoes third-party lab testing for quality, purity, and safety." }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0a100d]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about T-CORE.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-4">
              <button 
                className="w-full flex justify-between items-center text-left py-4 hover:text-biomen-accent transition-colors"
                onClick={() => toggleFAQ(i)}
              >
                <span className="font-bold text-lg pr-8">{faq.q}</span>
                {openIndex === i ? <Minus size={20} className="text-biomen-accent shrink-0" /> : <Plus size={20} className="text-gray-500 shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="pb-6 text-gray-400 leading-relaxed pr-8">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

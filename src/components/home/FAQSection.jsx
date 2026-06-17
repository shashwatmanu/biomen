import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

const FAQCard = ({ faq, index, isOpen, onToggle }) => {
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300 group/faq-spotlight ${
        isOpen ? 'bg-[#16C784] shadow-lg shadow-black/40' : 'bg-white/10'
      }`}
    >
      {/* Spotlight border glow layer */}
      {!isOpen && (
        <div 
          className="absolute inset-0 opacity-0 group-hover/faq-spotlight:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
          }}
        />
      )}

      {/* Inner Card container */}
      <div className={`w-full h-full rounded-[15px] overflow-hidden transition-all duration-300 relative z-10 ${
        isOpen ? 'bg-[#0a100d]' : 'bg-gradient-to-br from-[#06110C]/80 to-black/90 group-hover/faq-spotlight:from-[#091B13] group-hover/faq-spotlight:to-black/95'
      }`}>
        {/* Background inner glow */}
        {!isOpen && (
          <div 
            className="absolute inset-0 opacity-0 group-hover/faq-spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.06), transparent 80%)`
            }}
          />
        )}

        <button 
          className="w-full flex justify-between items-center text-left p-6 lg:p-7 outline-none group relative z-10"
          onClick={onToggle}
        >
          <span className={`font-black text-base md:text-lg transition-colors pr-4 uppercase tracking-wide ${
            isOpen ? 'text-[#16C784]' : 'text-white group-hover:text-[#16C784]'
          }`}>
            {index + 1}. {faq.q}
          </span>
          <span className={`shrink-0 p-2 rounded-full border transition-colors ${
            isOpen ? 'bg-[#16C784]/10 border-[#16C784] text-[#16C784]' : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-[#16C784] group-hover:bg-[#16C784]/10 group-hover:border-[#16C784]/30'
          }`}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        </button>
        
        <div 
          className={`transition-all duration-300 overflow-hidden relative z-10 ${
            isOpen ? 'max-h-48 border-t border-[#16C784]/10' : 'max-h-0'
          }`}
        >
          <div className="p-6 lg:p-7 text-[#A8B3AA] text-sm lg:text-[15px] leading-relaxed font-semibold">
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    gsap.from(".reveal-line-scroll", {
      y: "115%",
      duration: 1.2,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".reveal-parent-scroll",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-12 pb-0 lg:pt-16 lg:pb-0 px-4 sm:px-6 md:px-20 overflow-hidden bg-[#030705] border-t border-white/5 flex flex-col justify-between" id="faq">
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header */}
        <div className="text-center mb-10 lg:mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-0.5 block">
            Help Desk
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal font-serif tracking-tight text-white mb-0.5 reveal-parent-scroll">
            <span className="block overflow-hidden relative">
              <span className="reveal-line-scroll block">Frequently Asked Questions</span>
            </span>
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
              return (
                <FAQCard 
                  key={i} 
                  faq={faq} 
                  index={i} 
                  isOpen={openIndex === i} 
                  onToggle={() => toggleFAQ(i)} 
                />
              );
            })}
          </div>

          {/* Right Column (Odd Indexes) */}
          <div className="flex flex-col gap-4 lg:gap-5 w-full">
            {faqs.map((faq, i) => {
              if (i % 2 === 0) return null;
              return (
                <FAQCard 
                  key={i} 
                  faq={faq} 
                  index={i} 
                  isOpen={openIndex === i} 
                  onToggle={() => toggleFAQ(i)} 
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

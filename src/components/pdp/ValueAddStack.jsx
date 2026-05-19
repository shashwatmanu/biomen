import React from 'react';
import { Gift, BookOpen, Smartphone, Ticket } from 'lucide-react';

const ValueAddStack = () => {
  const gifts = [
    { icon: <Gift size={24} />, title: "Premium Travel Tin", desc: "Carry your daily support safely.", value: "₹499 Value" },
    { icon: <BookOpen size={24} />, title: "Biological Optimization E-Book", desc: "The definitive guide to male vitality.", value: "₹999 Value" },
    { icon: <Smartphone size={24} />, title: "1-Month App Access", desc: "Guided protocols for training & recovery.", value: "₹799 Value" },
    { icon: <Ticket size={24} />, title: "Giveaway Entry", desc: "Automatic entry into our monthly gear drop.", value: "Priceless" }
  ];

  return (
    <section className="py-12 px-6 md:px-20 bg-biomen-green border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-sm font-black uppercase tracking-[0.2em] text-biomen-accent mb-8">Included With The Launch Kit</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors border border-white/5">
              <div className="bg-black/50 p-3 rounded-xl text-biomen-accent shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 mb-2 leading-relaxed">{item.desc}</p>
                <div className="text-xs font-bold uppercase tracking-wider text-biomen-silver">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueAddStack;

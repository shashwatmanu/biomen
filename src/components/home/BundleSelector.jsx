import React from 'react';
import useCartStore from '../../store/useCartStore';

const BundleSelector = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const bundles = [
    { 
      id: 'tcore-1-bottle',
      name: "1 Bottle", 
      title: "Starter Pack",
      supply: "30 Day Supply", 
      priceText: "₹1,499", 
      price: 1499,
      savings: "", 
      best: false,
      desc: "Best for first-time users."
    },
    { 
      id: 'tcore-3-bottles',
      name: "3 Bottles", 
      title: "90-Day System",
      supply: "90 Day Supply", 
      priceText: "₹3,999", 
      price: 3999,
      savings: "Save ₹500 + Free Shipping", 
      best: true,
      desc: "Best value. Recommended for full optimization."
    },
    { 
      id: 'tcore-2-bottles',
      name: "2 Bottles", 
      title: "Consistency Pack",
      supply: "60 Day Supply", 
      priceText: "₹2,799", 
      price: 2799,
      savings: "Save ₹200", 
      best: false,
      desc: "Better value."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-green" id="bundle-selector">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Choose Your Protocol</h2>
          <p className="text-gray-400 text-lg">Biological optimization is a marathon, not a sprint.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {bundles.map((bundle, i) => (
            <div key={i} className={`relative glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all ${bundle.best ? 'border-biomen-accent ring-2 ring-biomen-accent md:scale-110 z-10 bg-[#0a100d] shadow-2xl' : 'hover:border-white/20'}`}>
              {bundle.best && (
                <span className="absolute -top-4 bg-biomen-accent text-biomen-green px-6 py-1 rounded-full text-sm font-black uppercase tracking-wider shadow-lg">
                  Recommended
                </span>
              )}
              <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{bundle.name}</div>
              <h3 className="text-2xl font-extrabold mb-2">{bundle.title}</h3>
              <p className="text-gray-500 mb-6 text-sm">{bundle.desc}</p>
              
              <div className="text-4xl font-black mb-2">{bundle.priceText}</div>
              <div className="h-6 mb-8">
                {bundle.savings && <div className="text-biomen-accent text-sm font-bold">{bundle.savings}</div>}
              </div>
              
              <button 
                onClick={() => addToCart({
                  id: bundle.id,
                  title: `T-CORE ${bundle.title} (${bundle.name})`,
                  price: bundle.price,
                  quantity: 1,
                  isSubscription: false,
                  image: '/product_hero.jpg'
                })}
                className={`block w-full py-4 rounded-full font-bold transition-all text-lg ${bundle.best ? 'bg-biomen-accent text-biomen-green hover:brightness-110 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Select Protocol
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundleSelector;

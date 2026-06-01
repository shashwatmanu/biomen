import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RefreshCcw, ArrowRight, Check, Sparkles, Gift, Eye } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const HeroBuyBox = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [showLabelModal, setShowLabelModal] = useState(false);

  // Touch Swipe state variables
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = [
    { id: 'canister', url: '/tcore_canister.jpg', label: 'Premium Canister' },
    { id: 'jar', url: '/tcore_jar.jpg', label: 'Glass Bottle' },
    { id: 'hand_canister', url: '/hand_holding_canister.png', label: 'T-CORE in Hand' },
    { id: 'hand_jar', url: '/hand_holding_green_jar.jpg', label: 'Green Bottle Premium' },
    { id: 'spilled', url: '/spilled_capsules.jpg', label: 'Spilled Capsules Detail' },
    { id: 'portrait_canister', url: '/portrait_canister_jar.jpg', label: 'Canister & Jar' },
    { id: 'portrait_ingredients', url: '/portrait_ingredients.jpg', label: 'Mossy Ingredients' },
  ];

  const bundles = [
    { 
      id: 'tcore-3-bottles',
      name: "3 Bottles | 90 Days", 
      title: "Full Reset System",
      mrp: 9000,
      price: 3999,
      best: false,
      desc: "Evaluate full recovery, stamina & drive baseline"
    },
    { 
      id: 'tcore-2-bottles',
      name: "2 Bottles | 60 Days", 
      title: "Consistency System",
      mrp: 6000,
      price: 2799,
      best: false,
      desc: "Build serious masculine performance baseline"
    },
    { 
      id: 'tcore-1-bottle',
      name: "1 Bottle | 30 Days", 
      title: "Entry System",
      mrp: 3000,
      price: 1499,
      best: true,
      desc: "For first-time customers starting their routine"
    }
  ];

  const [selectedBundle, setSelectedBundle] = useState(bundles[2]); // default to 1 bottle

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left, go to next
      setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    if (touchStart - touchEnd < -75) {
      // Swiped right, go to prev
      setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <section 
      id="buybox"
      className="pt-[176px] md:pt-[144px] pb-32 px-6 md:px-20 bg-[#030705] relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#052E22]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0FA36B]/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Product Image Gallery (Takes up 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Showcase Card with aspect-square and full-bleed image display */}
            <div 
              className="aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center border border-white/10 shadow-2xl p-0 group bg-[#06110C]/40 select-none cursor-grab active:cursor-grabbing w-full max-w-[480px] mx-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Product Badge */}
              <span className="absolute top-6 left-6 bg-[#052E22] border border-[#0FA36B]/20 text-[#16C784] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-30">
                100% VEGETARIAN CAPSULES
              </span>

              {/* Slider Viewport */}
              <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
                <div 
                  className="flex w-full h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIdx * 100}%)` }}
                >
                  {images.map((img) => (
                    <div key={img.id} className="min-w-full h-full flex items-center justify-center flex-shrink-0 p-0">
                      <img 
                        src={img.url} 
                        alt={img.label} 
                        className="w-full h-full object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-700 ease-out group-hover:scale-105" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots indicator row */}
              <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeIdx === idx ? 'bg-[#16C784] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Slide to image ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Left/Right desktop buttons */}
              <button 
                onClick={() => setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-white/30 z-30 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
              >
                &larr;
              </button>
              <button 
                onClick={() => setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-white/30 z-30 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
              >
                &rarr;
              </button>
            </div>
            
            {/* Thumbnails Selector with enlarged and full bleed cards */}
            <div className="grid grid-cols-7 gap-2">
              {images.map((img, idx) => (
                <button 
                  key={img.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`aspect-square rounded-xl border transition-all cursor-pointer overflow-hidden relative flex items-center justify-center bg-white/5 ${activeIdx === idx ? 'border-[#0FA36B] scale-102 shadow-lg bg-[#052E22]/20' : 'border-white/10 hover:border-[#0FA36B]/50'}`}
                >
                  <img src={img.url} className={`w-full h-full object-cover ${activeIdx === idx ? 'opacity-100' : 'opacity-60'}`} alt={img.label} />
                </button>
              ))}
            </div>


            {/* Nutrition Label Trigger Button */}
            <button 
              onClick={() => setShowLabelModal(true)}
              className="w-full py-4.5 bg-black/40 border border-white/10 hover:border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <Eye size={14} /> View Nutrition & Serving Label
            </button>
          </div>

          {/* Right: Product Purchase buybox details (Takes up 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="flex text-[#D85A1F]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#16C784] bg-[#052E22] px-3 py-1 rounded-full border border-[#0FA36B]/20">
                FOUNDER BATCH RELEASE NOW LIVE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
              T-CORE Premium Masculine <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">Vitality Support</span>
            </h1>
            
            <p className="text-base text-[#A8B3AA] leading-relaxed font-medium">
              T-CORE is a premium clinical-grade herbal stack built to support daily vitality, testosterone baseline rhythm, recovery, and daily performance through consistency. Five purposeful herbal extracts, zero fillers.
            </p>

            {/* Clean Editorial Bullet Checkmarks */}
            <ul className="space-y-3 pt-2 text-sm text-[#F4F6F2] font-semibold">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>5 Herbal Extracts at Full Clinical Doses (1,600mg Active Daily Stack)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Zero Fillers or "Proprietary Blends" (Fully Transparent Formula)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Made in India & cGMP Certified Facility Tested</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>90-Day Confidence Money-Back Guarantee (Consistency Risk-Free)</span>
              </li>
            </ul>

            {/* Premium Selector Deck */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#BFA46A]">
                SELECT YOUR SYSTEM PROTOCOL
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bundles.map((bundle) => {
                  const isSelected = selectedBundle.id === bundle.id;
                  const discountPercent = Math.round(((bundle.mrp - bundle.price) / bundle.mrp) * 100);
                  
                  return (
                    <button
                      key={bundle.id}
                      onClick={() => setSelectedBundle(bundle)}
                      className={`relative flex flex-col justify-between text-left p-5 rounded-2xl border transition-all cursor-pointer bg-black/40 min-h-[140px] hover:border-[#0FA36B]/50 ${isSelected ? 'border-[#0FA36B] bg-[#052E22]/20 ring-1 ring-[#0FA36B]/30' : 'border-white/10'}`}
                    >
                      {bundle.best && (
                        <span className="absolute -top-2.5 right-4 bg-[#0FA36B] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg">
                          BEST RESET VALUE
                        </span>
                      )}
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#16C784]">
                          {bundle.name}
                        </div>
                        <div className="text-base font-black text-white uppercase mt-1">
                          {bundle.title}
                        </div>
                        <div className="text-[9px] text-[#A8B3AA] mt-1 font-semibold leading-tight">
                          {bundle.desc}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-baseline justify-between w-full">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-white">₹{bundle.price.toLocaleString('en-IN')}</span>
                          <span className="text-[9px] text-gray-500 line-through">₹{bundle.mrp.toLocaleString('en-IN')}</span>
                        </div>
                        <span className="text-[9px] text-[#16C784] font-black uppercase tracking-wider bg-[#052E22] px-2 py-0.5 rounded border border-[#0FA36B]/20">
                          -{discountPercent}% OFF
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA checkout Button and Stats */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => addToCart({
                  id: selectedBundle.id,
                  title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
                  price: selectedBundle.price,
                  quantity: 1,
                  isSubscription: false,
                  image: images[0].url
                })}
                className="w-full sm:w-auto bg-[#D85A1F] hover:bg-[#b94a17] text-white py-5 px-16 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] flex items-center justify-center gap-3 hover:scale-[1.02] duration-300 cursor-pointer"
              >
                TRY IT NOW <ArrowRight size={22} />
              </button>
              
              <div className="text-left w-full sm:w-auto">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Currently Selected:</div>
                <div className="text-xs text-[#F4F6F2] font-black uppercase tracking-wider mt-0.5">{selectedBundle.title} &bull; Save ₹{(selectedBundle.mrp - selectedBundle.price).toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Trust Badges under CTA button */}
            <div className="grid grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5 justify-center">
                <Truck size={14} className="text-[#16C784]" /> Ships in 24 Hours
              </span>
              <span className="flex items-center gap-1.5 justify-center">
                <ShieldCheck size={14} className="text-[#16C784]" /> Try Risk-Free for 90 Days
              </span>
              <span className="flex items-center gap-1.5 justify-center">
                <RefreshCcw size={14} className="text-[#16C784]" /> Free Shipping Aligned
              </span>
            </div>

            {/* YOUR FREE GIFTS Strip */}
            <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#BFA46A] flex items-center gap-2">
                <Gift size={16} /> YOUR FREE GIFTS (INCLUDED TODAY)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-black uppercase tracking-wider text-center text-[#F4F6F2]">
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">TRAVEL TIN</span>
                  <span>Free Metal Holder</span>
                  <span className="text-gray-500 text-[8px] mt-1">₹299 Value</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">VITALITY E-BOOK</span>
                  <span>90-Day Protocol</span>
                  <span className="text-gray-500 text-[8px] mt-1">₹499 Value</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">APP ACCESS</span>
                  <span>Workout Tracker</span>
                  <span className="text-gray-500 text-[8px] mt-1">Free Trial</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">SHAKER CUP</span>
                  <span>Premium Blender</span>
                  <span className="text-gray-500 text-[8px] mt-1">₹399 Value</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Nutrition Label Modal */}
      {showLabelModal && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#06110C] border border-[#0FA36B]/30 rounded-3xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 text-center">NUTRITIONAL FACTS</h3>
            
            <div className="border border-white/10 p-6 rounded-2xl font-mono text-xs text-gray-300 space-y-4">
              <div className="border-b border-white/20 pb-2 text-sm font-black text-white">Serving Size: 2 Vegetarian Capsules</div>
              <div className="border-b border-white/20 pb-2 flex justify-between">
                <span>Shilajit Extract (Standardised to Fulvic Acid)</span>
                <span className="font-black text-[#16C784]">500 mg</span>
              </div>
              <div className="border-b border-white/20 pb-2 flex justify-between">
                <span>Tongkat Ali Extract (Eurycoma Longifolia)</span>
                <span className="font-black text-[#16C784]">300 mg</span>
              </div>
              <div className="border-b border-white/20 pb-2 flex justify-between">
                <span>Ashwagandha Extract (Withania Somnifera)</span>
                <span className="font-black text-[#16C784]">300 mg</span>
              </div>
              <div className="border-b border-white/20 pb-2 flex justify-between">
                <span>Fenugreek Seed Extract (Trigonella foenum-graecum)</span>
                <span className="font-black text-[#16C784]">490 mg</span>
              </div>
              <div className="border-b border-white/20 pb-2 flex justify-between">
                <span>Black Pepper Extract (Bioavailability Booster)</span>
                <span className="font-black text-[#16C784]">10 mg</span>
              </div>
              <div className="text-[10px] text-gray-500 pt-2 leading-relaxed">
                * Daily Value not established. Compounded under cGMP guidelines. Certified vegetarian shell.
              </div>
            </div>

            <button 
              onClick={() => setShowLabelModal(false)}
              className="mt-6 w-full py-3.5 bg-[#D85A1F] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#b94a17] transition-all"
            >
              Close serving window
            </button>
          </div>
        </div>
      )}
      {/* Sticky Bottom Bar for PDP */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 z-[150] px-4 md:px-12 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,16px))] shadow-[0_-15px_35px_rgba(0,0,0,0.95)] flex items-center justify-between transition-all duration-300">
        <div className="hidden md:flex items-center gap-4 text-left">
          <img src={images[0].url} alt="T-CORE" className="w-12 h-12 object-contain bg-white/5 border border-white/10 rounded-xl p-1" />
          <div>
            <div className="text-[10px] text-[#16C784] font-black uppercase tracking-wider">{selectedBundle.name}</div>
            <div className="text-xs font-black uppercase text-white tracking-wide">{selectedBundle.title}</div>
          </div>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div>
            <span className="text-lg font-black text-white">₹{selectedBundle.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-gray-500 line-through ml-2">₹{selectedBundle.mrp.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Mobile-only price display left-aligned, buttons right-aligned */}
          <div className="md:hidden text-left flex-shrink-0 mr-3">
            <div className="text-[9px] text-[#16C784] font-black uppercase tracking-wider">{selectedBundle.name}</div>
            <div className="text-sm font-black text-white">₹{selectedBundle.price.toLocaleString('en-IN')}</div>
          </div>

          <button
            onClick={() => addToCart({
              id: selectedBundle.id,
              title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
              price: selectedBundle.price,
              quantity: 1,
              isSubscription: false,
              image: images[0].url
            })}
            className="flex-1 md:flex-none bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 py-3.5 px-6 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all cursor-pointer text-center whitespace-nowrap"
          >
            Add To Cart
          </button>

          <button
            onClick={() => {
              addToCart({
                id: selectedBundle.id,
                title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
                price: selectedBundle.price,
                quantity: 1,
                isSubscription: false,
                image: images[0].url
              });
              navigate('/checkout');
            }}
            className="flex-1 md:flex-none bg-[#D85A1F] hover:bg-[#b94a17] text-white py-3.5 px-8 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(216,90,31,0.2)] hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBuyBox;

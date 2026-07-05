import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RefreshCcw, ArrowRight, Check, Sparkles, Gift, Minus, Plus } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import gsap from 'gsap';

const HeroBuyBox = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isStickyVisible, setIsStickyVisible] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    if (window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((centerY - y) / centerY) * 7;
      const rotateYVal = ((x - centerX) / centerX) * 7;
      e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
      e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };



  const sliderRef = useRef(null);

  const images = [
    { id: 'prod-1', url: '/Product/1.webp', label: 'T-CORE Front View' },
    { id: 'prod-2', url: '/Product/2.webp', label: 'T-CORE Side View' },
    { id: 'prod-3', url: '/Product/3.webp', label: 'T-CORE Supplement Facts' },
    { id: 'prod-4', url: '/Product/4.webp', label: 'T-CORE Texture Detail' },
    { id: 'prod-5', url: '/Product/5.webp', label: 'T-CORE Ingredients Close-up' },
    { id: 'prod-6', url: '/Product/6.webp', label: 'T-CORE System Routine' },
    { id: 'prod-7', url: '/Product/7.webp', label: 'T-CORE Lifestyle Shot' },
    { id: 'prod-8', url: '/Product/8.webp', label: 'T-CORE Packaging Box' },
  ];

  const bundles = [
    { 
      id: 'tcore-3-bottles',
      name: "3 Bottles | 90 Days", 
      title: "Full Reset System",
      mrp: 9000,
      price: 3999,
      subPrice: 3399,
      best: false,
      desc: "Evaluate full recovery, stamina & drive baseline"
    },
    { 
      id: 'tcore-2-bottles',
      name: "2 Bottles | 60 Days", 
      title: "Consistency System",
      mrp: 6000,
      price: 2799,
      subPrice: 2379,
      best: false,
      desc: "Build serious masculine performance baseline"
    },
    { 
      id: 'tcore-1-bottle',
      name: "1 Bottle | 30 Days", 
      title: "Entry System",
      mrp: 3000,
      price: 1499,
      subPrice: 1274,
      best: true,
      desc: "For first-time customers starting their routine"
    }
  ];

  const [isSubscription, setIsSubscription] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('subscription') === 'true';
  });

  const [selectedBundle, setSelectedBundle] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const system = params.get('system');
    const matched = bundles.find((b) => b.id === system);
    return matched || bundles[2]; // default to 1 bottle
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('discount') === 'FOUNDER10') {
      localStorage.setItem('launch_discount_applied', 'true');
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const idx = Math.round(scrollLeft / width);
      setActiveIdx(idx);
    }
  };

  const scrollToIdx = (idx) => {
    setActiveIdx(idx);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: idx * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsStickyVisible(true);
        return;
      }

      const buybox = document.getElementById('buybox');
      const footer = document.querySelector('footer');
      
      let pastHero = false;
      let beforeFooter = true;
      
      if (buybox) {
        const rect = buybox.getBoundingClientRect();
        // Show sticky bar once the bottom of the buybox section is above the top of the screen (or close to it)
        pastHero = rect.bottom <= 120;
      } else {
        pastHero = window.scrollY > 600;
      }
      
      if (footer) {
        const rect = footer.getBoundingClientRect();
        // Hide if the footer top enters the viewport
        beforeFooter = rect.top > window.innerHeight;
      }
      
      setIsStickyVisible(pastHero && beforeFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();
    const timer = setTimeout(handleScroll, 250);
    
  }, []);

  return (
    <>
      <section 
        id="buybox"
        className={`pt-[110px] md:pt-[120px] pb-32 px-6 md:px-20 bg-[#030705] relative overflow-hidden min-h-[100dvh] flex items-center ${isStickyVisible ? 'z-[60]' : 'z-10'}`}
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
                className="aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center border border-white/10 shadow-2xl p-0 group bg-[#06110C]/40 select-none w-full max-w-[480px] mx-auto"
              >
                {/* Botanical green front-projected spotlight overlay (lights up the raster jar WebP on hover) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,199,132,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30 mix-blend-screen" />
                {/* Product Badge */}
                <span className="absolute top-6 left-6 bg-[#052E22] border border-[#0FA36B]/20 text-[#16C784] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-30">
                  100% VEGETARIAN CAPSULES
                </span>

                {/* Slider Viewport using native CSS scroll snapping */}
                <div 
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="w-full h-full overflow-x-auto flex snap-x snap-mandatory scrollbar-none scroll-smooth relative"
                >
                  {images.map((img) => (
                    <div key={img.id} className="w-full min-w-full h-full relative flex-shrink-0 snap-start">
                      <img 
                        src={img.url} 
                        alt={img.label} 
                        draggable="false"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none" 
                      />
                    </div>
                  ))}
                </div>

                {/* Left/Right desktop buttons */}
                <button 
                  onClick={() => scrollToIdx(activeIdx === 0 ? images.length - 1 : activeIdx - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-white/30 z-30 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
                >
                  &larr;
                </button>
                <button 
                  onClick={() => scrollToIdx(activeIdx === images.length - 1 ? 0 : activeIdx + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-white/30 z-30 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
                >
                  &rarr;
                </button>
              </div>

              {/* Dots indicator row (Moved below card) */}
              <div className="flex justify-center gap-2 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => scrollToIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeIdx === idx ? 'bg-[#16C784] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Slide to image ${idx + 1}`}
                  />
                ))}
              </div>
            
            {/* Thumbnails Selector with enlarged and full bleed cards */}
            <div className="grid grid-cols-8 gap-2">
              {images.map((img, idx) => (
                <button 
                  key={img.id}
                  onClick={() => scrollToIdx(idx)}
                  className={`aspect-square rounded-xl border transition-all cursor-pointer overflow-hidden relative flex items-center justify-center bg-white/5 ${activeIdx === idx ? 'border-[#0FA36B] scale-102 shadow-lg bg-[#052E22]/20' : 'border-white/10 hover:border-[#0FA36B]/50'}`}
                >
                  <img src={img.url} className={`w-full h-full object-cover ${activeIdx === idx ? 'opacity-100' : 'opacity-60'}`} alt={img.label} />
                </button>
              ))}
            </div>


            {/* Compact Nutrition Facts Panel */}
            <div className="w-full bg-[#06110C]/40 border border-white/5 p-5 rounded-[2rem] font-mono text-[10px] sm:text-xs text-gray-400 space-y-2 mt-2">
              <div className="border-b border-white/10 pb-1.5 flex justify-between font-sans text-xs font-black uppercase tracking-wider text-white">
                <span>Active Stack (2 Caps Serving)</span>
                <span className="text-[#16C784]">1,600mg</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Shilajit Extract</span>
                <span className="font-bold text-[#16C784]">500 mg</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Tongkat Ali Extract</span>
                <span className="font-bold text-[#16C784]">300 mg</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Ashwagandha Extract</span>
                <span className="font-bold text-[#16C784]">300 mg</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Fenugreek Seed Extract</span>
                <span className="font-bold text-[#16C784]">490 mg</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>Black Pepper Extract</span>
                <span className="font-bold text-[#16C784]">10 mg</span>
              </div>
            </div>
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

            {/* Subscription / One-time Toggle Selector */}
            <div className="flex justify-start py-2">
              <div className="bg-[#06110C] border border-[#0FA36B]/20 p-1 rounded-full flex gap-1 shadow-2xl relative">
                <button 
                  onClick={() => setIsSubscription(false)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${!isSubscription ? 'bg-[#0FA36B] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
                >
                  One-Time Purchase
                </button>
                <button 
                  onClick={() => {
                    setIsSubscription(true);
                    setSelectedBundle(bundles[0]); // Auto-select Full Reset System (90 days)
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${isSubscription ? 'bg-[#D85A1F] text-[#F4F6F2] shadow-lg' : 'text-[#A8B3AA] hover:text-white'}`}
                >
                  Subscribe & Save
                  <span className="bg-black/30 text-[8px] text-[#7FE7B3] px-1.5 py-0.5 rounded border border-white/5 font-black uppercase shrink-0">-15%</span>
                </button>
              </div>
            </div>

            {/* Premium Selector Deck (options come first) */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#BFA46A]">
                SELECT YOUR SYSTEM PROTOCOL
              </h3>
              
              <div className={`grid grid-cols-1 ${isSubscription ? 'md:grid-cols-1 max-w-sm' : 'md:grid-cols-3'} gap-4`}>
                {bundles
                  .filter(bundle => !isSubscription || bundle.id === 'tcore-3-bottles')
                  .map((bundle) => {
                    const isSelected = selectedBundle.id === bundle.id;
                    const displayPrice = (isSubscription && bundle.id === 'tcore-3-bottles') ? bundle.subPrice : bundle.price;
                    const discountPercent = Math.round(((bundle.mrp - displayPrice) / bundle.mrp) * 100);
                    
                    return (
                      <div key={bundle.id} className="relative h-full flex flex-col">
                        {bundle.best && (
                          <span className="absolute -top-2.5 right-4 bg-[#0FA36B] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg z-30">
                            BEST RESET VALUE
                          </span>
                        )}
                        
                        <div
                          onClick={() => {
                            setSelectedBundle(bundle);
                            setQuantity(1); // Reset quantity on bundle change
                            if (bundle.id !== 'tcore-3-bottles') {
                              setIsSubscription(false);
                            }
                          }}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          className={`relative p-[1.5px] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer flex-1 flex flex-col ${
                            isSelected 
                              ? 'border-transparent bg-[#0FA36B] ring-2 ring-[#0FA36B]/25 scale-[1.02] z-10 shadow-2xl shadow-[#0FA36B]/15' 
                              : 'bg-white/10 hover:scale-[1.01] border-transparent'
                          } group/spotlight`}
                          style={{
                            transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
                            transition: 'transform 0.2s ease-out, background 0.3s ease'
                          }}
                        >
                          {/* Spotlight border glow layer */}
                          {!isSelected && (
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none"
                              style={{
                                background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 80%)`
                              }}
                            />
                          )}

                          {/* Inner card content wrapper */}
                          <div className={`w-full h-full rounded-[14px] p-5 flex flex-col justify-between text-left relative z-10 transition-colors duration-500 overflow-hidden flex-1 ${
                            isSelected ? 'bg-gradient-to-br from-[#052E22]/90 to-[#030705]/95' : 'bg-black/40'
                          }`}>
                            {/* Background inner glow */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                              style={{
                                background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.08), transparent 80%)`
                              }}
                            />

                            <div className="relative z-10">
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
                            
                            <div className="mt-4 flex items-center justify-between w-full relative z-10">
                              <div className="flex flex-col">
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs text-gray-400 line-through">₹{(bundle.mrp * (isSelected ? quantity : 1)).toLocaleString('en-IN')}</span>
                                  <span className="text-lg font-black text-white">₹{(displayPrice * (isSelected ? quantity : 1)).toLocaleString('en-IN')}</span>
                                </div>
                                <span className="text-[9px] text-[#16C784] font-black uppercase tracking-wider mt-0.5">
                                  SAVE ₹{(((bundle.mrp - displayPrice) * (isSelected ? quantity : 1))).toLocaleString('en-IN')} (-{discountPercent}% OFF)
                                </span>
                              </div>
                              
                              {isSelected ? (
                                <div className="flex items-center gap-2 bg-black/60 rounded-lg p-1 border border-white/10 shadow-inner" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => {
                                      if (quantity > 1) setQuantity(quantity - 1);
                                    }}
                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="text-[#F4F6F2] text-xs font-black w-4 text-center select-none">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 transition-colors">
                                  <Plus size={10} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Repositioned CTA checkout Button and Stats */}
            <div className="py-2 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => addToCart({
                  id: selectedBundle.id,
                  title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
                  price: (isSubscription && selectedBundle.id === 'tcore-3-bottles') ? selectedBundle.subPrice : selectedBundle.price,
                  quantity: quantity,
                  isSubscription: isSubscription && selectedBundle.id === 'tcore-3-bottles',
                  image: images[0].url
                })}
                className="btn-sweep w-full sm:w-auto bg-[#D85A1F] hover:bg-[#b94a17] text-white py-5 px-16 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] flex items-center justify-center gap-3 hover:scale-[1.02] duration-300 cursor-pointer"
              >
                TRY IT NOW <ArrowRight size={22} />
              </button>
              
              <div className="text-left w-full sm:w-auto">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Currently Selected:</div>
                <div className="text-xs text-[#F4F6F2] font-black uppercase tracking-wider mt-0.5">
                  {selectedBundle.title} {quantity > 1 && `(x${quantity})`} &bull; Save ₹{((selectedBundle.mrp - ((isSubscription && selectedBundle.id === 'tcore-3-bottles') ? selectedBundle.subPrice : selectedBundle.price)) * quantity).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Clean Editorial Bullet Checkmarks (follow after CTA button) */}
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

            <div className="pt-2"></div>

            {/* Trust Badges under CTA button */}
            <div className="grid grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5 justify-center text-center">
                <Truck size={14} className="text-[#16C784]" /> Ships in 24 Hours
              </span>
              <span className="flex items-center gap-1.5 justify-center text-center">
                <ShieldCheck size={14} className="text-[#16C784]" /> Try Risk-Free for 90 Days
              </span>
              <span className="flex items-center gap-1.5 justify-center text-center">
                <RefreshCcw size={14} className="text-[#16C784]" /> Free Shipping Aligned
              </span>
            </div>

            {/* YOUR FREE GIFTS Strip */}
            <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#BFA46A] flex items-center gap-2">
                <Gift size={16} /> YOUR FREE GIFTS (INCLUDED TODAY)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px] font-black uppercase tracking-wider text-center text-[#F4F6F2]">
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">VITALITY E-BOOK</span>
                  <span>90-Day Protocol</span>
                  <span className="text-gray-500 text-[8px] mt-1">₹2,500 Value</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">LIFETIME APP ACCESS</span>
                  <span>Workout Tracker</span>
                  <span className="text-gray-500 text-[8px] mt-1">₹5,000 Value</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col justify-between items-center min-h-[90px]">
                  <span className="text-[#16C784] mb-1">IPHONE 17 PRO</span>
                  <span>Chance to Win</span>
                  <span className="text-gray-500 text-[8px] mt-1">Weekly Draw</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* Sticky Bottom Bar for PDP (Floating capsule design matching navbar) */}
    <div id="pdp-sticky-bar" className={`fixed bottom-[calc(14px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[94%] max-w-4xl bg-black/85 backdrop-blur-md border border-white/10 z-[150] pl-4 pr-3 py-2.5 md:px-6 md:py-3.5 rounded-full shadow-[0_15px_45px_rgba(0,0,0,0.9)] flex items-center justify-between transition-all duration-500 ease-out ${
      isStickyVisible 
        ? 'opacity-100 translate-y-0' 
        : 'pointer-events-none opacity-0 translate-y-12'
    }`}>
      {/* Universal Side-by-Side Capsule Layout (Mobile Optimized) */}
      <div className="flex items-center justify-between w-full">
        
        {/* Left Side: Product / Price info */}
        <div className="flex items-center gap-2 sm:gap-3 text-left min-w-0 flex-shrink">
          {/* Desktop Only Canister Thumb */}
          <img src={images[0].url} alt="T-CORE" className="w-12 h-12 object-cover bg-white/5 border border-white/10 rounded-xl p-1 hidden md:block" />
          
          <div className="flex flex-col justify-center min-w-0 flex-shrink">
            {/* Desktop system text */}
            <div className="hidden md:block">
              <div className="text-[10px] text-[#16C784] font-black uppercase tracking-wider">{selectedBundle.name}</div>
              <div className="text-xs font-black uppercase text-white tracking-wide">{selectedBundle.title} {quantity > 1 && `(x${quantity})`}</div>
            </div>
            
            {/* Mobile system text (Compact & prominent) */}
            <div className="md:hidden flex flex-col min-w-0">
              <span className="text-[9px] sm:text-[10px] text-[#16C784] font-black uppercase tracking-wider leading-tight truncate">
                {selectedBundle.title.split(' ')[0]}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-white tracking-wider mt-0.5 leading-tight truncate">
                {selectedBundle.id === 'tcore-1-bottle' ? '30 Days' : selectedBundle.id === 'tcore-2-bottles' ? '60 Days' : '90 Days'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 mx-1.5 shrink-0" />
          
          {/* Price tags */}
          <div className="flex items-baseline gap-1 leading-none shrink-0">
            <span className="text-[9px] sm:text-xs text-gray-500 line-through">
              ₹{(selectedBundle.mrp * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-[13px] sm:text-sm md:text-lg font-black text-[#16C784] md:text-white">
              ₹{((isSubscription ? selectedBundle.subPrice : selectedBundle.price) * quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-2">
          <button
            onClick={() => addToCart({
              id: selectedBundle.id,
              title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
              price: isSubscription ? selectedBundle.subPrice : selectedBundle.price,
              quantity: quantity,
              isSubscription: isSubscription,
              image: images[0].url
            })}
            className="btn-sweep bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 py-2.5 px-3 sm:py-3 sm:px-4 md:py-3.5 md:px-6 rounded-full font-black text-[9px] md:text-xs uppercase tracking-wide sm:tracking-widest transition-all cursor-pointer text-center whitespace-nowrap"
          >
            Add To Cart
          </button>

          <button
            onClick={() => {
              addToCart({
                id: selectedBundle.id,
                title: `T-CORE ${selectedBundle.title} (${selectedBundle.name})`,
                price: isSubscription ? selectedBundle.subPrice : selectedBundle.price,
                quantity: quantity,
                isSubscription: isSubscription,
                image: images[0].url
              });
              navigate('/checkout');
            }}
            className="btn-sweep bg-[#D85A1F] hover:bg-[#b94a17] text-white py-2.5 px-4 sm:py-3 sm:px-5 md:py-3.5 md:px-8 rounded-full font-black text-[9px] md:text-xs uppercase tracking-wide sm:tracking-widest transition-all shadow-[0_0_20px_rgba(216,90,31,0.2)] hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap"
          >
            Buy Now
          </button>
        </div>
        
      </div>
    </div>
  </>
);
};

export default HeroBuyBox;

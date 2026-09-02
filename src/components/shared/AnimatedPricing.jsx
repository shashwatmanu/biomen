import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedPricing = ({ mrp, price, quantity = 1, layout = 'left' }) => {
  const priceRef = useRef(null);
  const mrpRef = useRef(null);
  const lineRef = useRef(null);
  const bigLineRef = useRef(null);
  const badgeRef = useRef(null);

  const totalMrp = mrp * quantity;
  const totalPrice = price * quantity;
  const savings = totalMrp - totalPrice;
  const percent = totalMrp > 0 ? Math.round((savings / totalMrp) * 100) : 0;

  useEffect(() => {
    if (!mrp || !price) return;

    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(mrpRef.current, { opacity: 0, y: -10 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.5, y: 15 });
    gsap.set(bigLineRef.current, { scaleX: 0, transformOrigin: "left center", opacity: 1 });
    gsap.set(priceRef.current, { color: "#ffffff" });

    const counterObj = { val: totalMrp };

    tl.to(bigLineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut",
      delay: 0.3 // Show inflated price for a beat
    })
    .to(priceRef.current, {
      color: "#9ca3af", // turn gray momentarily while slashed
      duration: 0.2
    }, "-=0.3")
    .to(bigLineRef.current, {
      opacity: 0,
      scaleY: 2,
      duration: 0.3,
      ease: "power2.out"
    }, "+=0.4") // Hold slash for a moment
    .to(counterObj, {
      val: totalPrice,
      duration: 1.5,
      ease: "expo.out",
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.innerHTML = `₹${Math.round(counterObj.val).toLocaleString('en-IN')}`;
          const progress = tl.progress(); // simple color restore
          if (progress > 0.4) {
            priceRef.current.style.color = "#ffffff";
          }
        }
      }
    }, "-=0.2")
    .to(mrpRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.5)"
    }, "-=1.3")
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=1.1")
    .to(badgeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)"
    }, "-=1.0");

    return () => tl.kill();
  }, [mrp, price, quantity]);

  if (layout === 'center') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80px]">
        <div className="flex flex-col items-center justify-center mb-2">
          <div ref={mrpRef} className="relative text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
            MRP ₹{totalMrp.toLocaleString('en-IN')}
            <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/70" />
          </div>
          <div className="flex items-baseline gap-1 relative">
            <div ref={priceRef} className="text-2.5xl lg:text-2xl font-black text-[#F4F6F2]">
              ₹{totalMrp.toLocaleString('en-IN')}
            </div>
            <div ref={bigLineRef} className="absolute top-[45%] left-[-5%] w-[110%] h-[3px] bg-red-500 rounded-full" />
          </div>
        </div>
        
        <div className="mb-3 overflow-hidden h-[24px] flex items-center mt-1">
          <div ref={badgeRef} className="text-[#16C784] text-[9px] font-black uppercase tracking-widest bg-[#052E22]/60 px-2 py-0.5 rounded-full border border-[#0FA36B]/20 inline-block origin-center shadow-[0_0_15px_rgba(22,199,132,0.2)]">
            Save {percent}% (₹{savings.toLocaleString('en-IN')} Off)
          </div>
        </div>
      </div>
    );
  }

  // Left layout (default for HeroBuyBox)
  return (
    <div className="flex flex-col min-h-[44px]">
      <div className="flex items-baseline gap-2">
        <div ref={mrpRef} className="relative text-xs text-gray-400">
          ₹{totalMrp.toLocaleString('en-IN')}
          <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1.5px] bg-red-500/70" />
        </div>
        <div className="relative">
          <span ref={priceRef} className="text-xl md:text-2xl font-black text-white">
            ₹{totalMrp.toLocaleString('en-IN')}
          </span>
          <div ref={bigLineRef} className="absolute top-[45%] left-[-5%] w-[110%] h-[3px] bg-red-500 rounded-full" />
        </div>
      </div>
      <div className="overflow-hidden h-[20px] mt-1 flex items-center">
        <span ref={badgeRef} className="text-[10px] text-[#16C784] font-black uppercase tracking-wider origin-left bg-[#052E22]/60 px-2 py-0.5 rounded-md border border-[#0FA36B]/20 shadow-[0_0_10px_rgba(22,199,132,0.15)]">
          SAVE ₹{savings.toLocaleString('en-IN')} (-{percent}% OFF)
        </span>
      </div>
    </div>
  );
};

export default AnimatedPricing;

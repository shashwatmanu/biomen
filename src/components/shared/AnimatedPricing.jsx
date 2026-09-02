import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedPricing = ({ mrp, price, quantity = 1, layout = 'left', index = 0 }) => {
  const priceRef = useRef(null);
  const mrpRef = useRef(null);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);
  const stampRef = useRef(null);

  const totalMrp = mrp * quantity;
  const totalPrice = price * quantity;
  const savings = totalMrp - totalPrice;
  const percent = totalMrp > 0 ? Math.round((savings / totalMrp) * 100) : 0;

  useEffect(() => {
    if (!mrp || !price) return;

    // Increase delay between cards and give a longer initial pause (1.5s per index offset + 0.8s base)
    const tl = gsap.timeline({ delay: 0.8 + index * 1.5 });
    
    // Set initial states for entrance animation
    gsap.set(mrpRef.current, { opacity: 0, x: -10 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.8, y: 10 });
    gsap.set(stampRef.current, { opacity: 0, scale: 4, rotation: -30 });

    const counterObj = { val: totalMrp }; // Start counter at MRP

    // 1. Stamp slams down - harder and bigger
    tl.to(stampRef.current, {
      opacity: 1,
      scale: 1.1,
      rotation: -15,
      duration: 0.5,
      ease: "bounce.out" // makes it feel heavy
    })
    // 2. Slight hold, then price scrubs down (slower)
    .to(counterObj, {
      val: totalPrice,
      duration: 1.8, // Slower countdown
      ease: "power2.out",
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.innerHTML = `₹${Math.round(counterObj.val).toLocaleString('en-IN')}`;
          
          const progress = tl.progress();
          const r = Math.round(156 + (255 - 156) * progress);
          const g = Math.round(163 + (255 - 163) * progress);
          const b = Math.round(175 + (255 - 175) * progress);
          priceRef.current.style.color = `rgb(${r}, ${g}, ${b})`;
        }
      }
    }, "+=0.3")
    // 3. MRP strikes out
    .to(mrpRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "back.out(1.5)"
    }, "-=1.2")
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.8")
    // 4. Badge pops in, stamp fades slightly to become a background element
    .to(badgeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.6")
    .to(stampRef.current, {
      opacity: 0.08, // fade it out so it doesn't obstruct text
      scale: 0.95,
      duration: 0.5
    }, "-=0.6");

    return () => tl.kill();
  }, [mrp, price, quantity, index]);

  if (layout === 'center') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80px] relative">
        {/* The Stamp */}
        <div 
          ref={stampRef} 
          className="absolute top-[-30px] right-[-30px] pointer-events-none z-20 border-[5px] border-[#16C784] text-[#16C784] font-black uppercase text-3xl px-3 py-1.5 rounded-xl"
          style={{ textShadow: "0 0 15px rgba(22,199,132,0.6)", boxShadow: "0 0 20px rgba(22,199,132,0.4) inset, 0 0 20px rgba(22,199,132,0.4)" }}
        >
          {percent}% OFF
        </div>

        <div className="flex flex-col items-center justify-center mb-2">
          <div ref={mrpRef} className="relative text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
            MRP ₹{totalMrp.toLocaleString('en-IN')}
            <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/70" />
          </div>
          <div className="flex items-baseline gap-1">
            <div ref={priceRef} className="text-2.5xl lg:text-2xl font-black text-[#F4F6F2]">
              ₹{totalMrp.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
        
        <div className="mb-3 overflow-hidden h-[24px] flex items-center">
          <div ref={badgeRef} className="text-[#16C784] text-[9px] font-black uppercase tracking-widest bg-[#052E22]/60 px-2 py-0.5 rounded-full border border-[#0FA36B]/20 inline-block origin-center">
            Save {percent}% (₹{savings.toLocaleString('en-IN')} Off)
          </div>
        </div>
      </div>
    );
  }

  // Left layout (default for HeroBuyBox)
  return (
    <div className="flex flex-col min-h-[44px] relative">
      {/* The Stamp */}
      <div 
        ref={stampRef} 
        className="absolute top-[-25px] right-[-10px] pointer-events-none z-20 border-[4px] border-[#16C784] text-[#16C784] font-black uppercase text-2xl px-2 py-1 rounded-lg"
        style={{ textShadow: "0 0 12px rgba(22,199,132,0.6)", boxShadow: "0 0 15px rgba(22,199,132,0.4) inset, 0 0 15px rgba(22,199,132,0.4)" }}
      >
        {percent}% OFF
      </div>

      <div className="flex items-baseline gap-1.5">
        <div ref={mrpRef} className="relative text-xs text-gray-400">
          ₹{totalMrp.toLocaleString('en-IN')}
          <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1.5px] bg-red-500/70" />
        </div>
        <span ref={priceRef} className="text-lg font-black text-white">
          ₹{totalMrp.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="overflow-hidden h-[16px] mt-0.5 flex items-center">
        <span ref={badgeRef} className="text-[9px] text-[#16C784] font-black uppercase tracking-wider origin-left">
          SAVE ₹{savings.toLocaleString('en-IN')} (-{percent}% OFF)
        </span>
      </div>
    </div>
  );
};

export default AnimatedPricing;

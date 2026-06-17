import React, { useState, useEffect, useRef } from 'react';
import { X, Gift, ShieldCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';
import API_URL from '../../utils/api';

const EntryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const seen = sessionStorage.getItem('biomen_entry_popup_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('biomen_entry_popup_seen', 'true');
      }, 12000); // 12 seconds delay after loading (golden D2C standard)

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((centerY - y) / centerY) * 4;
    const rotateYVal = ((x - centerX) / centerX) * 4;
    e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
    e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('launch_discount_applied', 'true');
      await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      console.error('Entry popup subscription error:', err);
    }
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* 3D Tilting & Spotlight-Reactive Card Container */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-[1.5px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden transition-all duration-500 bg-white/10 hover:bg-[#16C784]/20 max-w-md md:max-w-lg w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group/spotlight"
        style={{
          transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
          transition: 'transform 0.2s ease-out, background 0.3s ease'
        }}
      >
        {/* Spotlight border glow layer */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
          }}
        />

        {/* Inner Card Container */}
        <div className="relative w-full rounded-[2.4rem] md:rounded-[3.4rem] bg-gradient-to-br from-[#06110C] to-black/95 p-6 xs:p-8 md:p-12 text-center flex flex-col items-center overflow-hidden z-10">
          
          {/* Background Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#0FA36B]/15 rounded-full blur-[80px] pointer-events-none z-0" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D85A1F]/10 rounded-full blur-[80px] pointer-events-none z-0" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white transition-all rounded-full hover:bg-white/10 hover:scale-105 z-50 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {submitted ? (
            <div className="space-y-6 md:space-y-8 py-4 md:py-6 relative z-10 w-full">
              <div className="bg-[#052E22]/60 p-4 rounded-full border border-[#0FA36B]/30 text-[#16C784] w-fit mx-auto shadow-xl">
                <Gift size={36} className="animate-bounce" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider leading-tight">
                  PRIVILEGE UNLOCKED!
                </h3>
                <p className="text-xs md:text-sm text-[#A8B3AA] max-w-sm mx-auto leading-relaxed font-semibold">
                  We've applied the founder discount to your session. Use code below at checkout:
                </p>
              </div>

              <div className="relative group/code py-1">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#16C784]/30 to-[#D85A1F]/30 rounded-xl blur-lg opacity-75 group-hover/code:opacity-100 transition duration-1000 group-hover/code:duration-200"></div>
                <div className="relative bg-[#052E22] text-[#16C784] px-6 py-3.5 rounded-xl border border-[#16C784]/40 font-mono text-lg md:text-xl font-black uppercase tracking-widest shadow-2xl">
                  FOUNDER10
                </div>
              </div>

              <button
                onClick={handleClose}
                className="btn-sweep w-full py-4 bg-[#D85A1F] hover:bg-[#b94a17] text-white font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(216,90,31,0.25)] cursor-pointer"
              >
                Continue to Site
              </button>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-7 my-1 relative z-10 w-full">
              
              {/* Badge Header */}
              <div className="inline-flex items-center gap-2 bg-[#052E22]/80 border border-[#16C784]/30 text-[#16C784] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                <Sparkles size={11} className="text-[#16C784] animate-pulse" />
                LIMITED FOUNDER ACCESS
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl xs:text-3xl md:text-4xl font-black text-[#F4F6F2] uppercase tracking-tight leading-none">
                  Claim Early Batch <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-semibold">Privilege Discount</span>
                </h2>
                
                <div className="inline-block bg-[#D85A1F]/10 border border-[#D85A1F]/30 text-[#D85A1F] px-4 py-1.5 rounded-lg text-sm md:text-base font-black uppercase tracking-wider">
                  🎉 50% + 10% STACKED OFF
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#A8B3AA] leading-relaxed max-w-sm mx-auto font-medium">
                Join the launching cohort today and claim an <strong>extra 10% off</strong> T-CORE. Fully transparent formula, zero fillers.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5 w-full">
                <div className="relative group/input">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#16C784] transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#030705] border border-white/10 focus:border-[#16C784]/50 rounded-xl pl-12 pr-4 py-3.5 md:py-4.5 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#16C784]/20 transition-all font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-sweep w-full py-3.5 md:py-4.5 bg-[#D85A1F] hover:bg-[#b94a17] text-white font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(216,90,31,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Claim Exclusive Discount <ArrowRight size={14} />
                </button>
              </form>

              {/* Security Trust Badge */}
              <div className="flex justify-center items-center gap-2 text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wider pt-1">
                <ShieldCheck size={12} className="text-[#16C784]" />
                <span>Zero Spam &bull; One-Click Unsubscribe</span>
              </div>

              <button
                onClick={handleClose}
                className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 hover:text-white tracking-widest underline underline-offset-4 transition-colors block mx-auto pt-2 cursor-pointer"
              >
                No thanks, I prefer paying full price
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EntryPopup;

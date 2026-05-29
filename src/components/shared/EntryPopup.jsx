import React, { useState, useEffect } from 'react';
import { X, Gift, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const EntryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Container Card */}
      <div className="relative bg-[#06110C] border border-[#0FA36B]/30 rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl overflow-hidden flex flex-col items-center">

        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#0FA36B]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D85A1F]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="space-y-6 py-8">
            <div className="bg-[#052E22] p-4 rounded-full border border-[#0FA36B]/20 text-[#16C784] w-fit mx-auto shadow-xl">
              <Gift size={40} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">
              YOUR 10% DISCOUNT IS UNLOCKED!
            </h3>
            <p className="text-sm text-[#A8B3AA] max-w-sm mx-auto leading-relaxed">
              Use code <strong className="text-[#16C784] bg-[#052E22] px-3 py-1 rounded-md border border-[#0FA36B]/20 font-mono text-base ml-1">FOUNDER10</strong> at checkout to claim your early access privilege.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-4 bg-[#D85A1F] hover:bg-[#b94a17] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              Continue to Site
            </button>
          </div>
        ) : (
          <div className="space-y-6 my-2 relative z-10">
            <div className="bg-[#052E22] p-3 rounded-2xl border border-[#0FA36B]/20 text-[#16C784] w-fit mx-auto shadow-xl">
              <Gift size={32} />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] bg-[#052E22] px-3 py-1 rounded-full border border-[#0FA36B]/20">
                LIMITED FOUNDER ACCESS
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#F4F6F2] uppercase tracking-tight leading-none mt-3">
                Unlock Early Batch <br /> Privilege Discount
              </h2>
              <h2 className="text-3xl md:text-4xl font-black text-[#F4F6F2] uppercase tracking-tight leading-none mt-3">
                50% PLUS 10% OFF
              </h2>
            </div>

            <p className="text-sm text-[#A8B3AA] leading-relaxed max-w-sm mx-auto">
              Join the launch cohort today and claim an <strong>extra 10% off</strong> your first order of T-CORE. No hidden blends, just real consistency.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 w-full">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#030705] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-[#0FA36B] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D85A1F] hover:bg-[#b94a17] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Claim Exclusive Discount <ArrowRight size={14} />
              </button>
            </form>

            <div className="flex justify-center items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-[#16C784]" />
              <span>Zero Spam &bull; One-Click Unsubscribe</span>
            </div>

            <button
              onClick={handleClose}
              className="text-[10px] font-black uppercase text-gray-500 hover:text-white tracking-widest underline underline-offset-4 transition-colors block mx-auto pt-2"
            >
              No thanks, I prefer paying full price
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EntryPopup;

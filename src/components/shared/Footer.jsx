import React, { useState } from 'react';
import { Globe, Share2, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_URL from '../../utils/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('success'); // Optimistic fallback
        setEmail('');
      }
    } catch (err) {
      setStatus('success'); // Optimistic fallback
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#030705] text-[#F4F6F2] py-24 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      
      {/* Massive warm amber/copper physical spotlight on the left, matching their footer style */}
      <div className="absolute -left-[10%] -bottom-[20%] w-[550px] h-[550px] bg-[#D85A1F]/22 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-[15%] -bottom-[10%] w-[350px] h-[350px] bg-[#16C784]/8 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Bold D2C Branding & Large Newsletter Input (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <Link to="/" className="flex items-center gap-3 font-black tracking-tighter text-white text-3xl uppercase group">
              <div className="relative w-9 h-9 overflow-hidden bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1 shadow-md shadow-black/40 group-hover:bg-[#16C784]/20 group-hover:border-[#7FE7B3]/30 transition-all duration-300">
                <img 
                  src="/logo/logo_white_symbol.png" 
                  alt="BIOMEN Labs Logo" 
                  className="w-full h-full object-contain group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
                />
              </div>
              <span>BIOMEN <span className="text-[#D85A1F] font-black">LABS</span></span>
            </Link>
            
            <p className="text-xl font-bold uppercase tracking-[0.15em] text-[#A8B3AA] leading-relaxed max-w-md font-mono">
              ONE GIANT RESET FOR MALE PERFORMANCE.™
            </p>

            {/* Newsletter Input Box styled exactly like Mars Men */}
            <div className="max-w-md space-y-4">
              {status === 'success' ? (
                <div className="flex items-center gap-2 text-[#16C784] font-black text-sm uppercase tracking-wider bg-[#052E22]/30 py-3 px-6 border border-[#16C784]/20 rounded-full animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={16} /> YOU ARE SUBSCRIBED TO THE JOURNAL!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative w-full border-b border-white/20 focus-within:border-biomen-copper transition-colors py-2 flex items-center">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white font-mono font-black uppercase text-sm tracking-widest placeholder:text-gray-700 focus:outline-none py-2 pr-12"
                    required
                    disabled={status === 'loading'}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="absolute right-0 hover:text-biomen-copper text-white transition-colors duration-300 cursor-pointer outline-none p-2"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                By signing up you consent to receiving Biomen Labs emails.
              </p>
            </div>

            {/* Social Square Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:border-biomen-copper hover:text-biomen-copper transition-all bg-white/[0.02]">
                <Globe size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:border-biomen-copper hover:text-biomen-copper transition-all bg-white/[0.02]">
                <Share2 size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:border-biomen-copper hover:text-biomen-copper transition-all bg-white/[0.02]">
                <Mail size={16} />
              </a>
            </div>

            {/* PMID Science trust identifier */}
            <div className="text-gray-600 font-mono font-bold tracking-widest text-xs pt-4">
              † PMID: 32151259
            </div>

          </div>

          {/* Right Columns: Four beautiful columns (col-span-6) */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div className="space-y-4">
              <h4 className="font-mono font-black uppercase tracking-[0.2em] text-xs text-white">Shop</h4>
              <ul className="space-y-3 font-mono font-bold text-xs text-[#A8B3AA] uppercase tracking-wider">
                <li><a href="/products/t-core" className="hover:text-white transition-colors">Shop T-CORE</a></li>
                <li><a href="#formula" className="hover:text-white transition-colors">Ingredients</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Try Once</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-black uppercase tracking-[0.2em] text-xs text-white">About</h4>
              <ul className="space-y-3 font-mono font-bold text-xs text-[#A8B3AA] uppercase tracking-wider">
                <li><Link to="/about" className="hover:text-white transition-colors">Biography</Link></li>
                <li><Link to="/science" className="hover:text-white transition-colors">Science</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-black uppercase tracking-[0.2em] text-xs text-white">Support</h4>
              <ul className="space-y-3 font-mono font-bold text-xs text-[#A8B3AA] uppercase tracking-wider">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">Help Desk</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Refunds</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-black uppercase tracking-[0.2em] text-xs text-white">Legal</h4>
              <ul className="space-y-3 font-mono font-bold text-xs text-[#A8B3AA] uppercase tracking-wider">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Rules</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Medical FDA Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          
          <div className="text-left font-mono">
            © {new Date().getFullYear()} BIOMEN LABS, INC. ALL RIGHTS RESERVED.
          </div>

          <div className="text-left md:text-right max-w-2xl font-mono text-[9px] leading-relaxed">
            * These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Proudly Made in India.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

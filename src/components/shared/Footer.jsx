import React from 'react';
import { ShieldCheck, MapPin, Globe, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#030705] text-[#F4F6F2] py-24 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#052E22]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column with Premium Logo */}
          <div className="md:col-span-6 space-y-6">
            <Link to="/" className="flex items-center gap-3 font-black tracking-tighter uppercase text-white group">
              <div className="relative w-8 h-8 overflow-hidden bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1 shadow-md shadow-black/40 group-hover:bg-[#16C784]/20 group-hover:border-[#7FE7B3]/30 transition-all duration-300">
                <img 
                  src="/logo/logo_white_symbol.png" 
                  alt="BIOMEN Labs Logo" 
                  className="w-full h-full object-contain group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
                />
              </div>
              <span className="text-xl md:text-2xl">BIOMEN <span className="text-[#16C784]">LABS</span></span>
            </Link>
            <p className="text-[#A8B3AA] font-bold uppercase tracking-wider text-xs max-w-sm leading-relaxed">
              Focused biological performance and daily vitality systems for modern Indian men.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#16C784] hover:text-black transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#16C784] hover:text-black transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#16C784] hover:text-black transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Column - 9 exact items requested */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-[#16C784]">Discover</h4>
              <ul className="space-y-3 font-bold text-xs text-[#A8B3AA] uppercase tracking-widest">
                <li><a href="#pricing" className="hover:text-white transition-colors">Shop T-CORE</a></li>
                <li><a href="#formula" className="hover:text-white transition-colors">Ingredients & Formula</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About BIOMEN</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-[#16C784]">Feedback</h4>
              <ul className="space-y-3 font-bold text-xs text-[#A8B3AA] uppercase tracking-widest">
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-[#16C784]">Advisory & Rules</h4>
              <ul className="space-y-3 font-bold text-xs text-[#A8B3AA] uppercase tracking-widest">
                <li><Link to="/ayurvedic-doctor" className="text-[#BFA46A] hover:text-white transition-colors">Dr. Advisory</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Trust Footer Line & Local Markers */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest">
          
          {/* Trust Footer Line & Made in India */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#16C784]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Transparent formulas
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Premium packaging
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Built for disciplined daily use
            </span>
            <span className="flex items-center gap-1.5 text-white underline decoration-[#16C784] decoration-2">
              <MapPin size={14} className="text-[#16C784]" /> Made in India
            </span>
          </div>

          <div className="text-gray-600 font-bold tracking-[0.25em]">
            © {new Date().getFullYear()} BIOMEN LABS. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

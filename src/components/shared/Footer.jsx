import React from 'react';
import { ShieldCheck, MapPin, Globe, Share2, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-6">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase block text-white">
              BIOMEN <span className="text-emerald-500">LABS</span>
            </Link>
            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs max-w-sm leading-relaxed">
              A focused masculine wellness systems for modern Indian men.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Column - 9 exact items requested */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-400">Discover</h4>
              <ul className="space-y-3 font-bold text-xs text-gray-400 uppercase tracking-widest">
                <li><a href="#pricing" className="hover:text-white transition-colors">Shop T-Core</a></li>
                <li><a href="#formula" className="hover:text-white transition-colors">Ingredients & Formula</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About BIOMEN</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-400">Feedback</h4>
              <ul className="space-y-3 font-bold text-xs text-gray-400 uppercase tracking-widest">
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-400">Policies</h4>
              <ul className="space-y-3 font-bold text-xs text-gray-400 uppercase tracking-widest">
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Trust Footer Line & Local Markers */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest">
          
          {/* Trust Footer Line & Made in India */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-emerald-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Transparent formulas
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Premium packaging
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Built for disciplined daily use
            </span>
            <span className="flex items-center gap-1.5 text-white underline decoration-emerald-500 decoration-2">
              <MapPin size={14} className="text-emerald-500" /> Made in India
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

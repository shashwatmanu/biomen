import React from 'react';
import { Mail, ShieldCheck, MapPin, ArrowRight, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase mb-8 block">
              BIOMEN <span className="text-emerald-500">LABS</span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Revolutionizing male vitality through biological optimization and clinical-grade supplementation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Share2 size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-emerald-500">The Protocol</h4>
            <ul className="space-y-4 font-bold text-sm text-gray-400">
              <li><Link to="/products/t-core" className="hover:text-white transition-colors">T-CORE Launch Kit</Link></li>
              <li><Link to="/science" className="hover:text-white transition-colors">Mechanism & Science</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Clinical Feedback</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-emerald-500">Support</h4>
            <ul className="space-y-4 font-bold text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Protocol</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Labs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-emerald-500">Stay Updated</h4>
            <p className="text-gray-400 text-sm font-medium mb-6 leading-relaxed">
              Join the protocol for monthly research updates and early access.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-black rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> FDA Registered Facility</div>
            <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500"/> Non-GMO Formula</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500"/> Made in USA</div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            © 2026 BIOMEN LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

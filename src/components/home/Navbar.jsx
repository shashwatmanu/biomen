import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  // High-end premium lock of background body scrolling when mobile drawer is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center bg-transparent max-w-7xl mx-auto relative">
        
        {/* Left Side: Hamburger Menu Button (visible on mobile/tablet) */}
        <div className="flex lg:hidden items-center z-[250]">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="text-biomen-white hover:text-biomen-accent transition-colors cursor-pointer focus:outline-none p-2 bg-white/5 rounded-full border border-white/10 animate-fade-in"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Logo Container - Symmetrically Centered on Mobile, Standard Left Align on Desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none z-10">
          <Link 
            to="/" 
            onClick={(e) => {
              setIsMenuOpen(false);
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 md:gap-3 font-black tracking-tighter text-biomen-white text-lg xs:text-xl sm:text-2xl md:text-3xl uppercase group"
          >
            <div className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 overflow-hidden bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-md shadow-black/40 group-hover:bg-biomen-green/20 group-hover:border-biomen-accent/30 transition-all duration-300">
              <img 
                src="/logo/logo_white_symbol.png" 
                alt="BIOMEN Labs Logo" 
                className="w-full h-full object-contain group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
              />
            </div>
            <span>BIOMEN <span className="text-biomen-accent transition-colors duration-300 group-hover:text-biomen-mint">LABS</span></span>
          </Link>
        </div>

        {/* Right Side Icons & Links */}
        <div className="flex items-center gap-4 lg:gap-8 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-biomen-white z-10">
          <Link to="/products/t-core" className="hidden lg:block text-[#16C784] hover:text-[#D85A1F] transition-colors font-black">Shop T-CORE</Link>
          <Link to="/science" className="hidden lg:block hover:text-biomen-accent transition-colors">Science</Link>
          <Link to="/ayurvedic-doctor" className="hidden lg:block hover:text-biomen-accent text-biomen-gold transition-colors font-black">Dr. Advisory</Link>
          
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-6 ml-auto">
            <Link to="/contact" className="hover:text-biomen-accent transition-colors p-1.5 xs:p-2 bg-white/5 lg:bg-transparent rounded-full border border-white/10 lg:border-none"><User size={16} /></Link>
            
            <button 
              onClick={toggleCart} 
              className="hover:text-biomen-accent transition-colors relative cursor-pointer outline-none p-1.5 xs:p-2 bg-white/5 lg:bg-transparent rounded-full border border-white/10 lg:border-none"
              aria-label="View shopping cart"
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-biomen-accent text-black text-[11px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-md shadow-black/40">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Navigation Drawer (Portalled globally to escape stacking contexts / backdrop filters) */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className={`fixed inset-0 z-[999] bg-[#030705] transition-all duration-500 ease-in-out lg:hidden px-6 flex flex-col ${
            isMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'
          }`}
        >
          {/* Symmetrical Top Opaque Header inside Drawer for instant close & navigation actions */}
          <div className="w-full py-4 flex justify-between items-center bg-[#030705] border-b border-white/5 relative z-10 shrink-0">
            {/* Close Button mapped to exit instantly */}
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-biomen-white hover:text-biomen-accent transition-colors cursor-pointer focus:outline-none p-2 bg-white/5 rounded-full border border-white/10"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
            
            {/* Centered Brand Link */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1.5 font-black tracking-tighter text-biomen-white text-lg uppercase"
              >
                <div className="relative w-7 h-7 overflow-hidden bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1 shadow-md shadow-black/40">
                  <img 
                    src="/logo/logo_white_symbol.png" 
                    alt="BIOMEN Labs Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>BIOMEN <span className="text-biomen-accent">LABS</span></span>
              </Link>
            </div>
            
            {/* Cart Button inside Drawer */}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                toggleCart();
              }}
              className="text-biomen-white hover:text-biomen-accent transition-colors relative cursor-pointer outline-none p-2 bg-white/5 rounded-full border border-white/10"
              aria-label="View shopping cart"
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-biomen-accent text-black text-[11px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-md shadow-black/40">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Drawer Body Scroll Content */}
          <div className="flex-1 flex flex-col justify-between h-[80%] max-w-lg mx-auto pt-10 pb-8 overflow-y-auto w-full">
            <div className="flex flex-col gap-6 text-left shrink-0">
              <span className="text-[9px] font-black tracking-[0.25em] text-[#16C784] border-b border-white/10 pb-2 mb-1 uppercase">
                MAIN NAVIGATION PROTOCOLS
              </span>
              <Link 
                to="/products/t-core" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-white hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Shop T-CORE
              </Link>
              <Link 
                to="/science" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-white hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Science & Research
              </Link>
              <Link 
                to="/ayurvedic-doctor" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-biomen-gold hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Dr. Advisory
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-white hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Our Story
              </Link>
              <Link 
                to="/faq" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-white hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Help Desk / FAQs
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2.5xl font-black uppercase text-white hover:text-biomen-accent tracking-wider font-serif italic py-1 transition-colors"
              >
                Contact Support
              </Link>
            </div>

            {/* Drawer Bottom CTA Button */}
            <div className="space-y-4 mt-8 shrink-0 pb-4">
              <Link
                to="/products/t-core"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white py-[20px] rounded-full font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.3)] flex items-center justify-center gap-2"
              >
                Unlock Your System Now
              </Link>
              <p className="text-center text-[9px] text-[#A8B3AA] font-black uppercase tracking-wider">
                90-DAY CONFIDENCE MONEY-BACK GUARANTEE
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navbar;

import React, { useRef } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent max-w-7xl mx-auto">
      
      {/* Animated Logo Container */}
      <Link 
        to="/" 
        className="flex items-center gap-3 font-black tracking-tighter text-biomen-white text-2xl md:text-3xl uppercase group"
      >
        <div className="relative w-10 h-10 overflow-hidden bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1.5 shadow-md shadow-black/40 group-hover:bg-biomen-green/20 group-hover:border-biomen-accent/30 transition-all duration-300">
          <img 
            src="/logo/logo_white_symbol.png" 
            alt="BIOMEN Labs Logo" 
            className="w-full h-full object-contain group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
          />
        </div>
        <span>BIOMEN <span className="text-biomen-accent transition-colors duration-300 group-hover:text-biomen-mint">LABS</span></span>
      </Link>
      
      {/* Navigation Links with Increased Text Sizes */}
      <div className="flex items-center gap-6 md:gap-8 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-biomen-white">
        <Link to="/science" className="hidden lg:block hover:text-biomen-accent transition-colors">Science</Link>
        <Link to="/reviews" className="hidden lg:block hover:text-biomen-accent transition-colors">Reviews</Link>
        <Link to="/about" className="hidden lg:block hover:text-biomen-accent transition-colors">About</Link>
        <Link to="/faq" className="hidden lg:block hover:text-biomen-accent transition-colors">Protocol</Link>
        <Link to="/ayurvedic-doctor" className="hidden lg:block hover:text-biomen-accent text-biomen-gold transition-colors font-black">Dr. Advisory</Link>
        
        <div className="flex items-center gap-6 ml-4">
          <Link to="/contact" className="hover:text-biomen-accent transition-colors"><User size={20} /></Link>
          
          <button 
            onClick={toggleCart} 
            className="hover:text-biomen-accent transition-colors relative cursor-pointer outline-none"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-biomen-accent text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-black animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

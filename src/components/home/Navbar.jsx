import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent">
      <Link to="/" className="text-2xl font-black tracking-tighter text-white">BIOMEN <span className="text-emerald-500">LABS</span></Link>
      
      <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white">
        <Link to="/science" className="hidden lg:block hover:text-emerald-500 transition-colors">Science</Link>
        <Link to="/reviews" className="hidden lg:block hover:text-emerald-500 transition-colors">Reviews</Link>
        <Link to="/about" className="hidden lg:block hover:text-emerald-500 transition-colors">About</Link>
        <Link to="/faq" className="hidden lg:block hover:text-emerald-500 transition-colors">Protocol</Link>
        
        <div className="flex items-center gap-6 ml-4">
          <Link to="/contact" className="hover:text-emerald-500 transition-colors"><User size={20} /></Link>
          <button onClick={toggleCart} className="hover:text-emerald-500 transition-colors relative cursor-pointer outline-none">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-black">
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

import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const CartDrawer = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart, closeCart } = useCartStore();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#0a100d]/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/10 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white tracking-wide">YOUR CART</h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.isSubscription}`} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                {/* Image placeholder or actual image */}
                <div className="w-20 h-20 bg-[#1a231d] rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium text-lg leading-tight">{item.title}</h3>
                    {item.isSubscription && (
                      <span className="text-emerald-400 text-xs font-medium px-2 py-0.5 bg-emerald-500/10 rounded-full mt-1 inline-block">
                        Monthly Subscription
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.isSubscription, item.quantity - 1);
                          } else {
                            removeFromCart(item.id, item.isSubscription);
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        {item.quantity > 1 ? <Minus size={14} /> : <Trash2 size={14} />}
                      </button>
                      <span className="text-white text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-white font-bold">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-2xl font-bold text-white">₹{subtotal.toLocaleString()}</span>
            </div>
            
            <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              SECURE CHECKOUT
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
              <span>🔒 Guaranteed Safe & Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

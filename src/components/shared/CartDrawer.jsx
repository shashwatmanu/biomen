import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { items, subtotal: storeSubtotal, checkoutUrl, isCartOpen, toggleCart, updateQuantity, removeFromCart, closeCart } = useCartStore();

  const originalSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const actualSubtotal = storeSubtotal || originalSubtotal;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-full h-[100dvh] bg-biomen-bg-primary/75 backdrop-blur-sm z-[200] transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full h-[100dvh] md:w-[400px] bg-biomen-bg-secondary/95 backdrop-blur-xl z-[250] transform transition-transform duration-300 ease-in-out border-l border-biomen-text-primary/10 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-biomen-text-primary/10">
          <h2 className="text-2xl font-black text-biomen-text-primary tracking-wider uppercase">YOUR CART</h2>
          <button
            onClick={closeCart}
            className="p-2 text-biomen-text-secondary hover:text-biomen-text-primary transition-colors rounded-full hover:bg-biomen-text-primary/5"
            aria-label="Close shopping cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-biomen-text-secondary">
              <p className="text-lg font-bold uppercase tracking-wider">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.isSubscription}`} className="flex gap-4 bg-biomen-text-primary/5 p-4 rounded-xl border border-biomen-text-primary/10">
                {/* Image placeholder or actual image */}
                <div className="w-20 h-20 bg-biomen-bg-primary rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-biomen-text-primary/5">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-biomen-accent/20" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-biomen-text-primary font-black text-sm uppercase tracking-wide leading-snug">{item.title}</h3>
                    {item.isSubscription && (
                      <span className="text-biomen-accent text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-biomen-surface border border-[#0FA36B]/20 rounded-full mt-1 inline-block">
                        Auto-Pay Subscription
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-biomen-bg-primary/40 rounded-lg p-1 border border-biomen-text-primary/5">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.isSubscription, item.quantity - 1);
                          } else {
                            removeFromCart(item.id, item.isSubscription);
                          }
                        }}
                        className="p-1 text-biomen-text-secondary hover:text-biomen-text-primary transition-colors"
                      >
                        {item.quantity > 1 ? <Minus size={14} /> : <Trash2 size={14} />}
                      </button>
                      <span className="text-biomen-text-primary text-sm font-black w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                        className="p-1 text-biomen-text-secondary hover:text-biomen-text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-biomen-text-primary font-black">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] border-t border-biomen-text-primary/10 bg-biomen-bg-primary/40 backdrop-blur-md">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-biomen-text-secondary font-bold uppercase tracking-wider text-xs">Subtotal</span>
                <span className="text-base font-black text-biomen-text-primary">₹{originalSubtotal.toLocaleString()}</span>
              </div>
              {actualSubtotal < originalSubtotal && (
                <div className="flex items-center justify-between text-biomen-accent">
                  <span className="font-bold uppercase tracking-wider text-xs">Discount Applied</span>
                  <span className="font-black">- ₹{(originalSubtotal - actualSubtotal).toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-biomen-text-primary/10">
                <span className="text-biomen-text-secondary font-black uppercase tracking-wider text-sm">Total Due</span>
                <span className="text-2xl font-black text-biomen-text-primary">
                  ₹{actualSubtotal.toLocaleString()}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                closeCart();
                if (checkoutUrl) {
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'InitiateCheckout');
                  }
                  window.location.href = checkoutUrl;
                }
              }}
              className="btn-sweep w-full py-[20px] px-6 bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(216,90,31,0.2)] cursor-pointer"
            >
              SECURE CHECKOUT
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-biomen-text-secondary text-[10px] font-black uppercase tracking-wider">
              <span>🔒 Guaranteed Safe & Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

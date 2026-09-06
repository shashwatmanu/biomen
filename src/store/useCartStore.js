import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCart, addToCart, updateCartLine, removeCartLine, getCart } from '../utils/shopifyClient.js';

const mapShopifyLinesToItems = (lines) => {
  if (!lines || !lines.edges) return [];
  return lines.edges.map(({ node }) => {
    // If merchandise.title is Default Title, we can just use the product title.
    const title = node.merchandise.title === 'Default Title' 
      ? (node.merchandise.product?.title || '') 
      : `${node.merchandise.product?.title ? node.merchandise.product.title + ' - ' : ''}${node.merchandise.title}`;
      
    return {
      id: node.id, // This is the Shopify Line Item ID
      variantId: node.merchandise.id,
      title: title,
      price: parseFloat(node.merchandise.price.amount),
      quantity: node.quantity,
      image: '/Product/1.webp', // We fallback to default image for now
      isSubscription: false
    };
  });
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isCartOpen: false,
      isLoading: false,

      setCartData: (cart) => {
        if (!cart) return;
        set({
          cartId: cart.id,
          checkoutUrl: cart.checkoutUrl,
          items: mapShopifyLinesToItems(cart.lines),
        });
      },

      initCart: async () => {
        const { cartId, setCartData } = get();
        if (cartId) {
          try {
            const cart = await getCart(cartId);
            if (cart) {
              setCartData(cart);
            } else {
              set({ cartId: null, items: [], checkoutUrl: null });
            }
          } catch (e) {
            console.error('Failed to init cart:', e);
          }
        }
      },

      addToCart: async (product) => {
        set({ isLoading: true });
        const { cartId, setCartData, items } = get();
        
        // Find if this variant is already in cart
        const existingItem = items.find(item => item.variantId === product.id);

        try {
          if (!cartId) {
            const cart = await createCart(product.id, product.quantity || 1);
            setCartData(cart);
          } else {
            if (existingItem) {
              // Update line by passing the cart line id
              const cart = await updateCartLine(cartId, existingItem.id, existingItem.quantity + (product.quantity || 1));
              setCartData(cart);
            } else {
              // Add line
              const cart = await addToCart(cartId, product.id, product.quantity || 1);
              setCartData(cart);
            }
          }
          set({ isCartOpen: true });
        } catch (e) {
          console.error('Failed to add to cart:', e);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (id) => {
        set({ isLoading: true });
        const { cartId, setCartData } = get();
        try {
          if (cartId) {
            const cart = await removeCartLine(cartId, [id]);
            setCartData(cart);
          }
        } catch (e) {
          console.error('Failed to remove from cart:', e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (id, isSubscription, newQuantity) => {
        set({ isLoading: true });
        const { cartId, setCartData } = get();
        try {
          if (cartId) {
            if (newQuantity <= 0) {
              const cart = await removeCartLine(cartId, [id]);
              setCartData(cart);
            } else {
              const cart = await updateCartLine(cartId, id, newQuantity);
              setCartData(cart);
            }
          }
        } catch (e) {
          console.error('Failed to update quantity:', e);
        } finally {
          set({ isLoading: false });
        }
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      closeCart: () => set({ isCartOpen: false }),

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
    }),
    {
      name: 'biomen-shopify-cart',
      partialize: (state) => ({ cartId: state.cartId, checkoutUrl: state.checkoutUrl, items: state.items }),
    }
  )
);

export default useCartStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,

      addToCart: (product) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.isSubscription === product.isSubscription
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += product.quantity || 1;
            return { items: updatedItems, isCartOpen: true };
          }

          return {
            items: [...state.items, { ...product, quantity: product.quantity || 1 }],
            isCartOpen: true,
          };
        }),

      removeFromCart: (id, isSubscription) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.isSubscription === isSubscription)
          ),
        })),

      updateQuantity: (id, isSubscription, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.isSubscription === isSubscription
              ? { ...item, quantity: newQuantity }
              : item
          ),
        })),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      closeCart: () => set({ isCartOpen: false }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'biomen-cart-storage',
    }
  )
);

export default useCartStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/store/auth";
import { addToCart, updateCartItem, removeFromCart, clearCart } from "@/actions/cart.actions";

export type CartItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
  stock: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  removeItem: (id: string | number) => void;
  totalItems: () => number;
  subtotal: () => number;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
}

const initialCartItems: CartItem[] = [];

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: initialCartItems,

      setItems: (items) => set({ items }),

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(item => item.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map(item => {
                if (item.id === newItem.id) {
                  const newQuantity = Math.min(item.quantity + newItem.quantity, item.stock);
                  return { ...item, quantity: newQuantity };
                }
                return item;
              })
            };
          }
          const initialQuantity = Math.min(newItem.quantity, newItem.stock);
          return { items: [...state.items, { ...newItem, quantity: initialQuantity }] };
        });
        
        if (useAuthStore.getState().user) {
          addToCart(newItem.id.toString(), newItem.quantity).catch(console.error);
        }
      },

      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQuantity = Math.min(item.quantity + delta, item.stock);
                return { ...item, quantity: newQuantity };
              }
              return item;
            })
            .filter((item) => item.quantity > 0)
        }));

        if (useAuthStore.getState().user) {
          updateCartItem(id.toString(), delta).catch(console.error);
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));

        if (useAuthStore.getState().user) {
          removeFromCart(id.toString()).catch(console.error);
        }
      },

      clearCart: () => {
        set({ items: [] });
        if (useAuthStore.getState().user) {
          clearCart().catch(console.error);
        }
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    }),
    {
      name: "shopping-cart-storage", // name of the item in the storage (must be unique)
    }
  )
);

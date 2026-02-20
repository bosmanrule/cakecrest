"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: {
    size?: string;
    flavor?: string;
    customMessage?: string;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) =>
            i.id === item.id &&
            JSON.stringify(i.options) === JSON.stringify(item.options)
        );

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex].quantity += item.quantity;
          set({ items: newItems });
        } else {
          set({ items: [...items, item] });
        }
      },

      removeItem: (index: number) => {
        set({ items: get().items.filter((_, i) => i !== index) });
      },

      updateQuantity: (index: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(index);
          return;
        }
        const newItems = [...get().items];
        newItems[index].quantity = quantity;
        set({ items: newItems });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "crestfoods-cart",
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  unitType: 'metro' | 'kilo' | 'pieza';
  qty: number;
  unitPrice: number;
  weightKg: number;
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  getTotal: () => number;
  getTotalWeight: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.unitType === item.unitType
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.unitType === item.unitType
                  ? {
                      ...i,
                      qty: i.qty + item.qty,
                      weightKg: i.weightKg + item.weightKg,
                      subtotal: (i.qty + item.qty) * i.unitPrice,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? {
                  ...i,
                  qty,
                  // Escala el peso proporcionalmente para mantener el total coherente.
                  weightKg: i.qty > 0 ? (i.weightKg / i.qty) * qty : i.weightKg,
                  subtotal: qty * i.unitPrice,
                }
              : i
          ),
        })),

      clear: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.subtotal, 0),

      getTotalWeight: () =>
        get().items.reduce((sum, item) => sum + item.weightKg, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.qty, 0),
    }),
    {
      name: 'aceros-cart',
    }
  )
);

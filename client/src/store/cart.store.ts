/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface CartItem {
  _id: string;
  quantity: number;
  totalPrice: number;
  price: number;
}

interface CartState {
  cartItems: CartItem[];
  checkoutItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "totalPrice">) => void;
  updateCart: (id: string, key: keyof CartItem, val: number) => void;
  deleteFromCart: (id: string) => void;
  addCheckoutItems: (item: any) => void;
  clearCart: () => void;
  resetCheckoutItems: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  checkoutItems: [],
  addToCart: (item) => {
    const existingItem = get().cartItems.find((p) => p._id === item._id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.price * (existingItem.quantity + 1),
      };

      set((state) => ({
        cartItems: state.cartItems.map((i) =>
          i._id === item._id ? updatedItem : i
        ),
      }));
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };

      set((state) => ({
        cartItems: [...state.cartItems, newItem],
      }));
    }

    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
  },

  updateCart: (id, key, val) => {
    const updatedCartItems = get().cartItems.map((item) => {
      if (item._id === id) {
        const updatedItem = { ...item, [key]: val };
        if (key === "quantity") {
          updatedItem.totalPrice = updatedItem.price * val;
        }
        return updatedItem;
      }
      return item;
    });

    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  },

  deleteFromCart: (id) => {
    const updatedCartItems = get().cartItems.filter((item) => item._id !== id);
    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.setItem("cartItems", JSON.stringify([]));
  },

  addCheckoutItems: (item) => {
    set((state) => {
      const existingItemIndex = state.checkoutItems.findIndex(
        (existingItem) => existingItem._id === item._id
      );
      if (existingItemIndex !== -1) {
        return {
          checkoutItems: state.checkoutItems.map((existingItem, index) => {
            if (index === existingItemIndex) {
              return {
                ...existingItem,
                quantity: (existingItem.quantity || 1) + 1,
              };
            }
            return existingItem;
          }),
        };
      } else {
        return {
          checkoutItems: [...state.checkoutItems, { ...item, quantity: 1 }],
        };
      }
    });
  },
  resetCheckoutItems: () => set({ checkoutItems: [] }),
}));

export const useCart = () => {
  return useCartStore();
};

export const {
  addToCart,
  updateCart,
  deleteFromCart,
  clearCart,
  addCheckoutItems,
  resetCheckoutItems,
} = useCartStore.getState();

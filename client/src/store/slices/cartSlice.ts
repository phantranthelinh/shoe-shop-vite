import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
}

interface UpdateCartPayload {
  id: string;
  key: string;
  val?: number;
}

interface DeleteFromCartPayload {
  id: string;
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart reducer
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },

    // Update cart reducer
    updateCart: (state, action: PayloadAction<UpdateCartPayload>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            item.totalPrice = item.attributes.price * action.payload.val;
          }
          return {
            ...item,
            [action.payload.key]: action.payload.id,
          };
        } else {
          return item;
        }
      });
    },

    // Delete cart item reducer
    deleteFromCart: (state, action: PayloadAction<DeleteFromCartPayload>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Clear cart reducer
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

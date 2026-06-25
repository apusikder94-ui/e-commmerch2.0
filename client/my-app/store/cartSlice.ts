import { ICart } from "@/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IinitialState {
  cart: ICart[];
}

const initialState: IinitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
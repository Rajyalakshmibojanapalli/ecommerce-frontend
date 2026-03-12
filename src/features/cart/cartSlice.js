import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCartState: (state) => {
      state.cart = null;
    },
  },
});

export const { setCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;
export const selectCartItemsCount = (state) =>
  state.cart.cart?.totalItems || 0;
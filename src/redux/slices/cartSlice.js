import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartList",
  initialState: { cartList: [] },
  reducers: {
    addCartList: (state, action) => {
      state.cartList.push(action.payload);
    },
    clearCartList: (state) => {
      state.cartList = [];
    },
    removeCartItem: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const { addCartList, clearCartList, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;

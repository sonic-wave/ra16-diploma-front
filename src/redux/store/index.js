import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import catalogSlice from "../slices/catalogSlice";
import cartSlice from "../slices/cartSlice";

export const store = configureStore({
    reducer: {
      searchList: searchSlice,
      catalog: catalogSlice,
      cartList: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
  
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { categoryApi } from "./categoryApi";
import { productApi } from "./productApi";
import cartReducer from "./cartSlice"
import { orderApi } from "./orderApi";
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
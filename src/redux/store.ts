import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./categories/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

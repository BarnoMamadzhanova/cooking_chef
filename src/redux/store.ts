import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./categories/categorySlice";
import recipeReducer from "./recipes/recipeSlice";
import userReducer from "./users/userSlice";
import imageReducer from "./images/imageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    recipes: recipeReducer,
    users: userReducer,
    images: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

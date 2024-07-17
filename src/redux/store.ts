import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = (
//   dispatch: AppDispatch,
//   getState: () => RootState
// ) => ReturnType;

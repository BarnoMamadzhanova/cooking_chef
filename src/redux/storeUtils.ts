import { store } from "./store";
import { setAccessToken, setIsAuth } from "./auth/authSlice";

export const updateAccessToken = (newAccessToken: string) => {
  store.dispatch(setAccessToken(newAccessToken));
};

export const setAuthState = (isAuth: boolean) => {
  store.dispatch(setIsAuth(isAuth));
};

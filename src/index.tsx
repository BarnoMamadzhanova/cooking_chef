import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { useAppSelector } from "./redux/hook";
import App from "./App";
import "./styles/index.css";
import { store, RootState } from "./redux/store";
import { setupAxiosInterceptors } from "./api/instance";

const getAccessToken = (state: RootState) => state.auth.accessToken;
const getRefreshToken = (state: RootState) =>
  state.auth.refreshToken ?? localStorage.getItem("refreshToken");

const AppWrapper: React.FC = () => {
  const accessToken = useAppSelector(getAccessToken);
  const refreshToken = useAppSelector(getRefreshToken);

  useEffect(() => {
    setupAxiosInterceptors(
      () => accessToken,
      () => refreshToken
    );
  }, [accessToken, refreshToken]);

  return <App />;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </Provider>
  );
} else {
  console.error("Root element not found");
}

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { useAppSelector } from "./redux/hook";
import App from "./App";
import "./styles/index.css";
import { store, RootState } from "./redux/store";
import { setupAxiosInterceptors } from "./api/instance";

const AppWrapper: React.FC = () => {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  useEffect(() => {
    setupAxiosInterceptors(accessToken ?? undefined);
  }, [accessToken]);

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

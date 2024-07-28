import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const Layout = () => {
  const isAuth = useAppSelector((state: RootState) => !!state.auth.accessToken);

  return (
    <>
      {isAuth && <Header />}
      <main
        className={
          isAuth ? classes.authenticatedContent : classes.unauthenticatedContent
        }
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

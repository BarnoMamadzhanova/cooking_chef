import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.mainContent}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

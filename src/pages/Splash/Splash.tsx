import React from "react";
import classes from "./Splash.module.css";
import { logo_big } from "../../assests/index";

function Splash() {
  return (
    <div className={classes.splash}>
      <img src={logo_big} alt="Loading" />
    </div>
  );
}

export default Splash;

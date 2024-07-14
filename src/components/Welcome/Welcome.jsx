import React from "react";
import classes from "./Welcome.module.css";

function Welcome({ children }) {
  return (
    <div className={classes.welcome}>
      <div className={classes.welcome_content}>{children}</div>
    </div>
  );
}

export default Welcome;

import React from "react";
import classes from "./TextContainer.module.css";

function TextContainer({ children }) {
  return <div className={classes.text_container}>{children}</div>;
}

export default TextContainer;

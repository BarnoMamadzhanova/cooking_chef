import React, { ReactNode } from "react";
import classes from "./TextContainer.module.css";

interface TextContainerProps {
  children: ReactNode;
}

const TextContainer: React.FC<TextContainerProps> = ({ children }) => {
  return <div className={classes.text_container}>{children}</div>;
};

export default TextContainer;

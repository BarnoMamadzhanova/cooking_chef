import React, { ReactNode } from "react";
import classes from "./Welcome.module.css";

interface WelcomeProps {
  children: ReactNode;
}

const Welcome: React.FC<WelcomeProps> = ({ children }) => {
  return (
    <div className={classes.welcome}>
      <div className={classes.welcome_content}>{children}</div>
    </div>
  );
};

export default Welcome;

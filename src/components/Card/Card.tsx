import React, { ReactNode } from "react";
import classes from "./Card.module.css";

interface CardProps {
  image: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ image, children }) => {
  return (
    <div className={classes.card}>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card_img}
      >
        <div className={classes.overlay}>{children}</div>
      </div>
    </div>
  );
};

export default Card;

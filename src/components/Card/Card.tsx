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
        {children}
      </div>
    </div>
  );
};

export default Card;

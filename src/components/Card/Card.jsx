import React from "react";
import classes from "./Card.module.css";

function Card({ image, children }) {
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
}

export default Card;

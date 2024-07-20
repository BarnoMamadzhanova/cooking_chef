import React, { ReactNode } from "react";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  children: ReactNode;
  recipeId: number;
}

const Card: React.FC<CardProps> = ({ image, children, recipeId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${recipeId}`);
  };

  return (
    <div className={classes.card} onClick={handleCardClick}>
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

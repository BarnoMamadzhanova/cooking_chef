import React from "react";
import classes from "./CardGrid.module.css";
import Card from "../Card/Card";
import TextContainer from "../TextContainer/TextContainer";
import { IRecipe } from "../../api/recipes/types";

interface CardGridProps {
  recipes: IRecipe[];
}

const CardGrid: React.FC<CardGridProps> = ({ recipes }) => {
  return (
    <div className={classes.card_grid}>
      {recipes.map((recipe) => (
        <Card key={recipe.id} image={recipe.imageUrl}>
          <TextContainer>
            <div className={classes.title_box}>
              <h4>{recipe.name}</h4>
              <p>{recipe.authorName}</p>
            </div>
            <div className={classes.icon_box}></div>
          </TextContainer>
        </Card>
      ))}
    </div>
  );
};

export default CardGrid;

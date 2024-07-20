import React from "react";
import classes from "./CardGrid.module.css";
import Card from "../Card/Card";
import TextContainer from "../TextContainer/TextContainer";
import { IRecipe } from "../../api/recipes/types";
import { save, like } from "../../assests";

interface CardGridProps {
  recipes: IRecipe[];
}

const CardGrid: React.FC<CardGridProps> = ({ recipes }) => {
  return (
    <div className={classes.card_grid}>
      {recipes.map((recipe) => (
        <Card key={recipe.id} image={recipe.imageUrl} recipeId={recipe.id}>
          <TextContainer>
            <div className={classes.title_box}>
              <h4>{recipe.name}</h4>
              <p>by {recipe.authorName}</p>
            </div>
            <div className={classes.icon_box}>
              <div className={classes.icons}>
                <img src={like} alt="liked" />
                <p>{recipe.likesAmount}</p>
              </div>
              <div className={classes.icons}>
                <img src={save} alt="saved" />
                <p>{recipe.savesAmount}</p>
              </div>
            </div>
          </TextContainer>
        </Card>
      ))}
    </div>
  );
};

export default CardGrid;

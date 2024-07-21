import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchRecipeDetail,
  selectRecipeDetail,
  selectRecipeDetailLoading,
  selectRecipeDetailError,
} from "../../redux/recipes/recipeSlice";
import { time, like, save, back } from "../../assests/index";
import classes from "./Details.module.css";

const Details: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recipeDetail = useAppSelector(selectRecipeDetail);
  const loading = useAppSelector(selectRecipeDetailLoading);
  const error = useAppSelector(selectRecipeDetailError);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeDetail(parseInt(recipeId)));
    }
  }, [dispatch, recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipeDetail) {
    return <div>No details available</div>;
  }

  return (
    <div className={classes.details}>
      <button onClick={() => navigate(-1)} className={classes.backLink}>
        <img src={back} alt="back" />
      </button>
      <img
        src={recipeDetail.imageUrl}
        alt={recipeDetail.name}
        className={classes.image}
      />
      <div className={classes.details_box}>
        <div className={classes.details_title_box}>
          <h2>{recipeDetail.name}</h2>
          <p>by {recipeDetail.author.name}</p>
        </div>
        <div className={classes.details_preparation}>
          <div className={classes.details_time}>
            <img src={time} alt="time" />
            <p>{recipeDetail.preparationTime} min</p>
          </div>
          <p>{recipeDetail.difficulty}</p>
        </div>
        <div className={classes.icon_box}>
          <div className={classes.icons}>
            <img src={like} alt="like" />
            <p>{recipeDetail.likesAmount} likes</p>
          </div>
          <div className={classes.icons}>
            <img src={save} alt="save" />
            <p>{recipeDetail.savesAmount}</p>
          </div>
        </div>
        <div className={classes.info_box}>
          <h4>Description</h4>
          <p>{recipeDetail.description}</p>
        </div>
        <div className={classes.ingredients_box}>
          <h4>Ingredients</h4>
          <ul>
            {recipeDetail.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span>{ingredient.name}</span>
                <span>{ingredient.quantityText}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;

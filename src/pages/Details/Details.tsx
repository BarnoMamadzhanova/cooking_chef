import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchRecipeDetail,
  likeRecipe,
  saveRecipe,
  selectRecipeDetail,
  selectRecipeDetailLoading,
  selectRecipeDetailError,
} from "../../redux/recipes/recipeSlice";
import { time, back } from "../../assests/index";
import classes from "./Details.module.css";

const likeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const saveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M19 21l-7-5-7 5V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v16z" />
  </svg>
);

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

  const handleLike = () => {
    if (recipeDetail) {
      dispatch(likeRecipe({ recipeId: recipeDetail.id }));
      if (recipeDetail.isLikedByUser) {
        localStorage.removeItem(`liked_${recipeDetail.id}`);
      } else {
        localStorage.setItem(`liked_${recipeDetail.id}`, "true");
      }
    }
  };

  const handleSave = () => {
    if (recipeDetail) {
      dispatch(saveRecipe({ recipeId: recipeDetail.id }));
      if (recipeDetail.isSavedByUser) {
        localStorage.removeItem(`saved_${recipeDetail.id}`);
      } else {
        localStorage.setItem(`saved_${recipeDetail.id}`, "true");
      }
    }
  };

  const handleAuthorClick = (authorId: number) => {
    navigate(`/chef/${authorId}`);
  };

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
      <div className={classes.bg_gradient}></div>
      <img
        src={recipeDetail.imageUrl}
        alt={recipeDetail.name}
        className={classes.image}
      />
      <div className={classes.details_box}>
        <div className={classes.details_title_box}>
          <h2>{recipeDetail.name}</h2>
          <p
            onClick={() => handleAuthorClick(recipeDetail.author.id)}
            className={classes.author_name}
          >
            by {recipeDetail.author.name}
          </p>
        </div>
        <div className={classes.details_preparation}>
          <div className={classes.details_time}>
            <img src={time} alt="time" />
            <p>{recipeDetail.preparationTime} min</p>
          </div>
          <p>{recipeDetail.difficulty}</p>
        </div>
        <div className={classes.icon_box}>
          <div
            className={`${classes.icons} ${
              recipeDetail.isLikedByUser ? classes.liked : ""
            }`}
            onClick={handleLike}
          >
            {likeIcon}
            <p>{recipeDetail.likesAmount} likes</p>
          </div>
          <div
            className={`${classes.icons} ${
              recipeDetail.isSavedByUser ? classes.saved : ""
            }`}
            onClick={handleSave}
          >
            {saveIcon}
            <p>{recipeDetail.savesAmount} saves</p>
          </div>
        </div>
        <div className={classes.info_box}>
          <h4>Description</h4>
          <p>{recipeDetail.description}</p>
        </div>
        <div className={classes.ingredients_box}>
          <h4>Ingredients</h4>
          <ul className={classes.ingredients_list}>
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

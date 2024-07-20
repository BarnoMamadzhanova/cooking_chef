import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchRecipeDetail,
  selectRecipeDetail,
  selectRecipeDetailLoading,
  selectRecipeDetailError,
} from "../../redux/recipes/recipeSlice";

const Details: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const dispatch = useAppDispatch();
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
    <div>
      <h1>{recipeDetail.name}</h1>
      <img src={recipeDetail.imageUrl} alt={recipeDetail.name} />
      <p>{recipeDetail.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipeDetail.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantityText} {ingredient.name}
          </li>
        ))}
      </ul>
      <p>Preparation Time: {recipeDetail.preparationTime} minutes</p>
      <p>Difficulty: {recipeDetail.difficulty}</p>
    </div>
  );
};

export default Details;

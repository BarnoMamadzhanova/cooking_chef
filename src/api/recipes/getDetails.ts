import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { IRecipeDetail } from "./types";
import Endpoints from "../endpoints";

export const getRecipeDetails = (
  recipeId: number
): Promise<AxiosResponse<IRecipeDetail>> => {
  const url = Endpoints.RECIPES.DETAILS.replace(
    "{recipeId}",
    recipeId.toString()
  );
  return axiosInstance.get(url);
};

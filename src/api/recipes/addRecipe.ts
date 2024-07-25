import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { ICreateRecipe, IRecipeDetail } from "./types";
import Endpoints from "../endpoints";

export const addRecipe = (
  recipeData: ICreateRecipe
): Promise<AxiosResponse<IRecipeDetail>> => {
  return axiosInstance.post(Endpoints.RECIPES.CREATE, recipeData, {
    headers: { "Content-Type": "application/json" },
  });
};

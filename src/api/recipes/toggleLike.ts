import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import Endpoints from "../endpoints";

export const toggleLike = (
  recipeId: number
): Promise<AxiosResponse<string>> => {
  const url = Endpoints.RECIPES.LIKE.replace("{recipeId}", recipeId.toString());
  return axiosInstance.post(url);
};

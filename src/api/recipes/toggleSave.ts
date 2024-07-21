import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import Endpoints from "../endpoints";

export const toggleSave = (
  recipeId: number
): Promise<AxiosResponse<string>> => {
  const url = Endpoints.RECIPES.SAVE.replace("{recipeId}", recipeId.toString());
  return axiosInstance.post(url);
};

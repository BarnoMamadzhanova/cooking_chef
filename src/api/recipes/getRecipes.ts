import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { IRecipeParams, IRecipeResponse } from "./types";
import Endpoints from "../endpoints";

export const getCategories = (
  params: IRecipeParams
): Promise<AxiosResponse<IRecipeResponse>> => {
  return axiosInstance.get(Endpoints.RECIPES.RECIPES_LIST, { params });
};

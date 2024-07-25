import axiosInstance from "../instance";
import { IRecipeResponse } from "../recipes/types";
import Endpoints from "../endpoints";

export const getSavedRecipes = async (
  page: number = 0,
  size: number = 10
): Promise<IRecipeResponse> => {
  const response = await axiosInstance.get<IRecipeResponse>(
    Endpoints.USERS.GET_SAVED,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};

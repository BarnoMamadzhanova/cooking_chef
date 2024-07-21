import axiosInstance from "../instance";
import { IRecipeResponse } from "../recipes/types";

export const getSavedRecipes = async (
  page: number = 0,
  size: number = 10
): Promise<IRecipeResponse> => {
  const response = await axiosInstance.get<IRecipeResponse>(
    "/v1/users/me/recipes/saved",
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};

import axiosInstance from "../instance";
import { IRecipeResponse } from "../recipes/types";
import Endpoints from "../endpoints";

export const getUserRecipes = async (
  page: number = 0,
  size: number = 10
): Promise<IRecipeResponse> => {
  const response = await axiosInstance.get<IRecipeResponse>(
    Endpoints.USERS.GET_USER_RECIPES,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};

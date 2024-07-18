import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { ICategory, INewCategory } from "./types";
import Endpoints from "../endpoints";

export const addCategory = (
  newCategory: INewCategory
): Promise<AxiosResponse<ICategory>> => {
  return axiosInstance.post(Endpoints.CATEGORIES.NEW_CATEGORY, newCategory);
};

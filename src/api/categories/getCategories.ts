import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { ICategory } from "./types";
import Endpoints from "../endpoints";

export const getCategories = (): Promise<AxiosResponse<ICategory[]>> => {
  return axiosInstance.get(Endpoints.CATEGORIES.CATEGORIES_LIST);
};

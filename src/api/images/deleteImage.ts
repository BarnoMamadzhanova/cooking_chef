import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import Endpoints from "../endpoints";

export const deleteImage = (
  imageId: number
): Promise<AxiosResponse<string>> => {
  const url = Endpoints.IMAGE.DELETE.replace("{imageId}", imageId.toString());
  return axiosInstance.delete(url);
};

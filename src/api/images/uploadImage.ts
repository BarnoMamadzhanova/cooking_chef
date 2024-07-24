import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { IImage, IUploadedImage } from "./types";
import Endpoints from "../endpoints";

export const uploadImage = (
  imageData: IImage
): Promise<AxiosResponse<IUploadedImage>> => {
  return axiosInstance.post(Endpoints.IMAGE.UPLOAD, imageData);
};

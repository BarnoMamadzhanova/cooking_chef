import axiosInstance from "../instance";
import { AxiosResponse } from "axios";
import { IUploadedImage, IImageRequest } from "./types";
import Endpoints from "../endpoints";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const uploadImage = (
  imageData: IImageRequest
): Promise<AxiosResponse<IUploadedImage>> => {
  return axiosInstance.post(Endpoints.IMAGE.UPLOAD, imageData, {
    headers: { "Content-Type": "application/json" },
  });
};

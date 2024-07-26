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

export const fileToBlob = (file: File) => {
  return new Blob([JSON.stringify(file)], { type: "application/json" });
};

export const uploadImage = (
  imageData: IImageRequest
): Promise<AxiosResponse<IUploadedImage>> => {
  console.log(imageData.file);
  return axiosInstance.post(
    Endpoints.IMAGE.UPLOAD,
    imageData.file
    //   {
    //   headers: { "Content-Type": "application/json" },
    // }
  );
};

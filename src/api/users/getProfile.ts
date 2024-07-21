import axiosInstance from "../instance";
import { IUserProfile } from "./types";

export const getProfile = async (): Promise<IUserProfile> => {
  const response = await axiosInstance.get<IUserProfile>("/v1/users/me");
  return response.data;
};

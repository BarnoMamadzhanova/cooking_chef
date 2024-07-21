import axiosInstance from "../instance";
import { IUserProfile } from "./types";

export const getUserById = async (userId: number): Promise<IUserProfile> => {
  const response = await axiosInstance.get<IUserProfile>(`/v1/users/${userId}`);
  return response.data;
};

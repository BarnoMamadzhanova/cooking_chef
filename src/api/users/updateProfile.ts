import axiosInstance from "../instance";
import { IUpdateUserProfile, IUserProfile } from "./types";

export const updateProfile = async (
  data: IUpdateUserProfile
): Promise<IUserProfile> => {
  const response = await axiosInstance.patch<IUserProfile>(
    "/v1/users/me",
    data
  );
  return response.data;
};

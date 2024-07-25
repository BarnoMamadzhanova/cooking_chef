import axiosInstance from "../instance";
import { IUpdateUserProfile, IUserProfile } from "./types";
import Endpoints from "../endpoints";

export const updateProfile = async (
  data: IUpdateUserProfile
): Promise<IUserProfile> => {
  try {
    const response = await axiosInstance.patch<IUserProfile>(
      Endpoints.USERS.UPDATE_PROFILE,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

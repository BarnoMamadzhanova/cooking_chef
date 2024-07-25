import axiosInstance from "../instance";
import { IUserProfile } from "./types";
import Endpoints from "../endpoints";

export const getProfile = async (): Promise<IUserProfile> => {
  const response = await axiosInstance.get<IUserProfile>(
    Endpoints.USERS.USER_PROFILE
  );
  return response.data;
};

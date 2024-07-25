import axiosInstance from "../instance";
import { IUserProfile } from "./types";
import Endpoints from "../endpoints";

export const getUserById = async (userId: number): Promise<IUserProfile> => {
  const response = await axiosInstance.get<IUserProfile>(
    Endpoints.USERS.USER_BY_ID.replace("{userId}", userId.toString())
  );
  return response.data;
};

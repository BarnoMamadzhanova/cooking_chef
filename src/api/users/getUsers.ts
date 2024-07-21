import axiosInstance from "../instance";
import { IUserListResponse } from "./types";

export const getUsers = async (
  searchTerm?: string,
  page: number = 0,
  size: number = 10
): Promise<IUserListResponse> => {
  const response = await axiosInstance.get<IUserListResponse>("/v1/users", {
    params: {
      searchTerm,
      page,
      size,
    },
  });
  return response.data;
};

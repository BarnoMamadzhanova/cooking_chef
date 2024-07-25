import axiosInstance from "../instance";
import { IUserListResponse } from "./types";
import Endpoints from "../endpoints";

export const getUsers = async (
  searchTerm?: string,
  page: number = 0,
  size: number = 10
): Promise<IUserListResponse> => {
  const response = await axiosInstance.get<IUserListResponse>(
    Endpoints.USERS.USERS_LIST,
    {
      params: {
        searchTerm,
        page,
        size,
      },
    }
  );
  return response.data;
};

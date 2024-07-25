import axiosInstance from "../instance";
import Endpoints from "../endpoints";

export const followUser = async (userId: number): Promise<void> => {
  await axiosInstance.post(
    Endpoints.USERS.FOLLOW_USER.replace("{userId}", userId.toString())
  );
};

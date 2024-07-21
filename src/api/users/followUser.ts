import axiosInstance from "../instance";

export const followUser = async (userId: number): Promise<void> => {
  await axiosInstance.post(`/v1/users/${userId}/follow`);
};

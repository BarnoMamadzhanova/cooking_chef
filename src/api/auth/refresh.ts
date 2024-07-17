import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IRefreshTokenRequest, IRefreshTokenResponse } from "./types";

export const refreshAccessToken = (
  params: IRefreshTokenRequest
): AxiosPromise<IRefreshTokenResponse> =>
  axiosInstance.post(Endpoints.AUTH.REFRESH, params);

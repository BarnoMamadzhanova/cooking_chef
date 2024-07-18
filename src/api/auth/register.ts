import axiosInstance from "../instance";
import { AxiosPromise } from "axios";
import { IRegisterRequest, IRegisterResponse } from "./types";
import Endpoints from "../endpoints";

export const register = (
  params: IRegisterRequest
): AxiosPromise<IRegisterResponse> =>
  axiosInstance.post(Endpoints.AUTH.REGISTER, params);

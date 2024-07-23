import { Alert } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import AppConfig from "../../config/appConfig";
import { HttpResponse } from "../entities/httpResponse";

export abstract class ServiceBase {
  config = AppConfig;
  abstract prefix?: string;

  private async sendRequest<ResponseObject>(config: AxiosRequestConfig) {
    try {
      const res: HttpResponse<ResponseObject> = (
        await axios({
          ...config,
          baseURL: AppConfig.serverUrl + this.prefix,
          withCredentials: true,
        })
      ).data;
      if (!res.isSuccessfull) throw new Error("request failed");
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 401) throw new Error("Unauthorized");
      else {
        toast(
          `${
            err?.response?.data?.cause ||
            "Unkown error, please refresh your page"
          }`,
          {
            type: "error",
          }
        );
        throw err;
      }
    }
  }

  protected get<ResponseObject>(path: string = "", data: any = {}) {
    return this.sendRequest<ResponseObject>({
      method: "GET",
      url: path,
      data,
    });
  }

  protected post<ResponseObject>(
    path: string = "",
    data: any = {},
    headers?: any
  ) {
    return this.sendRequest<ResponseObject>({
      method: "POST",
      url: path,
      data,
      headers,
    });
  }

  protected patch<ResponseObject>(path: string = "", data: any = {}) {
    return this.sendRequest<ResponseObject>({
      method: "PATCH",
      url: path,
      data,
    });
  }

  protected put<ResponseObject>(path: string = "", data: any = {}) {
    return this.sendRequest<ResponseObject>({
      method: "PUT",
      url: path,
      data,
    });
  }

  protected delete<ResponseObject>(path: string = "", data: any = {}) {
    return this.sendRequest<ResponseObject>({
      method: "DELETE",
      url: path,
      data,
    });
  }

  protected fetch(path: string = "", config: RequestInit) {
    return fetch(AppConfig.serverUrl + this.prefix + path, {
      ...config,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  }
}

import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.102:5183/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async (config: AxiosRequestConfig) => {
  return instance({
    ...config,
  });
};

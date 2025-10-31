import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://sportspacevn.somee.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async (config: AxiosRequestConfig) => {
  return instance({
    ...config,
  });
};

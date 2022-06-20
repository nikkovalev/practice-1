import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store/store";
import Router from "next/router";

import { showAlert } from "@/store/reducers/alert/alertSlice";
import { logout } from "@/store/reducers/auth/authSlice";

const baseURL: string = process.env.API_BASE_URL || "";

export const http = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": `${baseURL}`,
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token") || "";
  (config.headers as any).Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (success: AxiosResponse) => success,
  (
    error: AxiosError<{
      error: string;
      message: string;
      statusCode: number;
    }>
  ) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(showAlert({ text: "Авторизуйтесь", type: "error" }));
      Router.push("/auth");
    }
    store.dispatch(
      showAlert({ text: error.response?.data?.message || error.message, type: "error" })
    );
    throw error.response?.data;
  }
);

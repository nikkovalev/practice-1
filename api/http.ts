import axios, { AxiosError } from "axios";

const baseURL: string = process.env.API_BASE_URL || "";

export const http = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": `${baseURL}`,
    "Content-Type": "application/json",
    // Authorization: `Bearer ${Cookie.get("token")}`,
  },
});

http.interceptors.request.use(
  (success) => {
    return success;
  },
  (error) => {
    if (error.response.status === 401) {
      const respError = error as Error | AxiosError;
      if (axios.isAxiosError(respError)) {
        console.warn("Произошла серверная ошибка!", respError.code);
      } else {
        console.warn("Произошла ошибка в коде!", respError.message);
      }
    }
    throw error;
  }
);

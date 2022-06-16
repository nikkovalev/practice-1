// import { Cookie } from "@helpers/help";
import axios, { AxiosError } from "axios";

const baseURL: string = process.env.API_BASE_URL || "";

export const api = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": `${baseURL}`,
    "Content-Type": "application/json",
    // Authorization: `Bearer ${Cookie.get("token")}`,
  },
});

api.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    // Unauthorized 401
    if (error.response.status === 401) {
      const respError = error as Error | AxiosError;
      // TODO: development logs, remove after
      // TODO: Добавить всплывающее уведомление для пользователя
      if (axios.isAxiosError(respError)) {
        console.warn("Произошла серверная ошибка!", respError.code);
      } else {
        console.warn("Произошла ошибка в коде!", respError.message);
      }
    }
    return error;
  }
);

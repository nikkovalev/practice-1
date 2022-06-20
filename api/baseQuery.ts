import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token") || "";
    headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

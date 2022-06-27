import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Router from "next/router";
import { toast } from "react-toastify";

import { TypeRootState } from "@/store/store";

import { logout } from "@/store/auth/authSlice";

const query = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as TypeRootState)?.auth.token;
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await query(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
      Router.push("/auth");
    }
    toast.error((result.error.data as any).message, { toastId: "api_toast" });
  }
  return result;
};

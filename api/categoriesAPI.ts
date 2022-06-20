import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

import { ICategory } from "@/models/ICategory";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery,
  endpoints: (builder) => ({
    fetchCategories: builder.query<ICategory[], boolean>({
      query: (isFull) => ({
        url: "/categories",
        params: {
          full: isFull,
        },
      }),
    }),
    fetchLikedServices: builder.query<ICategory[] | number[], boolean>({
      query: (raw) => ({
        url: "/categories/liked-services",
        params: {
          raw,
        },
      }),
    }),
  }),
});

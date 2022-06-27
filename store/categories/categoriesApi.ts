import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { ICategory } from "@/models/ICategory";

export const categoriesApi = createApi({
  reducerPath: "api/categories",
  baseQuery,
  endpoints: (build) => ({
    fetchCategories: build.query<ICategory[], boolean>({
      query: (isFull) => `/categories?full=${isFull}`,
    }),
    fetchLikedServices: build.query<ICategory[] | number[], boolean>({
      query: (isPlain) => `/categories/liked-services?raw=${isPlain}`,
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchLikedServicesQuery } = categoriesApi;

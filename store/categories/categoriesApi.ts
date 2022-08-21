import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { ICategory } from "@/models/ICategory";
import { IOffer } from "@/models/IOffer";
import { IFilterData } from "@/models/IFilterData";

export const categoriesApi = createApi({
  reducerPath: "api/categories",
  baseQuery,
  endpoints: (build) => ({
    fetchCategories: build.query<ICategory[], boolean>({
      query: (isFull) => `/categories?full=${isFull}`,
    }),
    fetchOffers: build.mutation<IOffer[], IFilterData>({
      query: (params) => {
        const queryString = new URLSearchParams(params as any).toString();
        return {
          url: `/offers?${queryString}`,
        };
      },
    }),
    search: build.mutation<ICategory[], string>({
      query: (query) => ({
        url: `/categories/search?query=${query}`,
        method: "GET",
      }),
    }),
    createEditOffer: build.mutation<undefined, Partial<IOffer>>({
      query: (data) => ({
        url: `/offers${data.id ? `/${data.id}` : ""}`,
        method: data.id ? "PATCH" : "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchOffersMutation,
  useSearchMutation,
  useCreateEditOfferMutation,
} = categoriesApi;

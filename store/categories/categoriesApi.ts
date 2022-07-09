import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { ICategory } from "@/models/ICategory";
import { IGetOffer, IOffer } from "@/models/IOffer";

export const categoriesApi = createApi({
  reducerPath: "api/categories",
  baseQuery,
  tagTypes: ["liked-services"],
  endpoints: (build) => ({
    fetchCategories: build.query<ICategory[], boolean>({
      query: (isFull) => `/categories?full=${isFull}`,
    }),
    fetchLikedServices: build.query<ICategory[] | number[], boolean>({
      query: (isPlain) => `/categories/liked-services?raw=${isPlain}`,
      providesTags: ["liked-services"],
    }),
    fetchOffers: build.mutation<IOffer[], IGetOffer>({
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
    likeService: build.mutation<undefined, number>({
      query: (id) => ({
        url: `/categories/like-service/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["liked-services"],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchLikedServicesQuery,
  useFetchOffersMutation,
  useSearchMutation,
  useLikeServiceMutation,
} = categoriesApi;

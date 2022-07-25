import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { IAuthReg, IAuthLogin } from "@/models/IAuth";
import { IUser } from "@/models/IUser";
import { ICategory } from "@/models/ICategory";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery,
  tagTypes: ["liked-services"],
  endpoints: (build) => ({
    registerUser: build.mutation<{ id: number }, IAuthReg>({
      query: (data) => ({
        url: "/auth/reg",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: build.mutation<{ token: string; tfa: boolean }, IAuthLogin>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getMe: build.query<IUser, "">({
      query: () => "/auth/me",
      providesTags: ["liked-services"],
    }),
    get2faCode: build.mutation<{ token: string }, "">({
      query: () => ({
        url: "/2fa/code",
        method: "GET",
      }),
    }),
    login2fa: build.mutation<{ token: string }, string>({
      query: (code) => ({
        url: `/auth/2fa?code=${code}`,
        method: "POST",
      }),
    }),
    updateProfileAvatar: build.mutation<{ avatarURL: string }, FormData>({
      query: (formData) => ({
        url: "/profile/set/photo",
        method: "PUT",
        body: formData,
      }),
    }),
    updateProfileEmail: build.mutation<undefined, string>({
      query: (email) => ({
        url: "/profile/set/email",
        method: "PUT",
        body: {
          email,
        },
      }),
    }),
    getUser: build.query<IUser, number>({
      query: (id) => `/profile/${id}`,
    }),
    fetchLikedServices: build.query<ICategory[] | number[], boolean>({
      query: (isPlain) => `/categories/liked-services?raw=${isPlain}`,
      providesTags: ["liked-services"],
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
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMeQuery,
  useGet2faCodeMutation,
  useLogin2faMutation,
  useUpdateProfileAvatarMutation,
  useUpdateProfileEmailMutation,
  useGetUserQuery,
  useFetchLikedServicesQuery,
  useLikeServiceMutation,
} = authApi;

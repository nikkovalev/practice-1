import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { IAuthReg, IAuthLogin } from "@/models/IAuth";
import { IUser } from "@/models/IUser";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery,
  endpoints: (build) => ({
    registerUser: build.mutation<{ id: string }, IAuthReg>({
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
} = authApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/api/fetchBaseQuery";

import { IChat, IMessage } from "@/models/IChat";

export const chatApi = createApi({
  reducerPath: "api/chat",
  baseQuery,
  endpoints: (build) => ({
    fetchChatMessages: build.mutation<IMessage[], { chatId: "GLOBAL" | number; page: number }>({
      query: ({ chatId, page }) => ({
        url: `/chat/${chatId}/messages?page=${page}`,
        method: "GET",
      }),
    }),
    fetchChats: build.query<IChat[], void>({
      query: () => "/chat/list",
    }),
    fetchLastMessage: build.query<IMessage, number>({
      query: (id) => `/chat/${id}/messages/last`,
    }),
  }),
});

export const { useFetchChatMessagesMutation, useFetchChatsQuery, useFetchLastMessageQuery } =
  chatApi;

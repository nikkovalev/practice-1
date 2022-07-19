import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Router from "next/router";

import { useFetchChatMessagesMutation } from "@/store/chat/chatApi";

import { IMessage } from "@/models/IChat";
import { IUser } from "@/models/IUser";

export const useChat = (
  to: "GLOBAL" | number | string | undefined = 3,
  token: string,
  me: IUser,
  setOnline: Dispatch<SetStateAction<boolean>>
) => {
  const socketRef = useRef<Socket | null>(null);
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);
  const [chatId, setChatId] = useState<"GLOBAL" | number | null>(null);
  const [fetchMessages, { data: messages, isLoading }] = useFetchChatMessagesMutation();

  const sendMessage = (message: string) => {
    setCurrentMessages((prev) => [
      { id: Date.now(), type: 0, from: me.id, sentDate: new Date().toISOString(), text: message },
      ...prev,
    ]);
    socketRef.current?.emit("send", {
      chat: chatId,
      message,
    });
  };

  useEffect(() => {
    socketRef.current = io(process.env.API_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  useEffect(() => {
    if (!to || !socketRef.current) return;
    const socket = socketRef.current;
    socket.emit("join", {
      to,
    });
    socket.on("join_info", (data: { chat: number }) => setChatId(data.chat));
    socket.on("message", (message: IMessage) =>
      setCurrentMessages((prev) => [
        { ...message, id: Date.now(), type: 0, sentDate: new Date().toISOString() },
        ...prev,
      ])
    );
    socket.on("online", (data) => setOnline(data.online));

    return () => {
      socket.emit("leave", me.id);
    };
  }, [to, socketRef, setOnline]);

  useEffect(() => {
    if (chatId) fetchMessages({ chatId, page: 1 });
  }, [chatId, fetchMessages]);

  useEffect(() => {
    if (messages) setCurrentMessages(messages);
  }, [messages]);

  return { messages: currentMessages, sendMessage, isLoading, activeChatId: chatId };
};

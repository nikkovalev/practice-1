import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { useChat } from "@/hooks/useChat";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { useGetUserQuery } from "@/store/auth/authApi";
import { useFetchChatsQuery } from "@/store/chat/chatApi";

import { IUser } from "@/models/IUser";

import { ChatDialogs } from "./ChatDialogs";
import { ChatForm } from "./ChatForm";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";

import styles from "./Chat.module.scss";

interface IChat {
  variant: "global" | "user" | "full";
  height?: number;
  width?: number | string;
  to?: "GLOBAL" | number | string;
}

export const Chat: FC<IChat> = ({ variant, width, height, to: initialTo }) => {
  const [online, setOnline] = useState<boolean>(false);
  const { user: me } = useAppSelector((state) => state.auth);
  const [to, setTo] = useState<"GLOBAL" | number | string | undefined>(initialTo);
  const { token } = useAppSelector((state) => state.auth);
  const { messages, sendMessage, isLoading, activeChatId } = useChat(
    to,
    token,
    me as IUser,
    setOnline
  );
  const { data: user } = useGetUserQuery(to as number, { skip: to === "GLOBAL" || !to });
  const currentUser: IUser | null = initialTo === "GLOBAL" ? me : (user as any | null);
  const { data: chats } = useFetchChatsQuery(undefined, { skip: variant !== "full" });

  useEffect(() => setTo(initialTo), [initialTo]);

  return (
    <div className={styles.chat} style={{ height }}>
      {variant === "full" && !!me && (
        <ChatDialogs chats={chats} activeChatId={activeChatId} me={me} />
      )}
      <div className={styles.chatRight} style={{ width }}>
        {!!to && !!user && (
          <ChatHeader
            isFull={variant === "full"}
            variant={variant}
            user={currentUser}
            online={online}
          />
        )}
        <ChatMessages messages={messages} me={me} isSelectChat={!!to} isLoading={isLoading} />
        {!!to && !!user && <ChatForm variant={variant} sendMessage={sendMessage} />}
      </div>
    </div>
  );
};

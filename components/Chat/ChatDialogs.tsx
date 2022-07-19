import React, { FC } from "react";
import cn from "classnames";

import { IChat } from "@/models/IChat";
import { IUser } from "@/models/IUser";

import { ChatDialog } from "./ChatDialog";

import styles from "./Chat.module.scss";

interface IChatDialogs {
  chats: IChat[] | undefined;
  activeChatId: "GLOBAL" | number | null;
  me: IUser;
}

export const ChatDialogs: FC<IChatDialogs> = ({ chats, activeChatId, me }) => {
  return (
    <div className={cn("custom_scrollbar", styles.chatDialogs)}>
      {!!chats &&
        chats.map((chat) => (
          <ChatDialog key={chat.id} chat={chat} isActive={chat.id === activeChatId} me={me} />
        ))}
    </div>
  );
};

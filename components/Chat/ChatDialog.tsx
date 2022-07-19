import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { getDate } from "@/helpers/date";
import { url } from "@/helpers/url";

import { useFetchLastMessageQuery } from "@/store/chat/chatApi";
import { useGetUserQuery } from "@/store/auth/authApi";

import { IChat } from "@/models/IChat";
import { IUser } from "@/models/IUser";

import anonymous from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";

interface ChatDialog {
  chat: IChat;
  isActive: boolean;
  me: IUser;
}

export const ChatDialog: FC<ChatDialog> = ({ chat, isActive, me }) => {
  const { data: lastMessage } = useFetchLastMessageQuery(chat.id);
  const { data: user } = useGetUserQuery(me.id === chat.firstId ? chat.secondId : chat.firstId, {
    skip: !lastMessage?.id,
  });

  if (!lastMessage?.id) return null;

  return (
    <Link key={chat.id} href={`/chats/${chat.firstId === me.id ? chat.secondId : chat.firstId}`}>
      <div className={cn(styles.chatDialog, { [styles.chatDialogActive]: isActive })}>
        <div className={styles.chatDialogIndicator} />
        <div
          className={cn("avatar flex-shrink-0", { online: user?.online })}
          style={{ backgroundImage: url(user?.photoUrl ? user?.photoUrl : anonymous.src) }}
        />
        <div className={styles.chatDialogInfo}>
          <div>
            <b className="text-ellipsis">{user?.username}</b>
            <time>{getDate(lastMessage.sentDate, "hh:mm")}</time>
          </div>
          <span className="text-ellipsis">{lastMessage.text}</span>
        </div>
      </div>
    </Link>
  );
};

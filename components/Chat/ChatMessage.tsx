import React, { FC } from "react";
import cn from "classnames";
import { getDate } from "@/helpers/date";

import { IMessage } from "@/models/IChat";
import { IUser } from "@/models/IUser";

import styles from "./Chat.module.scss";

interface IChatMessages {
  message: IMessage;
  me: IUser;
}

export const ChatMessage: FC<IChatMessages> = ({ message, me }) => {
  const isMe =
    typeof message.from === "object"
      ? message.from.username === me.username
      : message.from === me.id;
  const formattedDate = getDate(message.sentDate, "dd.MM.yy HH:mm");

  return (
    <div
      className={cn(styles.chatMessage, {
        [styles.chatMessageRight]: isMe,
      })}
    >
      <div>
        <span>{isMe ? "Вы" : "Продавец"}</span>
        <time>{formattedDate}</time>
      </div>
      <div className={cn(styles.chatMessageText, { [styles.chatMessageTextDark]: isMe })}>
        {message.text}
      </div>
    </div>
  );
};

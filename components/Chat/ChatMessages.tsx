import React, { FC, Fragment } from "react";
import cn from "classnames";
import { getDate } from "@/helpers/date";

import { IMessage } from "@/models/IChat";
import { IUser } from "@/models/IUser";

import { Loader } from "../loader/Loader";
import { ChatMessage } from "./ChatMessage";

import styles from "./Chat.module.scss";

interface IChatMessages {
  messages: IMessage[];
  me: IUser | null;
  isLoading: boolean;
  isSelectChat: boolean;
}

export const ChatMessages: FC<IChatMessages> = ({ messages, me, isLoading, isSelectChat }) => {
  let currentDate = "";

  return (
    <div
      className={cn("custom_scrollbar", styles.chatMessages, {
        "border-r-2 border-gray-500": !messages.length,
      })}
    >
      {(!me || !messages.length || !isSelectChat) && (
        <div className={styles.chatEmpty}>
          {(isLoading || !me) && !!isSelectChat && <Loader />}
          {(!messages.length || !isSelectChat) && (
            <span>{!isSelectChat ? "Выберите чат" : "Сообщений пока нет"}</span>
          )}
        </div>
      )}
      {!!messages.length &&
        !!me &&
        messages.map((m) => {
          const groupDate = getDate(m.sentDate, "dd MMMM");
          let isShowGroupDate = false;

          if (currentDate !== groupDate) {
            isShowGroupDate = true;
            currentDate = groupDate;
          }

          return (
            <Fragment key={m.id}>
              {isShowGroupDate && (
                <div className={styles.chatMessagesDate}>
                  <time>{currentDate}</time>
                </div>
              )}
              <ChatMessage message={m} me={me} />
            </Fragment>
          );
        })}
    </div>
  );
};

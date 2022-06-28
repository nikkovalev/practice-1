import React, { FC } from "react";
import cn from "classnames";

import styles from "./Chat.module.scss";

interface IChatMessage {
  isRight?: boolean;
}

export const ChatMessage: FC<IChatMessage> = ({ isRight }) => {
  return (
    <div className={cn(styles.chatMessage, { "ml-auto": isRight })}>
      <div className={styles.chatMessageTop}>
        <div className={styles.chatText}>Продавец</div>
        <div className={styles.chatText}>10.05.22 21:10</div>
      </div>
      <div
        className={cn("bg-primary-400", styles.chatMessageText, {
          "bg-gray-500": isRight,
        })}
      >
        Добрый вечер, отлично могу прямо сейчас создать безопасный платеж на этом сайте.
      </div>
    </div>
  );
};

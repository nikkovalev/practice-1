import React from "react";
import cn from "classnames";

import styles from "./Chat.module.scss";

export const ChatMiddle = () => {
  return (
    <div className={cn("custom_scrollbar", styles.chatMiddle)}>
      <div className={styles.chatDate}>10 мая</div>
      <div className={styles.chatMessage}>
        <div className={styles.chatMessageTop}>
          <span className={styles.chatText}>Продавец</span>
          <span className={styles.chatText}>10.05.22 21:10</span>
        </div>
        <div className={styles.chatMessageContent}>
          Привет, вы можете у меня купить мой товар прямо сейчас :)
        </div>
      </div>
    </div>
  );
};

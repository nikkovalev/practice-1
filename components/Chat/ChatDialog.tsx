import React, { FC } from "react";
import cn from "classnames";

import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";

interface IChatDialog {
  isActive?: boolean;
}

export const ChatDialog: FC<IChatDialog> = ({ isActive }) => {
  return (
    <div className={cn(styles.chatDialog, { [styles.chatDialogActive]: isActive })}>
      {!isActive && <div className={styles.chatDialogStatus} />}
      <div
        className={cn(styles.chatAvatar, { [styles.chatAvatarOnline]: isActive })}
        style={{ backgroundImage: `url(${anonymousImage.src})` }}
      />
      <div className="flex-grow">
        <div className={styles.chatDialogTop}>
          <div className={cn("text-ellipsis", styles.chatName)}>TwitchMaxonlooaaassaas</div>
          <span className={styles.chatText}>09:12</span>
        </div>
        <div className={cn("text-ellipsis", styles.chatText)}>Хотел купить у вас услугу</div>
      </div>
    </div>
  );
};

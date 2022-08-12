import React, { FC } from "react";
import cn from "classnames";

import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";
import { Avatar } from "../ui";

interface IChatMiddle {
  variant: "normal" | "global" | "full";
}

export const ChatMiddle: FC<IChatMiddle> = ({ variant }) => {
  return (
    <div className={cn("custom_scrollbar", styles.chatMiddle)}>
      <div className={styles.chatDate}>10 мая</div>
      <div
        className={cn(styles.chatMessage, {
          [styles.chatMessage_full]: variant === "global",
        })}
      >
        {variant === "global" && (
          <Avatar className="mr-[10px" withStatus={true} bg={anonymousImage.src} />
        )}
        <div>
          <div
            className={cn(styles.chatMessageTop, {
              [styles.chatMessageTop_full]: variant === "global",
            })}
          >
            <span className={styles.chatText}>Продавец</span>
            <span className={styles.chatText}>10.05.22 21:10</span>
          </div>
          <div
            className={cn(styles.chatMessageContent, {
              [styles.chatMessageContent_full]: variant === "global",
            })}
          >
            Привет, вы можете у меня купить мой товар прямо сейчас :)
          </div>
        </div>
      </div>
    </div>
  );
};

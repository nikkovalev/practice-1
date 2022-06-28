import React from "react";
import cn from "classnames";

import { BellIcon } from "../icons/BellIcon";
import { AttentionIcon } from "../icons/AttentionIcon";
import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";

export const ChatHeader = () => (
  <div className={styles.chatHeader}>
    <div className="flex items-center">
      <div
        className={styles.chatAvatar}
        style={{ backgroundImage: `url(${anonymousImage.src})` }}
      />
      <div className={cn("text-ellipsis", styles.chatHeaderTitle, styles.chatName)}>Anonymous</div>
      <b className="flex-shrink-0">1554 отзыва</b>
    </div>
    <div className={styles.chatHeaderButton}>
      <button>
        <BellIcon />
      </button>
      <button>
        <AttentionIcon />
      </button>
    </div>
  </div>
);

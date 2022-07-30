import React, { FC } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";

import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";

export const ChatNav: FC<{ isSelected: boolean }> = ({ isSelected }) => {
  return (
    <div
      className={cn(styles.chatNav, {
        [styles.chatNav_selected]: isSelected,
      })}
    >
      <div className={cn(styles.chatNavItem, styles.chatNavItem_active)}>
        <div className={styles.chatNavItemStatus} />
        <div
          className="avatar avatarWithStatus"
          style={{ backgroundImage: url(anonymousImage.src) }}
        />
        <div className={styles.chatNavItemInfo}>
          <div className={styles.chatNavItemTop}>
            <span className={cn("text-ellipsis", styles.chatTitle)}>PetubakasTwitch</span>
            <time className={styles.chatText}>21:10</time>
          </div>
          <p className={cn("text-ellipsis", styles.chatText)}>Чем могу помочь?</p>
        </div>
      </div>
    </div>
  );
};

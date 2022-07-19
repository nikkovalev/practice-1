import React, { FC, useEffect, useState } from "react";
import cn from "classnames";

import { IUser } from "@/models/IUser";

import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";
import { ChatActions } from "../icons/ChatActions";

interface IChatHeader {
  variant: "global" | "user" | "full";
  user: IUser | null;
  online: boolean;
  isFull: boolean;
}

export const ChatHeader: FC<IChatHeader> = ({ variant, user, online, isFull }) => {
  const [tab, setTab] = useState<number>(0);
  const [actions, setActions] = useState<Array<"messages" | "notifications" | "attention">>([]);

  const handleChangeTab = (idx: number) => () => setTab(idx);

  useEffect(() => {
    const actions: Array<"messages" | "notifications" | "attention"> = [];
    if (variant !== "full") {
      actions.push("messages");
    }
    if (variant !== "global") {
      actions.push("notifications");
    }
    actions.push("attention");
    setActions(actions);
  }, []);

  return (
    <div className={cn(styles.chatHeader, { "border-r-2": isFull })}>
      <div className="flex items-center">
        <div
          className={cn("avatar", { online: online || user?.online })}
          style={{
            backgroundImage: `url(${user?.photoUrl ? user.photoUrl : anonymousImage.src})`,
          }}
        />
        <b>{user?.username}</b>
        <b className="text-primary-400">1554 отзыва</b>
      </div>
      <div className={styles.chatActions}>
        <div
          className={styles.chatActionsIndicator}
          style={{ transform: `translateX(${tab * 40}px)` }}
        />
        {actions.map((name, idx) => (
          <button key={idx} onClick={handleChangeTab(idx)}>
            <ChatActions name={name} isActive={idx === tab} />
          </button>
        ))}
      </div>
    </div>
  );
};

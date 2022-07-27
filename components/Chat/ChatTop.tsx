import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";
import { useOutside } from "@/hooks/useOutside";

import { ChatIcon, MoreIcon } from "@/components/icons";
import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Chat.module.scss";

interface IChatTop {
  variant: "normal" | "global" | "full";
}

type IIcons = "messages" | "notifications" | "report";

export const ChatTop: FC<IChatTop> = ({ variant }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [icons, setIcons] = useState<IIcons[]>([]);
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleChangeTab = (idx: number) => () => {
    setActiveTab(idx);
    if (isShow) setIsShow(false);
  };
  const handleShow = () => setIsShow(true);

  useEffect(() => {
    const icons: IIcons[] = [];
    if (variant !== "full") icons.push("messages");
    if (variant !== "global") icons.push("notifications");
    icons.push("report");
    setIcons(icons);
  }, [variant]);

  return (
    <div className={cn(styles.chatTop, { "border-r-2 border-gray-500": variant === "full" })}>
      <div
        className="avatar avatarWithStatus"
        style={{ backgroundImage: url(anonymousImage.src) }}
      />
      <div
        className={cn(styles.chatTopText, {
          [styles.chatTopText_full]: variant === "global",
        })}
      >
        <span className={styles.chatTitle}>PetubakasTwitch</span>
        {variant !== "global" && <b className={styles.chatTextPurple}>1554 отзыва</b>}
        {variant === "global" && (
          <b className={cn(styles.chatTitle, styles.chatTitle_gray)}>(Вы)</b>
        )}
      </div>
      <div className="relative ml-auto">
        <button className={styles.chatTopButton} onClick={handleShow}>
          <MoreIcon />
        </button>
        <div
          ref={ref}
          className={cn(styles.chatTopIcons, {
            [styles.chatTopIcons_open]: isShow,
          })}
        >
          <div
            className={styles.chatTopIndicator}
            style={{
              transform: `translate(${activeTab * 39}px, -50%)`,
            }}
          />
          {icons.map((name: IIcons, idx: number) => (
            <button key={name} onClick={handleChangeTab(idx)}>
              <ChatIcon name={name} isActive={activeTab === idx} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

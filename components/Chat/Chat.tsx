import React, { FC } from "react";
import cn from "classnames";

import { ChatTop } from "./ChatTop";
import { ChatMiddle } from "./ChatMiddle";
import { ChatBottom } from "./ChatBottom";
import { ChatNav } from "./ChatNav";

import styles from "./Chat.module.scss";

interface IChat {
  className?: string;
  variant: "normal" | "global" | "full";
  inputColor?: "gray";
}

export const Chat: FC<IChat> = ({ className, variant, inputColor }) => {
  return (
    <div className={cn(styles.chat, styles[`chat_${variant}`], className)}>
      {variant === "full" && <ChatNav />}
      <div
        className={cn(styles.chatContent, {
          [styles.chatContent_limit]: variant === "full",
        })}
      >
        <ChatTop variant={variant} />
        <ChatMiddle />
        <ChatBottom variant={variant} inputColor={inputColor} />
      </div>
    </div>
  );
};

import React, { FC } from "react";
import cn from "classnames";

import { ChatTop } from "./ChatTop";
import { ChatMiddle } from "./ChatMiddle";
import { ChatBottom } from "./ChatBottom";
import { ChatNav } from "./ChatNav";

import styles from "./Chat.module.scss";

interface IChat {
  to?: string | number;
  className?: string;
  variant: "normal" | "global" | "full";
  inputColor?: "gray";
}

export const Chat: FC<IChat> = ({ className, variant, to, inputColor }) => {
  return (
    <div className={cn(styles.chat, styles[`chat_${variant}`], className)}>
      {variant === "full" && <ChatNav isSelected={variant === "full" && !!to} />}
      <div
        className={cn(styles.chatContent, {
          [styles.chatContent_limit]: variant === "full",
          [styles.chatContent_selected]: variant === "full" && !!to,
        })}
      >
        <ChatTop variant={variant} />
        <ChatMiddle variant={variant} />
        <ChatBottom variant={variant} inputColor={inputColor} />
      </div>
    </div>
  );
};

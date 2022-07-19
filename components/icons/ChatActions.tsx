import React, { FC } from "react";
import { AttentionIcon } from "./AttentionIcon";
import { BellIcon } from "./BellIcon";
import { MessageIcon } from "./MessageIcon";

interface IChatIcons {
  name: "messages" | "notifications" | "attention";
  isActive: boolean;
}

export const ChatActions: FC<IChatIcons> = ({ name, isActive }) => {
  if (name === "messages")
    return <MessageIcon className={isActive ? "fill-white-100" : "dark:fill-gray-400"} />;
  if (name === "notifications")
    return <BellIcon className={isActive ? "fill-white-100 stroke-white-100" : ""} />;
  return (
    <AttentionIcon
      cn1={isActive ? "fill-white-100" : ""}
      cn2={isActive ? "stroke-white-100" : ""}
    />
  );
};

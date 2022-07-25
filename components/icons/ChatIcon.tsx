import React, { FC } from "react";
import { AttentionIcon, BellIcon, MessageIcon } from "./";

interface IChatIcon {
  name: "messages" | "notifications" | "report";
  isActive: boolean;
}

export const ChatIcon: FC<IChatIcon> = ({ name, isActive }) => {
  if (name === "messages")
    return <MessageIcon className={isActive ? "fill-white-100" : ""} noDark={true} />;
  if (name === "notifications")
    return <BellIcon className={isActive ? "fill-white-100 stroke-white-100" : ""} />;
  return (
    <AttentionIcon
      cn1={isActive ? "fill-white-100" : ""}
      cn2={isActive ? "stroke-white-100" : ""}
    />
  );
};

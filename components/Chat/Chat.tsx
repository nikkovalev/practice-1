import React from "react";

import { ChatDialog } from "./ChatDialog";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatForm } from "./ChatForm";

import styles from "./Chat.module.scss";

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <ChatHeader />
      <div className={styles.chatLeft}>
        <ChatDialog />
        <ChatDialog isActive={true} />
      </div>
      <div className={styles.chatRight}>
        <div className={styles.chatMessages}>
          <ChatMessage />
          <ChatMessage />
          <ChatMessage isRight />
          <ChatMessage isRight />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage isRight />
          <ChatMessage isRight />
          <ChatMessage isRight />
        </div>
      </div>
      <ChatForm />
    </div>
  );
};

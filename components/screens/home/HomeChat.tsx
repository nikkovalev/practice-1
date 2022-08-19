import React from "react";
import cn from "classnames";
import { Chat } from "@/components/Chat/Chat";
import styles from "./Home.module.scss";

export const HomeChat = () => {
  return (
    <section className={cn(styles.section, styles.chat)}>
      <div className="inner-container">
        <h2 className={styles.title}>Общий чат</h2>
        <Chat variant="global" />
      </div>
    </section>
  );
};

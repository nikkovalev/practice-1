import React from "react";
import cn from "classnames";
import { Chat } from "@/components/Chat/Chat";
import { Container } from "@/components/ui";
import styles from "./Home.module.scss";

export const HomeChat = () => {
  return (
    <section className={cn(styles.section, styles.chat)}>
      <Container variant="ic">
        <h2 className={styles.title}>Общий чат</h2>
        <div className="relative z-10">
          <Chat variant="global" />
        </div>
      </Container>
    </section>
  );
};

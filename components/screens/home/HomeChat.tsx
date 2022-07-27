import React from "react";
import cn from "classnames";

import { Chat } from "@/components/Chat/Chat";

import styles from "./Home.module.scss";

export const HomeChat = () => {
  return (
    <section className={cn("bg-white-200 dark:bg-black-500 relative", styles.section)}>
      <div className="inner-container">
        <h2 className={cn("dark:text-black-300", styles.sectionTitle)}>Общий чат</h2>
        <div className="relative z-20">
          <Chat variant="global" />
        </div>
      </div>
    </section>
  );
};

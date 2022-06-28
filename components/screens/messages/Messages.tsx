import React from "react";

import { Layout } from "@/components/layouts/Layout";
import { Chat } from "@/components/Chat/Chat";

import styles from "./Messages.module.scss";

export const Messages = () => {
  return (
    <Layout title="Сообщения">
      <div className="inner-container">
        <h1 className={styles.title}>
          Сообщения <div>2</div>
        </h1>
        <Chat />
      </div>
    </Layout>
  );
};

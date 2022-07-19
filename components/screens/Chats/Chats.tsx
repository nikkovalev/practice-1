import React from "react";
import { useRouter } from "next/router";

import { Layout } from "@/components/layouts/Layout";
import { Chat } from "@/components/Chat/Chat";

import styles from "./Chats.module.scss";

export const Chats = () => {
  const { query } = useRouter();

  return (
    <Layout title="Сообщения">
      <div className="inner-container">
        <h1 className={styles.title}>
          Сообщения <div>2</div>
        </h1>
        <Chat to={query.id as string | undefined} variant="full" />
      </div>
    </Layout>
  );
};

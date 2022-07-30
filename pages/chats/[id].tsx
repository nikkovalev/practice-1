import React from "react";

import { Layout } from "@/components/layouts/Layout";
import { Chat } from "@/components/Chat/Chat";
import { TextWithCount } from "@/components/ui";

const ActiveChat = () => {
  return (
    <Layout title="Сообщения">
      <div className="inner-container">
        <TextWithCount className="mb-[30px]" title="Сообщения" count="2" />
        <Chat to="1" variant="full" />
      </div>
    </Layout>
  );
};

export default ActiveChat;

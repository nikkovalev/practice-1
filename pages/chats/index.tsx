import React from "react";

import { Chat } from "@/components/Chat/Chat";
import { Layout } from "@/components/layouts/Layout";
import { TextWithCount } from "@/components/ui";

const Chats = () => {
  return (
    <Layout title="Сообщения">
      <div className="inner-container">
        <TextWithCount className="mb-[30px]" title="Сообщения" count="2" />
        <Chat variant="full" />
      </div>
    </Layout>
  );
};

export default Chats;

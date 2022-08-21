import React from "react";

import { Layout } from "@/components/layouts/Layout";
import { Chat } from "@/components/Chat/Chat";
import { Container, TextWithCount } from "@/components/ui";

const ActiveChat = () => {
  return (
    <Layout title="Сообщения">
      <Container variant="ic">
        <TextWithCount className="mb-[30px]" title="Сообщения" count="2" />
        <Chat to="1" variant="full" />
      </Container>
    </Layout>
  );
};

export default ActiveChat;

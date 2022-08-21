import React from "react";

import { Chat } from "@/components/Chat/Chat";
import { Layout } from "@/components/layouts/Layout";
import { Container, TextWithCount } from "@/components/ui";

const Chats = () => {
  return (
    <Layout title="Сообщения">
      <Container variant="ic">
        <TextWithCount className="mb-[30px]" title="Сообщения" count="2" />
        <Chat variant="full" />
      </Container>
    </Layout>
  );
};

export default Chats;

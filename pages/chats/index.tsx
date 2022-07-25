import React from "react";

import { Chat } from "@/components/Chat/Chat";
import { Layout } from "@/components/layouts/Layout";

const Chats = () => {
  return (
    <Layout title="Сообщения">
      <div className="inner-container mt-[50px]">
        <h1 className="mb-[30px] flex items-start text-[52px] dark:text-white-100 font-bold">
          Сообщения
          <b className="flex items-center justify-center w-[40px] h-[40px] text-white-100 rounded-full bg-primary-400 text-[20px] font-bold ml-[10px]">
            2
          </b>
        </h1>
        <Chat variant="full" />
      </div>
    </Layout>
  );
};

export default Chats;

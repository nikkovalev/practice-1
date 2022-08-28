import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Modal } from "@/components/layouts/modalLayout";
import { Text } from "@/components/ui";

const AuthType: NextPage = () => {
  const {
    query: { message },
  } = useRouter();

  return (
    <Modal title={message as string} hideClose={true}>
      <div className="text-center">
        <Text className="block mb-[20px]" as="h1">
          {message}
        </Text>
        <Text className="hover:underline" as="a" href="/" color="secondary" size="m" hover="p">
          Перейти на главную
        </Text>
      </div>
    </Modal>
  );
};

export default AuthType;

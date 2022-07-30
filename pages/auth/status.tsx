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
        <Text className="block mb-[20px]" as="h1" size="xxl" weight={700}>
          {message}
        </Text>
        <Text as="a" href="/" color="secondary" size="l" className="hover:underline">
          Перейти на главную
        </Text>
      </div>
    </Modal>
  );
};

export default AuthType;

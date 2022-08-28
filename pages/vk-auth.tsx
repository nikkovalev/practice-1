import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";

import { Modal } from "@/components/layouts/modalLayout";
import { Text } from "@/components/ui";

const VKAuth: NextPage = () => {
  const { query } = useRouter();
  const { saveToken } = useActions();

  useEffect(() => {
    if (query.token) saveToken(query.token as string);
    // eslint-disable-next-line
  }, [query]);

  return (
    <Modal title="Успешный вход через VK" hideClose={true}>
      <div className="text-center">
        <Text className="block mb-[20px]" as="h1">
          Вы успешно вошли в аккаунт
        </Text>
        <Text className="hover:underline" as="a" href="/" color="secondary" size="m" hover="p">
          Перейти на главную
        </Text>
      </div>
    </Modal>
  );
};
export default VKAuth;

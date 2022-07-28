import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, Input, Select, Text } from "@/components/ui";

import webmoneyImage from "@/assets/images/webmoney.svg";

import { styles as modalStyles } from "@/components/layouts/modalLayout";

export const AddCheck = () => {
  const { register } = useForm();

  return (
    <Modal title="Добавить счет">
      <div className={modalStyles.top}>
        <Text as="h1" size="xxl" weight={700}>
          Добавить счет
        </Text>
      </div>
      <div className="flex flex-col items-center">
        <Select
          className="mb-[20px]"
          color="light"
          label="Webmoney RUB"
          items={[]}
          iconCN="mr-[10px]"
          size="large"
          padding="small"
          icon={<Image src={webmoneyImage.src} width={40} height={40} alt="Webmoney" />}
        />
        <Input
          className="mb-[30px]"
          {...register("account_number")}
          placeholder="WMR324039475235"
        />
        <Button size="large">Добавить</Button>
      </div>
    </Modal>
  );
};

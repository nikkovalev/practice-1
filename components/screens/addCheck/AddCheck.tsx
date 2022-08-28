import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, Input, SelectWithIcon, Text } from "@/components/ui";

import webmoneyImage from "@/assets/images/webmoney.svg";

import { styles as modalStyles } from "@/components/layouts/modalLayout";
import styles from "./AddCheck.module.scss";

export const AddCheck = () => {
  const { register } = useForm();
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Modal title="Добавить счет" handleClose={handleClose}>
      <div className={modalStyles.top}>
        <Text as="h1" align="center">
          Добавить счет
        </Text>
      </div>
      <SelectWithIcon
        className={styles.select}
        label="Webmoney RUB"
        items={[]}
        icon={<Image src={webmoneyImage.src} width={38} height={38} alt="Webmoney" />}
      />
      <Input
        {...register("account_number")}
        className={styles.input}
        placeholder="WMR324039475235"
      />
      <Button size="large" theme="primary_contained">
        Добавить
      </Button>
    </Modal>
  );
};

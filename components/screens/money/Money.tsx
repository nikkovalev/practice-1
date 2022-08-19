import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, InputWithButton, InputWithText, SelectWithIcon, Text } from "@/components/ui";
import { MoneyPopper } from "./MoneyPopper";

import { CardsIcon } from "@/components/icons/CardsIcon";
import webmoneyImage from "@/assets/images/webmoney.svg";

import styles from "./Money.module.scss";

export const Money = () => {
  const router = useRouter();
  const { register } = useForm();
  const { ref, ref2, isShow, setIsShow } = useOutside(false);

  const handlePopper = () => setIsShow(!isShow);
  const handleClose = () => router.push("/");
  const validate = (v: string) => !Number.isNaN(Number(v));

  return (
    <Modal title="Вывод средств" handleClose={handleClose}>
      <Text className={styles.title} as="h1" size="xxl" weight={700} align="center">
        Вывод средств
      </Text>
      <Text className={styles.text} color="gray" align="center">
        Россия: комиссия 3%, но не менее 2.4 €<br />
        Украина: комиссия 3%, но не менее 2.4 €<br />
        Другие страны: комиссия 3%, но не менее 2.4 €
      </Text>
      <div className={styles.items}>
        <SelectWithIcon className={styles.select} label="Евро" items={[]} />
        <SelectWithIcon
          className={styles.select}
          label="Webmoney RUB"
          items={[]}
          icon={<Image src={webmoneyImage.src} width={40} height={40} alt="Webmoney" />}
        />
        <InputWithButton
          {...register("account_number")}
          wrapperClassName={styles.inputWithButton}
          pr={59}
          onClick={handlePopper}
          placeholder="WMR324039475235"
          iconRef={ref2}
          icon={<CardsIcon color="black" />}
        >
          <MoneyPopper popperRef={ref} isShow={isShow} />
        </InputWithButton>
      </div>
      <div className={styles.items}>
        <InputWithText
          {...register("sum", { required: true, validate })}
          wrapperClassName={styles.input}
          pr={45}
          placeholder="Сумма"
          text="€"
        />
        <InputWithText
          {...register("sum_2", { required: true, validate })}
          wrapperClassName={styles.input}
          pr={45}
          placeholder="К получению"
          text="€"
        />
        <Button className={styles.button} size="large">
          Вывести
        </Button>
      </div>
    </Modal>
  );
};

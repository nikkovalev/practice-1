import React from "react";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, CircleButton, Input, SelectWithIcon, Text } from "@/components/ui";
import { MoneyPopper } from "./MoneyPopper";

import { CardsIcon } from "@/components/icons/CardsIcon";
import webmoneyImage from "@/assets/images/webmoney.svg";

import styles from "./Money.module.scss";

export const Money = () => {
  const router = useRouter();
  const { register } = useForm();
  const { ref, ref2, isShow, setIsShow } = useOutside(false);

  const handleIconClick = () => setIsShow(!isShow);
  const handleClose = () => router.push("/");
  const validate = (v: string) => !Number.isNaN(Number(v));

  return (
    <Modal title="Вывод средств" handleClose={handleClose}>
      <Text className={styles.title} as="h1" size="xxl" weight={700}>
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
        <div className={styles.inputWithButton}>
          <MoneyPopper popperRef={ref} isShow={isShow} />
          <Input
            {...register("account_number")}
            placeholder="WMR324039475235"
            style={{ paddingRight: 61 }}
          />
          <CircleButton
            className={styles.inputIcon}
            buttonRef={ref2}
            color="yellow"
            onClick={handleIconClick}
          >
            <CardsIcon color="black" />
          </CircleButton>
        </div>
      </div>
      <div className={styles.items}>
        <Input
          {...register("sum", { required: true, validate })}
          className={styles.input}
          style={{ paddingRight: 45 }}
          placeholder="Сумма"
          icon="€"
        />
        <Input
          {...register("sum_2", { required: true, validate })}
          className={styles.input}
          style={{ paddingRight: 45 }}
          placeholder="К получению"
          icon="€"
        />
        <Button className={styles.button} size="large">
          Вывести
        </Button>
      </div>
    </Modal>
  );
};

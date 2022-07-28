import React from "react";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, Input, Select, Text } from "@/components/ui";

import { CardsIcon } from "@/components/icons/CardsIcon";
import webmoneyImage from "@/assets/images/webmoney.svg";

import styles from "./Money.module.scss";

export const Money = () => {
  const router = useRouter();
  const { register } = useForm();
  const { ref, ref2, isShow, setIsShow } = useOutside(false);

  const handleIconClick = () => setIsShow(!isShow);
  const handleClose = () => router.push("/");

  return (
    <Modal title="Вывод средств" handleClose={handleClose}>
      <Text className={styles.title} size="xxl" align="center" weight={700}>
        Вывод средств
      </Text>
      <Text className={styles.text} color="gray" align="center">
        Россия: комиссия 3%, но не менее 2.4 €<br />
        Украина: комиссия 3%, но не менее 2.4 €<br />
        Другие страны: комиссия 3%, но не менее 2.4 €
      </Text>
      <div className={styles.items}>
        <Select className={styles.select} color="light" size="large" label="Евро" items={[]} />
        <Select
          className={styles.select}
          color="light"
          label="Webmoney RUB"
          items={[]}
          iconCN="mr-[10px]"
          size="large"
          padding="small"
          icon={<Image src={webmoneyImage.src} width={40} height={40} alt="Webmoney" />}
        />
        <div className={cn(styles.inputWithIcon, styles.inputWithIcon_large)}>
          <div
            ref={ref}
            className={cn(styles.inputPopper, {
              [styles.inputPopper_active]: isShow,
            })}
          >
            <div>
              <ul>
                <li>WMR324039475235</li>
                <li>WMR324039475235</li>
              </ul>
              <div className={styles.inputPopperArrow}></div>
            </div>
          </div>
          <Input
            {...register("account_number")}
            className={styles.input}
            placeholder="WMR324039475235"
          />
          <button ref={ref2} className={styles.inputIcon} onClick={handleIconClick}>
            <CardsIcon color="black" />
          </button>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.inputWithIcon}>
          <Input
            {...register("sum", { required: true, validate: (v) => !Number.isNaN(Number(v)) })}
            className={styles.input}
            placeholder="Сумма"
          />
          <Text as="b" color="gray" size="s" weight={700}>
            €
          </Text>
        </div>
        <div className={styles.inputWithIcon}>
          <Input
            {...register("sum_2", { required: true, validate: (v) => !Number.isNaN(Number(v)) })}
            className={styles.input}
            placeholder="К получению"
          />
          <Text as="b" color="gray" size="s" weight={700}>
            €
          </Text>
        </div>
        <Button className={styles.button} size="large">
          Вывести
        </Button>
      </div>
    </Modal>
  );
};

import React from "react";
import cn from "classnames";
import Image from "next/image";

import { ProfileLayout } from "@/components/layouts/profileLayout";
import { Button, Text } from "@/components/ui";
import { Card } from "./Card";

import masterCardIcon from "@/assets/images/master_card.svg";
import webmoneyIcon from "@/assets/images/webmoney.svg";
import { PlusIcon } from "@/components/icons";

import styles from "./Finance.module.scss";

const cards = [
  { text: "5160 5852 1215 1255", icon: masterCardIcon.src },
  { text: "WMR324039475235", icon: webmoneyIcon.src },
];

export const Finance = () => {
  return (
    <ProfileLayout title="Баланс" text="На балансе">
      <div className={styles.top}>
        <div className={cn(styles.item, styles.item_yellow)}>
          <b>1500₽</b>
        </div>
        <div className={styles.item}>
          <b>0$</b>
        </div>
        <div className={styles.item}>
          <b>0€</b>
        </div>
        <Button theme="secondary_contained">Вывести средства</Button>
      </div>
      <div className={styles.middle}>
        <Text as="h4" color="gray" size="xl" leading="130">
          Карты и кошельки
        </Text>
        <Button className={styles.middleButton} theme="primary_outlined">
          <span>Добавить счет</span>
          <div className={styles.middleIcon}>
            <PlusIcon />
          </div>
        </Button>
      </div>
      <div className={styles.cards}>
        {cards.map((c) => (
          <Card key={c.text} card={c} />
        ))}
      </div>
    </ProfileLayout>
  );
};

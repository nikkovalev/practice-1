import React from "react";
import cn from "classnames";
import Image from "next/image";

import { ProfileLayout } from "@/components/layouts/profileLayout";
import { Button, Text, TextWithCount } from "@/components/ui";
import { Card } from "./Card";

import masterCardIcon from "@/assets/images/master_card.svg";
import webmoneyIcon from "@/assets/images/webmoney.svg";
import plusIcon from "@/assets/images/plus.svg";

import styles from "./Finance.module.scss";

const cards = [
  { text: "5160 5852 1215 1255", icon: masterCardIcon.src },
  { text: "WMR324039475235", icon: webmoneyIcon.src },
];

export const Finance = () => {
  return (
    <ProfileLayout title="Баланс" hideTitle={true}>
      <TextWithCount className="mb-[30px] md:mb-[20px]" title="На балансе" isCircle={false} />
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
        <Text as="h4" color="gray" size="xl" weight={700}>
          Карты и кошельки
        </Text>
        <Button className={styles.middleButton} theme="primary_outlined">
          <span>Добавить счет</span>
          <div className={styles.middleIcon}>
            <Image src={plusIcon.src} width={20} height={20} alt="Add card" />
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

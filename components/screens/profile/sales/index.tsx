import React from "react";
import cn from "classnames";
import Image from "next/image";

import { ProfileLayout } from "@/components/layouts/profileLayout";
import { Button, TextWithCount } from "@/components/ui";

import doneImage from "@/assets/images/ok.svg";

import { styles as offerStyles } from "@/components/screens/profile/offers";
import styles from "./Sales.module.scss";

const buttons = [
  {
    title: "Call of Duty",
    count: 2,
  },
  {
    title: "FIFA",
    count: 2,
    active: true,
  },
];

export const Sales = () => {
  return (
    <ProfileLayout title="Продажи" hideTitle={true}>
      <TextWithCount
        className="mb-[30px] md:mb-[20px]"
        title="Продажи"
        count="4"
        isCircle={false}
      />
      <div className={offerStyles.buttons}>
        {buttons.map((button) => (
          <Button key={button.title} theme="black_outlined" size="small" isActive={button.active}>
            {button.title} <b>({button.count})</b>
          </Button>
        ))}
      </div>
      <div className={offerStyles.itemWrapper}>
        <h3 className={offerStyles.itemTitle}>Буст</h3>
        <div className={offerStyles.items}>
          <div className={cn(offerStyles.item, offerStyles.item_limit)}>
            <div className={cn(offerStyles.itemList, offerStyles.itemList_short)}>
              <div>
                <div className={offerStyles.itemText}>Сервер</div>
                <div className={cn(offerStyles.itemText, offerStyles.itemText_white)}>
                  FIFA 22 Ultimate Team (PS)
                </div>
              </div>
              <div>
                <div className={offerStyles.itemText}>Описание</div>
                <div className={cn(offerStyles.itemText, offerStyles.itemText_white)}>
                  Сыграю вл за вас на 5 ранг, пишите в любое время как буду онлайн отвечу
                </div>
              </div>
            </div>
            <div className={offerStyles.itemFooter}>
              <b className={offerStyles.itemPrice}>
                1000 <span>монет</span> / 50₽
              </b>
              <div className={styles.successIconWrapper}>
                <div className={styles.successIcon}>
                  <Image src={doneImage.src} width={20} height={20} alt="Success icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

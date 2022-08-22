import React from "react";
import cn from "classnames";
import Image from "next/image";

import { ProfileLayout } from "@/components/layouts/profileLayout";
import { GroupButtons } from "@/components/ui";

import doneImage from "@/assets/images/ok.svg";

import { styles as offerStyles } from "@/components/screens/profile/offers";
import styles from "./Purchases.module.scss";

const buttons = [
  {
    id: 1,
    name: "FIFA",
    count: 2,
  },
];

export const Purchases = () => {
  return (
    <ProfileLayout title="Покупки" count={2} countColor="primary">
      <GroupButtons
        className={styles.tabs}
        items={buttons}
        variant="black_outlined"
        active={1}
        size="small"
      />
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

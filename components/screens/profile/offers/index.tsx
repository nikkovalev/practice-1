import React from "react";
import cn from "classnames";
import Image from "next/image";

import { ProfileLayout } from "@/components/layouts/profileLayout";
import { Button, Text } from "@/components/ui";

import { EditIcon } from "@/components/icons/EditIcon";
import stopIcon from "@/assets/images/stop.svg";
import playIcon from "@/assets/images/play.svg";
import removeIcon from "@/assets/images/remove.svg";

import styles from "./Offers.module.scss";

const buttons = [
  { title: "Call of Duty", count: 1 },
  { title: "FIFA", count: 21, active: true },
  { title: "Battle.net", count: 5 },
  { title: "Aion", count: 2 },
];

const Offers = () => {
  return (
    <ProfileLayout title="Ваши предложения">
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button
            key={button.title}
            variant="outlined"
            color="black"
            size="extra-small"
            isActiveOutlined={button.active}
          >
            {button.title}
            <b className={button.active ? "text-primary-400" : "text-gray-400"}>{button.count}</b>
          </Button>
        ))}
      </div>
      <div>
        <Button
          className={styles.button}
          size="fit"
          variant="outlined"
          as="link"
          href="/edit-offer"
        >
          Добавить предложение
        </Button>
        <Text size="xl" className="dark:text-secondary-400" color="black">
          Здесь пока ничего нет
        </Text>
        {/* <div>
          <div className={styles.itemWrapper}>
            <h3 className={styles.itemTitle}>Буст</h3>
            <div className={styles.items}>
              <div className={cn(styles.item, styles.item_limit)}>
                <div className={cn(styles.itemStatus)}></div>
                <div className={cn(styles.itemList, styles.itemList_short)}>
                  <div>
                    <div className={styles.itemText}>Сервер</div>
                    <div className={cn(styles.itemText, styles.itemText_white)}>
                      FIFA 22 Ultimate Team (PS)
                    </div>
                  </div>
                  <div>
                    <div className={styles.itemText}>Описание</div>
                    <div className={cn(styles.itemText, styles.itemText_white)}>
                      Сыграю вл за вас на 5 ранг, пишите в любое время как буду онлайн отвечу
                    </div>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <b className={styles.itemPrice}>
                    1000 <span>монет</span> / 50₽
                  </b>
                  <div className={cn(styles.itemIcons, styles.itemIcons_short)}>
                    <button className="circle circle_yellow">
                      <EditIcon className="fill-black-400" />
                    </button>
                    <button className="circle circle_purple">
                      <Image src={stopIcon} width={15} height={15} alt="Stop icon" />
                    </button>
                    <button className="circle">
                      <Image src={removeIcon} width={20} height={20} alt="Remove icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </ProfileLayout>
  );
};

export { Offers, styles };

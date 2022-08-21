import React from "react";
import cn from "classnames";

import { Button } from "@/components/ui";
import { InfoIcon, LikeIcon } from "@/components/icons";
import { Filter } from "@/components/filter";

import { styles as offersStyles } from "@/components/screens/profile/offers";
import styles from "./User.module.scss";

const buttons = [
  { title: "Call of Duty", count: 1, active: true },
  { title: "FIFA", count: 21 },
  { title: "Battle.net", count: 5 },
  { title: "Aion", count: 2 },
];

export const UserOffers = () => {
  return (
    <div>
      <div className={styles.offersButtons}>
        {buttons.map(({ title, count, active }) => (
          <Button key={title} theme="black_outlined" size="small" isActive={active}>
            {title}
            <b>({count})</b>
          </Button>
        ))}
      </div>
      <Filter className={styles.filter} size="small" />
      <div className={offersStyles.itemWrapper}>
        <h3 className={offersStyles.itemTitle}>Буст</h3>
        <div className={offersStyles.item}>
          <div className={offersStyles.itemList}>
            <div>
              <div className={offersStyles.itemText}>Сервер</div>
              <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                FIFA 22 Ultimate Team (PS)
              </div>
            </div>
            <div>
              <div className={offersStyles.itemText}>Описание</div>
              <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                Сыграю вл за вас на 5 ранг, пишите в любое время как буду онлайн отвечу
              </div>
            </div>
          </div>
          <div className={offersStyles.itemFooter}>
            <b className={offersStyles.itemPrice}>от 500₽</b>
            <div className={offersStyles.itemIcons}>
              <button>
                <InfoIcon />
              </button>
              <button>
                <LikeIcon isSmall={true} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={offersStyles.itemWrapper}>
        <h3 className={offersStyles.itemTitle}>Монеты</h3>
        <div className={offersStyles.item}>
          <div className={offersStyles.itemList}>
            <div>
              <div className={offersStyles.itemText}>Сервер</div>
              <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                FIFA 22 Ultimate Team (PS)
              </div>
            </div>
            <div>
              <div className={offersStyles.itemText}>Наличие</div>
              <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                1 000 000 000 монет
              </div>
            </div>
          </div>
          <div className={offersStyles.itemFooter}>
            <b className={offersStyles.itemPrice}>
              1000 <span>монет</span> / 50₽
            </b>
            <div className={offersStyles.itemIcons}>
              <button>
                <InfoIcon />
              </button>
              <button>
                <LikeIcon isSmall={true} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

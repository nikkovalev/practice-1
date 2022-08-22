import React, { FC } from "react";
import cn from "classnames";

import { Avatar } from "../ui";
import { Stars } from "../stars/Stars";
import ypIcon from "@/assets/images/yp.svg";

import styles from "./Reviews.module.scss";

export const Review: FC<{ size: "normal" | "short" }> = ({ size }) => {
  return (
    <div className={cn(styles.review, styles[`review_${size}`])}>
      <Avatar className={styles.reviewAvatar} bg={ypIcon.src} />
      <div className={styles.reviewRight}>
        <div className={styles.reviewHeader}>
          <div className={styles.reviewInfo}>
            <time>10 мая, 2022 15:32 </time>
            <Stars className={styles.reviewStars} rating={5.0} />
          </div>
          <b>FIFA, 500₽</b>
        </div>
        <p>
          Спасибо большое максу за работу) сделал все очень быстро и качественно. Одним словом
          молодец. Рекомендую всем покупку)
        </p>
      </div>
    </div>
  );
};

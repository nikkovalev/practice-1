import React, { FC } from "react";
import cn from "classnames";

import { Stars } from "../stars/Stars";
import { Review } from "./Review";

import { RotateIcon } from "../icons";

import styles from "./Reviews.module.scss";

export const Reviews: FC<{ size?: "normal" | "short" }> = ({ size = "normal" }) => {
  return (
    <div>
      <div className={cn(styles.reviewsHeader, styles[`reviewsHeader_${size}`])}>
        <div className={cn(styles.reviewHeaderLeft, styles[`reviewHeaderLeft_${size}`])}>
          <b>1554</b>
          <span>отзыва</span>
        </div>
        <div className={styles.reviewHeaderRight}>
          <b>5.0</b>
          <Stars rating={5.0} />
        </div>
      </div>
      <div className={cn({ [styles.reviewsList_normal]: size === "normal" })}>
        <Review size={size} />
        <button className={styles.reviewsMore}>
          <RotateIcon />
          <span>Еще</span>
          <b>25 отзывов</b>
        </button>
      </div>
    </div>
  );
};

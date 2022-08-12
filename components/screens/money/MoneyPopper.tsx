import React, { FC } from "react";
import cn from "classnames";

import styles from "./Money.module.scss";

interface IMoneyPopper {
  isShow: boolean;
  popperRef: any;
}

export const MoneyPopper: FC<IMoneyPopper> = ({ isShow, popperRef }) => {
  return (
    <div
      ref={popperRef}
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
  );
};

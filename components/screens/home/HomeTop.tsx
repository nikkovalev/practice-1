import React from "react";
import Image from "next/image";
import cn from "classnames";

import { Button } from "@/components/ui";

import logoLGImage from "@/assets/images/logo_lg.svg";

import styles from "./Home.module.scss";

export const HomeTop = () => {
  return (
    <div className={cn("inner-container", styles.top)}>
      <div className={styles.topLeft}>
        <div>
          <h1>
            Экономь своё время и зарабатывай вместе
            <br /> с<b> YaonClub</b>
          </h1>
          <p>
            Хочешь совершать выгодные сделки покупая и продавая аккаунты в играх и соц.сетях, а так
            же золото и вещи для своей любимой игры? Тогда регестрируйся и будь уверен, что ты
            сделал правильный выбор!
          </p>
        </div>
        <div className={styles.topButtons}>
          <Button color="primary" size="small">
            Купить
          </Button>
          <span>или</span>
          <Button color="secondary" size="small">
            Продать
          </Button>
        </div>
      </div>
      <div className={styles.topRight}>
        <Image
          src={logoLGImage.src}
          alt="YaonClub"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

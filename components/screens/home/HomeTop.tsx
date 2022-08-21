import React from "react";
import Image from "next/image";
import cn from "classnames";

import { Button, Container } from "@/components/ui";

import logoLGImage from "@/assets/images/logo_lg.svg";

import styles from "./Home.module.scss";

export const HomeTop = () => {
  return (
    <Container variant="ic" className={styles.top}>
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
          <Button theme="primary_contained" size="medium">
            Купить
          </Button>
          <span>или</span>
          <Button theme="secondary_contained" size="medium">
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
    </Container>
  );
};

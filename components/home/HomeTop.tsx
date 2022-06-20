import React from "react";
import Image from "next/image";

import { Button } from "../ui";
import LogoImage from "@/assets/images/logo_lg.svg";

import styles from "./Home.module.scss";

export const HomeTop = () => (
  <section className={styles.homeTop}>
    <div className="inner-container flex items-center">
      <div>
        <h1 className="dark:text-white-100">
          Экономь своё время и зарабатывай вместе
          <br /> с <b className="dark:text-secondary-400">YaonPay</b>
        </h1>
        <p>
          Хочешь совершать выгодные сделки покупая и продавая аккаунты
          <br />в играх и соц.сетях, а так же золото и вещи для своей любимой игры?
          <br />
          Тогда регестрируйся и будь уверен, что ты сделал правильный выбор!
        </p>
        <div className={styles.homeTopButtons}>
          <Button size="small">Купить</Button>
          <span>или</span>
          <Button size="small" color="secondary">
            Продать
          </Button>
        </div>
      </div>
      <div className={styles.homeTopImage}>
        <Image src={LogoImage} width={540} height={430} alt="YaonPay" />
      </div>
    </div>
  </section>
);
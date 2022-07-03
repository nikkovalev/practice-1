import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { BACK_IN_RIGHT } from "animation/effects";

import { Button } from "@/components/ui";
import LogoImage from "@/assets/images/logo_lg.svg";

import styles from "./Home.module.scss";

export const HomeTop = () => (
  <section className={styles.homeTop}>
    <div className="inner-container flex items-center md:flex-col">
      <div className="relative z-10">
        <h1 className="dark:text-white-100">
          Экономь своё время и зарабатывай вместе
          <br /> с <b className="dark:text-secondary-400">YaonPay</b>
        </h1>
        <p>
          Хочешь совершать выгодные сделки покупая и продавая аккаунты
          <br />в играх и соц.сетях, а так же золото и вещи для своей любимой игры?
          <br /> Тогда регестрируйся и будь уверен, что ты сделал правильный выбор!
        </p>
        <div className={styles.homeTopButtons}>
          <Button size="small">Купить</Button>
          <span>или</span>
          <Button size="small" color="secondary">
            Продать
          </Button>
        </div>
      </div>
      <motion.div {...BACK_IN_RIGHT} className={styles.homeTopImage}>
        <Image src={LogoImage} width={540} height={430} alt="YaonPay" />
      </motion.div>
    </div>
  </section>
);

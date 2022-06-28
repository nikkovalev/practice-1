import React from "react";
import { motion } from "framer-motion";

import { FADE_IN } from "animation/effects";

import styles from "./Home.module.scss";

const list = [
  {
    title: "Кто мы?",
    text: "YaonPay - это официальная торговая площадка, которая позволяет пользователям совершать выгодные сделки.",
  },
  {
    title: "Что мы можешь тебе дать?",
    text: "Наша платформа предоставляет инструменты для покупки и продажи ваших товаров и услуг в игровой индустрии или соц.сетях.",
  },
  {
    title: "Для чего ты здесь?",
    text: "Сайт создан для того, чтобы сэкономить твои деньги и время на продажу или покупку нужного тебе товара",
  },
];

export const HomeAbout = () => {
  return (
    <div className={styles.about}>
      <div className="inner-container text-center">
        <motion.div {...FADE_IN}>
          <h2>YaonPay</h2>
        </motion.div>
        <p className={styles.aboutTitle}>
          Добро пожаловать к нам. Давай попробуем ответить на основные вопросы
        </p>
        <div className={styles.aboutList}>
          {list.map((i) => (
            <div key={i.title} className={styles.aboutItem}>
              <b>{i.title}</b>
              <p>{i.text}</p>
            </div>
          ))}
        </div>
        <p className="sm:hidden mb-0">
          А теперь пару слов от нашей команды лично тебе. Мы рады что ты выбрал именно нас и уверены
          в том
          <br />
          что ты не усомнишься в своём выборе. Совершай выгодные сделки и совершенствуйся вместе с
          YaonPay.
        </p>
      </div>
    </div>
  );
};

import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import { FADE_IN } from "animation/effects";

import { HomeService } from "./HomeService";

import blizzardIcon from "@/assets/images/games_programs/blizzard.svg";
import steamIcon from "@/assets/images/games_programs/steam.svg";
import epicIcon from "@/assets/images/games_programs/epic.svg";
import originIcon from "@/assets/images/games_programs/origin.svg";

import styles from "../Home.module.scss";

const services = [
  {
    name: "Steam",
    icon: steamIcon,
    items: [
      {
        text: "Аккаунты с играми",
        path: "/",
      },
      {
        text: "Пополнение баланса",
        path: "/",
      },
      {
        text: "Подарки (Gifts)",
        path: "/",
      },
      {
        text: "Очки",
        path: "/",
      },
    ],
  },
  {
    name: "Blizzard",
    icon: blizzardIcon,
    items: [
      {
        text: "Аккаунты с играми",
        path: "/",
      },
      {
        text: "Пополнение баланса",
        path: "/",
      },
    ],
  },
  {
    name: "Epic Games",
    icon: epicIcon,
    items: [
      {
        text: "Аккаунты с играми",
        path: "/",
      },
      {
        text: "Пополнение баланса",
        path: "/",
      },
    ],
  },
  {
    name: "Origin",
    icon: originIcon,
    items: [
      {
        text: "Аккаунты с играми",
        path: "/",
      },
      {
        text: "Пополнение баланса",
        path: "/",
      },
    ],
  },
];

export const HomeServices = () => {
  return (
    <section className={cn("dark:bg-black-500 relative", styles.section, styles.services)}>
      <motion.div {...FADE_IN} className="inner-container">
        <h2 className={cn("dark:text-black-300", styles.sectionTitle)}>Cервисы</h2>
      </motion.div>
      <div className={cn("container", styles.servicesList)}>
        {services.map((s) => (
          <HomeService key={s.name} service={s} />
        ))}
      </div>
    </section>
  );
};
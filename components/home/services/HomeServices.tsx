import React from "react";
import classNames from "classnames";

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
    <section className={classNames("dark:bg-black-500 relative", styles.section, styles.services)}>
      <div className="inner-container">
        <h2 className={classNames("dark:text-black-300", styles.sectionTitle)}>Cервисы</h2>
      </div>
      <div className={classNames("container", styles.servicesList)}>
        {services.map((s) => (
          <HomeService key={s.name} service={s} />
        ))}
      </div>
    </section>
  );
};

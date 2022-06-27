import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import { FADE_IN } from "animation/effects";

import { HomeSocial } from "./HomeSocial";

import vkIcon from "@/assets/images/socials/vk.svg";
import telegramIcon from "@/assets/images/socials/telegram.svg";
import tikTokIcon from "@/assets/images/socials/tiktok.svg";
import youtubeIcon from "@/assets/images/socials/youtube.svg";
import instagramIcon from "@/assets/images/socials/instagram.svg";

import styles from "../Home.module.scss";

const socials = [
  {
    name: "Vk",
    icon: vkIcon,
    items: [
      {
        text: "Сообщества",
        path: "/",
      },
      {
        text: "Услуги",
        path: "/",
      },
    ],
  },
  {
    name: "Telegram",
    icon: telegramIcon,
    items: [
      {
        text: "Каналы",
        path: "/",
      },
      {
        text: "Услуги",
        path: "/",
      },
    ],
  },
  {
    name: "TikTok",
    icon: tikTokIcon,
    items: [
      {
        text: "Аккаунты",
        path: "/",
      },
      {
        text: "Услуги",
        path: "/",
      },
    ],
  },
  {
    name: "YouTube",
    icon: youtubeIcon,
    items: [
      {
        text: "Каналы",
        path: "/",
      },
      {
        text: "Услуги",
        path: "/",
      },
    ],
  },
  {
    name: "Instagram",
    icon: instagramIcon,
    items: [
      {
        text: "Аккаунты",
        path: "/",
      },
      {
        text: "Услуги",
        path: "/",
      },
    ],
  },
];

export const HomeSocials = () => {
  return (
    <section className={cn("dark:bg-black-400 relative", styles.section, styles.socials)}>
      <motion.div {...FADE_IN} className="inner-container">
        <h2 className={cn(styles.sectionTitle, "dark:text-black-300")}>Соц.сети</h2>
      </motion.div>
      <div className={cn("container", styles.socialsList)}>
        {socials.map((s) => (
          <HomeSocial key={s.name} social={s} />
        ))}
      </div>
    </section>
  );
};

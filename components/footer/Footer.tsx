import React, { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

import logoIcon from "@/assets/images/logo.svg";
import logo2Icon from "@/assets/images/logo-2.svg";
import vkIcon from "@/assets/images/socials/vk.svg";
import telegramIcon from "@/assets/images/socials/telegram.svg";
import youtubeIcon from "@/assets/images/socials/youtube.svg";

import styles from "./Footer.module.scss";

const infoList = [
  { title: 480, text: "продуктов" },
  { title: 1050, text: "продавцов" },
  { title: 984, text: "покупателей" },
];

const list = [
  {
    title: "Игры",
    path: "/",
  },
  {
    title: "Соц сети",
    path: "/",
  },
  {
    title: "Наши плюсы",
    path: "/",
  },
  {
    title: "Поддержка",
    path: "/",
  },
  {
    title: "Cервисы",
    path: "/",
  },
  {
    title: "Помощь",
    path: "/",
  },
  {
    title: "О площадке",
    path: "/",
  },
  {
    title: "Продать услугу",
    path: "/",
  },
];

const socials = [
  {
    name: "YaonPay",
    href: "#",
    icon: youtubeIcon,
    color: "text-red-100",
  },
  {
    name: "@YaonPay",
    href: "#",
    icon: telegramIcon,
    color: "text-blue-200",
  },
  {
    name: "YaonPay",
    href: "#",
    icon: vkIcon,
    color: "text-blue-100",
  },
];

export const Footer: FC<{ isGray: boolean }> = ({ isGray }) => {
  return (
    <footer className={cn(styles.footer, { [styles.footer_gray]: isGray })}>
      <div className={cn("inner-container", styles.footerContainer)}>
        <div className={cn(styles.footerTop, { [styles.footerTop_gray]: isGray })}>
          {socials.map((s, idx: number) => (
            <a key={`${s.name}_${idx}`} href={s.href} className="flex items-center">
              <Image src={s.icon} width={50} height={50} alt={s.name} />
              <b className={s.color}>{s.name}</b>
            </a>
          ))}
        </div>
        <div className={styles.footerMain}>
          <Link href="/">
            <a className={styles.footerLogo}>
              <Image
                width={window.screen.width > 768 ? 270 : 124}
                height={window.screen.width > 768 ? 79 : 34}
                src={window.screen.width > 768 ? logoIcon : logo2Icon}
                alt="YaonPay"
                priority
              />
            </a>
          </Link>
          <ul className={styles.footerInfo}>
            {infoList.map((i) => (
              <li key={i.title}>
                <b>{i.title}</b>
                <span>{i.text}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.footerNav}>
            {list.map((i) => (
              <li key={i.title}>
                <Link href={i.path}>
                  <a>{i.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2022 YaonPay. Твоя торговая площадка цифровых товар</span>
          <div>
            <Link href="#">
              <a className="mr-10 inline-block">Пользовательское соглашение</a>
            </Link>
            <Link href="#">
              <a>Политика конфенденциальности</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

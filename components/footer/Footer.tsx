import React from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import logoIcon from "@/assets/images/logo.svg";
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
    path: "#",
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

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames("inner-container", styles.footerContainer)}>
        <div className={styles.footerTop}>
          {socials.map((s, idx: number) => (
            <a key={`${s.name}_${idx}`} href={s.href} className="flex items-center">
              <Image src={s.icon} width={50} height={50} alt={s.name} />
              <b className={s.color}>{s.name}</b>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Link href="/">
            <a>
              <Image width={270} height={79} src={logoIcon} alt="YaonPay" priority />
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

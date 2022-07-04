import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";

import { ICategory } from "@/models/ICategory";

import { Header } from "@/components/header/Header";
import { ArrowIcon } from "@/components/icons";

import buttonStyles from "@/components/ui/Button/Button.module.scss";
import styles from "./CategoryLayout.module.scss";

interface ICategoryLayout {
  children: ReactNode;
  title: string;
  category: ICategory;
}

const buttons = [
  {
    name: "Буст",
    path: "/",
  },
  {
    name: "Монеты",
    path: "/",
  },
  {
    name: "Аккаунты",
    path: "/",
  },
  {
    name: "Прочье",
    path: "/",
  },
];

export const CategoryLayout: FC<ICategoryLayout> = ({ children, title, category }) => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <div
        className={cn("page-preview", styles.top)}
        style={{ backgroundImage: `url(${category.banner})` }}
      >
        <Header />
        <div className="mask" />
        <div className="inner-container relative z-10">
          <Link href="/">
            <a className="flex items-center">
              <ArrowIcon direction="left" />
              <b>В каталог FIFA</b>
            </a>
          </Link>
          <h1>Буст FIFA</h1>
          <p>
            YaonPay предоставляет вам возможность купить буст аккаунта FIFA совершенно безопасно и с
            гарантией нужного результата. Наши продавцы — опытные игроки, готовые выполнить любую
            поставленную задачу (взять элиту в Weekend League или отыграть Division Rivals). Защита
            всех сделок обеспечивается системой безопасности биржи
          </p>
          <div className={styles.buttons}>
            {buttons.map((b, idx) => (
              <Link key={`${b.path}_${idx}`} href={b.path}>
                <a
                  className={cn(
                    buttonStyles.button,
                    buttonStyles.buttonOutlined,
                    buttonStyles.link,
                    styles.button,
                    {
                      [buttonStyles.buttonContained]: idx === 0,
                    }
                  )}
                >
                  {b.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow mb-44 container sm:mb-28">{children}</div>
    </div>
  );
};

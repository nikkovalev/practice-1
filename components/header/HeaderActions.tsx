import React, { FC } from "react";
import cn from "classnames";
import Link from "next/link";

import { IUser } from "@/models/IUser";

import { HeaderUser } from "./HeaderUser";
import { HeaderSelect } from "./HeaderSelect";
import { Button } from "../ui";

import { MoonIcon, SunIcon } from "../icons";

import styles from "./Header.module.scss";

interface IHeaderActions {
  menuRef: any;
  isShowMenu: boolean;
  isAuth: boolean;
  theme: "light" | "dark";
  user: IUser | null;
  navList: { name: string; path: string }[];
  changeMode: () => void;
}

const currencies = ["₽", "$", "€"];
const languages = ["Ru", "En"];

export const HeaderActions: FC<IHeaderActions> = ({
  menuRef,
  isShowMenu,
  isAuth,
  theme,
  user,
  navList,
  changeMode,
}) => {
  return (
    <div
      ref={menuRef}
      className={cn(styles.headerSelects, {
        [styles.headerSelectsActive]: isShowMenu,
      })}
    >
      {isAuth && user && <HeaderUser isShowMenu={isShowMenu} user={user} />}
      <div className="flex items-center">
        <HeaderSelect items={currencies} />
        <HeaderSelect items={languages} />
        <button
          className={cn(styles.headerChangeMode, {
            [styles.headerChangeModeLight]: theme === "dark",
            [styles.headerChangeModeDark]: theme === "light",
          })}
          onClick={changeMode}
        >
          <span />
          <span>
            <MoonIcon />
            <SunIcon />
          </span>
        </button>
      </div>
      <ul
        className={cn(styles.headerNav, {
          [styles.headerNavAuth]: isAuth && user,
        })}
      >
        {navList.map(({ name, path }) => (
          <li key={path}>
            <Link href={path}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      {isAuth && (
        <Button className={styles.headerSell} variant="outlined" size="small">
          Продать
        </Button>
      )}
    </div>
  );
};

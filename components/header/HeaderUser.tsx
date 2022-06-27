import React, { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useOutside } from "@/hooks/useOutside";

import { IUser } from "@/models/IUser";

import { ArrowIcon } from "../icons";
import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Header.module.scss";

const list = [
  {
    title: "Профиль",
    path: "/profile",
  },
  {
    title: "Предложения",
    path: "/proposal",
    count: 29,
  },
  {
    title: "Продажи",
    path: "/sales",
    count: 0,
  },
  {
    title: "Покупки",
    path: "/purchases",
    count: 0,
    style: "bg-gray-400",
  },
  {
    title: "Финансы",
    path: "/finance",
  },
  {
    title: "Отзывы",
    path: "/reviews",
    count: 14,
    style: "bg-secondary-400 text-black-400",
  },
  {
    title: "Настройки",
    path: "/settings",
  },
];

interface IHeaderUser {
  user: IUser | null;
  isShowMenu: boolean;
}

export const HeaderUser: FC<IHeaderUser> = ({ user, isShowMenu }) => {
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleClick = () => setIsShow(!isShow);

  return (
    <div ref={ref} className={cn(styles.headerUser, { [styles.headerUserActive]: isShowMenu })}>
      {user && (
        <div
          className={cn("dark:bg-black-300 dark:border-transparent", styles.headerUserTop)}
          onClick={handleClick}
        >
          <div
            className={styles.headerUserAvatar}
            style={{ backgroundImage: `url(${anonymousImage.src})` }}
          />
          <div className={styles.headerUserInfo}>
            <div className="w-full flex items-center justify-between dark:text-white-100">
              {user.username || "Anonimus"} <ArrowIcon />
            </div>
            <b>1500₽</b>
          </div>
        </div>
      )}
      <div
        className={cn(styles.headerUserPopper, {
          [styles.headerUserPopperActive]: isShow,
        })}
      >
        <ul>
          {list.map(({ title, path, count, style }) => (
            <li key={path}>
              <Link href={path}>
                <a>
                  <b>{title}</b>
                  {count !== undefined && <span className={style}>{count}</span>}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

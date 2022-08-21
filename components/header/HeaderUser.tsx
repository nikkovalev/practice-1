import React, { FC, useMemo } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";
import { useOutside } from "@/hooks/useOutside";

import { IUser } from "@/models/IUser";

import { Link } from "@/components/ui";

import { ArrowIcon } from "../icons";
import anonymous from "@/assets/images/anonymous.jpg";

import styles from "./Header.module.scss";

interface IHeaderUser {
  me: IUser;
}

export const HeaderUser: FC<IHeaderUser> = ({ me }) => {
  const { isShow, ref, setIsShow } = useOutside(false);
  const list = useMemo<{ title: string; href: string; count?: number; color?: string }[]>(
    () => [
      {
        title: "Профиль",
        href: "/profile",
      },
      {
        title: "Предложения",
        href: "/offers",
        count: 29,
      },
      {
        title: "Продажи",
        href: "/sales",
        count: 4,
      },
      {
        title: "Покупки",
        href: "/purchases",
        count: 0,
        color: "bg-gray-400 text-white-100",
      },
      {
        title: "Финансы",
        href: "/finance",
      },
      {
        title: "Отзывы",
        href: "/reviews",
        count: 14,
        color: "bg-secondary-400 text-black-400",
      },
      {
        title: "Настройки",
        href: "/settings",
      },
    ],
    []
  );

  const handleClick = () => setIsShow((prev) => !prev);

  return (
    <div ref={ref} className={styles.headerUserWrapper}>
      <div className={styles.headerUser} onClick={handleClick}>
        <div
          className={styles.headerUserAvatar}
          style={{ backgroundImage: url(me?.photoUrl || anonymous.src) }}
        />
        <div className={styles.headerUserInfo}>
          <div>
            <span>{me.username}</span>
            <ArrowIcon direction="bottom" color="gray" />
          </div>
          <b>1500₽</b>
        </div>
      </div>
      <div
        className={cn(styles.headerUserPopper, {
          [styles.headerUserPopperActive]: isShow,
        })}
      >
        <ul className={styles.headerUserPopperList}>
          {list.map((i) => (
            <li key={i.href}>
              <Link href={i.href}>
                {i.title}
                {i.count !== undefined && (
                  <b
                    className={cn({
                      "bg-primary-400 text-white-100": !i.color,
                      [i.color as string]: !!i.color,
                    })}
                  >
                    {i.count}
                  </b>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

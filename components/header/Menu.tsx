import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { useOutside } from "@/hooks/useOutside";

import { HamburgerIcon } from "@/components/icons/HamburgerIcon";

import styles from "./Header.module.scss";

const list = [
  {
    name: "Игры",
    path: "/games",
  },
  {
    name: "Наши плюсы",
    path: "/our-advantages",
  },
  {
    name: "Cервисы",
    path: "/services",
  },
  {
    name: "О нас",
    path: "/about-us",
  },
  {
    name: "Соц сети",
    path: "/socials",
  },
  {
    name: "Поддержка",
    path: "/support",
  },
  {
    name: "Помощь",
    path: "/help",
  },
];

export const MenuBurger = () => {
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleClick = () => setIsShow(!isShow);

  return (
    <div className={classNames("relative", { "cursor-pointer": !isShow })}>
      <div className={styles.headerIcon} onClick={handleClick}>
        <HamburgerIcon />
      </div>
      <div
        ref={ref}
        className={classNames(styles.headerPopper, {
          [styles.headerPopperActive]: isShow,
        })}
      >
        <ul>
          {list.map(({ name, path }) => (
            <li key={path}>
              <Link href={path}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

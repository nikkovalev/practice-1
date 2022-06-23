import React, { FC } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useOutside } from "@/hooks/useOutside";

import { HamburgerIcon, CloseIcon } from "@/components/icons";

import styles from "./Header.module.scss";

interface IMenuBurger {
  navList: { name: string; path: string }[];
}

export const MenuBurger: FC<IMenuBurger> = ({ navList }) => {
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleClick = () => setIsShow(!isShow);

  return (
    <div className={styles.headerMenu}>
      <div className={styles.headerIcon} onClick={handleClick}>
        <HamburgerIcon />
      </div>
      <div
        ref={ref}
        className={classNames(styles.headerPopper, {
          [styles.headerPopperActive]: isShow,
        })}
      >
        <ul className={styles.headerNav}>
          {navList.map(({ name, path }) => (
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

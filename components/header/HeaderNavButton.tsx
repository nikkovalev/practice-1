import React from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";
import { navList } from "./header.data";

import { Link } from "@/components/link";
import { HamburgerIcon } from "@/components/icons";

import styles from "./Header.module.scss";

export const HeaderNavButton = () => {
  const { isShow, ref, setIsShow } = useOutside(false);

  const handleClick = () => setIsShow(true);

  return (
    <div className="relative lg:hidden">
      <button className={styles.headerNavBtn} onClick={handleClick}>
        <HamburgerIcon />
      </button>
      <div
        ref={ref}
        className={cn(styles.headerNavPopper, { [styles.headerNavPopperActive]: isShow })}
      >
        <ul className={styles.headerNavPopperList}>
          {navList.map((i) => (
            <li key={i.href}>
              <Link href={i.href}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

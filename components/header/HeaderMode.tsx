import React, { FC, useEffect } from "react";
import cn from "classnames";

import { MoonIcon, SunIcon } from "../icons";

import styles from "./Header.module.scss";

interface IHeaderMode {
  theme: "light" | "dark";
  handleChange: () => void;
}

export const HeaderMode: FC<IHeaderMode> = ({ theme, handleChange }) => {
  const handleClick = () => handleChange();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  return (
    <button
      className={cn(styles.headerMode, {
        [styles.headerModeLight]: theme === "dark",
        [styles.headerModeDark]: theme === "light",
      })}
      onClick={handleClick}
    >
      <span />
      <span>
        <MoonIcon />
        <SunIcon />
      </span>
    </button>
  );
};

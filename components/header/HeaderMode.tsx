import React, { FC, useEffect } from "react";
import cn from "classnames";

import { MoonIcon, SunIcon } from "../icons";

import styles from "./Header.module.scss";

interface IHeaderMode {
  theme: "light" | "dark";
  handleChange: () => void;
}

export const HeaderMode: FC<IHeaderMode> = ({ theme, handleChange }) => {
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  return (
    <button
      className={cn(styles.headerMode, {
        [styles.headerModeLight]: theme === "dark",
        [styles.headerModeDark]: theme === "light",
      })}
      onClick={handleChange}
    >
      <span />
      <span>
        <MoonIcon />
        <SunIcon />
      </span>
    </button>
  );
};

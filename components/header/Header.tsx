import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useOutside } from "@/hooks/useOutside";

import { MenuBurger } from "./Menu";
import { SearchIcon, LikeIcon, UserIcon } from "../icons";
import logoIcon from "@/assets/images/logo.svg";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";

import styles from "./Header.module.scss";

const currencies = ["₽", "$", "€"];

export const Header = () => {
  const {
    ref: currencyRef,
    isShow: isShowCurrency,
    setIsShow: setIsShowCurrency,
  } = useOutside(false);
  const [currentCurrency, setCurrentCurrency] = useState<string>("₽");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const changeMode = () => setMode((p) => (p === "light" ? "dark" : "light"));
  const handleClickCurrency = () => setIsShowCurrency(!isShowCurrency);
  const handleSelectCurrency = (currency: string) => () => setCurrentCurrency(currency);

  useEffect(() => {
    document.documentElement.classList[mode === "light" ? "remove" : "add"]("dark");
  }, [mode]);

  return (
    <div className="container pt-10">
      <div
        className={classNames("inner-container flex items-center justify-between", styles.header)}
      >
        <div className="flex items-center">
          <Link href="/">
            <a className={styles.headerLogo}>
              <Image width={270} height={79} src={logoIcon} alt="YaonPay" />
            </a>
          </Link>
          <MenuBurger />
        </div>
        <div className="flex items-center">
          <div className={styles.headerIconButton}>
            <SearchIcon />
          </div>
          <div className={classNames("relative", styles.headerIconButton, styles.headerLikeIcon)}>
            <LikeIcon />
            <div className={styles.headerIconButtonCount}>5</div>
          </div>
          <Link href="/auth">
            <a className={styles.headerIconButton}>
              <UserIcon />
            </a>
          </Link>
          <button
            ref={currencyRef}
            className={classNames(styles.headerButtonText, {
              [styles.headerButtonTextActive]: isShowCurrency,
            })}
            onClick={handleClickCurrency}
          >
            <span className="dark:text-white-100 transition-colors">{currentCurrency}</span>
            {currencies.map((c: string) => (
              <span
                key={c}
                className="option dark:text-white-100 transition-colors"
                onClick={handleSelectCurrency(c)}
              >
                {c}
              </span>
            ))}
          </button>
          <button className={styles.headerButtonText}>
            <span className="dark:text-white-100 transition-colors">Ru</span>
          </button>
          <button
            className={classNames(styles.headerChangeMode, {
              [styles.headerChangeModeLight]: mode === "light",
              [styles.headerChangeModeDark]: mode === "dark",
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
      </div>
    </div>
  );
};

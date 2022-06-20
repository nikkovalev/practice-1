import React, { useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { changeModalPrevUrl, changeTheme } from "@/store/reducers/global/globalSlice";
import { getMe } from "@/store/reducers/auth/authActionCreators";

import { MenuBurger } from "./Menu";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderSelect } from "./HeaderSelect";
import { HeaderUser } from "./HeaderUser";
import { Button } from "../ui";
import logoIcon from "@/assets/images/logo.svg";
import { SearchIcon, LikeIcon, UserIcon, MessageIcon, SunIcon, MoonIcon } from "../icons";

import styles from "./Header.module.scss";

const currencies = ["₽", "$", "€"];
const languages = ["Ru", "En"];

export const Header = () => {
  const { ref: searchRef, isShow: isShowSearch, setIsShow: setIsShowSearch } = useOutside(false);
  const { theme } = useAppSelector((state) => state.globalReducer);
  const { isAuth, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const changeMode = () => dispatch(changeTheme());
  const goToAuth = () => dispatch(changeModalPrevUrl(router.asPath));
  const openSearch = () => setIsShowSearch(true);
  const handleClickUser = () => dispatch(getMe());

  useEffect(() => {
    document.documentElement.classList[theme === "light" ? "remove" : "add"]("dark");
  }, [theme]);

  useEffect(() => {
    if (isAuth && !user) dispatch(getMe());
  }, [isAuth]);

  return (
    <header className="relative z-30">
      <HeaderSearch ref={searchRef} isShow={isShowSearch} />
      <div className="container relative pt-10">
        <div
          className={classNames("inner-container flex items-center justify-between", styles.header)}
        >
          <div className="flex items-center">
            <Link href="/">
              <a className={styles.headerLogo}>
                <Image width={270} height={79} src={logoIcon} alt="YaonPay" priority />
              </a>
            </Link>
            <MenuBurger />
          </div>
          <div className="flex items-center">
            <div className={styles.headerIconButton} onClick={openSearch}>
              <SearchIcon />
            </div>
            <Link href="/favorites">
              <a className={classNames("w-9", styles.headerIconButton, styles.headerLikeIcon)}>
                <LikeIcon />
                <span className={styles.headerIconButtonCount}>5</span>
              </a>
            </Link>
            {!isAuth && (
              <Link href="/auth">
                <a className={styles.headerIconButton} onClick={goToAuth}>
                  <UserIcon />
                </a>
              </Link>
            )}
            {isAuth && !user && (
              <button className={styles.headerIconButton} onClick={handleClickUser}>
                <UserIcon />
              </button>
            )}
            {isAuth && user && (
              <Link href="/messages">
                <a className={classNames("w-9", styles.mr0, styles.headerIconButton)}>
                  <MessageIcon />
                  <span className={styles.headerIconButtonCount}>2</span>
                </a>
              </Link>
            )}
            {isAuth && user && <HeaderUser user={user} />}
            <HeaderSelect items={currencies} />
            <HeaderSelect items={languages} />
            <button
              className={classNames(styles.headerChangeMode, {
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
            {isAuth && (
              <Button className={styles.headerSell} variant="outlined" size="small">
                Продать
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

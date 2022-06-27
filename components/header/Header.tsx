import React, { useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useGetMeQuery } from "@/store/auth/authApi";

import { MenuBurger } from "./Menu";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderSelect } from "./HeaderSelect";
import { HeaderUser } from "./HeaderUser";
import { Button } from "../ui";
import logoIcon from "@/assets/images/logo.svg";
import logo2Icon from "@/assets/images/logo-2.svg";
import {
  SearchIcon,
  LikeIcon,
  UserIcon,
  MessageIcon,
  SunIcon,
  MoonIcon,
  CloseIcon,
  HamburgerIcon,
} from "../icons";

import styles from "./Header.module.scss";

const currencies = ["₽", "$", "€"];
const languages = ["Ru", "En"];
const navList = [
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

export const Header = () => {
  const router = useRouter();
  const { ref: searchRef, isShow: isShowSearch, setIsShow: setIsShowSearch } = useOutside(false);
  const { ref: menuRef, isShow: isShowMenu, setIsShow: setIsShowMenu } = useOutside(false);
  const { theme } = useAppSelector((state) => state.global);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { setModalPrevUrl, changeTheme, login } = useActions();
  const { data: userData, refetch } = useGetMeQuery("", { skip: !isAuth });

  const changeMode = () => changeTheme();
  const goToAuth = () => setModalPrevUrl(router.asPath);
  const openSearch = () => setIsShowSearch(true);
  const handleClickUser = () => refetch();
  const handleClickBurger = () => {
    setIsShowMenu(!isShowMenu);
  };

  useEffect(() => {
    document.documentElement.classList[theme === "light" ? "remove" : "add"]("dark");
  }, [theme]);

  useEffect(() => {
    const blurEl = document.querySelector(".blur");
    if (blurEl) blurEl.className = `blur ${isShowMenu ? "blur_active" : ""}`;
  }, [isShowMenu]);

  useEffect(() => {
    if (userData) login(userData);
  }, [userData]);

  return (
    <header className={styles.header}>
      <HeaderSearch ref={searchRef} isShow={isShowSearch} />
      <div className={cn("inner-container", styles.headerContent)}>
        <div className={styles.headerLeft}>
          <Link href="/">
            <a className={styles.headerLogo}>
              <Image
                className="flex-shrink-0"
                width={window.screen.width > 1200 ? 270 : 124}
                height={window.screen.width > 1200 ? 79 : 34}
                src={window.screen.width > 1200 ? logoIcon : logo2Icon}
                alt="YaonPay"
                priority
              />
            </a>
          </Link>
          <MenuBurger navList={navList} />
        </div>
        <div className="flex items-center">
          <div className={styles.headerIconButton} onClick={openSearch}>
            <SearchIcon />
          </div>
          <Link href="/favorites">
            <a className={cn("w-9", styles.headerIconButton, styles.headerLikeIcon)}>
              <LikeIcon />
              <span className={styles.headerIconButtonCount}>5</span>
            </a>
          </Link>
          {!isAuth && (
            <Link href="/auth">
              <a className={cn(styles.headerIconButton, styles.headerUserIcon)} onClick={goToAuth}>
                <UserIcon />
              </a>
            </Link>
          )}
          {isAuth && !user && (
            <button
              className={cn(styles.headerIconButton, styles.headerUserIcon)}
              onClick={handleClickUser}
            >
              <UserIcon />
            </button>
          )}
          {isAuth && user && (
            <Link href="/messages">
              <a className={cn("w-9", styles.mr0, styles.headerIconButton)}>
                <MessageIcon />
                <span className={styles.headerIconButtonCount}>2</span>
              </a>
            </Link>
          )}
          <div
            className={cn(styles.headerIcon, styles.headerNavButton)}
            onClick={handleClickBurger}
          >
            {isShowMenu ? <CloseIcon pathClassName="dark:fill-white-100" /> : <HamburgerIcon />}
          </div>
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
        </div>
      </div>
    </header>
  );
};

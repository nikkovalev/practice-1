import React, { useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOutside } from "@/hooks/useOutside";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useGetMeQuery } from "@/store/auth/authApi";
import { useSearchMutation } from "@/store/categories/categoriesApi";

import { MenuBurger } from "./Menu";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderCategory } from "./HeaderCategory";
import { HeaderActions } from "./HeaderActions";

import logoIcon from "@/assets/images/logo.svg";
import logo2Icon from "@/assets/images/logo-2.svg";
import { SearchIcon, LikeIcon, UserIcon, MessageIcon, CloseIcon, HamburgerIcon } from "../icons";

import styles from "./Header.module.scss";

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
  const {
    ref: searchRef,
    ref2: searchRef2,
    isShow: isShowSearch,
    setIsShow: setIsShowSearch,
  } = useOutside(false);
  const {
    ref: menuRef,
    ref2: menuRef2,
    isShow: isShowMenu,
    setIsShow: setIsShowMenu,
  } = useOutside(false);
  const { theme } = useAppSelector((state) => state.global);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { setModalPrevUrl, changeTheme, saveUser } = useActions();
  const { data: userData, refetch: getMe } = useGetMeQuery("", {
    skip: !isAuth,
    refetchOnMountOrArgChange: true,
  });
  const [search, { data: searchCategories }] = useSearchMutation();

  const changeMode = () => changeTheme();
  const goToAuth = () => setModalPrevUrl(router.asPath);
  const openSearch = () => setIsShowSearch(true);
  const handleClickUser = () => getMe();
  const handleClickBurger = () => setIsShowMenu(!isShowMenu);

  useEffect(() => {
    document.documentElement.classList[theme === "light" ? "remove" : "add"]("dark");
  }, [theme]);

  useEffect(() => {
    const blurEl = document.querySelector(".blur");
    if (blurEl) blurEl.className = `blur ${isShowMenu ? "blur_active" : ""}`;
  }, [isShowMenu]);

  useEffect(() => {
    if (userData) saveUser(userData);
  }, [userData]);

  return (
    <>
      {isShowSearch && (
        <div className={styles.headerSearchWrapper}>
          {!!searchCategories && (
            <div className={styles.headerSearchItems}>
              <div ref={searchRef2} className="custom_scrollbar inner-container">
                {searchCategories.map((c) => (
                  <HeaderCategory key={c.id} category={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <header className={styles.header}>
        <HeaderSearch ref={searchRef} isShow={isShowSearch} search={search} />
        <div
          className={cn("inner-container", styles.headerContent, {
            [styles.headerContentActive]: isShowMenu,
          })}
        >
          <div className={styles.headerLeft}>
            <Link href="/">
              <a className={styles.headerLogo}>
                <Image
                  className="flex-shrink-0"
                  width={window.screen.width > 1200 ? 270 : 124}
                  height={window.screen.width > 1200 ? 79 : 34}
                  src={window.screen.width > 1200 ? logoIcon : logo2Icon}
                  alt="YaonPay"
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
              <a
                className={cn(styles.headerIconButton, styles.headerLikeIcon, {
                  "w-9": !!user?.likedServices.length,
                })}
              >
                <LikeIcon />
                {!!user?.likedServices?.length && (
                  <span className={styles.headerIconButtonCount}>{user.likedServices.length}</span>
                )}
              </a>
            </Link>
            {!isAuth && (
              <Link href="/auth">
                <a
                  className={cn(styles.headerIconButton, styles.headerUserIcon)}
                  onClick={goToAuth}
                >
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
              <Link href="/chats">
                <a className={cn("w-9", styles.mr0, styles.headerIconButton)}>
                  <MessageIcon />
                  <span className={styles.headerIconButtonCount}>2</span>
                </a>
              </Link>
            )}
            <div
              ref={menuRef2}
              className={cn(styles.headerIcon, styles.headerNavButton, {
                [styles.headerIconActive]: isShowMenu,
              })}
              onClick={handleClickBurger}
            >
              {isShowMenu ? <CloseIcon pathClassName="dark:fill-white-100" /> : <HamburgerIcon />}
            </div>
            {window.screen.width >= 1200 && (
              <HeaderActions
                menuRef={menuRef}
                isShowMenu={isShowMenu}
                isAuth={isAuth}
                theme={theme}
                user={user}
                navList={navList}
                changeMode={changeMode}
              />
            )}
          </div>
        </div>
      </header>
      {window.screen.width < 1200 && (
        <HeaderActions
          menuRef={menuRef}
          isShowMenu={isShowMenu}
          isAuth={isAuth}
          theme={theme}
          user={user}
          navList={navList}
          changeMode={changeMode}
        />
      )}
    </>
  );
};

import React, { useEffect } from "react";
import Image from "next/image";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { useOutside } from "@/hooks/useOutside";

import { navList } from "./header.data";

import { useSearchMutation } from "@/store/categories/categoriesApi";
import { useFetchLikedServicesQuery, useGetMeQuery } from "@/store/auth/authApi";

import { HeaderNavButton } from "./HeaderNavButton";
import { HeaderMode } from "./HeaderMode";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderCategory } from "./HeaderCategory";
import { Link } from "@/components/link";
import { HeaderUser } from "./HeaderUser";
import { Button } from "@/components/ui";
import { HeaderSelect } from "./HeaderSelect";

import { CloseIcon, HamburgerIcon, LikeIcon, MessageIcon, SearchIcon, UserIcon } from "../icons";
import logoIcon from "@/assets/images/logo.svg";
import logo2Icon from "@/assets/images/logo-2.svg";

import styles from "./Header.module.scss";

export const Header = () => {
  // store
  const { theme } = useAppSelector((state) => state.global);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { changeTheme, saveUser } = useActions();
  // Refs
  const {
    isShow: isShowSearch,
    ref: searchRef,
    ref2: searchRef2,
    setIsShow: setIsShowSearch,
  } = useOutside(false);
  const {
    ref: menuRef,
    ref2: menuRef2,
    isShow: isShowMenu,
    setIsShow: setIsShowMenu,
  } = useOutside(false);
  // Requests
  const [search, { data: searchCategories }] = useSearchMutation();
  const { data: likedServices } = useFetchLikedServicesQuery(true, { skip: !isAuth });
  const { data: me, refetch: getMe, isError: isMeError } = useGetMeQuery("", { skip: !isAuth });
  // variables
  const isLikedServices = !!likedServices?.length && likedServices.length > 0;
  const currencies = ["₽", "$", "€"];
  const languages = ["Ru", "En"];

  const handleShowSearch = () => setIsShowSearch(true);
  const handleClickMenuBtn = () => setIsShowMenu(!isShowMenu);

  useEffect(() => {
    const blurEl = document.getElementById("blur");
    if (blurEl) blurEl.className = isShowMenu ? "active" : "";
  }, [isShowMenu]);

  useEffect(() => {
    if (!isMeError && me) saveUser(me);
  }, [me, isMeError, saveUser]);

  return (
    <>
      {isAuth && isMeError && (
        <div className="fixed top-[108px] left-0 right-0 bg-secondary-400 z-20 pt-[10px] pb-[10px]">
          <div className="inner-container font-medium">Подтвердите электронную почту</div>
        </div>
      )}
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
        <div className={cn("inner-container", styles.headerContainer)}>
          <div
            className={cn(styles.headerLeft, {
              [styles.headerLeftActive]: isShowMenu,
            })}
          >
            <Link className={styles.headerLogo} href="/">
              <Image
                width={window.screen.width > 1200 ? 270 : 124}
                height={window.screen.width > 1200 ? 79 : 34}
                src={window.screen.width > 1200 ? logoIcon : logo2Icon}
                alt="YaonPay"
              />
            </Link>
            <HeaderNavButton />
            <div className="flex items-center ml-auto xxs:ml-0">
              <button className={styles.headerLinkIcon} onClick={handleShowSearch}>
                <SearchIcon />
              </button>
              <Link
                href="/favorites"
                className={cn(styles.headerLinkIcon, styles.headerLike, {
                  [styles.headerLinkIconLargeMargin]: isLikedServices,
                })}
              >
                <LikeIcon />
                {isLikedServices && <b>{likedServices?.length}</b>}
              </Link>
              {!isAuth && (
                <Link className={styles.headerLinkIcon} href="/auth">
                  <UserIcon />
                </Link>
              )}
              {isAuth && !!me && (
                <Link
                  className={cn(styles.headerLinkIcon, styles.headerLinkIconLargeMargin)}
                  href="/chat"
                >
                  <MessageIcon />
                  <b>2</b>
                </Link>
              )}
              {isAuth && !me && (
                <button className={styles.headerLinkIcon} onClick={getMe}>
                  <UserIcon />
                </button>
              )}
              <button
                ref={menuRef2}
                className={cn(styles.headerNavBtn, styles.headerMenuBtn)}
                onClick={handleClickMenuBtn}
              >
                {isShowMenu ? <CloseIcon pathClassName="fill-white-100" /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
          <div
            ref={menuRef}
            className={cn(styles.headerMenu, {
              [styles.headerMenuActive]: isShowMenu,
            })}
          >
            {isAuth && !!me && <HeaderUser me={me} />}
            <div className={styles.headerActions}>
              <HeaderSelect items={currencies} />
              <HeaderSelect items={languages} />
              <HeaderMode theme={theme} handleChange={changeTheme} />
            </div>
            <Button
              className={cn(styles.headerButton, {
                [styles.headerButtonTranslated]: isAuth && !!me,
              })}
              variant="outlined"
              size="small"
            >
              Продать
            </Button>
            <div className="hidden lg:block lg:order-3">
              <ul
                className={cn(styles.headerNavPopperList, {
                  "-mt-[80px] pl-[60px] pr-[60px]": isAuth && !!me,
                })}
              >
                {navList.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>{i.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

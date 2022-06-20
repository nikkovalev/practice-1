import React, { useEffect, forwardRef } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { SearchIcon } from "../icons";

import styles from "./Header.module.scss";

interface IHeaderSearch {
  isShow: boolean;
}

export const HeaderSearch = forwardRef<HTMLDivElement, IHeaderSearch>(({ isShow }, ref: any) => {
  const { register, handleSubmit, setFocus } = useForm();

  const handleSearch = (data: { [key: string]: any }) => console.log(data);

  useEffect(() => {
    if (isShow) setFocus("search");
  }, [isShow]);

  return (
    <div
      ref={ref}
      className={classNames(styles.headerSearch, { [styles.headerSearchActive]: isShow })}
    >
      <div className="inner-container w-full h-full relative">
        <form className="w-full h-full" onSubmit={handleSubmit(handleSearch)}>
          <input {...register("search")} placeholder="Поиск по 1 500 играм" autoComplete="off" />
          <button className={styles.headerSearchIcon}>
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
});
HeaderSearch.displayName = "HeaderSearch";

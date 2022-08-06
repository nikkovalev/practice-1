import React, { useEffect, forwardRef, ChangeEvent, useState, useRef } from "react";
import cn from "classnames";

import { SearchIcon } from "../icons";
import styles from "./Header.module.scss";

interface IHeaderSearchInput {
  isShow: boolean;
  isData: boolean;
  search: (query: string) => void;
  resetCategories: () => void;
}

export const HeaderSearchInput = forwardRef<HTMLDivElement, IHeaderSearchInput>(
  ({ isShow, isData, search, resetCategories }, ref: any) => {
    // States
    const [q, setQ] = useState<string>("");
    // Refs
    const timerId = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Request

    const handleSearch = () => search(q);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value);

    useEffect(() => {
      if (inputRef.current) inputRef.current?.focus();
      document.body.style.overflowY = isShow ? "hidden" : "auto";
    }, [isShow]);

    useEffect(() => {
      if (q.length > 3) {
        if (!!timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(handleSearch, 1000);
      } else if (!!isData) {
        resetCategories();
      }
      // eslint-disable-next-line
    }, [q]);

    return (
      <div
        ref={ref}
        className={cn(styles.headerSearchInput, { [styles.headerSearchInputActive]: isShow })}
      >
        <div className="inner-container w-full h-full relative">
          <input
            ref={inputRef}
            placeholder="Поиск по 1 500 играм"
            autoComplete="off"
            onChange={handleChange}
          />
          <div className={styles.headerSearchIcon}>
            <SearchIcon />
          </div>
        </div>
      </div>
    );
  }
);
HeaderSearchInput.displayName = "HeaderSearchInput";

import React, { useEffect, forwardRef, ChangeEvent, useState, useRef } from "react";
import cn from "classnames";

import { Container } from "../ui";
import { SearchIcon } from "../icons";

import styles from "./Header.module.scss";

interface IHeaderSearchInput {
  isShow: boolean;
  isData: boolean;
  search: (query: string) => void;
  resetData: () => void;
}

export const HeaderSearchInput = forwardRef<HTMLDivElement, IHeaderSearchInput>(
  ({ isShow, isData, search, resetData }, ref: any) => {
    // States
    const [q, setQ] = useState<string>("");
    // Refs
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQ(val);
      search(q);
      if (!val.length && !!isData) resetData();
    };

    useEffect(() => {
      if (inputRef.current) inputRef.current?.focus();
      document.body.style.overflowY = isShow ? "hidden" : "auto";
    }, [isShow]);

    return (
      <div
        ref={ref}
        className={cn(styles.headerSearchInput, { [styles.headerSearchInputActive]: isShow })}
      >
        <Container variant="ic" className="w-full h-full relative">
          <input
            ref={inputRef}
            placeholder="Поиск по 1 500 играм"
            autoComplete="off"
            onChange={handleChange}
          />
          <div className={styles.headerSearchIcon}>
            <SearchIcon />
          </div>
        </Container>
      </div>
    );
  }
);
HeaderSearchInput.displayName = "HeaderSearchInput";

import React, { FC } from "react";
import cn from "classnames";
import { ICategory } from "@/models/ICategory";

import { HeaderCategory } from "./HeaderCategory";
import { Container } from "../ui";

import styles from "./Header.module.scss";

interface IHeaderSearch {
  categories: ICategory[] | undefined;
  searchRef2: any;
}

export const HeaderSearch: FC<IHeaderSearch> = ({ categories, searchRef2 }) => {
  return (
    <div className={styles.headerSearchWrapper}>
      {!!categories && (
        <div ref={searchRef2} className={cn("custom_scrollbar", styles.headerSearchContent)}>
          <Container variant="ic" className={styles.headerSearchList}>
            {categories.map((c) => (
              <HeaderCategory key={c.id} category={c} />
            ))}
          </Container>
        </div>
      )}
    </div>
  );
};

import React, { FC } from "react";
import Link from "next/link";

import { ICategory } from "@/models/ICategory";

import styles from "./Header.module.scss";

interface IHeaderCategory {
  category: ICategory;
}

export const HeaderCategory: FC<IHeaderCategory> = ({ category }) => {
  return (
    <div className={styles.headerSearchItem}>
      <div style={{ backgroundImage: `url(${category.icon}` }} />
      <div>
        <Link href={`/categories/${category.slug}`}>
          <a>{category.name}</a>
        </Link>
        <ul>
          {category.services.map((s) => (
            <li key={s.id}>
              <Link href={`/categories/${category.slug}?page=${s.id}`}>
                <a>{s.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

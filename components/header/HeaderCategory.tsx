import React, { FC } from "react";
import { ICategory } from "@/models/ICategory";

import { Text } from "../ui";
import styles from "./Header.module.scss";

interface IHeaderCategory {
  category: ICategory;
}

export const HeaderCategory: FC<IHeaderCategory> = ({ category }) => {
  return (
    <div className={styles.headerCategory}>
      <div className={styles.headerCategoryTop}>
        <div
          className={styles.headerCategoryImage}
          style={{ backgroundImage: `url(${category.icon}` }}
        />
        <Text as="a" href={`/categories/${category.slug}`} color="white" weight={700} size="xl">
          {category.name}
        </Text>
      </div>
      <ul className={styles.headerCategoryList}>
        {category.services.map(({ id, name }) => (
          <li key={id}>
            <Text
              as="a"
              href={`/categories/${category.slug}?page=${id}`}
              size="l"
              color="white"
              weight={500}
            >
              {name}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

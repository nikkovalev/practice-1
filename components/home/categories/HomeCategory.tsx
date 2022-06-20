import React, { FC } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ICategory, IService } from "@/models/ICategory";

import { LikeIcon } from "@/components/icons";

import styles from "../Home.module.scss";

interface IHomeCategory {
  category: ICategory;
  likedServices: number[];
}

export const HomeCategory: FC<IHomeCategory> = ({ category, likedServices }) => {
  return (
    <div className={classNames("dark:bg-black-300", styles.homeCategory)}>
      <div className={styles.homeCategoryTop}>
        <div
          className={styles.homeCategoryIcon}
          style={{ backgroundImage: `url(${category.icon})` }}
        />
        <Link href="/">
          <a className="dark:text-white-100 dark:hover:text-secondary-400">{category.name}</a>
        </Link>
      </div>
      <ul>
        {category.services.map((s: IService) => (
          <li
            key={s.id}
            className={classNames({
              [styles.homeServiceLiked]: likedServices.indexOf(s.id) !== -1,
            })}
          >
            <Link href="/">
              <a className="dark:hover:text-secondary-400">{s.name}</a>
            </Link>
            <LikeIcon isSmall />
          </li>
        ))}
      </ul>
    </div>
  );
};

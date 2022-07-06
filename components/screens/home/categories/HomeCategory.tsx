import React, { FC, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { ICategory, IService } from "@/models/ICategory";

import { ArrowIcon, LikeIcon } from "@/components/icons";

import styles from "../Home.module.scss";

interface IHomeCategory {
  category: ICategory;
  likedServices: number[];
}

export const HomeCategory: FC<IHomeCategory> = ({ category, likedServices }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = () => setIsActive(!isActive);

  return (
    <div
      className={cn("dark:bg-black-300", styles.category, {
        [styles.categoryActive]: isActive,
      })}
      onClick={window.screen.width <= 992 ? handleClick : undefined}
    >
      <div className={cn(styles.categoryTop, { [styles.categoryTopActive]: isActive })}>
        <div className={styles.categoryIcon} style={{ backgroundImage: `url(${category.icon})` }} />
        <Link href={`/categories/${category.slug}`}>
          <a className="dark:text-white-100 dark:hover:text-secondary-400">{category.name}</a>
        </Link>
        <ArrowIcon pathClassName="fill-primary-400 stroke-primary-400" />
      </div>
      <ul>
        {category.services.map((s: IService) => {
          const isLiked = likedServices.indexOf(s.id) !== -1;
          return (
            <li
              key={s.id}
              className={cn({
                [styles.serviceLiked]: isLiked,
              })}
            >
              <span>
                <Link href={`/categories/${category.slug}?page=${s.id}`}>
                  <a>{s.name}</a>
                </Link>
                <LikeIcon isSmall={true} isFill={isLiked} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

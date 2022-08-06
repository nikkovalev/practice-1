import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { url } from "@/helpers/url";
import cn from "classnames";
import { ICategory } from "@/models/ICategory";

import { Text } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { HomeCategoryInfo } from "./HomeCategoryInfo";

import styles from "../Home.module.scss";

interface IHomeCategory {
  category: ICategory;
  likedServices: number[];
  isAuth: boolean;
  like: (id: number) => void;
}

export const HomeCategory: FC<IHomeCategory> = ({ category, likedServices, like, isAuth }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => window.screen.width <= 992 && setIsOpen(!isOpen);
  const handleLike = async (id: number) => {
    const isLiked = likedServices.indexOf(id) !== -1;
    const res: any = await like(id);
    if (!res.error) toast.success(isLiked ? "Удалено из избранного" : "Добавлено в избранное");
  };

  return (
    <div id={category.slug} className={styles.category}>
      <div className={styles.categoryHeader} onClick={handleOpen}>
        <div className={styles.categoryImage} style={{ backgroundImage: url(category.icon) }} />
        <Text
          className={styles.link}
          as="a"
          size="xl"
          color="black"
          weight={700}
          href={`/categories/${category.id}`}
        >
          {category.name}
        </Text>
        <button
          className={cn(styles.categoryIcon, {
            [styles.categoryIcon_active]: isOpen,
          })}
        >
          <ArrowIcon />
        </button>
      </div>
      <ul className={cn(styles.categoryList, { [styles.categoryList_active]: isOpen })}>
        {category.services.map((service) => {
          const isLiked = likedServices?.indexOf(service.id) !== -1;
          return (
            <HomeCategoryInfo
              key={service.id}
              category={category}
              service={service}
              isLiked={isLiked}
              isAuth={isAuth}
              handleLike={handleLike}
            />
          );
        })}
      </ul>
    </div>
  );
};

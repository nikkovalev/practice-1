import React, { FC } from "react";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { ICategory } from "@/models/ICategory";

import { useFetchLikedServicesQuery } from "@/store/categories/categoriesApi";

import { HomeCategory } from "./HomeCategory";

import styles from "../Home.module.scss";

interface IHomeCategories {
  categories: ICategory[];
}

export const HomeCategories: FC<IHomeCategories> = ({ categories }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { data: likedServices } = useFetchLikedServicesQuery(true, {
    skip: !isAuth || !user?.emailVerified,
  });

  return (
    <section className={cn("dark:bg-black-400 relative", styles.categories)}>
      <div className="inner-container">
        <h2 className={cn("dark:text-black-300", styles.sectionTitle)}>Игры</h2>
      </div>
      <div className="container">
        {categories && (
          <div className={styles.categoriesList}>
            {categories.map((c: ICategory) => (
              <HomeCategory
                key={c.id}
                category={c}
                likedServices={(likedServices as number[]) || []}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

import React, { FC, useEffect } from "react";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useRouter } from "next/router";

import { ICategory } from "@/models/ICategory";

import {
  useFetchLikedServicesQuery,
  useLikeServiceMutation,
} from "@/store/categories/categoriesApi";

import { HomeCategory } from "./HomeCategory";

import styles from "../Home.module.scss";

interface IHomeCategories {
  categories: ICategory[];
}

export const HomeCategories: FC<IHomeCategories> = ({ categories }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { data: likedServices } = useFetchLikedServicesQuery(true, {
    skip: !isAuth || !user?.emailVerified,
    refetchOnMountOrArgChange: true,
  });
  const [like] = useLikeServiceMutation();
  const { query } = useRouter();

  useEffect(() => {
    if (query.category)
      document
        .getElementById(query.category as string)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

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
                like={like}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

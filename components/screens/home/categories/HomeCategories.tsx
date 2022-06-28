import React from "react";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { motion } from "framer-motion";

import { FADE_IN } from "animation/effects";

import { ICategory } from "@/models/ICategory";

import {
  useFetchCategoriesQuery,
  useFetchLikedServicesQuery,
} from "@/store/categories/categoriesApi";

import { HomeCategory } from "./HomeCategory";
import { Loader } from "@/components/loader/Loader";

import styles from "../Home.module.scss";

export const HomeCategories = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { data: categories, isLoading: isCategoriesLoading } = useFetchCategoriesQuery(false, {
    refetchOnMountOrArgChange: true,
  });
  const { data: likedServices, isLoading: isLikedServicesLoading } = useFetchLikedServicesQuery(
    true,
    {
      skip: !isAuth || !user?.emailVerified,
    }
  );

  return (
    <section className={cn("dark:bg-black-400 relative", styles.categories)}>
      <motion.div {...FADE_IN} className="inner-container">
        <h2 className={cn("dark:text-black-300", styles.sectionTitle)}>Игры</h2>
        {(isCategoriesLoading || isLikedServicesLoading) && <Loader />}
      </motion.div>
      <div className="container">
        {!isCategoriesLoading && !isLikedServicesLoading && categories && (
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

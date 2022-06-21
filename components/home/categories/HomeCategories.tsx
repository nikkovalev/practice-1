import React, { useEffect } from "react";
import classNames from "classnames";

import { useAppSelector } from "@/hooks/redux";

import { categoriesAPI } from "@/api/categoriesAPI";
import { ICategory } from "@/models/ICategory";

import { HomeCategory } from "./HomeCategory";
import { Loader } from "@/components/loader/Loader";

import styles from "../Home.module.scss";

export const HomeCategories = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const categories = categoriesAPI.useFetchCategoriesQuery(false);
  const likedServices = isAuth ? categoriesAPI.useFetchLikedServicesQuery(true) : null;

  useEffect(() => {
    categories.refetch();
  }, []);

  return (
    <section className={classNames("dark:bg-black-400 relative", styles.categories)}>
      <div className="inner-container">
        <h2 className={classNames("dark:text-black-300", styles.sectionTitle)}>Игры</h2>
        {(categories?.isLoading || likedServices?.isLoading) && <Loader />}
      </div>
      <div className="container">
        {!categories?.isLoading && categories?.data && (
          <div className={styles.categoriesList}>
            {categories?.data.map((c: ICategory) => (
              <HomeCategory
                key={c.id}
                category={c}
                likedServices={(likedServices?.data || []) as number[]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

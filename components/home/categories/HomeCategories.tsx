import React from "react";
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

  return (
    <section className={classNames("dark:bg-black-400", styles.homeCategories)}>
      <div className="container relative">
        <div className="inner-container">
          <h2 className={classNames("dark:text-gray-400", styles.homeSectionTitle)}>Игры</h2>
          {categories?.isLoading || (likedServices?.isLoading && <Loader />)}
        </div>
        {!categories?.isLoading && categories?.data && (
          <div className="relative z-10">
            {categories?.data.map((c: ICategory) => (
              <HomeCategory
                key={c.id}
                category={c}
                likedServices={(likedServices?.data || []) as number[]}
              />
            ))}
            <div className="clear-both" />
          </div>
        )}
      </div>
    </section>
  );
};

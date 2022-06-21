import React, { useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import {
  fetchCategories,
  fetchLikedServices,
} from "@/store/reducers/categories/categoriesActionCreators";

import { ICategory } from "@/models/ICategory";

import { HomeCategory } from "./HomeCategory";
import { Loader } from "@/components/loader/Loader";

import styles from "../Home.module.scss";

export const HomeCategories = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const { categories, likedServices, isCategoriesLoading, isServicesLoading } = useAppSelector(
    (state) => state.categoriesReducer
  );

  useEffect(() => {
    if (isAuth) dispatch(fetchLikedServices(true));
    dispatch(fetchCategories(false));
  }, []);

  return (
    <section className={classNames("dark:bg-black-400 relative", styles.categories)}>
      <div className="inner-container">
        <h2 className={classNames("dark:text-black-300", styles.sectionTitle)}>Игры</h2>
        {(isCategoriesLoading || isServicesLoading) && <Loader />}
      </div>
      <div className="container">
        {!isCategoriesLoading && !isServicesLoading && (
          <div className={styles.categoriesList}>
            {categories.map((c: ICategory) => (
              <HomeCategory key={c.id} category={c} likedServices={likedServices as number[]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

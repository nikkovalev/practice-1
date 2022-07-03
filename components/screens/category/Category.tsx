import React, { FC, useEffect } from "react";
import { ICategory } from "@/models/ICategory";

import { useFetchOffersMutation } from "@/store/categories/categoriesApi";

import { CategoryLayout } from "@/components/layouts/categoryLayout";
import { CategoryFilters } from "./CategoryFilters";

import styles from "./Category.module.scss";

interface ICategoryProps {
  category: ICategory;
}

export const Category: FC<ICategoryProps> = ({ category }) => {
  const [getOffers, { data: offers, isLoading }] = useFetchOffersMutation();

  useEffect(() => {
    getOffers({
      categoryId: category.id,
    });
  }, []);

  console.log(category, offers);

  return (
    <CategoryLayout title={category.name} category={category}>
      <CategoryFilters category={category} />
      <div className={styles.items}></div>
    </CategoryLayout>
  );
};

import React, { FC, useState } from "react";
import cn from "classnames";

import { ICategory } from "@/models/ICategory";

import { useFetchOffersMutation } from "@/store/categories/categoriesApi";

import { CategoryLayout } from "@/components/layouts/categoryLayout";
import { CategoryOffer } from "./CategoryOffer";
import { Loader } from "@/components/loader/Loader";
import { RotateIcon } from "@/components/icons";

import styles from "./Category.module.scss";

interface ICategoryProps {
  category: ICategory;
}

export const Category: FC<ICategoryProps> = ({ category }) => {
  const [getOffers, { data: offers, isLoading }] = useFetchOffersMutation();
  const [view, setView] = useState<"list" | "card">(window.screen.width >= 1200 ? "list" : "card");

  return (
    <CategoryLayout
      title={category.name}
      category={category}
      view={view}
      getOffers={getOffers}
      setView={setView}
    >
      {isLoading && (
        <div className="my-10 flex justify-center">
          <Loader />
        </div>
      )}
      <div className={styles.offers}>
        {!isLoading && !offers?.length && (
          <h3 className="mx-auto text-2xl text-primary-400 dark:text-secondary-400">
            Нет предложений.
          </h3>
        )}
        {offers?.map((o) => (
          <CategoryOffer key={o.id} offer={o} servers={category?.servers ?? []} view={view} />
        ))}
        {!!offers?.length && (
          <div className={cn(styles.more, { [styles.moreL]: view === "list" })}>
            <RotateIcon />
            <span>Загрузить еще</span>
            <b>11 предложение</b>
          </div>
        )}
      </div>
    </CategoryLayout>
  );
};

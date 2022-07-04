import React, { FC } from "react";

import { ICategory } from "@/models/ICategory";

import { ArrowIcon, ListIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/Input/Input";
import { Select } from "@/components/ui/Select/Select";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Button } from "@/components/ui";
import { CategoryFilter } from "./CategoryFilter";

import styles from "./Category.module.scss";

interface ICategoryFilters {
  category: ICategory;
}

export const CategoryFilters: FC<ICategoryFilters> = ({ category }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filtersInput}>
        <Input name="category-search" placeholder="Поиск по описанию" onChange={() => {}} />
        <SearchIcon color="primary" />
      </div>
      {category.servers && (
        <div className={styles.filterSelect}>
          <Select label="Сервер" items={category.servers} />
        </div>
      )}
      {category.services.map((s) => (
        <CategoryFilter key={s.id} service={s} />
      ))}
      <div className={styles.filterText}>
        <ArrowIcon type="two" />
        По популярности
      </div>
      <div className={styles.filterText}>
        <ArrowIcon type="two" />
        По цене
      </div>
      <Checkbox id="filter-id" label="Только продавцы онлайн" />
      <div className={styles.filterIcons}>
        <ListIcon type="tile" isActive={true} />
        <ListIcon isActive={false} />
      </div>
      <Button color="secondary">Продать буст</Button>
    </div>
  );
};

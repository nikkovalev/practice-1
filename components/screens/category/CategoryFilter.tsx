import React, { FC } from "react";

import { IServiceFilter } from "@/models/ICategory";
import { Select } from "@/components/ui/Select/Select";

import styles from "./Category.module.scss";

interface ICategoryFilter {
  filter: IServiceFilter;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ filter }) => {
  return (
    <div className={styles.filterSelect}>
      <Select label={filter.name} items={filter.values ?? []} />
    </div>
  );
};

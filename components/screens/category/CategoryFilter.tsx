import React, { FC } from "react";

import { IService } from "@/models/ICategory";
import { Select } from "@/components/ui/Select/Select";

import styles from "./Category.module.scss";

interface ICategoryFilter {
  service: IService;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ service }) => {
  const filter = service.filters[0];
  return (
    <div key={service.id} className={styles.filterSelect}>
      <Select key={filter.id} label={filter.name} items={filter.values ?? []} />
    </div>
  );
};

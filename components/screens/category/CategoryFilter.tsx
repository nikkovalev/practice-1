import React, { FC, useState } from "react";

import { IServiceFilter } from "@/models/ICategory";
import { Select } from "@/components/ui/Select/Select";

import styles from "./Category.module.scss";

interface ICategoryFilter {
  filter: IServiceFilter;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ filter }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <>
      <Select
        className={styles.filterSelect}
        label={filter.name}
        items={filter.values ?? []}
        handleChange={() => setIsSelected(true)}
      />
      {isSelected &&
        filter.children?.map((c) => (
          <Select
            key={c.id}
            className={styles.filterSelect}
            label={c.name ?? ""}
            items={c?.values ?? []}
          />
        ))}
    </>
  );
};

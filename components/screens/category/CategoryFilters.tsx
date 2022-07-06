import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

import { ICategory, IServiceFilter } from "@/models/ICategory";

import { ArrowIcon, ListIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/Input/Input";
import { Select } from "@/components/ui/Select/Select";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Button } from "@/components/ui";
import { CategoryFilter } from "./CategoryFilter";

import styles from "./Category.module.scss";

interface ICategoryFilters {
  category: ICategory;
  filters: IServiceFilter[];
  view: "card" | "list";
  handleSelectServer: (v: string | null, idx?: number) => void;
  handleChangeOrder: () => void;
  handleChangeOnline: () => void;
  handleChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  setView: Dispatch<SetStateAction<"list" | "card">>;
}

export const CategoryFilters: FC<ICategoryFilters> = ({
  category,
  filters,
  view,
  handleSelectServer,
  handleChangeOrder,
  handleChangeOnline,
  handleChangeQuery,
  setView,
}) => {
  const handleChangeView = (v: "list" | "card") => () => setView(v);

  return (
    <div className={styles.filters}>
      <div className={styles.filtersInput}>
        <Input
          name="category-search"
          placeholder="Поиск по описанию"
          onChange={handleChangeQuery}
        />
        <SearchIcon color="primary" />
      </div>
      {category.servers && (
        <div className={styles.filterSelect}>
          <Select label="Сервер" items={category.servers} handleChange={handleSelectServer} />
        </div>
      )}
      {filters.map((f) => (
        <CategoryFilter key={f.id} filter={f} />
      ))}
      <div className={styles.filterText}>
        <ArrowIcon type="two" />
        По популярности
      </div>
      <div className={styles.filterText} onClick={handleChangeOrder}>
        <ArrowIcon type="two" />
        По цене
      </div>
      <Checkbox id="filter-id" label="Только продавцы онлайн" handleChange={handleChangeOnline} />
      <div className={styles.filterIcons}>
        <ListIcon type="tile" isActive={view === "card"} onClick={handleChangeView("card")} />
        <ListIcon isActive={view === "list"} onClick={handleChangeView("list")} />
      </div>
      <Button color="secondary">Продать буст</Button>
    </div>
  );
};

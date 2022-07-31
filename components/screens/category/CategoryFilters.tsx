import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ICategory, IServiceFilter } from "@/models/ICategory";

import { ArrowIcon, FilterIcon, ListIcon, SearchIcon } from "@/components/icons";
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
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleChangeView = (v: "list" | "card") => () => setView(v);
  const handleToggle = () => setIsShow(!isShow);

  useEffect(() => {
    const blurEl = document.getElementById("blur");
    if (blurEl) blurEl.className = isShow ? "active" : "";
  }, [isShow]);

  return (
    <div className={styles.filters}>
      <div ref={ref} className={cn(styles.filtersLeft, { [styles.filtersLeftActive]: isShow })}>
        <div className="filter_menu_top hidden lg:flex items-center">
          <div onClick={handleToggle}>
            <ArrowIcon direction="left" color="primary" />
          </div>
          <h3>Фильтр</h3>
        </div>
        <div className={styles.filtersInputs}>
          <div className={styles.filtersInput}>
            <Input
              name="category-search"
              placeholder="Поиск по описанию"
              onChange={handleChangeQuery}
            />
            <SearchIcon color="primary" />
          </div>
          {category.servers && (
            <Select
              className={styles.filterSelect}
              label="Сервер"
              items={category.servers}
              handleChange={handleSelectServer}
            />
          )}
          {filters.map((f) => (
            <CategoryFilter key={f.id} filter={f} />
          ))}
        </div>
        <div className="flex items-center lg:flex-col lg:items-start">
          <div className={cn("text_with_icon", styles.filterText)}>
            <ArrowIcon variant="two" />
            По рейтингу
          </div>
          <div className={cn("text_with_icon", styles.filterText)} onClick={handleChangeOrder}>
            <ArrowIcon variant="two" />
            По цене
          </div>
          <Checkbox
            id="filter-id"
            label="Только продавцы онлайн"
            isSupportLight={true}
            onChange={handleChangeOnline}
          />
        </div>
      </div>
      <div className="flex items-center xs:flex-wrap">
        <Button className={styles.filterIcon} variant="outlined" onClick={handleToggle}>
          <FilterIcon />
        </Button>
        <div className={styles.filterIcons}>
          <ListIcon type="tile" isActive={view === "card"} onClick={handleChangeView("card")} />
          <ListIcon isActive={view === "list"} onClick={handleChangeView("list")} />
        </div>
        <Button className={styles.filterBtn} color="secondary">
          Продать буст
        </Button>
      </div>
    </div>
  );
};

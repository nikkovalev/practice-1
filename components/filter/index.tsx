import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ICategory, IService } from "@/models/ICategory";
import { IFilterData } from "@/models/IFilterData";

import { FilterSearchInput } from "./FilterSearchInput";
import { Button, Checkbox, Select } from "@/components/ui";
import { FilterOption } from "./FilterOption";
import { ArrowIcon, FilterIcon, ListIcon } from "../icons";

import styles from "./Filter.module.scss";

interface IFilter {
  className?: string;
  category?: ICategory;
  service?: IService | null;
  size?: "default" | "small";
  view?: "list" | "card";
  setView?: Dispatch<SetStateAction<"list" | "card">>;
  getData?: (data: IFilterData) => void;
}

export const Filter: FC<IFilter> = ({
  className,
  category,
  service,
  size = "default",
  view,
  setView,
  getData,
}) => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const [query, setQuery] = useState<string>("");
  const [server, setServer] = useState<number | null>(null);
  const [options, setOptions] = useState<{
    [key: string]: string;
  }>({});
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);
  const handleChangeServer = (val: string | null, idx?: number | undefined) => {
    setServer(idx as number);
  };
  const handleChangeOption = (key: string, value: string | null) => {
    const newOptions = { ...options };
    if (!value) delete newOptions[key];
    else newOptions[key] = value;
    setOptions(newOptions);
  };
  const handleChangeOrder = () => setOrder(order === "ASC" ? "DESC" : "ASC");
  const handleChangeOnline = () => setOnlineOnly(!onlineOnly);
  const handleChangeView = (view: "list" | "card") => () => setView && setView(view);
  const handleVisible = () => setIsShow(!isShow);

  useEffect(() => {
    if (initial || !category) return;
    const data: any = {};
    if (server) data.server = server;
    if (!!query.length) data.query = query;
    if (!!service) data.serviceId = service.id;
    getData &&
      getData({
        categoryId: category.id,
        order,
        onlineOnly,
        ...data,
      });
    // eslint-disable-next-line
  }, [service, query, server, order, onlineOnly]);

  useEffect(() => {
    setInitial(false);
  }, []);

  useEffect(() => {
    const blurEl = document.getElementById("blur");
    if (blurEl) blurEl.className = isShow ? "active" : "";
  }, [isShow]);

  return (
    <div className={cn(styles.filter, styles[`filter_${size}`], className)}>
      <div
        ref={ref}
        className={cn(styles.left, {
          [styles.left_active]: isShow,
          [styles.left_small]: size === "small",
        })}
      >
        <div className={styles.top}>
          <button onClick={handleVisible}>
            <ArrowIcon direction="left" color="primary" />
          </button>
          <h3>Фильтр</h3>
        </div>
        <div className={cn(styles.items, { [styles.items_small]: size === "small" })}>
          <FilterSearchInput
            size={window.screen.width >= 992 ? size : "default"}
            onChange={handleChangeQuery}
          />
          {category?.servers && (
            <Select label="Сервер" items={category.servers} handleChange={handleChangeServer} />
          )}
          {service?.filters.map((f) => (
            <FilterOption key={f.id} filter={f} handleChangeOption={handleChangeOption} />
          ))}
        </div>
        <div className={cn(styles.icons, styles[`icons_${size}`])}>
          {size === "default" && (
            <div className={styles.textWithIcon}>
              <ArrowIcon variant="two" />
              По рейтингу
            </div>
          )}
          <div
            className={cn(styles.textWithIcon, { [styles.textWithIcon_small]: size === "small" })}
            onClick={handleChangeOrder}
          >
            <ArrowIcon variant="two" />
            По цене
          </div>
          {size === "default" && (
            <Checkbox
              id="filter-id"
              label="Только продавцы онлайн"
              isSupportLight={true}
              onChange={handleChangeOnline}
            />
          )}
        </div>
      </div>
      <div className={cn(styles.right, { [styles.right_small]: size === "small" })}>
        <Button
          className={cn(styles.menuButton, { [styles.menuButton_small]: size === "small" })}
          theme="primary_outlined"
          onClick={handleVisible}
        >
          <FilterIcon />
          {size === "small" && "Фильтр"}
        </Button>
        <button className={styles.viewButton} onClick={handleChangeView("card")}>
          <ListIcon type="card" isActive={view === "card"} />
        </button>
        <button className={styles.viewButton} onClick={handleChangeView("list")}>
          <ListIcon isActive={view === "list"} />
        </button>
        <Button className={styles.button} theme="secondary_contained">
          Продать буст
        </Button>
      </div>
    </div>
  );
};

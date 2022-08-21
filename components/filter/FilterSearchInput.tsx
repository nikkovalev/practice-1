import React, { ChangeEvent, FC } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { Input } from "@/components/ui";
import { SearchIcon } from "../icons";

import styles from "./Filter.module.scss";

interface IFilterSearchInput {
  size: "default" | "small";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterSearchInput: FC<IFilterSearchInput> = ({ size, onChange }) => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const Wrapper = size === "default" ? "div" : "button";

  const handleShow = () => setIsShow(true);

  return (
    <Wrapper
      ref={ref}
      className={cn(styles.searchInput, styles[`searchInput_${size}`], {
        [styles.searchInput_active]: isShow,
      })}
      onClick={handleShow}
    >
      <Input name="category-search" placeholder="Поиск по описанию" size="md" onChange={onChange} />
      <SearchIcon color="primary" />
    </Wrapper>
  );
};

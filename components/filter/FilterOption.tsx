import React, { FC, useState } from "react";
import { IServiceFilter } from "@/models/ICategory";

import { Select } from "../ui";

import styles from "./Filter.module.scss";

interface IFilterOption {
  filter: IServiceFilter;
  handleChangeOption: (key: string, value: string | null) => void;
}

export const FilterOption: FC<IFilterOption> = ({ filter, handleChangeOption }) => {
  const [subOption, setSubOption] = useState<Partial<IServiceFilter> | null>(null);

  const handleChange = (val: string | null) => {
    const newSub = !!val ? filter.children.find((sub) => sub.name === val) ?? null : null;
    // Remove from options state
    if (!val && !!subOption) handleChangeOption(subOption.name as string, null);
    setSubOption(newSub);
    handleChangeOption(filter.name, val);
  };

  const handleChangeSubOption = (key: string) => (val: string | null) => {
    handleChangeOption(key, val);
  };

  return (
    <>
      <Select
        className={styles.filterSelect}
        label={filter.name}
        items={filter.values ?? []}
        handleChange={handleChange}
      />
      {!!subOption && (
        <Select
          className={styles.filterSelect}
          label={subOption.name ?? ""}
          items={subOption?.values ?? []}
          handleChange={handleChangeSubOption(subOption.name as string)}
        />
      )}
    </>
  );
};

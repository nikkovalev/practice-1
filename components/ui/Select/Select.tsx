import React, { FC, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ArrowIcon } from "@/components/icons";

import styles from "./Select.module.scss";

interface ISelect {
  className?: any;
  label: string;
  items: string[];
  handleChange?: (val: string | null, idx?: number) => void;
}

export const Select: FC<ISelect> = ({ className, label, items, handleChange }) => {
  const { isShow, ref, setIsShow } = useOutside(false);
  const [val, setVal] = useState<string>(label);

  const handleToggle = () => setIsShow(!isShow);
  const handleSelect = (val: string | null, idx?: number) => () => {
    setVal(val ?? label);
    setIsShow(false);
    handleChange && handleChange(val, idx);
  };

  return (
    <div ref={ref} className={cn(className, styles.select)}>
      <div
        className={cn(styles.selectHeader, { [styles.selectHeaderActive]: isShow })}
        onClick={handleToggle}
      >
        <div className="text-ellipsis">{val}</div>
        <ArrowIcon pathClassName="fill-primary-400 stroke-primary-400" />
      </div>
      <div
        className={cn("custom_scrollbar", styles.selectItems, {
          [styles.selectItemsActive]: isShow,
        })}
      >
        <ul>
          <li onClick={handleSelect(null)}>{label}</li>
          {items.map((i, idx) => (
            <li key={i} onClick={handleSelect(i, idx)}>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

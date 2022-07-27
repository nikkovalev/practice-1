import React, { FC, forwardRef, useImperativeHandle, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ArrowIcon } from "@/components/icons";

import styles from "./Select.module.scss";

interface ISelect {
  className?: any;
  label: string;
  items: string[];
  icon?: any;
  color?: "light";
  size?: "large";
  iconCN?: string;
  isError?: boolean;
  handleChange?: (val: string | null, idx?: number) => void;
}

export interface SelectHandle {
  reset: () => undefined;
}

export const Select = forwardRef<SelectHandle, ISelect>(
  ({ className, label, color, size, items, icon, iconCN, isError, handleChange }, ref: any) => {
    const { isShow, ref: rootRef, setIsShow } = useOutside(false);
    const [val, setVal] = useState<string>(label);

    const handleToggle = () => setIsShow(!isShow);
    const handleSelect = (val: string | null, idx?: number) => () => {
      setVal(val ?? label);
      setIsShow(false);
      handleChange && handleChange(val, idx);
    };

    useImperativeHandle(ref, () => ({
      reset: () => setVal(label),
    }));

    return (
      <div
        ref={rootRef}
        className={cn(className, styles.select, {
          [styles[`select_${size}`]]: !!size,
        })}
      >
        <div
          className={cn(styles.selectHeader, {
            [styles.selectHeaderActive]: isShow,
            [styles[`selectHeader_${color}`]]: !!color,
            [styles[`selectHeader_${size}`]]: !!size,
            [styles.selectHeader_error]: isError,
          })}
          onClick={handleToggle}
        >
          {!!icon && <div className={cn(iconCN, "flex items-center")}>{icon}</div>}
          <div className={cn("text-ellipsis", styles.selectText)}>{val}</div>
          <ArrowIcon pathClassName="fill-primary-400 stroke-primary-400" />
        </div>
        <div
          className={cn("custom_scrollbar", styles.selectItems, {
            [styles.selectItemsActive]: isShow,
            [styles[`selectItems_${color}`]]: !!color,
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
  }
);

Select.displayName = "Select";

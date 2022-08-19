import React, { forwardRef, useImperativeHandle, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ArrowIcon } from "@/components/icons";

import styles from "./Select.module.scss";

export interface ISelect {
  className?: any;
  iconClassName?: any;
  label: string;
  items: string[];
  color?: "light";
  size?: "l";
  isError?: boolean;
  icon?: any;
  padding?: "sm" | "l" | "m";
  handleChange?: (val: string | null, idx?: number) => void;
}

export interface SelectHandle {
  reset: () => undefined;
}

export const Select = forwardRef<SelectHandle, ISelect>(
  (
    { className, label, items, color, size, isError, padding, icon, iconClassName, handleChange },
    ref: any
  ) => {
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
            [styles.selectHeader_active]: isShow,
            [styles.selectHeader_error]: isError,
            [styles[`selectHeader_${color}`]]: !!color,
            [styles[`selectHeader_${padding}`]]: !!padding,
          })}
          onClick={handleToggle}
        >
          {!!icon && <div className={iconClassName}>{icon}</div>}
          <div className={cn("text-ellipsis", styles.selectText)}>{val}</div>
          <ArrowIcon />
        </div>
        <div
          className={cn("custom_scrollbar", styles.selectItems, {
            [styles.selectItems_active]: isShow,
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

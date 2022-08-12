import React, { ChangeEvent, FC, FocusEvent, forwardRef } from "react";
import cn from "classnames";

import styles from "./Checkbox.module.scss";

interface ICheckbox {
  className?: string;
  id: string;
  name?: string;
  label: any;
  isError?: boolean;
  isSupportLight?: boolean;
  color?: "gray";
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<ICheckbox> = forwardRef(
  ({ className, id, label, name, isError, isSupportLight, color, onBlur, onChange }, ref: any) => {
    return (
      <label
        className={cn(styles.checkbox, className, {
          [styles.checkbox_error]: !!isError,
          [styles.checkbox_light]: !!isSupportLight,
          [styles[`checkbox_${color}`]]: !!color,
        })}
        htmlFor={id}
      >
        <input ref={ref} id={id} name={name} type="checkbox" onChange={onChange} onBlur={onBlur} />
        <div />
        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

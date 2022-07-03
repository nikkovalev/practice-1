import React, { FC } from "react";
import styles from "./Checkbox.module.scss";

interface ICheckbox {
  id: string;
  label: string;
}

export const Checkbox: FC<ICheckbox> = ({ id, label }) => {
  return (
    <label className={styles.checkbox} htmlFor={id}>
      <input id={id} type="checkbox" />
      <div />
      {label}
    </label>
  );
};

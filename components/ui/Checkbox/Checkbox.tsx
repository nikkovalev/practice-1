import React, { FC } from "react";
import styles from "./Checkbox.module.scss";

interface ICheckbox {
  id: string;
  label: string;
  handleChange?: () => void;
}

export const Checkbox: FC<ICheckbox> = ({ id, label, handleChange }) => {
  return (
    <label className={styles.checkbox} htmlFor={id}>
      <input id={id} type="checkbox" onChange={handleChange} />
      <div />
      {label}
    </label>
  );
};

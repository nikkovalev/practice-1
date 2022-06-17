import classNames from "classnames";
import React, { FC } from "react";
import styles from "./Button.module.scss";

interface IButton {
  className?: any;
  size?: "large";
  children: string;
  isActive?: boolean;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
}
export const Button: FC<IButton> = ({
  className,
  size,
  children,
  isActive = false,
  color = "primary",
  variant = "contained",
}) => (
  <button
    className={classNames(styles.button, className, {
      [styles.buttonContained]: variant === "contained",
      [styles.buttonOutlined]: variant === "outlined",
      [styles.buttonSecondary]: color === "secondary",
      [styles.buttonPrimaryActive]: isActive && color === "primary",
      [styles.buttonSecondaryActive]: isActive && color === "secondary",
      [styles.buttonLarge]: size === "large",
    })}
  >
    {children}
  </button>
);

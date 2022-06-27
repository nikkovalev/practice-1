import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

interface IButton {
  className?: any;
  size?: "large" | "small";
  children: string;
  isActive?: boolean;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button: FC<IButton> = ({
  className,
  size,
  children,
  isActive = false,
  color = "primary",
  variant = "contained",
  isDisabled,
  onClick,
}) => (
  <button
    className={cn(styles.button, className, {
      [styles.buttonContained]: variant === "contained",
      [styles.buttonOutlined]: variant === "outlined",
      [styles.buttonSecondary]: color === "secondary",
      [styles.buttonPrimaryActive]: isActive && color === "primary",
      [styles.buttonSecondaryActive]: isActive && color === "secondary",
      [styles.buttonLarge]: size === "large",
      [styles.buttonSmall]: size === "small",
      [styles.buttonDisabled]: isDisabled,
    })}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);

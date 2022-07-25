import React, { FC, MouseEvent } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Button.module.scss";

interface IButton {
  className?: any;
  size?: "large" | "small";
  children: any;
  isActive?: boolean;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "black";
  isDisabled?: boolean;
  component?: "link";
  href?: string;
  width?: number | string;
  isActiveOutlined?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button: FC<IButton> = ({
  width,
  className,
  size,
  children,
  isActive = false,
  isActiveOutlined,
  color = "primary",
  variant = "contained",
  isDisabled,
  component,
  href,
  onClick,
}) => {
  const CN = cn(styles.button, className, {
    [styles.buttonContained]: variant === "contained" || (isActive && variant === "outlined"),
    [styles.buttonOutlined]: variant === "outlined" && !isActive,
    [styles.buttonSecondary]: color === "secondary",
    [styles.buttonPrimaryActive]: isActive && color === "primary" && variant !== "outlined",
    [styles.buttonSecondaryActive]: isActive && color === "secondary",
    [styles.buttonLarge]: size === "large",
    [styles.buttonSmall]: size === "small",
    [styles.buttonDisabled]: isDisabled,
    [styles.buttonOutlinedBlack]: color === "black" && variant === "outlined",
    [styles.buttonActiveOutlined]: isActiveOutlined,
  });

  if (component === "link" && !!href) {
    return (
      <Link href={href}>
        <a className={CN}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      className={CN}
      disabled={isDisabled}
      onClick={onClick}
      style={width ? { minWidth: width } : undefined}
    >
      {children}
    </button>
  );
};

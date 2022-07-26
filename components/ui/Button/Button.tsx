import React, { FC, MouseEvent } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Button.module.scss";

interface IButton {
  className?: any;
  size?: "large" | "small" | "fit" | "extra-small";
  children: any;
  isActive?: boolean;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "black";
  isDisabled?: boolean;
  component?: "link";
  href?: string;
  isActiveOutlined?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button: FC<IButton> = ({
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
    [styles.buttonSecondary_active]: isActive && color === "secondary",
    [styles.buttonPrimary_active]: isActive && color === "primary" && variant !== "outlined",
    [styles[`button_${size}`]]: !!size,
    [styles.buttonOutlinedBlack]: color === "black" && variant === "outlined",
    [styles.buttonOutlinedBlack_active]: isActiveOutlined,
    [styles.buttonDisabled]: isDisabled,
  });

  if (component === "link" && !!href) {
    return (
      <Link href={href}>
        <a className={CN}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={CN} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};

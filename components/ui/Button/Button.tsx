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
  color?: "primary" | "secondary" | "black" | "blue";
  isDisabled?: boolean;
  as?: "link" | "button";
  href?: string;
  isActiveOutlined?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button: FC<IButton> = ({
  as = "button",
  className,
  size,
  children,
  isActive = false,
  isActiveOutlined = false,
  color = "primary",
  variant = "contained",
  isDisabled,
  href,
  onClick,
}) => {
  const CN = cn(styles.button, className, {
    // Button size
    [styles[`button_${size}`]]: !!size,
    // Button - Primary
    [styles.primaryContained]:
      (isActive && variant === "outlined") || (variant === "contained" && color === "primary"),
    [styles.primaryOutlined]: !isActive && variant === "outlined" && color === "primary",
    [styles.primaryContained_active]: isActive && color === "primary" && variant === "contained",
    // Button - Secondary
    [styles.secondaryContained]: variant === "contained" && color === "secondary",
    [styles.secondaryContained_active]: isActive && color === "secondary",
    // Button - Black
    [styles.blackOutlined]: !isActive && color === "black",
    [styles.blackOutlined_active]: isActiveOutlined && color === "black",
    // Button - Blur
    [styles.blue]: color === "blue",
    // Disabled styles
    [styles.button_disabled]: isDisabled,
    // Styles for link
    "text-center": as === "link",
  });

  if (as === "link" && !!href) {
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

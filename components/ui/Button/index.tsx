import React, { FC, MouseEvent } from "react";
import cx from "classnames";
import { Link } from "@/components/ui";
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
  className: cn,
  size,
  children,
  isActive,
  isActiveOutlined,
  color = "primary",
  variant = "contained",
  isDisabled,
  href,
  onClick,
}) => {
  const Wrapper = as === "button" ? "button" : Link;
  const className = cx(styles.button, cn, {
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
    // Button - Blue
    [styles.blue]: color === "blue",
    // Disabled styles
    [styles.button_disabled]: isDisabled,
  });
  return (
    <Wrapper className={className} disabled={isDisabled} onClick={onClick} href={href ?? ""}>
      {children}
    </Wrapper>
  );
};

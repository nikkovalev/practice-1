import React, { FC, MouseEvent } from "react";
import cn from "classnames";

import { Link } from "@/components/ui";

import styles from "./Button.module.scss";

type ITheme =
  | "primary_contained"
  | "primary_outlined"
  | "secondary_contained"
  | "secondary_outlined"
  | "blue"
  | "black_contained"
  | "black_outlined";

interface IButton {
  className?: string;
  size?: "large" | "medium" | "small";
  theme: ITheme;
  as?: "link" | "button";
  href?: string;
  children: any;
  disabled?: boolean;
  isActive?: boolean;
  isLight?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button: FC<IButton> = ({
  as = "button",
  className,
  size,
  children,
  isActive,
  theme,
  disabled,
  isLight,
  ...props
}) => {
  const Wrapper: any = as === "button" ? "button" : Link;
  const rootClassName = cn(styles.button, className, styles[theme], {
    [styles[`${theme}_active`]]: isActive,
    [styles[`${theme}_support`]]: isLight,
    [styles[`size_${size}`]]: !!size,
    [styles.button_disabled]: disabled,
    [styles.link]: as === "link",
  });
  return (
    <Wrapper className={rootClassName} disabled={disabled} {...props}>
      {children}
    </Wrapper>
  );
};

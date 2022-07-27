import React, { FC, ReactNode } from "react";
import cn from "classnames";

import { Link } from "@/components/link";

import styles from "./Text.module.scss";

interface IText {
  className?: string;
  as?: "h1" | "a" | "span" | "p" | "b";
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
  color?: "white" | "gray" | "primary" | "secondary" | "black";
  weight?: 400 | 500 | 600 | 700;
  align?: "center" | "left" | "right";
  href?: string;
  children: string;
}

export const Text: FC<IText> = ({
  as: Wrapper = "span",
  color = "white",
  size = "xs",
  weight = 400,
  align,
  className,
  href,
  children,
}) => {
  const CN = cn(
    styles[`color_${color}`],
    styles[`size_${size}`],
    styles[`weight_${weight}`],
    className,
    {
      [styles[`align_${align}`]]: !!align,
    }
  );

  if (Wrapper === "a" && !!href) {
    return (
      <Link className={CN} href={href}>
        {children}
      </Link>
    );
  }

  return <Wrapper className={CN}>{children}</Wrapper>;
};

import React, { FC } from "react";
import cx from "classnames";
import { Link } from "@/components/ui";
import styles from "./Text.module.scss";

interface IText {
  className?: string;
  as?: "h1" | "h3" | "h4" | "a" | "span" | "p" | "b";
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "vl";
  color?: "white" | "gray" | "primary" | "secondary" | "black";
  weight?: 400 | 500 | 600 | 700;
  align?: "center" | "left" | "right";
  href?: string;
  children: any;
}

export const Text: FC<IText> = ({
  as: Wrapper = "span",
  color = "white",
  size = "xs",
  weight = 400,
  align,
  className: cn,
  href,
  children,
}) => {
  const className = cx(
    styles[`color_${color}`],
    styles[`size_${size}`],
    styles[`weight_${weight}`],
    cn,
    {
      [styles[`align_${align}`]]: !!align,
    }
  );

  if (Wrapper === "a" && !!href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <Wrapper className={className}>{children}</Wrapper>;
};

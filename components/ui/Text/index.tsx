import React, { FC } from "react";
import cx from "classnames";
import { getDefaultTextLeading, getDefaultTextSize, getDefaultTextWeight } from "@/helpers/text";
import { Link } from "@/components/ui";
import styles from "./Text.module.scss";

interface IText {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "a" | "span" | "p" | "b" | "time";
  size?: "d" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "vl";
  color?: "white" | "gray" | "primary" | "secondary" | "black";
  leading?: "130" | "120" | "150" | "170";
  weight?: 400 | 500 | 600 | 700;
  align?: "center" | "left" | "right";
  href?: string;
  children: any;
  hover?: "p" | "s" | "m" | null;
}

export const Text: FC<IText> = ({
  as: Wrapper = "span",
  className: cn,
  color = "white",
  size: s,
  weight: w,
  leading: l,
  hover = "m",
  align,
  href,
  children,
}) => {
  const size = s ? s : getDefaultTextSize(Wrapper);
  const weight = w ? w : getDefaultTextWeight(Wrapper);
  const leading = l ? l : getDefaultTextLeading(size, Wrapper);
  const className = cx(
    styles[`c_${color}`],
    cn,
    styles[`s_${size}`],
    styles[`w_${weight}`],
    styles[`l_${leading}`],
    {
      [styles[`a_${align}`]]: !!align,
      [styles[`h_${hover}`]]: Wrapper === "a" && !!hover,
    }
  );
  if (Wrapper === "a") {
    return (
      <Link className={className} href={href ?? ""}>
        {children}
      </Link>
    );
  }
  return <Wrapper className={className}>{children}</Wrapper>;
};

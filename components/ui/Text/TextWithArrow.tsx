import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import { Link } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import styles from "./Text.module.scss";

interface ITextWithArrow {
  className?: string;
  children: any;
  href?: string;
  as?: "button" | "link";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const TextWithArrow: FC<ITextWithArrow> = ({ className, children, as, ...props }) => {
  const Wrapper = as === "button" ? "button" : (Link as any);
  return (
    <Wrapper className={cn(styles.textWithArrow, className)} {...props}>
      <ArrowIcon direction="left" color="gray" />
      <b>{children}</b>
    </Wrapper>
  );
};

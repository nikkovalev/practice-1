import React, { FC } from "react";
import cn from "classnames";
import styles from "./Container.module.scss";

interface IContainer {
  children: any;
  variant?: "c" | "ic";
  className?: string;
}

export const Container: FC<IContainer> = ({ children, variant = "c", className }) => {
  return (
    <div
      className={cn(className, {
        [styles.container]: variant === "c",
        [styles.inner_container]: variant === "ic",
      })}
    >
      {children}
    </div>
  );
};

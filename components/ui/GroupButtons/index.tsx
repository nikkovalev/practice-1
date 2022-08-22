import React, { FC } from "react";
import cn from "classnames";

import { Button } from "@/components/ui";
import styles from "./GroupButtons.module.scss";

interface IItem {
  id: number | string;
  count?: number;
  name: string;
}

interface IGroupButtons {
  className?: string;
  items: IItem[];
  active: number | string | undefined;
  prefixPath?: string;
  variant?: "black_contained" | "black_outlined";
  size?: "small";
  isLight?: boolean;
}

export const GroupButtons: FC<IGroupButtons> = ({
  className,
  items,
  active,
  prefixPath,
  variant = "black_contained",
  size,
  isLight,
}) => {
  return (
    <div className={cn(styles.buttons, className)}>
      {items.map(({ id, name, count }) => {
        const theme = {
          theme: variant,
          as: "link",
          size,
          isLight,
        } as any;
        const isActive = !!active && active === id;
        const href = `${prefixPath ?? ""}${id}`;
        return (
          <Button key={id} isActive={isActive} href={href} {...theme}>
            {name}
            {count && <b>({count})</b>}
          </Button>
        );
      })}
    </div>
  );
};

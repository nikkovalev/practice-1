import React, { FC } from "react";
import cn from "classnames";
import { Text } from "./";

interface ITextEmpty {
  className?: string;
  children?: string;
}

export const TextEmpty: FC<ITextEmpty> = ({ className, children }) => (
  <Text size="l" className={cn("dark:text-secondary-400", className)} color="primary">
    {children ?? "Здесь пока ничего нет"}
  </Text>
);

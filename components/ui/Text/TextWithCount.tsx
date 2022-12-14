import React, { FC } from "react";
import cn from "classnames";

import { Text } from "@/components/ui";

interface ITextWithCount {
  className?: string;
  title: string;
  count?: string | number;
  isCircle?: boolean;
  countColor?: "primary" | "secondary" | "white" | "black";
}

export const TextWithCount: FC<ITextWithCount> = ({
  className,
  title,
  count,
  countColor = "secondary",
  isCircle = true,
}) => (
  <div className={cn("mt-[50px] flex items-start md:mb-[20px] md:mt-[30px]", className)}>
    <Text as="h1" className="dark:text-white-100" size="xxl" color="black">
      {title}
    </Text>
    {!!count && (
      <div
        className={
          isCircle
            ? "flex items-center justify-center min-w-[40px] min-h-[40px] py-[8px] px-[14px] bg-primary-400 rounded-full ml-[10px]"
            : "ml-[15px]"
        }
      >
        <Text size={isCircle ? "m" : "xxl"} as="b" color={isCircle ? "white" : countColor}>
          {count}
        </Text>
      </div>
    )}
  </div>
);

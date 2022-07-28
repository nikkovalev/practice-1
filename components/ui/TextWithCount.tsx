import React, { FC } from "react";
import { Text } from "./Text/Text";

interface ITextWithCount {
  title: string;
  count: string | number;
}

export const TextWithCount: FC<ITextWithCount> = ({ title, count }) => (
  <div className="mt-[50px] flex items-start mb-[40px]">
    <Text className="dark:text-white-100" size="xxl" weight={700} color="black">
      {title}
    </Text>
    <div className="flex items-center justify-center min-w-[40px] min-h-[40px] py-[8px] px-[14px] bg-primary-400 rounded-full ml-[10px]">
      <Text size="l" weight={700}>
        {count}
      </Text>
    </div>
  </div>
);

import React, { FC } from "react";
import { ISelect, SelectWithIcon, Text } from "@/components/ui";
import styles from "./Select.module.scss";

export const SelectWithLabel: FC<{ text: string; rootRef?: any } & ISelect> = ({
  text,
  ...props
}) => {
  return (
    <div>
      <Text className={styles.label} color="gray" weight={500} size="m">
        {text}
      </Text>
      <SelectWithIcon {...props} />
    </div>
  );
};

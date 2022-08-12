import React, { FC } from "react";
import cn from "classnames";
import { Input, Text } from "@/components/ui";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

import styles from "./EditOffer.module.scss";

interface IEditOfferInput {
  register: (name: string, options: RegisterOptions) => UseFormRegisterReturn;
  name: string;
  isError?: boolean;
  label: string;
  placeholder: string;
  pr?: number;
}

export const EditOfferInput: FC<IEditOfferInput> = ({
  pr = 45,
  name,
  register,
  isError,
  placeholder,
  label,
}) => {
  return (
    <div className={styles.input}>
      <Input
        {...register(name, {
          required: true,
          validate,
        })}
        style={{ paddingRight: pr }}
        placeholder={placeholder}
        isError={isError}
      />
      <Text as="b" color="gray" size="s" weight={700}>
        {label}
      </Text>
    </div>
  );
};

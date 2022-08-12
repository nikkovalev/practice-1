import React, { ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import cn from "classnames";

import { EyeIcon } from "@/components/icons";
import { Text } from "../Text";

import styles from "./Input.module.scss";

interface IInput {
  className?: string;
  style?: any;
  type?: "password" | "text";
  name: string;
  placeholder: string;
  isError?: boolean;
  size?: "sm";
  icon?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    { className, style, size, type: initialType, isError, icon, ...props },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [type, setType] = useState<"password" | "text">(initialType || "text");
    const handleClickIcon = () => setType((t) => (t === "text" ? "password" : "text"));

    return (
      <div
        className={cn(className, styles.wrapper, {
          [styles[`wrapper_${size}`]]: !!size,
          relative: !!icon || initialType === "password",
          [styles.wrapper_wi]: !!icon,
        })}
      >
        <input
          {...props}
          ref={ref}
          type={type}
          style={style}
          className={cn(styles.input, {
            [styles.input_error]: isError,
            [styles.input_pass]: initialType === "password",
          })}
        />
        {initialType === "password" && (
          <div className={styles.passwordIcon} onClick={handleClickIcon}>
            <EyeIcon visible={type === "password"} />
          </div>
        )}
        {!!icon && (
          <Text as="b" color="gray" size="s" weight={700}>
            {icon}
          </Text>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

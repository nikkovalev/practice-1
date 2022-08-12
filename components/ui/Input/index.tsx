import React, {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  useState,
} from "react";
import cn from "classnames";

import { EyeIcon } from "@/components/icons";
import { Text } from "../Text";
import { CircleButton } from "../CircleButton";

import styles from "./Input.module.scss";

interface IInput {
  className?: string;
  type?: "password" | "text";
  name: string;
  placeholder: string;
  isError?: boolean;
  size?: "sm";
  icon?: any;
  iconRef?: any;
  variantIcon?: "text" | "button";
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickIcon?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      className,
      size,
      type: initialType,
      isError,
      icon,
      variantIcon = "text",
      iconRef,
      onClickIcon,
      ...props
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [type, setType] = useState<"password" | "text">(initialType || "text");
    const handleChangeType = () => setType((t) => (t === "text" ? "password" : "text"));

    return (
      <div
        className={cn(className, styles.wrapper, {
          [styles[`wrapper_${size}`]]: !!size,
          relative: !!icon || initialType === "password",
        })}
      >
        <input
          {...props}
          ref={ref}
          type={type}
          className={cn(styles.input, {
            [styles.input_error]: isError,
            [styles.input_pass]: initialType === "password",
          })}
        />
        {initialType === "password" && (
          <div className={styles.passwordIcon} onClick={handleChangeType}>
            <EyeIcon visible={type === "password"} />
          </div>
        )}
        {!!icon && variantIcon === "text" && (
          <Text className={styles.icon} as="b" color="gray" size="s" weight={700}>
            {icon}
          </Text>
        )}
        {!!icon && variantIcon === "button" && (
          <CircleButton
            className={cn(styles.icon, styles.icon_button)}
            buttonRef={iconRef}
            color="yellow"
            onClick={onClickIcon}
          >
            {icon}
          </CircleButton>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

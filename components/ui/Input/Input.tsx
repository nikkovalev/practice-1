import React, { ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import cn from "classnames";

import { EyeIcon } from "@/components/icons";

import styles from "./Input.module.scss";

interface IInput {
  className?: string;
  type?: "password" | "text";
  name: string;
  placeholder: string;
  isError?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    { className, name, placeholder, type, isError, onBlur, onChange },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [inputType, setInputType] = useState<"password" | "text">(type || "text");
    const handleClickIcon = () => setInputType((t) => (t === "text" ? "password" : "text"));

    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          ref={ref}
          type={inputType}
          className={cn(styles.input, {
            [styles.inputError]: isError,
            [styles.inputWithIcon]: type === "password",
          })}
          name={name}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
        />
        {type === "password" && (
          <div className={styles.passwordIcon} onClick={handleClickIcon}>
            <EyeIcon visible={inputType === "password"} />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

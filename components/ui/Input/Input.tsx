import classNames from "classnames";
import React, { ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useState } from "react";

import { EyeIcon } from "@/components/icons/EyeIcon";

import styles from "./Input.module.scss";

interface IInput {
  type?: "password" | "text";
  name: string;
  placeholder: string;
  isError?: boolean;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ name, placeholder, type, isError, onBlur, onChange }, ref: ForwardedRef<HTMLInputElement>) => {
    const [inputType, setInputType] = useState<"password" | "text">(type || "text");
    const handleClickIcon = () => setInputType((t) => (t === "text" ? "password" : "text"));

    return (
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={classNames(styles.input, styles.inputPassword, {
            [styles.inputError]: isError,
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

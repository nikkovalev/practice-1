import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  MouseEvent,
  useState,
} from "react";
import cn from "classnames";

import { EyeIcon } from "@/components/icons";
import { CircleButton } from "../CircleButton";

import styles from "./Input.module.scss";

export interface IInput {
  className?: string;
  name: string;
  placeholder: string;
  color?: "dark" | "light";
  isError?: boolean;
  type?: "text" | "password";
  size?: "lg" | "md";
  style?: CSSProperties;
  isSupportLight?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className, color = "light", size = "lg", isError, isSupportLight, ...props }, ref: any) => {
    return (
      <input
        ref={ref}
        className={cn(styles.input, styles[`input_${color}`], styles[`input_${size}`], className, {
          [styles.input_error]: isError,
          [styles.input_support]: isSupportLight,
        })}
        {...props}
      />
    );
  }
);

export const PasswordInput = forwardRef<HTMLInputElement, IInput>((props, ref: any) => {
  const [type, setType] = useState<"text" | "password">("password");
  const handleChangeType = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setType((t) => (t === "password" ? "text" : "password"));
  };

  return (
    <div className={styles.passwordInput}>
      <Input ref={ref} {...props} type={type} />
      <button className={styles.passwordIcon} onClick={handleChangeType}>
        <EyeIcon visible={type === "password"} />
      </button>
    </div>
  );
});

type IInputWithText = { text: string; wrapperClassName: string; pr: number } & IInput;

export const InputWithText = forwardRef<HTMLInputElement, IInputWithText>(
  ({ text, wrapperClassName, pr, ...props }, ref) => (
    <div className={cn(styles.inputWithText, wrapperClassName)}>
      <Input ref={ref} style={{ paddingRight: pr }} {...props} />
      <span>{text}</span>
    </div>
  )
);

type IInputWithButton = {
  icon: any;
  pr: number;
  iconRef: any;
  children: any;
  wrapperClassName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
} & IInput;

export const InputWithButton = forwardRef<HTMLInputElement, IInputWithButton>(
  ({ icon, onClick, pr, iconRef, children, wrapperClassName, ...props }, ref) => (
    <div className={cn(styles.inputWithButton, wrapperClassName)}>
      {children}
      <Input ref={ref} style={{ paddingRight: pr }} {...props} />
      <CircleButton buttonRef={iconRef} color="yellow" onClick={onClick}>
        {icon}
      </CircleButton>
    </div>
  )
);

Input.displayName = "Input";
PasswordInput.displayName = "PasswordInput";
InputWithText.displayName = "InputWithText";
InputWithButton.displayName = "InputWithButton";

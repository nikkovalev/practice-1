import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import styles from "./CircleButton.module.scss";

interface ICircleButton {
  className?: string;
  color?: "yellow" | "purple" | "green";
  children: any;
  buttonRef?: any;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const CircleButton: FC<ICircleButton> = ({
  className,
  color,
  children,
  buttonRef,
  disabled,
  onClick,
}) => {
  return (
    <button
      ref={buttonRef}
      className={cn(styles.circle, className, { [styles[`circle_${color}`]]: !!color })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

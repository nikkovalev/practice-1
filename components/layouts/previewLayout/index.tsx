import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface IPreview {
  className?: string;
  bg: string;
  children: ReactNode;
}

export const Preview: FC<IPreview> = ({ bg, children, className }) => {
  return (
    <div className={cn("page__preview", className)} style={{ backgroundImage: `url(${bg})` }}>
      {children}
    </div>
  );
};

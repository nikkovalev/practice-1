import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";

interface IPreview {
  className?: string;
  bg: string;
  children: ReactNode;
  withMask?: boolean;
}

export const Preview: FC<IPreview> = ({ bg, children, className, withMask }) => {
  return (
    <div
      className={cn(
        "relative bg-center bg-cover bg-no-repeat bg-fixed bg-black-400 pt-[240px] lg:pt-[130px] xxs:pt-[180px]",
        className
      )}
      style={{ backgroundImage: url(bg) }}
    >
      <div className={withMask ? "relative z-10" : undefined}>{children}</div>
      {withMask && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[5] bg-gradient-to-b from-black-400 to-black-500 bg-opacity-10" />
      )}
    </div>
  );
};

import React, { FC, ReactNode } from "react";
import AppLink from "next/link";

interface ILink {
  className?: any;
  style?: any;
  href: string;
  children?: ReactNode | string;
}

export const Link: FC<ILink> = ({ className, style, href, children }) => {
  return (
    <AppLink href={href}>
      <a className={className} style={style}>
        {children}
      </a>
    </AppLink>
  );
};

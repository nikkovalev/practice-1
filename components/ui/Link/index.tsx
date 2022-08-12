import React, { FC, ReactNode } from "react";
import AppLink from "next/link";

interface ILink {
  href: string;
  children?: ReactNode | string;
  className?: any;
  style?: any;
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

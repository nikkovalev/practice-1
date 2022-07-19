import React, { FC, ReactNode } from "react";
import AppLink from "next/link";

interface ILink {
  href: string;
  children: ReactNode | string;
  className?: any;
}

export const Link: FC<ILink> = ({ className, href, children }) => {
  return (
    <AppLink href={href}>
      <a className={className}>{children}</a>
    </AppLink>
  );
};

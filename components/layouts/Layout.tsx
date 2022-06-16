import React, { FC, ReactNode } from "react";
import { Header } from "@/components/header/Header";

interface ILayout {
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-black-500">
      <Header />
      {children}
    </div>
  );
};

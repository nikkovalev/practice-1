import React, { FC, ReactNode } from "react";
import { Header } from "@/components/header/Header";
import Head from "next/head";

interface ILayout {
  title: string;
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children, title }) => {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-black-400">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <Header />
      {children}
    </div>
  );
};

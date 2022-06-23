import React, { FC, ReactNode } from "react";
import Head from "next/head";

import { Header } from "@/components/header/Header";
import { Footer } from "../footer/Footer";

interface ILayout {
  title: string;
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children, title }) => {
  return (
    <div className="page min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

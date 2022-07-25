import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Head from "next/head";

import { Header } from "@/components/header/Header";
import { Footer } from "../footer/Footer";

interface ILayout {
  title: string;
  children: ReactNode;
  withImage?: boolean;
}

export const Layout: FC<ILayout> = ({ children, title, withImage }) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden",
        { page: !withImage }
      )}
    >
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <Header />
      <main className="flex-grow page__content">{children}</main>
      <Footer />
    </div>
  );
};

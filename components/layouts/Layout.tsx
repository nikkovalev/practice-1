import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Head from "next/head";

import { Header } from "@/components/header/Header";
import { Footer } from "../footer/Footer";

interface ILayout {
  title: string;
  children: ReactNode;
  withImage?: boolean;
  hideMargin?: boolean;
}

export const Layout: FC<ILayout> = ({ children, title, withImage, hideMargin }) => {
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
      <main
        className={cn("flex-grow page__content", {
          page__content_m0: hideMargin,
        })}
      >
        {children}
      </main>
      <Footer isGray={!!hideMargin} />
    </div>
  );
};

import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Head from "next/head";

import { Header } from "@/components/header/Header";
import { Footer } from "../footer/Footer";

interface ILayout {
  title: string;
  children: ReactNode;
  withImage?: boolean;
  hideContentPadding?: boolean;
  hideTitle?: boolean;
}

export const Layout: FC<ILayout> = ({ children, title, withImage, hideContentPadding }) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden",
        { "pt-[125px] xl:pt-[110px] lg:pt-[90px] sm:pt-[70px] xxs:pt-[120px]": !withImage }
      )}
    >
      <Head>
        <title>YaonClub - {title}</title>
      </Head>
      <Header />
      <main
        className={cn({
          "flex-grow pb-[175px] lg:pb-[110px] xs:pb-[50px]": !hideContentPadding,
        })}
      >
        {children}
      </main>
      <Footer isLight={!!hideContentPadding} />
    </div>
  );
};

import React, { FC } from "react";
import { ICategory } from "@/models/ICategory";

import { Layout } from "@/components/layouts/Layout";
import { HomeTop } from "./HomeTop";
import { HomeCategories } from "./categories/HomeCategories";
import { HomeServices } from "./services/HomeServices";
import { HomeSocials } from "./socials/HomeSocials";
import { HomeAdvantages } from "./advantages/HomeAdvantages";
import { HomeAbout } from "./HomeAbout";
import { HomeChat } from "./HomeChat";

interface IHome {
  categories: ICategory[];
}

export const Home: FC<IHome> = ({ categories }) => {
  return (
    <Layout title="Главная" hideContentPadding={true}>
      <HomeTop />
      <HomeCategories categories={categories} />
      <HomeServices />
      <HomeSocials />
      <HomeChat />
      <HomeAdvantages />
      <HomeAbout />
    </Layout>
  );
};

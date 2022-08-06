import React, { FC } from "react";
import { ICategory } from "@/models/ICategory";

import { Layout } from "@/components/layouts/Layout";
import { HomeTop } from "./HomeTop";
import { HomeCategories } from "./categories/HomeCategories";
import { HomeServices } from "./services/HomeServices";
import { HomeSocials } from "./socials/HomeSocials";
import { HomeAdvantages } from "./advantages/HomeAdvantages";
import { HomeAbout } from "./HomeAbout";

interface IHome {
  categories: ICategory[];
}

export const Home: FC<IHome> = ({ categories }) => {
  return (
    <Layout title="Главная">
      <HomeTop />
      <HomeCategories categories={categories} />
      <HomeServices />
      <HomeSocials />
      <HomeAdvantages />
      <HomeAbout />
    </Layout>
  );
};

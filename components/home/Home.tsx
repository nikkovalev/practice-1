import React from "react";

import { Layout } from "../layouts/Layout";
import { HomeTop } from "./HomeTop";
import { HomeCategories } from "./categories/HomeCategories";
import { HomeServices } from "./services/HomeServices";
import { HomeSocials } from "./socials/HomeSocials";
import { HomeAdvantages } from "./advantages/HomeAdvantages";
import { HomeAbout } from "./HomeAbout";

export const Home = () => {
  return (
    <Layout title="Главная">
      <HomeTop />
      <HomeCategories />
      <HomeServices />
      <HomeSocials />
      <HomeAdvantages />
      <HomeAbout />
    </Layout>
  );
};

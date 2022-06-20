import React from "react";

import { Layout } from "../layouts/Layout";
import { HomeTop } from "./HomeTop";
import { HomeCategories } from "./categories/HomeCategories";

import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <Layout title="Главная">
      <HomeTop />
      <HomeCategories />
    </Layout>
  );
};

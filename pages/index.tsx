import type { NextPage, NextPageContext } from "next";
import { ICategory } from "@/models/ICategory";

import { Home } from "@/components/screens/home/Home";

interface IHomePage {
  categories: ICategory[];
}

export const getServerSideProps = async (context: NextPageContext) => {
  const categories = await (await fetch(`${process.env.API_URL}/categories?full=false`)).json();
  return {
    props: {
      categories,
    },
  };
};

const HomePage: NextPage<IHomePage> = ({ categories }) => <Home categories={categories} />;

export default HomePage;

import type { NextPage } from "next";
import { ICategory } from "@/models/ICategory";

import { Home } from "@/components/screens/home";

interface IHomePage {
  categories: ICategory[];
}

export const getServerSideProps = async () => {
  const categories = await (await fetch(`${process.env.API_URL}/categories?full=false`)).json();
  return {
    props: {
      categories,
    },
  };
};

const HomePage: NextPage<IHomePage> = ({ categories }) => <Home categories={categories} />;

export default HomePage;

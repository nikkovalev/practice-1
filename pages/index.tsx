import type { GetServerSideProps, NextPage } from "next";
import { ICategory } from "@/models/ICategory";

import { Home } from "@/components/screens/home/Home";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await (await fetch(`${process.env.API_URL}/categories?full=false`)).json();
  return {
    props: {
      categories,
    },
  };
};

interface IHomePage {
  categories: ICategory[];
}

const HomePage: NextPage<IHomePage> = ({ categories }) => <Home categories={categories} />;

export default HomePage;

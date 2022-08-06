import type { NextPage } from "next";
import { ICategory } from "@/models/ICategory";

import { Categories } from "@/components/screens/categories/Categories";

interface ICategoriesPage {
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

const CategoriesPage: NextPage<ICategoriesPage> = ({ categories }) => (
  <Categories categories={categories} />
);

export default CategoriesPage;

import React from "react";
import { NextPage, NextPageContext } from "next";
import { ICategory } from "@/models/ICategory";

import { Category } from "@/components/screens/category/Category";

interface ICategoryPage {
  category: ICategory;
}

export const getServerSideProps = async (context: NextPageContext) => {
  console.log(context.query.slug);
  const res = await fetch(`${process.env.API_URL}/categories/${context.query.slug}?full=true`);
  const category = await res.json();
  return {
    props: { category },
  };
};

const CategoryPage: NextPage<ICategoryPage> = ({ category }) => <Category category={category} />;
export default CategoryPage;

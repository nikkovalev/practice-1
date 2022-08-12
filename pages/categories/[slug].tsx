import React from "react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { ICategory } from "@/models/ICategory";

import { Category } from "@/components/screens/category";

interface ICategoryPage {
  category: ICategory & { error: string; message: string; statusCode: number };
}

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`${process.env.API_URL}/categories/${context.query.slug}?full=true`);
  const category = await res.json();
  return {
    props: { category },
  };
};

const CategoryPage: NextPage<ICategoryPage> = ({ category }) => {
  const router = useRouter();

  if (category?.message) {
    router.replace("/404");
    toast.error(category?.message, { toastId: "category_error" });
    return null;
  }

  return <Category category={category} />;
};
export default CategoryPage;

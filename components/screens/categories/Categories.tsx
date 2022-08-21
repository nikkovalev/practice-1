import React, { FC } from "react";
import { ICategory } from "@/models/ICategory";

import { Layout } from "@/components/layouts/Layout";
import { Container, TextWithCount } from "@/components/ui";
import { HomeCategories } from "../home/categories/HomeCategories";

interface ICategories {
  categories: ICategory[];
}

export const Categories: FC<ICategories> = ({ categories }) => {
  return (
    <Layout title="Категории">
      <Container variant="ic">
        <TextWithCount
          className="mb-[50px] md:mb-[20]"
          title="Категории"
          count={categories.length}
        />
      </Container>
      <HomeCategories
        listClassName="columns-3 gap-x-[10px] lg:columns-2 sm:columns-1"
        categories={categories}
        hideTitle={true}
      />
    </Layout>
  );
};

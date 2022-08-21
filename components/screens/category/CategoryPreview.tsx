import React, { FC } from "react";
import Head from "next/head";

import { ICategory, IService } from "@/models/ICategory";

import { Button, Container, Text, TextWithArrow } from "@/components/ui";
import { Preview } from "@/components/layouts/previewLayout";

import styles from "./Category.module.scss";

interface ICategoryPreview {
  category: ICategory;
  service: IService | null;
}

export const CategoryPreview: FC<ICategoryPreview> = ({ category, service }) => {
  return (
    <Preview withMask={true} bg={category.banner ?? ""}>
      <Head>
        <title>
          YaonClub - {service?.name} {category.name}
        </title>
      </Head>
      <Container variant="ic">
        <TextWithArrow href={`/?category=${category.slug}`}>
          В каталог {category.name}
        </TextWithArrow>
        <Text className="mb-[30px] md:mb-[10px]" as="h1" weight={700} size="vl">
          {service?.name} {category.name}
        </Text>
        <Text
          className="w-[60%] md:w-full leading-[34px] sm:leading-[28px]"
          as="p"
          size="l"
          color="gray"
        >
          {service?.description}
        </Text>
        <div className={styles.buttons}>
          {category.services.map((i) => (
            <Button
              key={i.id}
              theme="black_contained"
              as="link"
              href={`/categories/${category.slug}?page=${i.id}`}
              isActive={service?.id === i.id}
            >
              {i.name}
            </Button>
          ))}
        </div>
      </Container>
    </Preview>
  );
};

import React, { FC, useMemo } from "react";
import Head from "next/head";

import { ICategory, IService } from "@/models/ICategory";

import { Container, GroupButtons, Text, TextWithArrow } from "@/components/ui";
import { Preview } from "@/components/layouts/previewLayout";

import styles from "./Category.module.scss";

interface ICategoryPreview {
  category: ICategory;
  service: IService | null;
}

export const CategoryPreview: FC<ICategoryPreview> = ({ category, service }) => {
  const buttons = useMemo<{ id: number; name: string }[]>(
    () => category.services.map((s) => ({ id: s.id, name: s.name })),
    [category]
  );

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
        <Text className="mb-[30px] md:mb-[10px]" as="h1" size="vl">
          {service?.name} {category.name}
        </Text>
        <Text className="w-[60%] lg:w-full" as="p" color="gray">
          {service?.description.replaceAll("YaonPay", "YaonClub")}
        </Text>
        <GroupButtons
          className={styles.buttons}
          items={buttons}
          prefixPath={`/categories/${category.slug}?page=`}
          active={service?.id}
        />
      </Container>
    </Preview>
  );
};

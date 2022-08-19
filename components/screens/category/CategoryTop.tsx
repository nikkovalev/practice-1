import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ICategory, IService } from "@/models/ICategory";
import { IGetOffer } from "@/models/IOffer";

import { ArrowIcon } from "@/components/icons";
import { CategoryFilters } from "./CategoryFilters";
import { Button, Text } from "@/components/ui";
import { Preview } from "@/components/layouts/previewLayout";

import styles from "./Category.module.scss";

interface ICategoryTop {
  category: ICategory;
  view: "card" | "list";
  getOffers: (data: IGetOffer) => void;
  setView: Dispatch<SetStateAction<"list" | "card">>;
}

export const CategoryTop: FC<ICategoryTop> = ({ category, view, getOffers, setView }) => {
  const [service, setService] = useState<IService | null>(null);
  const [server, setServer] = useState<number | null>(null);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const getService = (id: number) => category.services.find((s) => s.id === id);
  const handleSelectServer = (_: string | null, idx?: number) => setServer(idx ?? null);
  const handleChangeOrder = () => setOrder(order === "ASC" ? "DESC" : "ASC");
  const handleChangeOnline = () => setOnlineOnly(!onlineOnly);
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value);

  useEffect(() => {
    if (!category) return;
    const initial = router.query.page ? getService(parseInt(router.query.page as string)) : null;
    const service = !!initial ? initial : category.services[0] ?? null;
    setService(service);
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    if (service) {
      const data: any = {};
      if (!!server) data.server = server;
      if (!!query) data.query = query;
      getOffers({
        categoryId: category.id,
        serviceId: service?.id,
        order,
        onlineOnly,
        ...data,
      });
    }
    // eslint-disable-next-line
  }, [service, server, order, onlineOnly, query]);

  return (
    <>
      <Preview withMask={true} bg={category.banner ?? ""}>
        <div className="inner-container">
          <Link href={`/?category=${category.slug}`}>
            <a className="link_with_arrow">
              <ArrowIcon direction="left" color="gray" />
              <b>В каталог {category.name}</b>
            </a>
          </Link>
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
                className={styles.button}
                variant="outlined"
                color="black"
                size="fit"
                as="link"
                href={`/categories/${category.id}?page=${i.id}`}
                isActive={service?.id === i.id}
              >
                {i.name}
              </Button>
            ))}
          </div>
        </div>
      </Preview>
      <div className="container">
        <CategoryFilters
          category={category}
          filters={service?.filters ?? []}
          view={view}
          handleSelectServer={handleSelectServer}
          handleChangeOrder={handleChangeOrder}
          handleChangeOnline={handleChangeOnline}
          handleChangeQuery={handleChangeQuery}
          setView={setView}
        />
      </div>
    </>
  );
};

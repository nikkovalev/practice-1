import React, { FC, useState, useEffect } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import { ICategory, IService } from "@/models/ICategory";
import { IFilterData } from "@/models/IFilterData";

import { useFetchOffersMutation } from "@/store/categories/categoriesApi";

import { CategoryOffer } from "./CategoryOffer";
import { Loader } from "@/components/loader/Loader";
import { RotateIcon } from "@/components/icons";
import { Layout } from "@/components/layouts/Layout";
import { CategoryPreview } from "./CategoryPreview";
import { Filter } from "@/components/filter";
import { Container, TextEmpty } from "@/components/ui";

import styles from "./Category.module.scss";

interface ICategoryProps {
  category: ICategory;
}

export const Category: FC<ICategoryProps> = ({ category }) => {
  // Request
  const [getOffers, { data: offers, isLoading }] = useFetchOffersMutation();
  // States
  const [view, setView] = useState<"list" | "card">(window.screen.width >= 992 ? "list" : "card");
  const [service, setService] = useState<IService | null>(null);
  // Router
  const router = useRouter();

  const getService = (id: number) => category.services.find((s) => s.id === id);
  const getData = (data: IFilterData) => getOffers(data);

  useEffect(() => {
    if (!category) return;
    const initial = router.query.page ? getService(parseInt(router.query.page as string)) : null;
    const service = !!initial ? initial : category.services[0] ?? null;
    setService(service);
    // eslint-disable-next-line
  }, [category]);

  return (
    <Layout title={category.name} withImage={true} hideTitle={true}>
      <CategoryPreview category={category} service={service} />
      <Container>
        <Filter
          className={styles.filter}
          category={category}
          service={service}
          view={view}
          setView={setView}
          getData={getData}
        />
        <div className={styles.offers}>
          {isLoading && (
            <div className="mx-auto">
              <Loader />
            </div>
          )}
          {!isLoading && !offers?.length && (
            <TextEmpty className="mx-auto">?????? ??????????????????????.</TextEmpty>
          )}
          {offers?.map((offer) => (
            <CategoryOffer
              key={offer.id}
              offer={offer}
              servers={category?.servers ?? []}
              view={view}
            />
          ))}
          {!!offers?.length && (
            <button className={cn(styles.more, { [styles.moreL]: view === "list" })}>
              <RotateIcon />
              <span>?????????????????? ??????</span>
              <b>11 ??????????????????????</b>
            </button>
          )}
        </div>
      </Container>
    </Layout>
  );
};

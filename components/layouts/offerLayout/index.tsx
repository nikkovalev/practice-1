import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { Layout } from "../Layout";
import { ArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { Select } from "@/components/ui/Select/Select";
import { Counter } from "@/components/ui/Counter/Counter";
import { Chat } from "@/components/Chat/Chat";

import cardsIcon from "@/assets/images/cards.svg";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";

import styles from "./OL.module.scss";

interface IOfferLayout {
  children: ReactNode;
  offer: IOffer;
  category: ICategory;
}

export const OfferLayout: FC<IOfferLayout> = ({ children, offer, category }) => {
  const service = category.services.find((s) => s.id === offer.serviceId);
  const filters = service?.filters?.filter((f) => offer.filters.includes(f.id + ""));
  const { user, isAuth } = useAppSelector((state) => state.auth);

  return (
    <Layout title={category.name} withImage={true}>
      <div
        className={cn("page__preview", styles.top)}
        style={{ backgroundImage: url(category.banner) }}
      >
        <div className="mask" />
        <div className={cn("inner-container", styles.topContent)}>
          <div className={styles.topLeft}>
            <Link href={`/categories/${category.slug}?page=${service?.id}`}>
              <a className="link_with_arrow">
                <ArrowIcon direction="left" />
                <b>
                  {service?.name} {category.name}
                </b>
              </a>
            </Link>
            <h1 className="page__title">FUT Champions</h1>
            <div className={styles.topInfo}>
              {offer.server !== undefined && (
                <div>
                  <span>Сервер</span>
                  {category.servers && <b>{category.servers[offer.server]}</b>}
                </div>
              )}
              {filters?.map((f) => (
                <div key={f.id}>
                  <span>{f.name}</span>
                  <b>{f.values[0]}</b>
                </div>
              ))}
            </div>
            <p className="page__desc">{offer.description}</p>
            <div className={styles.topActions}>
              <b className={styles.topPrice}>{offer.price}₽</b>
              <Counter initial={offer.quantity} />
              <Select
                label="Банковская карта"
                items={[]}
                icon={<Image src={cardsIcon} width={20} height={20} alt="Cards icon" />}
              />
              <Button color="secondary">Купить</Button>
            </div>
          </div>
          {isAuth && offer.seller.id !== user?.id && <Chat variant="normal" />}
        </div>
      </div>
      <div className="flex-grow inner-container">{children}</div>
    </Layout>
  );
};

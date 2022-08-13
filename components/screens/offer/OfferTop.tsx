import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";

import { ArrowIcon } from "@/components/icons";
import { Button, Select, Counter, Text } from "@/components/ui";
import { Chat } from "@/components/Chat/Chat";
import { Preview } from "@/components/layouts";
import { CardsIcon } from "@/components/icons";

import styles from "./Offer.module.scss";

interface IOfferTop {
  offer: IOffer;
  category: ICategory;
}

export const OfferTop: FC<IOfferTop> = ({ category, offer }) => {
  const service = category.services.find((s) => s.id === offer.serviceId);
  const filters = service?.filters?.filter((f) => offer.filters.includes(f.id + ""));
  const { user, isAuth } = useAppSelector((state) => state.auth);

  return (
    <Preview className={styles.top} withMask={true} bg={category.banner ?? ""}>
      <div className={cn("inner-container", styles.topContent)}>
        <div className={styles.topLeft}>
          <Link href={`/categories/${category.slug}?page=${service?.id}`}>
            <a className="link_with_arrow">
              <ArrowIcon direction="left" color="gray" />
              <b>
                {service?.name} {category.name}
              </b>
            </a>
          </Link>
          <Text className="mb-[30px] md:mb-[10px]" as="h1" weight={700} size="vl">
            FUT Champions
          </Text>
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
          <Text
            className="w-[60%] md:w-full leading-[34px] sm:leading-[28px]"
            as="p"
            size="l"
            color="gray"
          >
            {offer.description}
          </Text>
          <div className={styles.topActions}>
            <b className={styles.topPrice}>{offer.price}₽</b>
            <Counter initial={offer.quantity} />
            <Select
              label="Банковская карта"
              items={[]}
              iconClassName="mr-[15px]"
              icon={<CardsIcon />}
            />
            <Button color="secondary" size="fit">
              Купить
            </Button>
          </div>
        </div>
        {isAuth && offer.seller.id !== user?.id && <Chat variant="normal" />}
      </div>
    </Preview>
  );
};

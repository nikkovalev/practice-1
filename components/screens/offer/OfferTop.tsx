import React, { FC } from "react";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";

import { Button, Select, Counter, Text, Container, TextWithArrow } from "@/components/ui";
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
      <Container variant="ic" className={styles.topContent}>
        <div className={styles.topLeft}>
          <TextWithArrow href={`/categories/${category.slug}?page=${service?.id}`}>
            {service?.name} {category.name}
          </TextWithArrow>
          <Text className="mb-[30px] md:mb-[20px]" as="h1" size="vl">
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
          <Text className="w-[60%] md:w-full" as="p" color="gray">
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
              padding="m"
            />
            <Button theme="secondary_contained">Купить</Button>
          </div>
        </div>
        {<Chat className={styles.chat} variant="normal" />}
      </Container>
    </Preview>
  );
};

import React, { FC, useState } from "react";
import cn from "classnames";

import { IOffer } from "@/models/IOffer";

import { ArrowIcon, InfoIcon, LikeIcon } from "@/components/icons";

import styles from "./Category.module.scss";

interface ICategoryOffer {
  offer: IOffer;
  servers: string[];
  view: "card" | "list";
}

export const CategoryOffer: FC<ICategoryOffer> = ({ offer, servers, view }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleShow = () => setShowInfo(true);
  const handleHide = () => setShowInfo(false);

  return (
    <div className={cn(styles.offer, { [styles.offerL]: view === "list" })}>
      <div
        className={cn(styles.offerInfo, { [styles.offerInfoActive]: showInfo })}
        onClick={handleHide}
      >
        <b>Купить или узнать подробнее</b>
        <div>
          <ArrowIcon type="long" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between lg:pr-[15px]">
          <b>Сервер</b>
          <div className="cursor-pointer">
            <LikeIcon isSmall isFill={false} />
          </div>
        </div>
        <span>{servers[offer.server]}</span>
      </div>
      {offer.description && (
        <div>
          <b>Описание</b>
          <span>{offer.description}</span>
        </div>
      )}
      {offer.countable && (
        <div>
          <b>Количество</b>
          <span>{offer.quantity} монет</span>
        </div>
      )}
      <div className={cn(styles.offerSeller, { [styles.offerSellerL]: view === "list" })}>
        <b>Продавец</b>
        <div className="flex items-center">
          <div
            className={cn("avatar", { online: offer.seller.online })}
            style={{ backgroundImage: `url(${offer.seller.photoUrl})` }}
          />
          <span>{offer.seller.username}</span>
          <b>1554 отзыва</b>
        </div>
      </div>
      <div className={styles.offerFooter}>
        <b>от {offer.price}₽</b>
        <div onClick={handleShow}>
          <InfoIcon />
        </div>
      </div>
    </div>
  );
};

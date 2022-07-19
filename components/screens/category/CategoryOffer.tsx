import React, { FC, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { url } from "@/helpers/url";

import { IOffer } from "@/models/IOffer";

import { ArrowIcon, InfoIcon, LikeIcon } from "@/components/icons";
import anonymousImage from "@/assets/images/anonymous.jpg";

import styles from "./Category.module.scss";

interface ICategoryOffer {
  offer: IOffer;
  servers: string[];
  view: "card" | "list";
}

export const CategoryOffer: FC<ICategoryOffer> = ({ offer, servers, view }) => {
  return (
    <Link href={`/offers/${offer.id}`}>
      <a
        className={cn(styles.offer, {
          [styles.offerL]: view === "list",
          [styles.offerC]: view === "card",
        })}
      >
        {typeof offer.server === "number" && servers.length > 0 && (
          <div className={cn({ [styles.offerServerL]: view === "list" })}>
            <b className={styles.offerText}>Сервер</b>
            <span className={cn(styles.offerTitle, { [styles.offerTitleL]: view === "list" })}>
              {servers[offer.server]}
            </span>
          </div>
        )}
        <div>
          <b className={styles.offerText}>Описание</b>
          <span className={cn(styles.offerTitle, { [styles.offerTitleL]: view === "list" })}>
            {offer.description}
          </span>
        </div>
        {offer.countable && (
          <div className={cn({ [styles.offerQuantityL]: view === "list" })}>
            <b className={styles.offerText}>Количество</b>
            <span className={cn(styles.offerTitle, { [styles.offerTitleL]: view === "list" })}>
              {offer.quantity} монет
            </span>
          </div>
        )}
        <div className={cn(styles.offerSeller, { [styles.offerSellerL]: view === "list" })}>
          <b className={styles.offerText}>Продавец</b>
          <div className={styles.offerSellerContent}>
            <div
              className="avatar"
              style={{ backgroundImage: url(offer.seller?.photoUrl || anonymousImage.src) }}
            />
            <div
              className={cn(styles.offerSellerInfo, { [styles.offerSellerInfoL]: view === "list" })}
            >
              <span className="text-ellipsis">{offer.seller.username}</span>
              <b className="text-ellipsis">1554 отзыва</b>
            </div>
          </div>
        </div>
        <b className={cn(styles.offerPrice, { [styles.offerPriceL]: view === "list" })}>
          от {offer.price}₽
        </b>
      </a>
    </Link>
  );
};
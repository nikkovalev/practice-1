import React, { FC } from "react";

import { ICategory } from "@/models/ICategory";
import { IOffer } from "@/models/IOffer";

import { Layout } from "@/components/layouts";
import { OfferTop } from "./OfferTop";
import { Reviews } from "@/components/reviews/Reviews";

interface IOfferPage {
  offer: IOffer;
  category: ICategory;
}

export const Offer: FC<IOfferPage> = ({ category, offer }) => {
  return (
    <Layout title={category.name} withImage={true}>
      <OfferTop category={category} offer={offer} />
      <div className="w-1/2 lg:w-full pt-[30px]">
        <Reviews size="short" />
      </div>
    </Layout>
  );
};

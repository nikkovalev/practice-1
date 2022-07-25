import React from "react";
import { NextPage, NextPageContext } from "next";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";

import { OfferLayout } from "@/components/layouts/offerLayout";
import { Reviews } from "@/components/reviews/Reviews";

interface IOfferPage {
  offer: IOffer;
  category: ICategory;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`${process.env.API_URL}/offers/${context.query.id}`);
  const offer = await res.json();
  const res2 = await fetch(`${process.env.API_URL}/categories/${offer.categoryId}?full=true`);
  const category = await res2.json();
  return {
    props: { offer, category },
  };
};

const OfferPage: NextPage<IOfferPage> = ({ offer, category }) => (
  <OfferLayout offer={offer} category={category}>
    <div className="w-1/2 lg:w-full pt-[30px]">
      <Reviews size="short" />
    </div>
  </OfferLayout>
);

export default OfferPage;

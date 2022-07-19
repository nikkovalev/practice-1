import React from "react";
import { NextPage, NextPageContext } from "next";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";
import { Offer } from "@/components/screens/offer/Offer";
import { OfferLayout } from "@/components/layouts/offerLayout";

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
    <Offer />
  </OfferLayout>
);

export default OfferPage;

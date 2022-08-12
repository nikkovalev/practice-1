import React from "react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { IOffer } from "@/models/IOffer";
import { ICategory } from "@/models/ICategory";

import { Offer } from "@/components/screens/offer";

interface IOfferPage {
  offer: IOffer & { error: string; message: string; statusCode: number };
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

const OfferPage: NextPage<IOfferPage> = ({ offer, category }) => {
  const router = useRouter();

  if (offer?.message) {
    router.replace("/404");
    toast.error(offer?.message, { toastId: "offer_error" });
    return null;
  }

  return <Offer category={category} offer={offer} />;
};

export default OfferPage;

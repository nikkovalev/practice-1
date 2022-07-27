import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useAppSelector } from "@/hooks/useTypedSelector";

import { ICategory } from "@/models/ICategory";
import { IOffer } from "@/models/IOffer";

import { EditOffer } from "@/components/screens/editOffer/EditOffer";

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`${process.env.API_URL}/categories?full=true`);
  const categories = await res.json();
  const id = context.query?.id;
  let offer = null;
  if (!!id) {
    const res2 = await fetch(`${process.env.API_URL}/offers/${id}`);
    offer = await res2.json();
  }
  return {
    props: {
      categories,
      initial: offer,
    },
  };
};

interface IEditOfferPage {
  initial: IOffer;
  categories: ICategory[];
}

const EditOfferPage: NextPage<IEditOfferPage> = ({ initial, categories }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (!isAuth) {
    router.replace("/auth");
    toast.error("Авторизуйтесь", { toastId: "auth_error" });
    return null;
  }

  return <EditOffer categories={categories} initial={initial} />;
};

export default EditOfferPage;

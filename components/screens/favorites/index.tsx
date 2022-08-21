import React, { FC } from "react";

import { ICategory } from "@/models/ICategory";

import { useFetchLikedServicesQuery, useLikeServiceMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { Container, Text, TextWithCount } from "@/components/ui";
import { HomeCategory } from "../home/categories/HomeCategory";
import { Loader } from "@/components/loader/Loader";

interface IFavorites {
  isAuth: boolean;
}

export const Favorites: FC<IFavorites> = ({ isAuth }) => {
  const { data: favorites, isLoading } = useFetchLikedServicesQuery(false) as any;
  const [like] = useLikeServiceMutation();
  const count =
    favorites?.reduce((acc: number, i: ICategory) => (acc += i.services.length), 0) ?? 0;

  return (
    <Layout title="Избранные">
      <Container variant="ic">
        <TextWithCount className="mb-[40px] md:mb-[20px]" title="Избранные" count={count} />
        {isLoading && <Loader />}
        <div className="columns-3 gap-x-[10px] lg:columns-2 sm:columns-1">
          {favorites?.map((c: ICategory) => (
            <HomeCategory key={c.id} category={c} like={like} allLiked={true} isAuth={isAuth} />
          ))}
        </div>
        {!favorites?.length && (
          <Text size="xl" className=" dark:text-secondary-400" color="primary">
            Здесь пока ничего нет
          </Text>
        )}
      </Container>
    </Layout>
  );
};

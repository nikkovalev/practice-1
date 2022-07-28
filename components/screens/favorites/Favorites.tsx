import React, { FC } from "react";
import { ICategory } from "@/models/ICategory";

import { Layout } from "@/components/layouts/Layout";
import { Text, TextWithCount } from "@/components/ui";
import { HomeCategory } from "../home/categories/HomeCategory";

interface IFavorites {
  isAuth: boolean;
  favorites: ICategory[];
  like: (id: number) => Promise<any>;
}

export const Favorites: FC<IFavorites> = ({ isAuth, favorites, like }) => {
  const count = favorites.reduce((acc, i) => (acc += i.services.length), 0);

  return (
    <Layout title="Избранные">
      <div className="inner-container">
        <TextWithCount className="mb-[40px] md:mb-[20px]" title="Избранные" count={count} />
        <div className="columns-3 gap-x-[10px] lg:columns-2 sm:columns-1">
          {favorites.map((c: ICategory) => (
            <HomeCategory
              key={c.id}
              category={c}
              likedServices={[c.id]}
              like={like}
              isAuth={isAuth}
            />
          ))}
        </div>
        {!favorites.length && (
          <Text size="xl" className="dark:text-secondary-400" color="black">
            Здесь пока ничего нет
          </Text>
        )}
      </div>
    </Layout>
  );
};

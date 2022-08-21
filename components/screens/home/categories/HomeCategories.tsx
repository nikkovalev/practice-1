import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { useAppSelector } from "@/hooks/useTypedSelector";
import { useFetchLikedServicesQuery, useLikeServiceMutation } from "@/store/auth/authApi";

import { ICategory } from "@/models/ICategory";

import { HomeCategory } from "./HomeCategory";
import { Container } from "@/components/ui";

import styles from "../Home.module.scss";

interface IHomeCategories {
  categories: ICategory[];
  listClassName?: string;
  hideTitle?: boolean;
}

export const HomeCategories: FC<IHomeCategories> = ({ categories, listClassName, hideTitle }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { data: likedServices } = useFetchLikedServicesQuery(true, {
    skip: !isAuth || !user?.emailVerified,
    refetchOnMountOrArgChange: true,
  });
  const [like] = useLikeServiceMutation();
  const { query } = useRouter();

  useEffect(() => {
    if (query.category) {
      document.getElementById(query.category as string)?.scrollIntoView({ block: "center" });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className={cn({
        [styles.section]: !hideTitle,
      })}
    >
      <Container variant={hideTitle ? "ic" : "c"}>
        {!hideTitle && (
          <Container variant="ic">
            <h2 className={cn(styles.title, styles.categoriesTitle)}>Игры</h2>
          </Container>
        )}
        <div
          className={cn(listClassName, {
            [styles.categoriesList]: !hideTitle,
          })}
        >
          {categories.map((c) => (
            <HomeCategory
              key={c.id}
              category={c}
              likedServices={likedServices as number[]}
              like={like}
              isAuth={isAuth && !!user}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

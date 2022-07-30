import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { ICategory } from "@/models/ICategory";

import { useFetchLikedServicesQuery, useLikeServiceMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { Text, TextWithCount } from "@/components/ui";
import { HomeCategory } from "../home/categories/HomeCategory";
import { Loader } from "@/components/loader/Loader";

export const Favorites = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { data: favorites, isLoading } = useFetchLikedServicesQuery(false) as any;
  const [like] = useLikeServiceMutation();
  const count =
    favorites?.reduce((acc: number, i: ICategory) => (acc += i.services.length), 0) ?? 0;

  if (!isAuth) {
    router.replace("/auth");
    toast.error("Авторизуйтесь", { toastId: "auth_error" });
    return null;
  }

  return (
    <Layout title="Избранные">
      <div className="inner-container">
        <TextWithCount className="mb-[40px] md:mb-[20px]" title="Избранные" count={count} />
        {isLoading && <Loader />}
        <div className="columns-3 gap-x-[10px] lg:columns-2 sm:columns-1">
          {favorites?.map((c: ICategory) => (
            <HomeCategory
              key={c.id}
              category={c}
              likedServices={[c.id]}
              like={like}
              isAuth={isAuth}
            />
          ))}
        </div>
        {!favorites?.length && (
          <Text size="xl" className="dark:text-secondary-400" color="black">
            Здесь пока ничего нет
          </Text>
        )}
      </div>
    </Layout>
  );
};

import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { ICategory } from "@/models/ICategory";

import { useFetchLikedServicesQuery, useLikeServiceMutation } from "@/store/auth/authApi";

import { Favorites } from "@/components/screens/favorites/Favorites";

const FavoritesPage: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { data: favorites } = useFetchLikedServicesQuery(false);
  const [like] = useLikeServiceMutation();

  if (!isAuth) {
    router.replace("/auth");
    toast.error("Авторизуйтесь", { toastId: "auth_error" });
    return null;
  }

  return <Favorites isAuth={isAuth} favorites={favorites as ICategory[]} like={like} />;
};

export default FavoritesPage;

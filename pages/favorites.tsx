import { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { Favorites } from "@/components/screens/favorites";
import { useAppSelector } from "@/hooks/useTypedSelector";

const FavoritesPage: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);

  if (!isAuth) {
    router.replace("/auth");
    toast.error("Авторизуйтесь", { toastId: "auth_error" });
    return null;
  }

  return <Favorites isAuth={isAuth} />;
};

export default FavoritesPage;

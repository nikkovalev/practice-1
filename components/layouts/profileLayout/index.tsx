import React, { FC, ReactNode, useEffect } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { PLButtons } from "./PLButtons";
import { PLTop } from "./PLTop";

import profileBg from "@/assets/images/profile_bg.png";

import styles from "./PL.module.scss";

interface IProfileLayout {
  title: string;
  children: ReactNode;
}

export const ProfileLayout: FC<IProfileLayout> = ({ children, title }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const [updateProfileAvatar, { data: newAvatar }] = useUpdateProfileAvatarMutation();
  const { saveAvatar } = useActions();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      toast.error("Авторизуйтесь", { toastId: "profile_error" });
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (newAvatar) {
      toast.success("Аватар успешно изменен!");
      saveAvatar(newAvatar.avatarURL);
    }
  }, [newAvatar]);

  return (
    <Layout title={title} withImage={true}>
      <section
        className={cn("page__preview", styles.layoutPreview)}
        style={{ backgroundImage: `url(${profileBg.src})` }}
      >
        <PLTop user={user} updateProfileAvatar={updateProfileAvatar} />
        <PLButtons title={title} />
      </section>
      <section className="inner-container">{children}</section>
    </Layout>
  );
};

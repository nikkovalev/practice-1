import React, { FC, ReactNode, useEffect } from "react";
import cn from "classnames";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ProfileLayoutTop } from "./ProfileLayoutTop";
import { ProfileLayoutButtons } from "./ProfileLayoutButtons";

import profileBg from "@/assets/images/profile_bg.png";

import styles from "./ProfileLayout.module.scss";

interface IProfileLayout {
  title: string;
  pageName: string;
  children: ReactNode;
}

export const ProfileLayout: FC<IProfileLayout> = ({ children, title, pageName }) => {
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
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <section
        className={cn("page-preview", styles.layoutPreview)}
        style={{ backgroundImage: `url(${profileBg.src})` }}
      >
        <Header />
        <ProfileLayoutTop user={user} updateProfileAvatar={updateProfileAvatar} />
        <ProfileLayoutButtons pageName={pageName} />
      </section>
      <section className="flex-grow mb-44 inner-container sm:mb-28">{children}</section>
      <Footer />
    </div>
  );
};

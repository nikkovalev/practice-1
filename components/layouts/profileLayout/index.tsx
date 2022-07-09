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
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <section
        className={cn("page_preview", styles.layoutPreview)}
        style={{ backgroundImage: `url(${profileBg.src})` }}
      >
        <Header />
        <ProfileLayoutTop user={user} updateProfileAvatar={updateProfileAvatar} />
        <ProfileLayoutButtons title={title} />
      </section>
      <section className="flex-grow inner-container page_content">{children}</section>
      <Footer />
    </div>
  );
};

import React, { FC, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
import { ProfileNavigation } from "./ProfileNavigation";
import { Preview } from "../previewLayout";
import { Container } from "@/components/ui";

import profileBg from "@/assets/images/profile_bg.png";

import styles from "./ProfileLayout.module.scss";

interface IProfileLayout {
  title: string;
  children: ReactNode;
  hideTitle?: boolean;
}

export const ProfileLayout: FC<IProfileLayout> = ({ children, title, hideTitle }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const [updateProfileAvatar, { data: newAvatar }] = useUpdateProfileAvatarMutation();
  const { saveAvatar } = useActions();
  const router = useRouter();

  useEffect(() => {
    if (newAvatar) {
      toast.success("Аватар успешно изменен!");
      saveAvatar(newAvatar.avatarURL);
    }
    // eslint-disable-next-line
  }, [newAvatar]);

  if (!isAuth) {
    router.replace("/auth");
    toast.error("Авторизуйтесь", { toastId: "auth_error" });
    return null;
  }

  return (
    <Layout title={title} withImage={true}>
      <Preview className={styles.preview} bg={profileBg.src}>
        <UserPreview user={user} updateProfileAvatar={updateProfileAvatar} isOwner={true} />
        <ProfileNavigation />
      </Preview>
      <Container variant="ic">
        {!hideTitle && <h1 className={styles.title}>{title}</h1>}
        {children}
      </Container>
    </Layout>
  );
};

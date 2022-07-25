import React, { FC, ReactNode, useEffect } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
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
      <div
        className={cn("page__preview", styles.preview)}
        style={{ backgroundImage: `url(${profileBg.src})` }}
      >
        <UserPreview user={user} updateProfileAvatar={updateProfileAvatar} isOwner={true} />
        <ProfileLayoutButtons title={title} />
      </div>
      <div className="inner-container">{children}</div>
    </Layout>
  );
};

import React, { FC, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
import { Preview } from "../previewLayout";
import { Container, GroupButtons, TextWithCount } from "@/components/ui";

import profileBg from "@/assets/images/profile_bg.png";

import styles from "./ProfileLayout.module.scss";

interface IProfileLayout {
  title: string;
  text?: string;
  count?: number;
  countColor?: "primary" | "secondary";
  children: ReactNode;
  hideTitle?: boolean;
}

export const links = [
  {
    id: "/offers",
    name: "Предложения",
    count: 29,
  },
  {
    id: "/sales",
    name: "Продажи",
    count: 4,
  },
  {
    id: "/purchases",
    name: "Покупки",

    count: 2,
  },
  {
    id: "/finance",
    name: "Финансы",
  },
  {
    id: "/reviews",
    name: "Отзывы",
    count: 14,
  },
  {
    id: "/settings",
    name: "Настройки",
  },
];

export const ProfileLayout: FC<IProfileLayout> = ({
  children,
  title,
  text = title,
  count,
  countColor,
  hideTitle,
}) => {
  // Store
  const { isAuth, user } = useAppSelector((state) => state.auth);
  // Request
  const [updateProfileAvatar, { data: newAvatar }] = useUpdateProfileAvatarMutation();
  const { saveAvatar } = useActions();
  // Router
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
        <Container variant="ic">
          <GroupButtons className={styles.buttons} items={links} active={router.pathname} />
        </Container>
      </Preview>
      <Container variant="ic">
        {!hideTitle && (
          <TextWithCount
            className="mb-[30px] md:mb-[20px]"
            title={text}
            count={count}
            countColor={countColor}
            isCircle={false}
          />
        )}
        {children}
      </Container>
    </Layout>
  );
};

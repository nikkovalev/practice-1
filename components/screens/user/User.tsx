import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import { IUser } from "@/models/IUser";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
import { Chat } from "@/components/Chat/Chat";
import { Button, Container, GroupButtons, Text } from "@/components/ui";
import { UserOffers } from "./UserOffers";
import { Reviews } from "@/components/reviews/Reviews";
import { Preview } from "@/components/layouts/previewLayout";

import userBg from "@/assets/images/user_bg.jpg";

import styles from "./User.module.scss";

interface IUserPage {
  profile: IUser;
}

const buttons = [
  {
    id: "offers",
    name: "Предложения",
    count: 29,
  },
  {
    id: "reviews",
    name: "Отзывы",
    count: 1554,
  },
];

export const User: FC<IUserPage> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"offers" | "reviews">("offers");
  const router = useRouter();

  useEffect(() => {
    const page = router.query?.page;
    if (!!page && (page === "offers" || page === "reviews")) setActiveTab(page as any);
  }, [router]);

  return (
    <Layout title={profile.username} withImage={true}>
      <Preview className={styles.preview} bg={userBg.src}>
        <UserPreview user={profile} isOwner={false} />
      </Preview>
      <Container variant="ic" className={styles.wrapper}>
        <div className={styles.left}>
          <GroupButtons
            className={styles.tabs}
            items={buttons}
            active={activeTab}
            isLight={true}
            prefixPath={`/users/${profile.id}?page=`}
          />
          <Text className={styles.title} as="h1" size="xxl" weight={700}>
            {activeTab === "offers" ? "Все предложения" : "Все отзывы"}
          </Text>
          {activeTab === "offers" && <UserOffers />}
          {activeTab === "reviews" && <Reviews size="short" />}
        </div>
        <Chat variant="normal" inputColor="gray" />
      </Container>
    </Layout>
  );
};

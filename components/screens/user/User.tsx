import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import { IUser } from "@/models/IUser";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
import { Chat } from "@/components/Chat/Chat";
import { Button, Container } from "@/components/ui";
import { UserOffers } from "./UserOffers";
import { Reviews } from "@/components/reviews/Reviews";
import { Preview } from "@/components/layouts/previewLayout";

import userBg from "@/assets/images/user_bg.jpg";

import styles from "./User.module.scss";

interface IUserPage {
  profile: IUser;
}

export const User: FC<IUserPage> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"offers" | "reviews">("offers");
  const router = useRouter();

  const handleChangeTab = (tab: "offers" | "reviews") => () => {
    setActiveTab(tab);
    router.replace(`/users/${profile.id}?page=${tab}`);
  };

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
          <div className={styles.buttons}>
            <Button
              theme="black_contained"
              isActive={activeTab === "offers"}
              isLight={true}
              onClick={handleChangeTab("offers")}
            >
              Предложения <b>(29)</b>
            </Button>
            <Button
              theme="black_contained"
              isActive={activeTab === "reviews"}
              isLight={true}
              onClick={handleChangeTab("reviews")}
            >
              Отзывы
              <b>(1554)</b>
            </Button>
          </div>
          <h1 className={styles.title}>
            {activeTab === "offers" ? "Все предложения" : "Все отзывы"}
          </h1>
          {activeTab === "offers" && <UserOffers />}
          {activeTab === "reviews" && <Reviews size="short" />}
        </div>
        <Chat variant="normal" inputColor="gray" />
      </Container>
    </Layout>
  );
};

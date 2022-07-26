import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import { IUser } from "@/models/IUser";

import { Layout } from "@/components/layouts/Layout";
import { UserPreview } from "@/components/userPreview/UserPreview";
import { Chat } from "@/components/Chat/Chat";
import { Button } from "@/components/ui";
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
  }, []);

  return (
    <Layout title={profile.username} withImage={true}>
      <Preview className={styles.preview} bg={userBg.src}>
        <UserPreview user={profile} isOwner={false} />
      </Preview>
      <div className={cn("inner-container", styles.wrapper)}>
        <div className={styles.left}>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              color="black"
              size="fit"
              isActive={activeTab === "offers"}
              onClick={handleChangeTab("offers")}
            >
              Предложения <b className="text-secondary-400">(29)</b>
            </Button>
            <Button
              variant="outlined"
              color="black"
              size="fit"
              isActive={activeTab === "reviews"}
              onClick={handleChangeTab("reviews")}
            >
              Отзывы
              <b className="text-secondary-400">(1554)</b>
            </Button>
          </div>
          <h1 className={styles.title}>
            {activeTab === "offers" ? "Все предложения" : "Все отзывы"}
          </h1>
          {activeTab === "offers" && <UserOffers />}
          {activeTab === "reviews" && <Reviews size="short" />}
        </div>
        <Chat variant="normal" inputColor="gray" />
      </div>
    </Layout>
  );
};

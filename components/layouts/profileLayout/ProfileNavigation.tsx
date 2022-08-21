import React, { FC } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@/components/ui";
import styles from "./ProfileLayout.module.scss";

const buttons = [
  {
    title: "Предложения",
    path: "/offers",
    count: 29,
  },
  {
    title: "Продажи",
    path: "/sales",
    count: 4,
  },
  {
    title: "Покупки",
    path: "/purchases",
    count: 2,
  },
  {
    title: "Финансы",
    path: "/finance",
  },
  {
    title: "Отзывы",
    path: "/reviews",
    count: 14,
  },
  {
    title: "Настройки",
    path: "/settings",
  },
];

export const ProfileNavigation: FC = () => {
  const router = useRouter();

  return (
    <Container variant="ic">
      <div className={styles.buttons}>
        {buttons.map((btn) => {
          const isActive = btn.path === router.pathname;
          return (
            <Button
              key={btn.title}
              className={styles.button}
              theme="black_contained"
              as="link"
              href={btn.path}
              isActive={isActive}
            >
              {btn.title}
              {btn.count && <b>({btn.count})</b>}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

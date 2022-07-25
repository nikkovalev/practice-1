import React, { FC } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui";

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
    color: true,
    count: 14,
  },
  {
    title: "Настройки",
    path: "/settings",
  },
];

interface IProfileLayoutButtons {
  title: string;
}

export const ProfileLayoutButtons: FC<IProfileLayoutButtons> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="inner-container">
      <div className={styles.buttons}>
        {buttons.map((btn) => {
          const isActive = btn.path === router.pathname;
          return (
            <Button
              key={btn.title}
              className={styles.button}
              variant="outlined"
              color="black"
              component="link"
              href={btn.path}
              isActive={isActive}
            >
              {btn.title}
              {btn.count && (
                <b className={!!isActive || btn.color ? "text-secondary-400" : "text-gray-400"}>
                  ({btn.count})
                </b>
              )}
            </Button>
          );
        })}
      </div>
      {title && <h1 className={styles.title}>{title}</h1>}
    </div>
  );
};

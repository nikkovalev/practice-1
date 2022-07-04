import React, { FC } from "react";
import cn from "classnames";
import Link from "next/link";

import buttonStyles from "@/components/ui/Button/Button.module.scss";
import styles from "./ProfileLayout.module.scss";

const buttons = [
  {
    title: "Предложения",
    count: 29,
    path: "/",
  },
  {
    title: "Продажи",
    count: 4,
    path: "/",
  },
  {
    title: "Покупки",
    count: 2,
    path: "/",
  },
  {
    title: "Финансы",
    path: "/",
  },
  {
    title: "Отзывы",
    count: 14,
    countColor: "#ffdb59",
    path: "/",
  },
  {
    title: "Настройки",
    path: "/settings",
  },
];

interface IProfileLayoutButtons {
  pageName: string;
}

export const ProfileLayoutButtons: FC<IProfileLayoutButtons> = ({ pageName }) => {
  return (
    <div className="inner-container">
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Link key={button.title} href={button.path}>
            <a
              className={cn(
                styles.button,
                buttonStyles.button,
                buttonStyles.buttonOutlined,
                buttonStyles.link,
                {
                  [buttonStyles.buttonContained]: button.title === pageName,
                }
              )}
            >
              {button.title}
              {button.count && <b style={{ color: button.countColor }}>({button.count})</b>}
            </a>
          </Link>
        ))}
      </div>
      {pageName && <h1 className={styles.title}>{pageName}</h1>}
    </div>
  );
};

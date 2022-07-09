import React, { FC } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import Link from "next/link";

import buttonStyles from "@/components/ui/Button/Button.module.scss";
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
        {buttons.map((button) => {
          const isSelected = button.path === router.pathname;
          return (
            <Link key={button.title} href={button.path}>
              <a
                className={cn(
                  styles.button,
                  buttonStyles.button,
                  buttonStyles.buttonOutlined,
                  buttonStyles.link,
                  {
                    [buttonStyles.buttonContained]: isSelected,
                  }
                )}
              >
                {button.title}
                {button.count && (
                  <b
                    style={{
                      color: isSelected || !!button.color ? "#ffdb59" : "",
                    }}
                  >
                    ({button.count})
                  </b>
                )}
              </a>
            </Link>
          );
        })}
      </div>
      {title && <h1 className={styles.title}>{title}</h1>}
    </div>
  );
};

import React, { FC } from "react";
import { Text } from "@/components/ui";

import styles from "../Home.module.scss";

interface IHomeService {
  service: {
    title: string;
    items: { text: string; path: string }[];
    icon: string;
  };
}

export const HomeService: FC<IHomeService> = ({ service }) => {
  return (
    <div key={service.title} className={styles.service}>
      <div className={styles.serviceLeft}>
        <Text className={styles.link} size="xl" color="black" weight={700} as="a">
          {service.title}
        </Text>
        <ul className={styles.serviceList}>
          {service.items.map((i) => (
            <li key={i.text}>
              <Text className={styles.link} as="a" href={i.path} weight={500} color="gray" size="l">
                {i.text}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.serviceRight}>
        {/* eslint-disable-next-line */}
        <img src={service.icon} alt={service.title} />
      </div>
    </div>
  );
};

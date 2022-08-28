import React, { FC } from "react";
import Image from "next/image";
import { Text } from "@/components/ui";

import styles from "../Home.module.scss";

interface IHomeSocial {
  social: {
    title: string;
    items: { text: string; path: string }[];
    icon: string;
  };
}

export const HomeSocial: FC<IHomeSocial> = ({ social }) => {
  return (
    <div className={styles.social}>
      <div className={styles.socialHeader}>
        <Image src={social.icon} width={50} height={50} alt={social.title} />
        <Text className={styles.link} as="a" size="xl" href="/" color="black" weight={700}>
          {social.title}
        </Text>
      </div>
      <ul className={styles.socialList}>
        {social.items.map((i) => (
          <li key={i.text}>
            <Text className={styles.link} as="a" href={i.path} color="gray" size="m">
              {i.text}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

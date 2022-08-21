import React from "react";
import cn from "classnames";

import { socials } from "../home.data";

import { HomeSocial } from "./HomeSocial";
import { Container } from "@/components/ui";

import styles from "../Home.module.scss";

export const HomeSocials = () => {
  return (
    <section className={styles.section}>
      <Container variant="ic">
        <h2 className={styles.title}>Соц.сети</h2>
      </Container>
      <Container className={cn(styles.list, styles.socialsList)}>
        {socials.map((social) => (
          <HomeSocial key={social.title} social={social} />
        ))}
      </Container>
    </section>
  );
};

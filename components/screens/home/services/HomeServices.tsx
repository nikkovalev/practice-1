import React from "react";
import cn from "classnames";
import { services } from "../home.data";

import { HomeService } from "./HomeService";
import { Container } from "@/components/ui";

import styles from "../Home.module.scss";

export const HomeServices = () => {
  return (
    <section className={cn(styles.section, styles.services)}>
      <Container variant="ic">
        <h2 className={styles.title}>Cервисы</h2>
      </Container>
      <Container className={cn(styles.list, styles.servicesList)}>
        {services.map((service) => (
          <HomeService key={service.title} service={service} />
        ))}
      </Container>
    </section>
  );
};

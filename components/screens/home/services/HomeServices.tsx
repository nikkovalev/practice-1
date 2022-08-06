import React from "react";
import cn from "classnames";
import { services } from "../home.data";

import { HomeService } from "./HomeService";

import styles from "../Home.module.scss";

export const HomeServices = () => {
  return (
    <section className={cn(styles.section, styles.services)}>
      <div className="inner-container">
        <h2 className={styles.title}>Cервисы</h2>
      </div>
      <div className={cn("container", styles.list, styles.servicesList)}>
        {services.map((service) => (
          <HomeService key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
};

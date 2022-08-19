import React from "react";
import cn from "classnames";

import { socials } from "../home.data";

import styles from "../Home.module.scss";
import { HomeSocial } from "./HomeSocial";

export const HomeSocials = () => {
  return (
    <section className={styles.section}>
      <div className="inner-container">
        <h2 className={styles.title}>Соц.сети</h2>
      </div>
      <div className={cn("container", styles.list, styles.socialsList)}>
        {socials.map((social) => (
          <HomeSocial key={social.title} social={social} />
        ))}
      </div>
    </section>
  );
};

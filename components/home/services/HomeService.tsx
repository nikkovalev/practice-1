import React, { FC } from "react";
import classNames from "classnames";

import Link from "next/link";
import Image from "next/image";

import styles from "../Home.module.scss";

interface IHomeService {
  service: {
    name: string;
    icon: string;
    items: {
      text: string;
      path: string;
    }[];
  };
}

export const HomeService: FC<IHomeService> = ({ service }) => {
  return (
    <div className={classNames("dark:bg-black-300", styles.service)}>
      <div className="flex-shrink-0">
        <b className="dark:text-white-100">{service.name}</b>
        <ul>
          {service.items.map((i) => (
            <li key={i.text}>
              <Link href={i.path}>
                <a className="dark:hover:text-secondary-400">{i.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.serviceImage}>
        <Image src={service.icon} width={100} height={100} alt={service.name} />
      </div>
    </div>
  );
};

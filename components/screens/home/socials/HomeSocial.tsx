import React, { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "../Home.module.scss";

interface IHomeSocial {
  social: {
    name: string;
    icon: string;
    items: {
      text: string;
      path: string;
    }[];
  };
}

export const HomeSocial: FC<IHomeSocial> = ({ social }) => {
  return (
    <div className={cn("dark:bg-black-300", styles.social)}>
      <div className="flex items-center">
        <Image src={social.icon} width={50} height={50} alt={social.name} />
        <b className="dark:text-white-100">{social.name}</b>
      </div>
      <ul>
        {social.items.map((i) => (
          <li key={i.text}>
            <Link href={i.path}>
              <a className="dark:hover:text-secondary-400">{i.text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

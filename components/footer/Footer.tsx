import React, { FC } from "react";
import cn from "classnames";
import Image from "next/image";

import { statistics, list, socials } from "./footer.data";

import { Text } from "@/components/ui";
import { Link } from "@/components/link";

import logoIcon from "@/assets/images/logo.svg";
import logo2Icon from "@/assets/images/logo-2.svg";

import styles from "./Footer.module.scss";

export const Footer: FC<{ isLight: boolean }> = ({ isLight }) => {
  return (
    <footer className={cn(styles.footer, { [styles.footer_light]: isLight })}>
      <div className={cn("inner-container", styles.footerContainer)}>
        <div className={cn(styles.footerTop, { [styles.footerTop_light]: isLight })}>
          <ul>
            {socials.map((item, idx) => (
              <li className={styles[`footerSocial_${item.color}`]} key={`${item.name}_${idx}`}>
                <Link href={item.href}>
                  <Image src={item.icon} width={50} height={50} alt={item.name} />
                  <Text as="b" size="xl" weight={700}>
                    {item.name}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footerContent}>
          <Link href="/" className={styles.footerLogo}>
            <Image
              width={window.screen.width > 768 ? 270 : 124}
              height={window.screen.width > 768 ? 79 : 34}
              src={window.screen.width > 768 ? logoIcon : logo2Icon}
              alt="YaonPay"
            />
          </Link>
          <ul className={styles.footerStatistics}>
            {statistics.map((item) => (
              <li key={item.title}>
                <Text as="b" color="primary" weight={700}>
                  {item.count}
                </Text>
                <Text as="span" color="gray" size="s" weight={500}>
                  {item.title}
                </Text>
              </li>
            ))}
          </ul>
          <ul className={styles.footerList}>
            {list.map((item) => (
              <li key={item.title}>
                <Text as="a" href={item.path} size="m" color="gray">
                  {item.title}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footerBottom}>
          <Text as="span" color="gray" weight={500}>
            © 2022 YaonPay. Твоя торговая площадка цифровых товар
          </Text>
          <div className={styles.footerTexts}>
            <Text as="a" href="#" color="gray" weight={500}>
              Пользовательское соглашение
            </Text>
            <Text as="a" href="#" color="gray" weight={500}>
              Политика конфенденциальности
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

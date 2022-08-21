import React from "react";
import cn from "classnames";
import { aboutList } from "./home.data";

import { Container, Text } from "@/components/ui";

import styles from "./Home.module.scss";

export const HomeAbout = () => {
  return (
    <section className={styles.about}>
      <Container variant="ic">
        <h3 className={styles.aboutTitle}>YaonClub</h3>
        <Text className={styles.aboutText} size="l" color="gray" weight={400}>
          Добро пожаловать к нам. Давай попробуем ответить на основные вопросы
        </Text>
        <div className={styles.aboutList}>
          {aboutList.map((i) => (
            <div key={i.title}>
              <Text as="b" weight={700} align="center" color="black">
                {i.title}
              </Text>
              <p dangerouslySetInnerHTML={{ __html: i.text }} />
            </div>
          ))}
        </div>
        <Text
          className={cn(styles.aboutText, styles.aboutBottomText)}
          size="l"
          color="gray"
          weight={400}
        >
          А теперь пару слов от нашей команды лично тебе. Мы рады что ты выбрал именно нас и уверены
          в том что ты не усомнишься в своём выборе. Совершай выгодные сделки и совершенствуйся
          вместе с YaonClub.
        </Text>
      </Container>
    </section>
  );
};

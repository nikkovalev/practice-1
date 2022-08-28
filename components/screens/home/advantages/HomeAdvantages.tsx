import React, { useState } from "react";
import cn from "classnames";

import { advantages } from "../home.data";

import { Container, Text } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

import styles from "../Home.module.scss";

export const HomeAdvantages = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleIsOpened = () => setIsOpened(!isOpened);

  return (
    <section className={styles.advantages}>
      <Container variant="ic">
        <div
          className={cn(styles.advantagesContent, { [styles.advantagesContent_opened]: isOpened })}
        >
          {advantages.map((advantage, idx) => (
            <div key={advantage.title} className={styles.advantage}>
              <Text as="b">{idx + 1}</Text>
              <Text as="span" weight={700} size="l" color="black">
                {advantage.title}
              </Text>
              <p dangerouslySetInnerHTML={{ __html: advantage.text }} />
            </div>
          ))}
        </div>
        <button
          className={cn(styles.advantagesMore, { [styles.advantagesMore_opened]: isOpened })}
          onClick={toggleIsOpened}
        >
          <Text size="s" color="primary" weight={700}>
            Смотреть все преимущества
          </Text>
          <ArrowIcon direction="bottom" color="primary" />
        </button>
      </Container>
    </section>
  );
};

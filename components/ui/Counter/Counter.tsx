import React, { FC, useState } from "react";
import { CounterIcons } from "@/components/icons/CounterIcons";

import styles from "./Counter.module.scss";

interface ICounter {
  initial: number;
}

export const Counter: FC<ICounter> = ({ initial }) => {
  const [val, setVal] = useState<number>(initial);

  const handelIncrease = () => setVal((v) => ++v);
  const handleDecrease = () => setVal((v) => (v === 0 ? v : --v));

  return (
    <div className={styles.counter}>
      <button onClick={handleDecrease}>
        <CounterIcons type="minus" />
      </button>
      <span>{val}</span>
      <button onClick={handelIncrease}>
        <CounterIcons />
      </button>
    </div>
  );
};

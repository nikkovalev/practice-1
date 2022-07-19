import React, { FC, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import styles from "./Header.module.scss";

interface IHeaderSelect {
  items: string[];
}

export const HeaderSelect: FC<IHeaderSelect> = ({ items }) => {
  const [value, setValue] = useState<string>(items[0]);
  const { isShow, ref, setIsShow } = useOutside(false);

  const handleSelect = (value: string) => () => {
    setValue(value);
    setIsShow(!isShow);
  };
  const handleClick = () => setIsShow(!isShow);

  return (
    <div className={styles.headerSelectWrapper}>
      <div className={styles.headerSelect} onClick={handleClick}>
        <span className={styles.headerSelectText}>{value}</span>
      </div>
      <div
        ref={ref}
        className={cn(styles.headerSelectPopper, {
          [styles.headerSelectPopperActive]: isShow,
        })}
      >
        <ul>
          {items.map((i) => (
            <li key={i} onClick={handleSelect(i)}>
              <span className={styles.headerSelectText}>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

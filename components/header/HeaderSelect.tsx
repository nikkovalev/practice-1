import React, { FC, useState } from "react";
import classNames from "classnames";
import { useOutside } from "@/hooks/useOutside";

import styles from "./Header.module.scss";

interface IHeaderSelect {
  items: string[];
}

export const HeaderSelect: FC<IHeaderSelect> = ({ items }) => {
  const [value, setValue] = useState<string>(items[0]);
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleClickButton = () => setIsShow(true);
  const handleSelect = (val: string) => () => {
    setValue(val);
    setIsShow(false);
  };

  return (
    <div className={styles.headerSelect}>
      <button className="dark:text-white-100" onClick={handleClickButton}>
        {value}
      </button>
      <div
        ref={ref}
        className={classNames(styles.headerSelectPopper, {
          [styles.headerSelectPopperActive]: isShow,
        })}
      >
        {items.map((i: string) => (
          <span key={i} onClick={handleSelect(i)}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
};

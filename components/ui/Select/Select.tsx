import React, { FC, useState } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { ArrowIcon } from "@/components/icons";

import styles from "./Select.module.scss";

interface ISelect {
  label: string;
  items: string[];
}

export const Select: FC<ISelect> = ({ label, items }) => {
  const { isShow, ref, setIsShow } = useOutside(false);
  const [val, setVal] = useState<string>(label);

  const handleToggle = () => setIsShow(!isShow);
  const handleSelect = (val: string) => () => {
    setVal(val);
    setIsShow(false);
  };

  return (
    <div ref={ref} className={styles.select}>
      <div
        className={cn(styles.selectHeader, { [styles.selectHeaderActive]: isShow })}
        onClick={handleToggle}
      >
        <div className="text-ellipsis">{val}</div>
        <ArrowIcon pathClassName="fill-primary-400 stroke-primary-400" />
      </div>
      <div className={cn(styles.selectItems, { [styles.selectItemsActive]: isShow })}>
        <ul>
          {items.map((i) => (
            <li key={i} onClick={handleSelect(i)}>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

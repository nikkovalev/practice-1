import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { EditIcon } from "@/components/icons/EditIcon";
import { CircleButton } from "@/components/ui";
import removeIcon from "@/assets/images/remove.svg";
import doneIcon from "@/assets/images/ok.svg";

import styles from "./Finance.module.scss";

interface ICard {
  card: {
    icon: string;
    text: string;
  };
}

export const Card: FC<ICard> = ({ card }) => {
  const { ref, ref2, isShow, setIsShow } = useOutside(false);
  const [value, setValue] = useState<string>(card.text);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = () => setIsShow(true);
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsError(false);
  };
  const handleSave = () => {
    if (!value) return setIsError(true);
    setIsShow(false);
  };

  useEffect(() => {
    if (!isShow) setIsError(false);
    // eslint-disable-next-line
  }, [isShow]);

  return (
    <div className={cn(styles.card, { [styles.card_form]: isShow, [styles.card_error]: isError })}>
      <input
        ref={ref}
        type="text"
        value={value}
        placeholder="Номер карты"
        onChange={handleChangeValue}
      />

      <CircleButton
        className={cn(styles.doneIcon, {
          [styles.doneIcon_show]: isShow,
        })}
        color="green"
        buttonRef={ref2}
        disabled={isError}
        onClick={handleSave}
      >
        <Image src={doneIcon.src} width={20} height={20} alt="Save icon" />
      </CircleButton>
      {/* eslint-disable-next-line */}
      <img src={card.icon} alt="Master card" />
      <span className="text-ellipsis">{card.text}</span>
      <CircleButton color="yellow" onClick={handleClick}>
        <EditIcon className="fill-black-400" />
      </CircleButton>
      <CircleButton>
        <Image src={removeIcon.src} width={20} height={20} alt="Remove icon" />
      </CircleButton>
    </div>
  );
};

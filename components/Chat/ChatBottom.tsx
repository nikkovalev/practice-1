import React, { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import { useForm } from "react-hook-form";

import circleArrow from "@/assets/images/circle_arrow.svg";

import styles from "./Chat.module.scss";

interface IChatBottom {
  variant: "normal" | "global" | "full";
  inputColor?: "gray";
}

export const ChatBottom: FC<IChatBottom> = ({ variant, inputColor }) => {
  const { register, handleSubmit } = useForm();

  const sendMessage = ({ new_message }: { [key: string]: string }) => {
    console.log(new_message);
  };

  return (
    <form className={styles.chatBottom} onSubmit={handleSubmit(sendMessage)}>
      <input
        {...register("new_message", { required: true })}
        className={cn(styles.chatBottomInput, {
          [styles.chatBottomInput_rounded]: variant !== "full",
          [styles[`chatBottomInput_${inputColor}`]]: !!inputColor,
        })}
        type="text"
        placeholder="Написать продавцу"
      />
      <button className={styles.chatBottomButton}>
        <Image src={circleArrow} width={24} height={24} alt="Circle arrow" />
      </button>
    </form>
  );
};

import React, { FC } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import arrowIcon from "@/assets/images/circle_arrow.svg";

import styles from "./Chat.module.scss";

interface IChatForm {
  variant: "global" | "user" | "full";
  sendMessage: (message: string) => void;
}

export const ChatForm: FC<IChatForm> = ({ variant, sendMessage }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleSend = (data: { [key: string]: string }) => {
    sendMessage(data.text);
    reset();
  };

  return (
    <form className={styles.chatForm} onSubmit={handleSubmit(handleSend)}>
      <input
        {...register("text", { required: true })}
        placeholder={variant === "global" ? "Написать сообщение" : "Написать продавцу"}
      />
      <button>
        <Image src={arrowIcon.src} width={24} height={24} alt="Send message" />
      </button>
    </form>
  );
};

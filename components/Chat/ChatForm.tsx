import React from "react";
import Image from "next/image";

import arrowIcon from "@/assets/images/circle_arrow.svg";

import styles from "./Chat.module.scss";

export const ChatForm = () => {
  return (
    <div className={styles.chatForm}>
      <input type="text" placeholder="Написать продавцу" />
      <button>
        <Image src={arrowIcon.src} width={24} height={24} alt="Send message" />
      </button>
    </div>
  );
};

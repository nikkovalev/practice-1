import React, { FC, ReactNode } from "react";
import Head from "next/head";
import { CloseIcon } from "../icons";

import styles from "./Modal.module.scss";

interface IModal {
  title?: string;
  children: ReactNode;
  hideClose?: boolean;
  handleClose?: () => void;
}

const Modal: FC<IModal> = ({ title, children, hideClose, handleClose }) => {
  return (
    <div className={styles.modal}>
      <Head>
        <title>YaonPay {title && "- " + title}</title>
      </Head>
      {!hideClose && (
        <div className={styles.modalClose} onClick={handleClose}>
          <CloseIcon />
        </div>
      )}
      {children}
    </div>
  );
};

export { Modal, styles };

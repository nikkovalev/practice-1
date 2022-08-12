import React, { FC, ReactNode } from "react";
import Head from "next/head";
import cn from "classnames";

import { CloseIcon } from "../../icons";

import styles from "./ModalLayout.module.scss";

interface IModal {
  className?: string;
  title?: string;
  children: ReactNode;
  hideClose?: boolean;
  handleClose?: () => void;
}

const Modal: FC<IModal> = ({ className, title, children, hideClose, handleClose }) => {
  return (
    <>
      <Head>
        <title>YaonClub {title && "- " + title}</title>
      </Head>
      <div className={cn(styles.modal, className)}>
        {!hideClose && (
          <div className={styles.modalClose} onClick={handleClose}>
            <CloseIcon />
          </div>
        )}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  );
};

export { Modal, styles };

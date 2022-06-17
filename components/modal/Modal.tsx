import React, { FC, ReactNode } from "react";
import { CloseIcon } from "../icons";

import styles from "./Modal.module.scss";

interface IModal {
  children: ReactNode;
  handleClose: () => void;
}

export const Modal: FC<IModal> = ({ children, handleClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalClose} onClick={handleClose}>
        <CloseIcon />
      </div>
      {children}
    </div>
  );
};

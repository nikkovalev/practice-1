import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideAlert } from "@/store/reducers/alert/AlertSlice";

import styles from "./Alert.module.scss";

export const Alert = () => {
  const { isShow, text, type } = useAppSelector((state) => state.alertReducer);
  const dispatch = useAppDispatch();
  const timerId = useRef<any>(null);

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    timerId.current = setTimeout(() => dispatch(hideAlert()), 5000);
  }, [isShow]);

  return (
    <div
      className={classNames(styles.alert, {
        [styles.alertActive]: isShow,
        [styles.alertSuccess]: type === "success",
      })}
    >
      {text}
    </div>
  );
};

import React, { FC } from "react";
import cn from "classnames";
import { url } from "@/helpers/url";

import { Link } from "@/components/ui";

import styles from "./Avatar.module.scss";

interface IAvatar {
  className?: string;
  as?: "a";
  href?: string;
  bg: string;
  withStatus?: boolean;
  width?: number;
  height?: number;
  radius?: number;
  borderNone?: boolean;
}

export const Avatar: FC<IAvatar> = ({
  as,
  href,
  className,
  bg,
  withStatus,
  width = 40,
  height = 40,
  radius = 99999,
  borderNone,
}) => {
  const Wrapper: any = as === "a" ? Link : "div";
  const rootClassName = cn(styles.avatar, className, {
    [styles.avatar_status]: withStatus,
    [styles.avatar_bn]: borderNone,
  });
  return (
    <Wrapper
      className={rootClassName}
      href={href}
      style={{ backgroundImage: url(bg), width, height, borderRadius: radius }}
    />
  );
};

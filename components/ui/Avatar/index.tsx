import React, { FC } from "react";
import cx from "classnames";
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
  className: cn,
  bg,
  withStatus,
  width = 40,
  height = 40,
  radius = 99999,
  borderNone,
}) => {
  const className = cx(styles.avatar, cn, {
    [styles.avatar_status]: withStatus,
    [styles.avatar_bn]: borderNone,
  });
  if (as === "a" && href) return <Link href={href} />;
  return (
    <div
      className={className}
      style={{ backgroundImage: url(bg), width, height, borderRadius: radius }}
    />
  );
};

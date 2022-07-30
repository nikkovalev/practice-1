import React, { ChangeEvent, FC, MouseEvent } from "react";
import Image from "next/image";
import cn from "classnames";
import { toast } from "react-toastify";
import { getDate } from "@/helpers/date";
import { url } from "@/helpers/url";
import { useRouter } from "next/router";

import { IUser } from "@/models/IUser";

import { Stars } from "../stars/Stars";

import anonymousImage from "@/assets/images/anonymous.jpg";
import { ArrowIcon } from "../icons";
import { EditIcon } from "../icons/EditIcon";

import styles from "./UserPreview.module.scss";

interface IUserPreview {
  user: IUser | null;
  isOwner: boolean;
  updateProfileAvatar?: (data: FormData) => void;
}

export const UserPreview: FC<IUserPreview> = ({ user, isOwner, updateProfileAvatar }) => {
  const router = useRouter();
  const regDate = getDate(user?.regDate, "dd MMMM yyyy, hh:mm");

  const handleUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const ext = file.name.split(".")[1];
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg")
        return toast.error("Допускаются файлы только .jpeg, .jpg, .png");
      if (file.size > 10000000) toast.error("Файл должен быть не более 10 мегабайт");
      const formData = new FormData();
      formData.append("avatar", file);
      updateProfileAvatar && updateProfileAvatar(formData);
    }
  };

  const handleClickLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className={cn("inner-container", styles.wrapper)}>
      <div className={styles.left}>
        {!isOwner && (
          <a className={cn("link_with_arrow", styles.leftBack)} href="#" onClick={handleClickLink}>
            <ArrowIcon direction="left" color="gray" />
            <b>Назад</b>
          </a>
        )}
        {isOwner ? (
          <label
            htmlFor={`edit-avatar-${user?.id}`}
            className={cn(styles.leftAvatar, styles.leftAvatar_owner)}
            style={{ backgroundImage: url(user?.photoUrl ?? anonymousImage.src) }}
          >
            <div>
              <div className={styles.leftAvatarButton}>
                <EditIcon />
              </div>
              <input
                id={`edit-avatar-${user?.id}`}
                type="file"
                multiple={false}
                accept="image/png, image/jpeg"
                onChange={handleUploadAvatar}
              />
            </div>
          </label>
        ) : (
          <div
            className={styles.leftAvatar}
            style={{ backgroundImage: url(user?.photoUrl ?? anonymousImage.src) }}
          />
        )}
        <div className={styles.leftInfo}>
          <span className={styles.title}>{user?.username}</span>
          <span className={cn(styles.status, { [styles.status_online]: user?.online })}>
            {user?.online ? "В сети" : "Был сегодня в 15:58 (2 часа назад)"}
          </span>
          <div className={styles.leftInfoList}>
            <div className={styles.leftInfoItem}>
              <b className={styles.text}>Зарегистрировался</b>
              <span className={cn(styles.text, styles.text_white)}>{regDate}</span>
            </div>
            <div className={styles.leftInfoItem}>
              <b className={styles.text}>На сервисе уже</b>
              <span className={cn(styles.text, styles.text_white)}>1 год и 7 месяцев</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <b>4.9</b>
          <Stars rating={4.9} />
        </div>
        <div>
          <b>14</b>
          <span>отзывов</span>
        </div>
      </div>
    </div>
  );
};

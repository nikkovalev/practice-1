import React, { ChangeEvent, FC } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
import Image from "next/image";

import { IUser } from "@/models/IUser";

import anonymousImage from "@/assets/images/anonymous.jpg";
import starIcon from "@/assets/images/star.svg";
import editIcon from "@/assets/images/edit.svg";

import styles from "./ProfileLayout.module.scss";

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

interface IProfileLayoutTop {
  user: IUser | null;
  updateProfileAvatar: (data: FormData) => void;
}

export const ProfileLayoutTop: FC<IProfileLayoutTop> = ({ user, updateProfileAvatar }) => {
  const date = new Date(user?.regDate || "");
  const month = MONTHS[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const handleUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const ext = file.name.split(".")[1];
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg")
        return toast.error("Допускаются файлы только .jpeg, .jpg, .png");
      if (file.size > 10000000) toast.error("Файл должен быть не более 10 мегабайт");
      const formData = new FormData();
      formData.append("avatar", file);
      updateProfileAvatar(formData);
    }
  };

  return (
    <div className={cn("inner-container", styles.layoutTop)}>
      <div className={styles.user}>
        <label
          htmlFor="profile_edit_avatar"
          className={styles.userImage}
          style={{ backgroundImage: `url(${user?.photoUrl || anonymousImage.src})` }}
        >
          <input
            type="file"
            id="profile_edit_avatar"
            multiple={false}
            accept="image/png, image/jpeg"
            onChange={handleUploadAvatar}
          />
          <div>
            <Image src={editIcon} width={20} height={20} alt="Edit avatar" />
          </div>
        </label>
        <div className={styles.userInfo}>
          <h3>{user?.username || "Anonimus"}</h3>
          <b className={cn({ [styles.userStatusOffline]: !user?.online })}>
            {user?.online ? "В сети" : "Не в сети"}
          </b>
          <ul className={styles.userStatistics}>
            <li>
              <span>Зарегистрировался</span>
              <b>
                {("0" + day).slice(-2)} {month} {year}, {hours}:{minutes}
              </b>
            </li>
            <li>
              <span>На сервисе уже</span>
              <b>1 год и 7 месяцев</b>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.userStars}>
        <div className={styles.userStarsTop}>
          <b>4.9</b>
          <ul>
            <li>
              <Image src={starIcon} width={20} height={20} alt="Star icon" />
            </li>
            <li>
              <Image src={starIcon} width={20} height={20} alt="Star icon" />
            </li>
            <li>
              <Image src={starIcon} width={20} height={20} alt="Star icon" />
            </li>
            <li>
              <Image src={starIcon} width={20} height={20} alt="Star icon" />
            </li>
            <li>
              <Image src={starIcon} width={20} height={20} alt="Star icon" />
            </li>
          </ul>
        </div>
        <span>
          <b>14</b> отзывов
        </span>
      </div>
    </div>
  );
};

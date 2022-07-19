import React, { ChangeEvent, FC } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
import Image from "next/image";
import { getDate } from "@/helpers/date";

import { IUser } from "@/models/IUser";

import anonymousImage from "@/assets/images/anonymous.jpg";
import starIcon from "@/assets/images/star.svg";
import editIcon from "@/assets/images/edit.svg";

import styles from "./PL.module.scss";

interface IPLTop {
  user: IUser | null;
  updateProfileAvatar: (data: FormData) => void;
}

export const PLTop: FC<IPLTop> = ({ user, updateProfileAvatar }) => {
  const formattedDate = getDate(user?.regDate, "dd MMMM yyyy, hh:mm");

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
              <b>{formattedDate}</b>
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

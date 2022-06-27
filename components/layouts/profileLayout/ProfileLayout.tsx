import React, { ChangeEvent, FC, ReactNode, useEffect } from "react";
import cn from "classnames";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useUpdateProfileAvatarMutation } from "@/store/auth/authApi";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import profileBg from "@/assets/images/profile.svg";
import anonymousImage from "@/assets/images/anonymous.jpg";
import starIcon from "@/assets/images/star.svg";
import editIcon from "@/assets/images/edit.svg";

import buttonStyles from "@/components/ui/Button/Button.module.scss";
import styles from "./ProfileLayout.module.scss";

interface IProfileLayout {
  pageName?: string;
  title: string;
  children: ReactNode;
}

const buttons = [
  {
    title: "Предложения",
    count: 29,
    path: "/",
  },
  {
    title: "Продажи",
    count: 4,
    path: "/",
  },
  {
    title: "Покупки",
    count: 2,
    path: "/",
  },
  {
    title: "Финансы",
    path: "/",
  },
  {
    title: "Отзывы",
    count: 14,
    countColor: "#ffdb59",
    path: "/",
  },
  {
    title: "Настройки",
    path: "/settings",
  },
];

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

export const ProfileLayout: FC<IProfileLayout> = ({ children, pageName, title }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const [updateProfileAvatar, { data: newAvatar, isLoading: isAvatarLoading }] =
    useUpdateProfileAvatarMutation();
  const { updatePhotoURL } = useActions();
  const router = useRouter();

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
      formData.append("file", file);
      updateProfileAvatar(formData);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      toast.error("Авторизуйтесь", { toastId: "profile_error" });
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (newAvatar) updatePhotoURL(newAvatar.avatarURL);
  }, [newAvatar]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <section
        className={styles.layoutPreview}
        style={{ backgroundImage: `url(${profileBg.src})` }}
      >
        <Header />
        <div className="inner-container">
          <div className="flex items-center justify-between">
            <div className={styles.user}>
              <div
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
                <label htmlFor="profile_edit_avatar">
                  <Image src={editIcon} width={20} height={20} alt="Edit avatar" />
                </label>
              </div>
              <div className={styles.userInfo}>
                <h3>{user?.username || "Anonimus"}</h3>
                <b>В сети</b>
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
          <div className={styles.buttons}>
            {buttons.map((button) => (
              <Link key={button.title} href={button.path}>
                <a
                  className={cn(styles.button, buttonStyles.button, buttonStyles.buttonOutlined, {
                    [buttonStyles.buttonContained]: button.title === pageName,
                  })}
                >
                  {button.title}
                  {button.count && <b style={{ color: button.countColor }}>({button.count})</b>}
                </a>
              </Link>
            ))}
          </div>
          {pageName && <h1 className={styles.title}>{pageName}</h1>}
        </div>
      </section>
      <section className="flex-grow mb-44">
        <div className="inner-container">{children}</div>
      </section>
      <Footer />
    </div>
  );
};

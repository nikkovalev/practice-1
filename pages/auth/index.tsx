import React, { useEffect } from "react";
import cn from "classnames";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";

import { IAuthLogin } from "@/models/IAuth";

import { useLoginUserMutation, useLoginVKMutation } from "@/store/auth/authApi";
import { useActions } from "@/hooks/useActions";

import { Modal, styles } from "@/components/layouts/modalLayout";
import { Button, Text, Input, PasswordInput } from "@/components/ui";

import vkIcon from "@/assets/images/socials/vk.svg";

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const [loginVK, { isLoading: isLoadingVK }] = useLoginVKMutation();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { modalPrevUrl } = useAppSelector((state) => state.global);
  const { saveToken } = useActions();

  const handleClose = () => router.push(modalPrevUrl);
  const handleLogin = (data: { [key: string]: any }) => loginUser(data as IAuthLogin);
  const handleLoginVK = () => loginVK();

  useEffect(() => {
    if (!isLoading && data) {
      if (data.tfa) {
        router.push("/2fa");
        return;
      }
      toast.success("Успешная авторизация");
      saveToken(data.token);
      handleClose();
    }
    // eslint-disable-next-line
  }, [isLoading, data]);

  useEffect(() => {
    if (isAuth) {
      toast.warning("Вы уже авторизованы", { toastId: "auth_warning" });
      handleClose();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Modal title="Войти" handleClose={handleClose}>
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div className={cn(styles.top, styles.top_flex)}>
          <Text className={styles.loginTitle} as="h1" leading="120">
            Войти
          </Text>
          <Text
            as="a"
            href="/register"
            color="primary"
            size="xl"
            weight={700}
            hover="s"
            leading="130"
          >
            Зарегистрироваться
          </Text>
        </div>
        <Input
          {...register("login", { required: true })}
          className={styles.input}
          placeholder="Имя или почта"
          isError={!!errors.login}
        />
        <PasswordInput
          {...register("password", { required: true })}
          placeholder="Пароль"
          isError={!!errors.password}
        />
        <Button
          className={styles.authButton}
          theme="secondary_contained"
          size="large"
          disabled={isLoading || isLoadingVK}
        >
          Войти
        </Button>
        <Button
          className={styles.vkButton}
          theme="blue"
          size="large"
          disabled={isLoading || isLoadingVK}
          onClick={handleLoginVK}
        >
          <Image src={vkIcon.src} width={25} height={25} alt="VK" />
          Войти через VK
        </Button>
      </form>
    </Modal>
  );
};

export default AuthPage;
